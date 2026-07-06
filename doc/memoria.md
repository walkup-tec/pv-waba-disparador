# Memória — pv-waba-disparador (paginadevendas)

## 2026-07-05 — Deploy landing wabadisparos.com.br

**Easypanel:** projeto `waba`, serviço `paginadevendas`  
**Domínio:** `wabadisparos.com.br`  
**Repo:** `walkup-tec/pv-waba-disparador` branch `main`

**Status:**
- Landing **200** — fix permanente instalado no VPS (watch + timer 20s + cron)
- Backend Traefik: `http://tasks.waba_paginadevendas:3000/`
- Script waba `c523eae` + patch isolado por serviço (evita cruzar com waba_disparador)
- Logo navbar: **draxBets** (`drax-bets-logo.png`) — commit pendente
- Favicon: `favicon.ico` (padrão WABA)

**Próximos passos:**
1. Validar `https://waba.draxsistemas.com.br/health` → 200 (se 502: `/root/traefik-permanent-waba-vps.sh run`)
2. Conferir logo maior no ar após build `def6421`
