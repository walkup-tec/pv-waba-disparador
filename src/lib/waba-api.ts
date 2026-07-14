const DEFAULT_WABA_API_URL = "https://waba.draxsistemas.com.br";
const DEFAULT_WABA_APP_LOGIN_URL = "https://waba.draxsistemas.com.br/";

/** URL do painel WABA (login do assinante) — exposta ao browser via VITE_. */
export function resolveWabaAppLoginUrl(): string {
  const fromEnv = String(import.meta.env.VITE_WABA_APP_LOGIN_URL ?? "").trim();
  const base = (fromEnv || DEFAULT_WABA_APP_LOGIN_URL).replace(/\/$/, "");
  return `${base}/`;
}

/** Base da API WABA — uso server-side (proxy de cadastro). */
export function resolveWabaApiBaseUrl(): string {
  const fromEnv = String(process.env.WABA_API_URL ?? import.meta.env.VITE_WABA_API_URL ?? "").trim();
  return (fromEnv || DEFAULT_WABA_API_URL).replace(/\/$/, "");
}

/** Base da API WABA — uso no browser (fallback se o proxy same-origin falhar). */
export function resolveWabaApiBaseUrlClient(): string {
  const fromEnv = String(import.meta.env.VITE_WABA_API_URL ?? "").trim();
  return (fromEnv || DEFAULT_WABA_API_URL).replace(/\/$/, "");
}
