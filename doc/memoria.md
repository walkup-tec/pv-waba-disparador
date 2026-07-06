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
- **2026-07-06:** Logo navbar +15% — commit `def6421`, push main OK

**Próximos passos:**
1. Aguardar build Easypanel (`def6421`) e validar logo no ar
2. SSH hotfix Traefik se 502 voltar (tasks.*)
3. DNS Hostinger cPanel (A → 72.60.51.127)
4. SSL Let's Encrypt
5. Validar cadastro (CORS já no waba_disparador)
