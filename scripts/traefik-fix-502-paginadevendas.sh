#!/bin/bash
# Fix 502 — wabadisparos.com.br → app waba/paginadevendas
set -euo pipefail

SCRIPT_VERSION="paginadevendas-traefik-2026-07-06-v2"
INSTALL_PATH="/root/traefik-fix-paginadevendas.sh"
CRON_FILE="/etc/cron.d/traefik-fix-paginadevendas"
LOG="/var/log/traefik-fix-paginadevendas.log"
CFG=/etc/easypanel/traefik/config/main.yaml

SWARM_SERVICE="${SWARM_SERVICE:-waba_paginadevendas}"
CONTAINER_FILTER="${CONTAINER_FILTER:-waba_paginadevendas}"
PORT="${PORT:-3000}"
PUBLIC_HOST="${PUBLIC_HOST:-wabadisparos.com.br}"
EASYPANEL_HOST="${EASYPANEL_HOST:-waba-paginadevendas.achpyp.easypanel.host}"
BACKEND_URL="http://tasks.${SWARM_SERVICE}:${PORT}/"

traefik_container() {
  docker ps -q -f name=easypanel-traefik -f status=running | head -1
}

app_cid() {
  docker ps -q --filter name="${CONTAINER_FILTER}" --filter status=running | head -1
}

resolve_backend_url() {
  local traefik="$1" cid="$2" ip
  for url in \
    "${BACKEND_URL}" \
    "http://${SWARM_SERVICE}:${PORT}/" \
    "http://tasks.${SWARM_SERVICE}:${PORT}/"; do
    if docker exec "$traefik" wget -qO- --timeout=5 "$url" 2>/dev/null | head -c 60 | grep -qi '<!DOCTYPE\|<html'; then
      echo "${url}"
      return 0
    fi
  done
  if [[ -n "$cid" ]]; then
    ip=$(docker inspect "$cid" --format '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}' | awk '{print $1}')
    if [[ -n "$ip" ]] && docker exec "$traefik" wget -qO- --timeout=5 "http://${ip}:${PORT}/" 2>/dev/null | head -c 60 | grep -qi '<!DOCTYPE\|<html'; then
      echo "http://${ip}:${PORT}/"
      return 0
    fi
  fi
  echo "${BACKEND_URL}"
  return 1
}

apply_dnsrr() {
  if docker service ls --format '{{.Name}}' 2>/dev/null | grep -qx "$SWARM_SERVICE"; then
    echo "Swarm: dnsrr em ${SWARM_SERVICE}"
    docker service update --endpoint-mode dnsrr "$SWARM_SERVICE" 2>&1 | tail -2 || true
  fi
}

patch_main_yaml() {
  local backend="$1"
  [[ -f "$CFG" ]] || { echo "ERRO: ${CFG} ausente"; return 1; }
  cp -a "$CFG" "${CFG}.bak-pv-$(date +%Y%m%d-%H%M%S)"

  python3 - "$CFG" "$backend" "$SWARM_SERVICE" "$PUBLIC_HOST" "$EASYPANEL_HOST" <<'PY'
import re, sys
path, backend, swarm, public_host, ep_host = sys.argv[1:6]
backend = backend.rstrip("/") + "/"
text = open(path, encoding="utf-8").read()

def set_service_url(name: str) -> int:
    global text
    if not name:
        return 0
    pat = rf'("{re.escape(name)}"\s*:\s*\{{[\s\S]*?"url"\s*:\s*")http://[^"]+(")'
    new, n = re.subn(pat, rf'\g<1>{backend}\2', text, count=1)
    if n:
        text = new
        print(f"  service {name} -> {backend}")
    return n

def services_for_host(host: str) -> list[str]:
    if not host:
        return []
    found = []
    for m in re.finditer(rf'Host\(`{re.escape(host)}`\)', text):
        start = max(0, m.start() - 200)
        end = min(len(text), m.end() + 400)
        window = text[start:end]
        for sm in re.finditer(r'"service"\s*:\s*"([^"]+)"', window):
            found.append(sm.group(1))
    return list(dict.fromkeys(found))

# Serviços ligados aos domínios da landing WABA
for host in (public_host, ep_host):
    for svc in services_for_host(host):
        set_service_url(svc, backend)

# Serviços waba_paginadevendas conhecidos
for name in {
    swarm, swarm.replace("_", "-"),
    f"{swarm}-0", f"{swarm}-1",
    f"{swarm.replace('_', '-')}-0", f"{swarm.replace('_', '-')}-1",
}:
    set_service_url(name, backend)

# Não deixar wabadisparos apontar para typebot_paginadevendas
for svc in services_for_host(public_host) + services_for_host(ep_host):
    if "typebot" in svc.lower():
        set_service_url(svc, backend)

# URLs soltas typebot_paginadevendas nos blocos dos hosts WABA
for host in (public_host, ep_host):
    if host not in text:
        continue
    idx = text.find(f"Host(`{host}`)")
    if idx < 0:
        continue
    chunk = text[idx:idx + 2500]
    if "typebot_paginadevendas" in chunk:
        chunk = re.sub(
            r'("url"\s*:\s*")http://[^"]+(")',
            rf'\g<1>{backend}\2',
            chunk,
            count=1,
        )
        text = text[:idx] + chunk + text[idx + 2500:]

open(path, "w", encoding="utf-8").write(text)
PY

  local traefik
  traefik=$(traefik_container)
  [[ -n "$traefik" ]] && docker kill -s HUP "$traefik" 2>/dev/null || true
  sleep 2
}

http_code() {
  local host="$1" code
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 "https://${host}/" 2>/dev/null || echo "000")
  if [[ "$code" == "000" ]]; then
    code=$(curl -sS -o /dev/null -w "%{http_code}" --resolve "${host}:443:127.0.0.1" --max-time 15 \
      "https://${host}/" 2>/dev/null || echo "000")
  fi
  echo "$code"
}

run_fix() {
  echo "=== ${SCRIPT_VERSION} $(date -Is) ==="
  local traefik cid backend
  traefik=$(traefik_container)
  cid=$(app_cid)

  echo "Traefik=${traefik:-?}  App(waba)=${cid:-?}"

  if [[ -z "$cid" ]]; then
    echo "ERRO: waba_paginadevendas não está running"
    docker ps -a --format 'table {{.Names}}\t{{.Status}}' | grep -i paginadevendas || true
    return 1
  fi

  docker logs "$cid" --tail 5 2>&1 || true
  [[ -z "$traefik" ]] && { echo "ERRO: Traefik ausente"; return 1; }

  apply_dnsrr
  sleep 12
  backend=$(resolve_backend_url "$traefik" "$cid" || true)
  echo "Backend escolhido: ${backend}"
  patch_main_yaml "$backend"

  echo "--- rotas wabadisparos ---"
  grep -n "wabadisparos\|waba-paginadevendas" "$CFG" | head -20 || true
  echo "--- urls paginadevendas ---"
  grep url "$CFG" | grep -i paginadevendas || true

  local pub ep
  pub=$(http_code "$PUBLIC_HOST")
  ep=$(http_code "$EASYPANEL_HOST")
  echo "RESULTADO ${PUBLIC_HOST}=${pub}  ${EASYPANEL_HOST}=${ep}"

  [[ "$pub" == "200" || "$ep" == "200" ]]
}

install() {
  local self
  self=$(readlink -f "${BASH_SOURCE[0]}")
  [[ "$self" != "$INSTALL_PATH" ]] && cp "$self" "$INSTALL_PATH"
  chmod +x "$INSTALL_PATH"
  cat >"$CRON_FILE" <<EOF
*/3 * * * * root ${INSTALL_PATH} run >> ${LOG} 2>&1
EOF
  chmod 644 "$CRON_FILE"
  run_fix
  echo "Cron: ${CRON_FILE}"
}

case "${1:-run}" in
  install) install ;;
  run) run_fix ;;
  diagnose)
    docker ps -a --format 'table {{.Names}}\t{{.Status}}' | grep -i paginadevendas || true
    grep -n "wabadisparos" "$CFG" | head -15 || true
    grep url "$CFG" | grep -i paginadevendas || true
    ;;
  *) echo "Uso: $0 {install|run|diagnose}"; exit 1 ;;
esac
