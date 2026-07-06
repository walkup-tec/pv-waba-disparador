#!/bin/bash
# Landing wabadisparos.com.br — fix Traefik permanente (cron + timer + watch).
# Doc: doc/DEPLOY-EASYPANEL.md
set -euo pipefail

PV_SCRIPT_URL="${PV_SCRIPT_URL:-https://raw.githubusercontent.com/walkup-tec/waba/master/scripts/traefik-permanent-paginadevendas-vps.sh}"
PV_SCRIPT_LOCAL="/tmp/traefik-permanent-paginadevendas-vps.sh"

export WABA_PUBLIC_HOST="${WABA_PUBLIC_HOST:-wabadisparos.com.br}"
export WABA_SWARM_SERVICE="${WABA_SWARM_SERVICE:-waba_paginadevendas}"
export WABA_CONTAINER_FILTER="${WABA_CONTAINER_FILTER:-waba_paginadevendas}"
export WABA_EASYPANEL_HOST="${WABA_EASYPANEL_HOST:-waba-paginadevendas.achpyp.easypanel.host}"
export WABA_NET="${WABA_NET:-easypanel}"
export WABA_PORT="${WABA_PORT:-3000}"
export WABA_BACKEND_URL="${WABA_BACKEND_URL:-http://tasks.waba_paginadevendas:3000/}"

curl -fsSL "$PV_SCRIPT_URL" -o "$PV_SCRIPT_LOCAL"
sed -i 's/\r$//' "$PV_SCRIPT_LOCAL"
chmod +x "$PV_SCRIPT_LOCAL"

echo "=== paginadevendas → traefik-permanent-paginadevendas-vps.sh ==="
echo "  host=${WABA_PUBLIC_HOST}"
echo "  swarm=${WABA_SWARM_SERVICE}"
echo "  backend=${WABA_BACKEND_URL}"
echo "  cmd=${1:-run}"
echo ""

"$PV_SCRIPT_LOCAL" "${1:-run}"

echo ""
echo "=== Validar landing ==="
curl -sS -o /dev/null -w "wabadisparos.com.br: %{http_code}\n" --max-time 20 "https://${WABA_PUBLIC_HOST}/" || true
curl -sS -o /dev/null -w "easypanel host: %{http_code}\n" --max-time 20 "https://${WABA_EASYPANEL_HOST}/" || true
