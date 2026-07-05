# Memória — pv-waba-disparador (paginadevendas)

## 2026-07-05 — Deploy landing wabadisparos.com.br

**Easypanel:** projeto `waba`, serviço `paginadevendas`  
**Domínio:** `wabadisparos.com.br`  
**Repo:** `walkup-tec/pv-waba-disparador` branch `main`

**Status:**
- `waba-paginadevendas.achpyp.easypanel.host` → **502** (mesmo VIP Swarm que bets_pv)
- `wabadisparos.com.br` → **sem registro A** no DNS público (8.8.8.8)
- Fix conhecido: destino Traefik `http://tasks.waba_paginadevendas:3000/`

**Próximos passos:**
1. SSH hotfix Traefik + Easypanel domínios (tasks.*)
2. DNS Hostinger cPanel (A → 72.60.51.127)
3. SSL Let's Encrypt
4. Validar cadastro (CORS já no waba_disparador)
