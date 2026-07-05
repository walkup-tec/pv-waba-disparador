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

### Domínios — destino interno HTTP

| Domínio | Destino |
|---------|---------|
| `wabadisparos.com.br` | `http://tasks.waba_paginadevendas:3000/` |
| `www.wabadisparos.com.br` | redirect → apex |
| `waba-paginadevendas.achpyp.easypanel.host` | `http://tasks.waba_paginadevendas:3000/` |

> Use `tasks.waba_paginadevendas` se VIP Swarm (`waba_paginadevendas`) retornar 502.

### Avançado

- Tempo de inatividade zero: **OFF**
- Réplicas: **1**

## DNS (Hostinger cPanel)

| Tipo | Nome | Valor |
|------|------|-------|
| A | `wabadisparos.com.br` | `72.60.51.127` |
| A | `www` | `72.60.51.127` |

## waba_disparador (CORS cadastro)

```env
WABA_CORS_ORIGINS=https://wabadisparos.com.br,https://www.wabadisparos.com.br
WABA_APP_LOGIN_URL=https://waba.draxsistemas.com.br/
```

## Validar

```bash
curl -I https://waba-paginadevendas.achpyp.easypanel.host/
curl -I https://wabadisparos.com.br/
```
