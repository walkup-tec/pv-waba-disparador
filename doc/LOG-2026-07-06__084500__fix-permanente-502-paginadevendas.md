# LOG 2026-07-06 — fix permanente 502 paginadevendas

**Data:** 2026-07-06 ~08:45 UTC-3

## Causa raiz
Easypanel regenera `main.yaml` com `http://waba_paginadevendas:3000/` (VIP Swarm inalcançável). Após cada redeploy → 502.

## Solução
- `scripts/traefik-fix-502-paginadevendas.sh`
- tasks.* backend + dnsrr + cron 3min

## Pendência
Rodar no VPS: `/root/traefik-fix-paginadevendas.sh install`
