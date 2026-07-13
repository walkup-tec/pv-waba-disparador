import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { maskCpfCnpj, maskPhone, stripCountryCode, validCpfCnpj } from "@/lib/masks";
import { submitSignup } from "@/lib/signup";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe o nome (mínimo 2 caracteres)")
    .max(120, "Máximo 120 caracteres"),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido")
    .max(255, "Máximo 255 caracteres"),
  whatsapp: z.string().refine(
    (v) => {
      const digits = stripCountryCode(v);
      return digits.length >= 10 && digits.length <= 11;
    },
    { message: "WhatsApp inválido (DDD + número)" },
  ),
  phone: z.string().refine(
    (v) => {
      const digits = stripCountryCode(v);
      return digits.length >= 10 && digits.length <= 11;
    },
    { message: "Telefone inválido" },
  ),
  document: z.string().refine(validCpfCnpj, { message: "CPF ou CNPJ inválido" }),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(72, "Máximo 72 caracteres"),
});

type FormData = z.infer<typeof schema>;

const fieldClass =
  "h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-brand";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", whatsapp: "", phone: "", document: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setFormError(null);
    setFormSuccess(null);
    try {
      const result = await submitSignup(data);
      setRedirecting(true);
      setFormSuccess(result.message || "Cadastro realizado. Redirecionando ao painel…");
      window.setTimeout(() => {
        window.location.href = result.loginUrl;
      }, 1200);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível concluir o cadastro.");
    }
  };

  if (redirecting) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/10 p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/20 text-brand">
          <Check className="size-7" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-white">Conta criada</h3>
        <p className="mt-2 text-sm text-white/60">
          {formSuccess || "Redirecionando para o painel WABA…"}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 text-left"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Como quer ser chamado" error={errors.name?.message} className="sm:col-span-2">
          <Input
            {...register("name")}
            autoComplete="name"
            placeholder="Seu nome ou empresa"
            className={fieldClass}
          />
        </Field>

        <Field label="E-mail" error={errors.email?.message} className="sm:col-span-2">
          <Input
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="voce@empresa.com"
            className={fieldClass}
          />
        </Field>

        <Field label="WhatsApp" error={errors.whatsapp?.message}>
          <Input
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            {...register("whatsapp", {
              onChange: (e) =>
                setValue("whatsapp", maskPhone(e.target.value), { shouldValidate: true }),
            })}
            className={fieldClass}
          />
        </Field>

        <Field label="Telefone" error={errors.phone?.message}>
          <Input
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 3333-4444"
            {...register("phone", {
              onChange: (e) =>
                setValue("phone", maskPhone(e.target.value), { shouldValidate: true }),
            })}
            className={fieldClass}
          />
        </Field>

        <Field label="CPF ou CNPJ" error={errors.document?.message}>
          <Input
            inputMode="numeric"
            placeholder="000.000.000-00"
            {...register("document", {
              onChange: (e) =>
                setValue("document", maskCpfCnpj(e.target.value), { shouldValidate: true }),
            })}
            className={fieldClass}
          />
        </Field>

        <Field label="Senha de acesso" error={errors.password?.message}>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              {...register("password")}
              className={`${fieldClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </Field>
      </div>

      {formError ? (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_var(--color-brand-glow)] active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Criando conta…
          </>
        ) : (
          <>
            Criar conta gratuitamente <ArrowRight className="size-5" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-white/40">
        Sem cartão · Após o cadastro você será direcionado ao painel WABA
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs font-medium uppercase tracking-wide text-white/50">{label}</Label>
      {children}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
