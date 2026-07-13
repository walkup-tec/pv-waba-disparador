import { onlyDigits, stripCountryCode } from "@/lib/masks";
import { resolveWabaAppLoginUrl } from "@/lib/waba-api";

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

export async function submitSignup(data: SignupPayload): Promise<SignupResult> {
  const res = await fetch("/api/subscribers/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: data.name.trim(),
      email: data.email.trim(),
      whatsapp: stripCountryCode(data.whatsapp),
      phone: stripCountryCode(data.phone),
      cpfCnpj: onlyDigits(data.document),
      password: data.password,
      segment: "outros",
      signupOrigin: "wabadisparos",
    }),
  });

  const payload = (await res.json().catch(() => ({}))) as {
    error?: string;
    loginUrl?: string;
    message?: string;
  };

  if (!res.ok) {
    throw new Error(payload.error || "Não foi possível concluir o cadastro.");
  }

  return {
    ok: true,
    loginUrl: String(payload.loginUrl || resolveWabaAppLoginUrl()).trim() || resolveWabaAppLoginUrl(),
    message: payload.message,
  };
}
