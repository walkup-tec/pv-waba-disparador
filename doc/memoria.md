# Memória — pv-waba-disparador (paginadevendas)

## 2026-07-05 — Deploy landing wabadisparos.com.br

**Easypanel:** projeto `waba`, serviço `paginadevendas`  
**Domínio:** `wabadisparos.com.br`  
**Repo:** `walkup-tec/pv-waba-disparador` branch `main`

**Status:**
- `waba-paginadevendas.achpyp.easypanel.host` → **200 OK** (landing DRAX no ar)
- `wabadisparos.com.br` → **NXDOMAIN** — NS ainda `a.auto.dns.br` / `b.auto.dns.br`, sem registro A público
- Traefik: `tasks.waba_paginadevendas:3000` (fix VIP aplicado)
- `wabadisparos.com.br` → no ar (DNS + Traefik)
- Logo header/footer: `DRAX_WABA.png` → `src/assets/drax-waba-logo.png`
- Favicon: mesmo `favicon.ico` do sistema WABA

**Próximos passos:**
1. SSH hotfix Traefik + Easypanel domínios (tasks.*)
2. DNS Hostinger cPanel (A → 72.60.51.127)
3. SSL Let's Encrypt
4. Validar cadastro (CORS já no waba_disparador)
