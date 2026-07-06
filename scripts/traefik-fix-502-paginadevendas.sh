#!/bin/bash
# Fix permanente 502 — paginadevendas (VIP Swarm inalcançável no Traefik Easypanel).
# Uso:
#   curl -fsSL https://raw.githubusercontent.com/walkup-tec/pv-waba-disparador/main/scripts/traefik-fix-502-paginadevendas.sh -o /root/traefik-fix-paginadevendas.sh
#   chmod +x /root/traefik-fix-paginadevendas.sh
#   /root/traefik-fix-paginadevendas.sh install
#
# Versão: paginadevendas-traefik-2026-07-06-v1
set -euo pipefail

SCRIPT_VERSION="paginadevendas-traefik-2026-07-06-v1"
INSTALL_PATH="/root/traefik-fix-paginadevendas.sh"
CRON_FILE="/etc/cron.d/traefik-fix-paginadevendas"
LOG="/var/log/traefik-fix-paginadevendas.log"
CFG=/etc/easypanel/traefik/config/main.yaml

SWARM_SERVICE="${SWARM_SERVICE:-waba_paginadevendas}"
CONTAINER_FILTER="${CONTAINER_FILTER:-paginadevendas}"
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

backend_reachable() {
  local traefik="$1"
  docker exec "$traefik" wget -qO- --timeout=5 "${BACKEND_URL}" 2>/dev/null | head -c 80 | grep -qi '<!DOCTYPE\|<html' && return 0
  return 1
}

apply_dnsrr() {
  if docker service ls --format '{{.Name}}' 2>/dev/null | grep -qx "$SWARM_SERVICE"; then
    echo "Swarm: endpoint-mode dnsrr em ${SWARM_SERVICE}"
    docker service update --endpoint-mode dnsrr "$SWARM_SERVICE" 2>&1 | tail -3 || true
  fi
}

patch_main_yaml() {
  [[ -f "$CFG" ]] || { echo "ERRO: ${CFG} ausente"; return 1; }

  cp -a "$CFG" "${CFG}.bak-pv-$(date +%Y%m%d-%H%M%S)"

  python3 - "$CFG" "$BACKEND_URL" "$SWARM_SERVICE" "$PUBLIC_HOST" "$EASYPANEL_HOST" "$PORT" <<'PY'
import re, sys
path, backend, swarm, public_host, ep_host, port = sys.argv[1:7]
backend = backend.rstrip("/") + "/"
text = open(path, encoding="utf-8").read()

service_names = {
    swarm,
    swarm.replace("_", "-"),
    f"{swarm}-0",
    f"{swarm}-1",
    f"{swarm.replace('_', '-')}-0",
    f"{swarm.replace('_', '-')}-1",
}

def set_service_url(name: str) -> int:
    global text
    pat = rf'("{re.escape(name)}"\s*:\s*\{{[\s\S]*?"url"\s*:\s*")http://[^"]+(")'
    new, n = re.subn(pat, rf'\g<1>{backend}\2', text, count=1)
    if n:
        text = new
        print(f"  service {name} -> {backend}")
    return n

for name in service_names:
    set_service_url(name)

# Qualquer URL waba_paginadevendas / paginadevendas
pat = re.compile(r'("url"\s*:\s*")http://(?:tasks\.)?(?:waba[_-])?paginadevendas:\d+/?(")', re.I)
text, n = pat.subn(rf'\g<1>{backend}\2', text)
if n:
    print(f"  urls paginadevendas -> {backend} ({n}x)")

for host in (public_host, ep_host, "paginadevendas", "waba-paginadevendas", "waba_paginadevendas"):
    if not host:
        continue
    for wrong in (
        f"http://{swarm}:{port}",
        f"http://tasks.{swarm}:80",
        f"http://{swarm}:80",
        f"http://waba_paginadevendas:3000",
        f"http://waba_paginadevendas:80",
        f"http://waba-paginadevendas:3000",
    ):
        text = text.replace(wrong + "/", backend)
        text = text.replace(wrong, backend.rstrip("/"))

open(path, "w", encoding="utf-8").write(text)
PY

  local traefik
  traefik=$(traefik_container)
  if [[ -n "$traefik" ]]; then
    docker kill -s HUP "$traefik" 2>/dev/null || true
    sleep 2
  fi
}

http_code() {
  curl -sS -o /dev/null -w "%{http_code}" --resolve "${1}:443:127.0.0.1" --max-time 15 \
    "https://${1}/" 2>/dev/null || echo "000"
}

run_fix() {
  echo "=== ${SCRIPT_VERSION} $(date -Is) ==="
  local traefik cid
  traefik=$(traefik_container)
  cid=$(app_cid)

  echo "Traefik=${traefik:-?}  App=${cid:-?}  Backend=${BACKEND_URL}"

  if [[ -z "$cid" ]]; then
    echo "ERRO: container paginadevendas não está running — redeploy no Easypanel"
    docker ps -a --filter name=paginadevendas --format 'table {{.Names}}\t{{.Status}}' || true
    return 1
  fi

  docker logs "$cid" --tail 8 2>&1 || true

  if [[ -z "$traefik" ]]; then
    echo "ERRO: Traefik ausente"
    return 1
  fi

  if ! backend_reachable "$traefik"; then
    echo "AVISO: tasks ainda inalcançável — tentando dnsrr"
    apply_dnsrr
    sleep 15
  fi

  patch_main_yaml

  local pub ep
  pub=$(http_code "$PUBLIC_HOST")
  ep=$(http_code "$EASYPANEL_HOST")
  echo "RESULTADO public=${pub} easypanel=${ep} backend=${BACKEND_URL}"

  if [[ "$pub" != "200" && "$ep" != "200" ]]; then
    echo "ALERTA: ainda não 200 — verifique Easypanel domínios -> ${BACKEND_URL}"
    grep url "$CFG" | grep -i paginadevendas || true
    return 1
  fi
  return 0
}

install() {
  local self
  self=$(readlink -f "${BASH_SOURCE[0]}")
  if [[ "$self" != "$INSTALL_PATH" ]]; then
    cp "$self" "$INSTALL_PATH"
  fi
  chmod +x "$INSTALL_PATH"
  cat >"$CRON_FILE" <<EOF
# Reaplica fix VIP Swarm paginadevendas (Easypanel regenera main.yaml)
*/3 * * * * root ${INSTALL_PATH} run >> ${LOG} 2>&1
EOF
  chmod 644 "$CRON_FILE"
  apply_dnsrr
  run_fix
  echo "Instalado: cron ${CRON_FILE} + log ${LOG}"
}

case "${1:-run}" in
  install) install ;;
  run) run_fix ;;
  diagnose)
    docker ps -a --filter name=paginadevendas --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
    T=$(traefik_container)
    docker exec "$T" wget -S -O /dev/null "${BACKEND_URL}" 2>&1 | head -12 || true
    grep url "$CFG" | grep -i paginadevendas || true
    ;;
  *) echo "Uso: $0 {install|run|diagnose}"; exit 1 ;;
esac
