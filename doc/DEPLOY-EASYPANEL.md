# Deploy — paginadevendas (Easypanel)

App **TanStack Start** SSR — repo `walkup-tec/pv-waba-disparador`.

## Easypanel — serviço `waba/paginadevendas`

| Campo | Valor |
|-------|--------|
| Repositório | `walkup-tec/pv-waba-disparador` |
| Branch | `main` |
| Build | **Dockerfile** |
| Porta | `3000` |

### Environment (runtime)

```env
PORT=3000
HOST=0.0.0.0
NODE_ENV=production
```

### Domínios

| Domínio | Serviço Easypanel |
|---------|-------------------|
| `wabadisparos.com.br` | **waba/paginadevendas** (não typebot) |
| `waba-paginadevendas.achpyp.easypanel.host` | waba/paginadevendas |

Destino interno: `http://tasks.waba_paginadevendas:3000/`

---

## 502 Bad Gateway — solução já existente (WABA repo)

**Não reinventar.** Usar o mesmo script que corrige `waba.draxsistemas.com.br`:

- Doc: [FIX-TRAEFIK-WABA.md](https://github.com/walkup-tec/waba/blob/master/doc/FIX-TRAEFIK-WABA.md)
- Log: `LOG-2026-06-08__traefik-permanent-waba-script-dedicado.md`
- Script: `walkup-tec/waba` → `scripts/traefik-permanent-waba-vps.sh`

### No VPS (uma linha via wrapper deste repo)

```bash
curl -fsSL https://raw.githubusercontent.com/walkup-tec/pv-waba-disparador/main/scripts/traefik-fix-502-paginadevendas.sh -o /root/traefik-fix-paginadevendas.sh
chmod +x /root/traefik-fix-paginadevendas.sh
/root/traefik-fix-paginadevendas.sh run
```

### Ou manual (mesmo script WABA com variáveis da landing)

```bash
export WABA_PUBLIC_HOST=wabadisparos.com.br
export WABA_SWARM_SERVICE=waba_paginadevendas
export WABA_CONTAINER_FILTER=waba_paginadevendas
export WABA_EASYPANEL_HOST=waba-paginadevendas.achpyp.easypanel.host
export WABA_PORT=3000
export WABA_BACKEND_URL=http://tasks.waba_paginadevendas:3000/

curl -fsSL https://raw.githubusercontent.com/walkup-tec/waba/master/scripts/traefik-permanent-waba-vps.sh -o /tmp/traefik-pv.sh
sed -i 's/\r$//' /tmp/traefik-pv.sh
chmod +x /tmp/traefik-pv.sh
/tmp/traefik-pv.sh run
```

Esperado: `wabadisparos.com.br: 200`

> **Não** rode `install` do script WABA com outro serviço se já tiver o fix do `waba_disparador` — use só `run` para a landing, ou o wrapper acima.

### Fix definitivo de todo o VPS (WABA + Evolution + guarda main.yaml)

Ver `walkup-tec/waba` → `doc/FIX-TRAEFIK-DEFINITIVO.md` → `/root/traefik-permanent-all-vps.sh install`

---

## waba_disparador (CORS cadastro)

```env
WABA_CORS_ORIGINS=https://wabadisparos.com.br,https://www.wabadisparos.com.br
WABA_APP_LOGIN_URL=https://waba.draxsistemas.com.br/
```

## Validar

```bash
curl -I https://wabadisparos.com.br/
```
