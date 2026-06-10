## Site Drax — Landing page de conversão

Construir uma landing page única em português (Brasil) para a Drax, plataforma de disparos WhatsApp em massa, com objetivo único: cadastros gratuitos. Vou usar a direção **Industrial Command Center** (v3) como referência — dark mode com verde WhatsApp, tipografia Geist, gradientes em emerald, mockup do dashboard em destaque.

### Estrutura da página (rota única `/`)

1. **Header fixo** — logo Drax, menu suave (Solução, APIs, Benefícios, Preço, FAQ), CTA "Criar Conta Gratuitamente"
2. **Hero** — headline "Disparos de WhatsApp em Escala com Máxima Segurança", subheadline, badges de benefícios, CTA principal, mockup do dashboard
3. **Problemas do mercado** — grid com 6 dores (bloqueios, perda de números, mistura atendimento/disparos, falta de escalabilidade, instabilidade, baixa entrega)
4. **Solução Drax** — diferencial da estrutura isolada com infográfico e cards explicativos
5. **API Oficial vs Alternativa** — comparação lado a lado com CTA
6. **Benefícios** — grid de 9 cards
7. **Aquecedor gratuito** — bloco destaque com selo "100% Gratuito"
8. **Transparência de preço** — "Comece Gratuitamente" + "A partir de R$ 0,30/envio" (sem planos)
9. **Prova social** — placeholders profissionais (logos, depoimentos, métricas)
10. **FAQ** — accordion com 8 perguntas
11. **CTA Final** — "Comece Hoje Mesmo" full-width
12. **Footer** — logo, institucional, política, termos, contato, redes sociais

### Detalhes técnicos

- Direção visual: dark (`#050505`), verde WhatsApp (`#25D366` / `#128C7E`), Geist + Geist Mono, gradientes glow, animações sutis (float, pulse-glow, fade-in on scroll)
- Tokens em `src/styles.css` via `@theme` (Tailwind v4)
- Tudo na rota `/` (`src/routes/index.tsx`) — componentização por seção em `src/components/landing/`
- Mockup do dashboard gerado via imagegen (premium quality, dashboard dark de disparos WhatsApp)
- SEO completo: `head()` com title, description, og:title/og:description/og:url, JSON-LD `Organization` + `FAQPage`, canonical
- CTAs como `<a href="#cadastro">` (placeholder) já que não há backend de auth conectado — todos abrem o mesmo destino
- Animações com Framer Motion para reveal-on-scroll
- Mobile-first, responsivo total

### Fora de escopo

- Backend / fluxo real de cadastro (CTAs são placeholders prontos para conectar ao sistema)
- Planos de pagamento (apenas transparência conforme briefing)
- Páginas adicionais (termos, privacidade) — apenas links no footer
