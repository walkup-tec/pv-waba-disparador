#!/bin/bash
# Landing wabadisparos.com.br — usa o script WABA já validado em produção.
# Doc: waba-repo doc/FIX-TRAEFIK-WABA.md
# Log: doc/LOG-2026-06-08__traefik-permanent-waba-script-dedicado.md
set -euo pipefail

WABA_SCRIPT_URL="${WABA_SCRIPT_URL:-https://raw.githubusercontent.com/walkup-tec/waba/master/scripts/traefik-permanent-waba-vps.sh}"
WABA_SCRIPT_LOCAL="/tmp/traefik-permanent-waba-vps.sh"

export WABA_PUBLIC_HOST="${WABA_PUBLIC_HOST:-wabadisparos.com.br}"
export WABA_SWARM_SERVICE="${WABA_SWARM_SERVICE:-waba_paginadevendas}"
export WABA_CONTAINER_FILTER="${WABA_CONTAINER_FILTER:-waba_paginadevendas}"
export WABA_EASYPANEL_HOST="${WABA_EASYPANEL_HOST:-waba-paginadevendas.achpyp.easypanel.host}"
export WABA_NET="${WABA_NET:-easypanel}"
export WABA_PORT="${WABA_PORT:-3000}"
export WABA_BACKEND_URL="${WABA_BACKEND_URL:-http://tasks.waba_paginadevendas:3000/}"

curl -fsSL "$WABA_SCRIPT_URL" -o "$WABA_SCRIPT_LOCAL"
sed -i 's/\r$//' "$WABA_SCRIPT_LOCAL"
chmod +x "$WABA_SCRIPT_LOCAL"

echo "=== paginadevendas → traefik-permanent-waba-vps.sh (WABA repo) ==="
echo "  host=${WABA_PUBLIC_HOST}"
echo "  swarm=${WABA_SWARM_SERVICE}"
echo "  backend=${WABA_BACKEND_URL}"
echo ""

"$WABA_SCRIPT_LOCAL" "${1:-run}"

echo ""
echo "=== Validar landing ==="
curl -sS -o /dev/null -w "wabadisparos.com.br: %{http_code}\n" --max-time 20 "https://${WABA_PUBLIC_HOST}/" || true
curl -sS -o /dev/null -w "easypanel host: %{http_code}\n" --max-time 20 "https://${WABA_EASYPANEL_HOST}/" || true
