import { createFileRoute } from "@tanstack/react-router";
import dashboardMockup from "../assets/dashboard-mockup.jpg";
import draxBetsLogo from "../assets/drax-bets-logo.png";
import {
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
  Headphones,
  BarChart3,
  Plug,
  Sparkles,
  Users,
  Ban,
  AlertTriangle,
  Shuffle,
  Gauge,
  WifiOff,
  PackageX,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Lock,
  Rocket,
  Star,
  Plus,
} from "lucide-react";

const faqs = [
  {
    q: "O cadastro é realmente gratuito?",
    a: "Sim. Você cria sua conta na plataforma sem nenhum custo, sem cartão de crédito e sem mensalidade. A cobrança só acontece quando você decidir realizar envios.",
  },
  {
    q: "Qual a diferença entre API Oficial e API Alternativa?",
    a: "A API Oficial é homologada pela Meta, oferece selo verificado e máxima credibilidade institucional. A API Alternativa oferece implantação imediata, maior flexibilidade e custo-benefício agressivo para operações de alto volume.",
  },
  {
    q: "Como funciona a cobrança?",
    a: "Você trabalha com créditos pré-pagos. Carrega o valor que quiser na sua conta e o saldo é debitado conforme os envios são realizados. Sem fidelidade, sem mensalidade.",
  },
  {
    q: "Posso utilizar meu número atual?",
    a: "Sim. Em ambos os modelos é possível conectar números existentes, respeitando os protocolos técnicos de cada tecnologia. Recomendamos usar números dedicados para os disparos.",
  },
  {
    q: "O sistema possui suporte?",
    a: "Sim. Todos os clientes têm acesso ao suporte técnico especializado via WhatsApp para auxiliar na configuração, integração e estratégia de envios.",
  },
  {
    q: "Como funciona o aquecimento gratuito?",
    a: "Ao realizar a primeira compra de créditos, você libera automaticamente o acesso ao sistema de aquecimento. A ferramenta simula conversas reais entre números para aumentar a reputação da conta antes dos disparos em massa.",
  },
  {
    q: "Existe fidelidade ou contrato?",
    a: "Nenhuma. O modelo é 100% pré-pago. Use a plataforma quando precisar, no volume que precisar, sem multas ou prazos mínimos.",
  },
  {
    q: "Quanto custa exatamente cada envio?",
    a: "O valor parte de R$ 0,30 por envio, podendo reduzir conforme o volume de créditos adquiridos em pacotes maiores. Tudo transparente, sem taxas ocultas.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drax — Disparos de WhatsApp em Escala com Máxima Segurança" },
      {
        name: "description",
        content:
          "Plataforma WABA profissional para disparos de WhatsApp em massa com API Oficial e Alternativa. Cadastro gratuito, pague apenas pelos envios a partir de R$ 0,30.",
      },
      {
        name: "keywords",
        content:
          "disparo whatsapp, api whatsapp oficial, envio em massa whatsapp, marketing whatsapp, automação whatsapp, waba, disparos em massa",
      },
      { property: "og:title", content: "Drax — Disparos de WhatsApp em Escala" },
      {
        property: "og:description",
        content:
          "API Oficial e Alternativa para campanhas em massa no WhatsApp. Cadastro gratuito, sem mensalidade.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const REGISTER_HREF = "#cadastro";

function CtaButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 active:scale-[0.98]";
  const variants = {
    primary:
      "bg-brand text-black hover:shadow-[0_0_40px_var(--color-brand-glow)] hover:-translate-y-0.5",
    ghost:
      "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
    outline:
      "border border-brand/40 text-brand hover:bg-brand hover:text-black",
  };
  return (
    <a href={REGISTER_HREF} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand">{children}</span>
    </div>
  );
}

function Index() {
  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-brand/30 selection:text-white antialiased"
      style={{
        backgroundColor: "#050505",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <ApiComparison />
        <Benefits />
        <Warmer />
        <Pricing />
        <SocialProof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Logo({ size = "md" }: { size?: "sm" | "md" | "nav" }) {
  const height = size === "sm" ? "h-7" : size === "nav" ? "h-[2.5875rem]" : "h-9";
  const width = size === "nav" ? 207 : 180;
  const imgHeight = size === "nav" ? 41 : 36;
  return (
    <a href="#top" className="flex items-center group">
      <img
        src={draxBetsLogo}
        alt="Drax Bets"
        className={`${height} w-auto`}
        width={width}
        height={imgHeight}
        decoding="async"
      />
    </a>
  );
}

function Header() {
  return (
    <header
      id="top"
      className="fixed top-0 inset-x-0 z-50 border-b border-white/5 backdrop-blur-md"
      style={{ backgroundColor: "rgba(5,5,5,0.75)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo size="nav" />
          <nav className="hidden md:flex gap-7 text-sm font-medium text-white/60">
            <a href="#solucao" className="hover:text-brand transition-colors">Solução</a>
            <a href="#apis" className="hover:text-brand transition-colors">APIs</a>
            <a href="#beneficios" className="hover:text-brand transition-colors">Benefícios</a>
            <a href="#preco" className="hover:text-brand transition-colors">Preço</a>
            <a href="#faq" className="hover:text-brand transition-colors">FAQ</a>
          </nav>
        </div>
        <CtaButton className="px-5 py-2 text-sm">Criar Conta Gratuitamente</CtaButton>
      </div>
    </header>
  );
}

function Hero() {
  const heroBadges = [
    "Cadastro Gratuito",
    "API Oficial",
    "API Alternativa",
    "Alta Escalabilidade",
    "Envio Profissional",
    "Plataforma Intuitiva",
  ];
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-brand/10 blur-[140px] rounded-full animate-drax-glow pointer-events-none"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-drax-fade-up">
          <div className="flex justify-center">
            <SectionLabel>Plataforma Profissional WABA</SectionLabel>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance">
            Disparos de WhatsApp em Escala com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
              Máxima Segurança
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed text-pretty">
            Utilize API Oficial ou API Alternativa para realizar campanhas em massa sem comprometer
            o WhatsApp utilizado no atendimento da sua empresa.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {heroBadges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
              >
                <CheckCircle2 className="size-3 text-brand" /> {b}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <CtaButton className="px-8 py-4 text-base">
              Criar Conta Gratuitamente <ArrowRight className="size-4" />
            </CtaButton>
            <div className="flex items-center justify-center gap-2 text-sm text-white/40 font-mono">
              <Lock className="size-3.5" /> Sem cartão · Setup em 2 min
            </div>
          </div>
        </div>

        <div className="relative mt-20 max-w-6xl mx-auto">
          <div
            className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full"
            aria-hidden
          />
          <div className="relative border border-white/10 bg-white/[0.02] p-2 rounded-2xl animate-drax-float shadow-[0_30px_120px_-20px_rgba(37,211,102,0.25)]">
            <img
              src={dashboardMockup}
              alt="Painel de controle da plataforma Drax com analytics de campanhas WhatsApp em tempo real"
              width={1600}
              height={1000}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const problems = [
  { icon: Ban, title: "Bloqueios Frequentes", desc: "Números banidos constantemente por falta de uma estrutura profissional de envios em massa." },
  { icon: PackageX, title: "Perda de Números", desc: "Investimento perdido toda vez que um chip cai em meio a uma campanha em andamento." },
  { icon: Shuffle, title: "Atendimento Comprometido", desc: "Disparos misturados ao número de suporte travam o relacionamento com seus clientes." },
  { icon: TrendingUp, title: "Falta de Escalabilidade", desc: "Plataformas que travam quando você mais precisa volume — exatamente nas campanhas grandes." },
  { icon: WifiOff, title: "Ferramentas Instáveis", desc: "Sistemas amadores que param no meio de campanhas críticas e sem suporte adequado." },
  { icon: AlertTriangle, title: "Baixa Taxa de Entrega", desc: "Mensagens que nunca chegam ou são marcadas como spam pelo destinatário." },
];

function Problems() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <SectionLabel>O Problema</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-balance">
            A instabilidade é o maior inimigo da sua operação.
          </h2>
          <p className="mt-4 text-white/50 text-lg text-pretty">
            Ferramentas amadoras colocam seu principal canal de comunicação em risco constante e
            sabotam o crescimento da sua empresa.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          {problems.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-8 bg-[#0a0a0a] hover:bg-[#0e0e0e] transition-colors"
            >
              <div className="size-10 rounded-lg bg-red-500/10 grid place-items-center mb-6">
                <Icon className="size-5 text-red-400" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const points = [
    "O número de atendimento principal nunca é impactado pelos disparos.",
    "Os envios ocorrem em uma estrutura totalmente independente.",
    "Redução drástica dos riscos operacionais do seu negócio.",
    "Escalabilidade real para campanhas de altíssimo volume.",
    "Ambiente preparado para operações profissionais 24/7.",
  ];
  return (
    <section id="solucao" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>A Solução Drax</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-balance">
              Estrutura de disparos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
                totalmente isolada
              </span>{" "}
              do seu WhatsApp receptivo.
            </h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              Na Drax, sua operação de disparos roda em um ambiente independente do número usado
              para atendimento. Risco operacional minimizado, performance maximizada.
            </p>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 size-5 rounded-full bg-brand/15 grid place-items-center">
                    <CheckCircle2 className="size-3.5 text-brand" />
                  </div>
                  <span className="text-white/80">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <CtaButton className="px-7 py-3.5">
                Criar Conta Grátis <ArrowRight className="size-4" />
              </CtaButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-brand/10 blur-[80px]" aria-hidden />
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 p-6 rounded-2xl border border-white/10 bg-[#0a0a0a]">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="size-5 text-brand" />
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                      Atendimento
                    </span>
                  </div>
                  <div className="text-2xl font-bold">Seu Número Principal</div>
                  <p className="text-sm text-white/50 mt-2">Intacto. Sem risco. 100% protegido.</p>
                </div>
                <div className="p-5 rounded-2xl border border-brand/30 bg-brand/5">
                  <Zap className="size-5 text-brand mb-3" />
                  <div className="text-sm font-bold">Estrutura de Envio</div>
                  <div className="text-xs text-white/50 mt-1">Isolada · Escalável</div>
                </div>
                <div className="p-5 rounded-2xl border border-brand/30 bg-brand/5">
                  <ShieldCheck className="size-5 text-brand mb-3" />
                  <div className="text-sm font-bold">Risco Operacional</div>
                  <div className="text-xs text-white/50 mt-1">Reduzido em até 85%</div>
                </div>
                <div className="col-span-2 p-5 rounded-2xl border border-white/10 bg-[#0a0a0a]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                      Throughput
                    </span>
                    <span className="text-brand font-mono text-xs">↑ 12k/min</span>
                  </div>
                  <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gradient-to-r from-brand-dark to-brand rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiComparison() {
  const oficial = [
    "Maior credibilidade institucional",
    "Conta verificada pela Meta",
    "Operação 100% empresarial",
    "Recursos oficiais nativos (botões, listas)",
  ];
  const alternativa = [
    "Implantação imediata, sem burocracia",
    "Flexibilidade operacional total",
    "Excelente custo-benefício",
    "Alta performance em volume",
  ];
  return (
    <section id="apis" className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>API Oficial vs Alternativa</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Escolha o motor ideal para o seu momento.
          </h2>
          <p className="mt-4 text-white/50 text-lg">
            Duas tecnologias robustas para diferentes estratégias. Você decide. Nós entregamos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          <div className="bg-[#0a0a0a] p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                Enterprise
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">API Oficial</h3>
            <p className="text-sm text-white/50 mb-8">WABA homologada pela Meta.</p>
            <ul className="space-y-3 mb-10">
              {oficial.map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="size-1.5 rounded-full bg-brand shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <a
              href={REGISTER_HREF}
              className="block w-full text-center py-3 rounded-xl border border-white/10 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Começar Gratuito
            </a>
          </div>

          <div className="bg-gradient-to-b from-brand/[0.08] to-[#0a0a0a] p-10 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand px-2.5 py-1 rounded bg-brand/10 border border-brand/20">
                Performance
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">API Alternativa</h3>
            <p className="text-sm text-white/50 mb-8">Para escala rápida com flexibilidade.</p>
            <ul className="space-y-3 mb-10">
              {alternativa.map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="size-1.5 rounded-full bg-brand shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <CtaButton className="w-full py-3 text-sm">Começar Gratuito</CtaButton>
          </div>
        </div>

        <div className="mt-10 text-center">
          <CtaButton className="px-8 py-4">
            Criar Conta Gratuitamente <ArrowRight className="size-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Sparkles, title: "Cadastro Gratuito", desc: "Sem mensalidade, sem cartão. Comece em 2 minutos." },
  { icon: Layers, title: "Plataforma Intuitiva", desc: "Interface pensada para times não-técnicos operarem." },
  { icon: Zap, title: "Disparos em Massa", desc: "Milhões de mensagens enviadas com estabilidade." },
  { icon: BarChart3, title: "Gestão Centralizada", desc: "Todos os números e campanhas em um único painel." },
  { icon: TrendingUp, title: "Alta Performance", desc: "Throughput elevado e filas otimizadas." },
  { icon: Rocket, title: "Escalabilidade", desc: "Cresça do primeiro envio ao milhão sem mudar de stack." },
  { icon: Headphones, title: "Suporte Especializado", desc: "Equipe técnica WhatsApp dedicada ao seu sucesso." },
  { icon: Gauge, title: "Relatórios Completos", desc: "Métricas em tempo real: entrega, leitura, resposta." },
  { icon: Plug, title: "Integração Simplificada", desc: "Webhooks, API REST e conectores prontos." },
];

function Benefits() {
  return (
    <section id="beneficios" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Benefícios</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Tudo que sua operação precisa, em um só lugar.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-7 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-brand/30 hover:from-brand/[0.05] transition-all"
            >
              <div className="size-11 rounded-xl bg-brand/10 grid place-items-center mb-5 group-hover:bg-brand/20 transition-colors">
                <Icon className="size-5 text-brand" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Warmer() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-[2rem] border border-brand/30 bg-gradient-to-br from-brand/[0.12] via-brand/[0.04] to-transparent p-10 md:p-14 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 size-80 bg-brand/20 blur-[100px] rounded-full"
            aria-hidden
          />
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <div className="bg-brand text-black font-black text-xs px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
              <Star className="size-3" /> 100% Gratuito
            </div>
          </div>

          <div className="relative max-w-2xl">
            <SectionLabel>Bônus Exclusivo</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-balance">
              Ganhe o Aquecedor de Números WhatsApp.
            </h2>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              Todos os clientes que realizarem compra de créditos recebem gratuitamente acesso ao
              sistema de aquecimento automatizado de números WhatsApp.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {[
                "Maior estabilidade operacional",
                "Melhor preparação dos números",
                "Processo 100% automatizado",
                "Sem nenhum custo adicional",
              ].map((i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle2 className="size-4 text-brand shrink-0" />
                  {i}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <CtaButton className="px-7 py-3.5">
                Garantir Meu Acesso Grátis <ArrowRight className="size-4" />
              </CtaButton>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <div className="flex -space-x-2">
                  <div className="size-7 rounded-full border-2 border-[#050505] bg-zinc-700" />
                  <div className="size-7 rounded-full border-2 border-[#050505] bg-zinc-600" />
                  <div className="size-7 rounded-full border-2 border-[#050505] bg-zinc-800" />
                </div>
                <span>+1.200 empresas aquecendo agora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="preco" className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionLabel>Transparência Total</SectionLabel>
        <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
          Comece Gratuitamente.
        </h2>
        <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto">
          Crie sua conta sem custo. Você paga apenas pelos envios realizados. Sem mensalidade. Sem
          fidelidade. Sem surpresas.
        </p>

        <div className="mt-12 p-10 md:p-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
          <p className="text-white/40 text-xs font-mono uppercase tracking-[0.25em] mb-4">
            A partir de
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark tracking-tight">
              R$ 0,30
            </span>
            <span className="text-2xl text-white/40 font-medium">/ envio</span>
          </div>
          <p className="mt-4 text-sm text-white/40">
            Pacotes maiores reduzem ainda mais o valor por envio.
          </p>
          <div className="mt-10">
            <CtaButton className="w-full sm:w-auto px-10 py-5 text-lg">
              Criar Conta Gratuitamente <ArrowRight className="size-5" />
            </CtaButton>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-brand" /> Sem mensalidade</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-brand" /> Sem fidelidade</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="size-3 text-brand" /> Sem cartão obrigatório</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const metrics = [
    { v: "+150M", l: "Mensagens entregues/mês" },
    { v: "98.7%", l: "Taxa média de entrega" },
    { v: "+1.200", l: "Empresas ativas" },
    { v: "24/7", l: "Operação contínua" },
  ];
  const testimonials = [
    {
      n: "Carlos M.",
      r: "Diretor de Marketing",
      c: "Migramos do concorrente e nunca mais tivemos número bloqueado em campanhas grandes. A estrutura isolada faz toda a diferença.",
    },
    {
      n: "Patrícia L.",
      r: "Gerente de E-commerce",
      c: "Disparamos 800 mil mensagens em uma Black Friday sem qualquer instabilidade. O suporte respondeu em minutos quando precisei.",
    },
    {
      n: "Rafael S.",
      r: "CEO de Agência",
      c: "Pago apenas pelo que uso. Para uma agência atendendo múltiplos clientes, esse modelo é imbatível.",
    },
  ];
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Prova Social</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Empresas que escalam pela Drax.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-12">
          {metrics.map((m) => (
            <div key={m.l} className="bg-[#0a0a0a] p-8 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-brand tracking-tight">
                {m.v}
              </div>
              <div className="text-xs text-white/50 mt-2 uppercase tracking-wider font-mono">
                {m.l}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.n}
              className="p-7 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed text-sm">"{t.c}"</p>
              <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-3">
                <div className="size-9 rounded-full bg-gradient-to-br from-brand/30 to-brand-dark/30 grid place-items-center">
                  <Users className="size-4 text-brand" />
                </div>
                <div>
                  <div className="text-sm font-bold">{t.n}</div>
                  <div className="text-xs text-white/40">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
          {["LOGO 1", "LOGO 2", "LOGO 3", "LOGO 4", "LOGO 5", "LOGO 6"].map((l) => (
            <span
              key={l}
              className="text-sm font-mono tracking-widest text-white/40 uppercase"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors overflow-hidden"
              open={idx === 0}
            >
              <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white pr-4">{f.q}</h3>
                <Plus className="size-5 text-brand shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="cadastro" className="py-32 border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand/10 blur-[140px] rounded-full animate-drax-glow pointer-events-none"
        aria-hidden
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <SectionLabel>Última chamada</SectionLabel>
        <h2 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-balance">
          Comece Hoje Mesmo.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
          Crie sua conta gratuitamente e tenha acesso à estrutura profissional de disparos WhatsApp
          que sua empresa merece.
        </p>
        <div className="mt-10">
          <CtaButton className="px-12 py-5 text-lg">
            Criar Conta Gratuitamente <ArrowRight className="size-5" />
          </CtaButton>
        </div>
        <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-white/30">
          Setup em menos de 2 minutos · Sem cartão de crédito
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 max-w-sm">
            <Logo />
            <p className="mt-5 text-sm text-white/40 leading-relaxed">
              Infraestrutura premium para disparos de WhatsApp em larga escala com segurança,
              estabilidade e o melhor custo-benefício do mercado.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
              Plataforma
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#solucao" className="hover:text-brand transition-colors">Solução</a></li>
              <li><a href="#apis" className="hover:text-brand transition-colors">API Oficial</a></li>
              <li><a href="#apis" className="hover:text-brand transition-colors">API Alternativa</a></li>
              <li><a href="#preco" className="hover:text-brand transition-colors">Preço</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
              Institucional
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Contato</a></li>
              <li><a href="#faq" className="hover:text-brand transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Drax Tecnologia. Todos os direitos reservados.
          </p>
          <div className="flex gap-3 text-white/40">
            {["IG", "YT", "LI", "X"].map((s) => (
              <a
                key={s}
                href="#"
                className="size-8 rounded-full border border-white/10 grid place-items-center text-[10px] font-bold hover:border-brand hover:text-brand transition-colors"
                aria-label={s}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
