import { onlyDigits, stripCountryCode } from "@/lib/masks";
import {
  resolveWabaApiBaseUrlClient,
  resolveWabaAppLoginUrl,
} from "@/lib/waba-api";

export interface SignupPayload {
  name: string;
  email: string;
  whatsapp: string;
  phone: string;
  document: string;
  password: string;
}

export interface SignupResult {
  ok: true;
  loginUrl: string;
  message?: string;
}

type RegisterResponse = {
  error?: string;
  loginUrl?: string;
  message?: string;
};

const buildBody = (data: SignupPayload) =>
  JSON.stringify({
    fullName: data.name.trim(),
    email: data.email.trim(),
    whatsapp: stripCountryCode(data.whatsapp),
    phone: stripCountryCode(data.phone),
    cpfCnpj: onlyDigits(data.document),
    password: data.password,
    segment: "outros",
    signupOrigin: "wabadisparos",
  });

async function postRegister(url: string, body: string): Promise<{ res: Response; payload: RegisterResponse }> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal,
    });
    const payload = (await res.json().catch(() => ({}))) as RegisterResponse;
    return { res, payload };
  } finally {
    window.clearTimeout(timer);
  }
}

export async function submitSignup(data: SignupPayload): Promise<SignupResult> {
  const body = buildBody(data);
  const endpoints = ["/api/subscribers/register", `${resolveWabaApiBaseUrlClient()}/subscribers/register`];

  let lastError: Error | null = null;

  for (const url of endpoints) {
    try {
      const { res, payload } = await postRegister(url, body);
      if (!res.ok) {
        throw new Error(payload.error || "Não foi possível concluir o cadastro.");
      }
      return {
        ok: true,
        loginUrl:
          String(payload.loginUrl || resolveWabaAppLoginUrl()).trim() || resolveWabaAppLoginUrl(),
        message: payload.message,
      };
    } catch (error) {
      const isNetwork =
        error instanceof TypeError ||
        (error instanceof DOMException && error.name === "AbortError") ||
        (error instanceof Error && /failed to fetch|networkerror|abort/i.test(error.message));

      if (error instanceof Error && !isNetwork) {
        throw error;
      }

      lastError =
        error instanceof Error
          ? error
          : new Error("Falha de rede ao criar a conta.");
      // tenta próximo endpoint (proxy → API WABA direta)
      continue;
    }
  }

  throw new Error(
    lastError?.name === "AbortError"
      ? "O servidor demorou demais para responder. Tente novamente em instantes."
      : "Falha de rede ao criar a conta (Failed to fetch). Atualize a página (Ctrl+F5) e tente de novo. Se o e-mail já existir, use Esqueci a senha no painel.",
  );
}
