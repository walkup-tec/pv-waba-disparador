# Memória — pv-waba-disparador (paginadevendas)

## 2026-07-05 — Deploy landing wabadisparos.com.br

**Easypanel:** projeto `waba`, serviço `paginadevendas`  
**Domínio:** `wabadisparos.com.br`  
**Repo:** `walkup-tec/pv-waba-disparador` branch `main`

**Status:**
- Landing no ar intermitente — 502 após redeploy (VIP Swarm)
- Fix: `scripts/traefik-fix-502-paginadevendas.sh` (cron + dnsrr + tasks.*)
- Logo header/footer: `DRAX_WABA.png` → `src/assets/drax-waba-logo.png`
- Favicon: mesmo `favicon.ico` do sistema WABA

**Próximos passos:**
1. SSH hotfix Traefik + Easypanel domínios (tasks.*)
2. DNS Hostinger cPanel (A → 72.60.51.127)
3. SSL Let's Encrypt
4. Validar cadastro (CORS já no waba_disparador)
