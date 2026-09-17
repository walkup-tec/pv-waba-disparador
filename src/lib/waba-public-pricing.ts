import { resolveWabaApiBaseUrl } from "./waba-api";

/** Fallback SEO / first paint. `npm run sync:pricing` no WABA atualiza este valor. */
export const SALE_PRICING_FALLBACK_FROM = "R$ 0,29";

type PublicPricingLane = {
  fromLabel?: string;
};

type PublicPricingCatalog = {
  outros?: { oficial?: PublicPricingLane };
  bets?: { oficial?: PublicPricingLane };
};

const isFromLabel = (value: unknown): value is string =>
  typeof value === "string" && /^R\$ \d{1,3}(?:\.\d{3})*,\d{2}$/.test(value);

export async function fetchOfficialFromPrice(segment: "outros" | "bets"): Promise<string> {
  const fallback = SALE_PRICING_FALLBACK_FROM;
  try {
    const base = resolveWabaApiBaseUrl();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(`${base}/public/pricing`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!response.ok) return fallback;
    const catalog = (await response.json()) as PublicPricingCatalog;
    const label =
      segment === "bets" ? catalog?.bets?.oficial?.fromLabel : catalog?.outros?.oficial?.fromLabel;
    return isFromLabel(label) ? label : fallback;
  } catch {
    return fallback;
  }
}
