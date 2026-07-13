import { createFileRoute } from "@tanstack/react-router";
import { resolveWabaApiBaseUrl } from "@/lib/waba-api";

export const Route = createFileRoute("/api/subscribers/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const apiBase = resolveWabaApiBaseUrl();
          const upstream = await fetch(`${apiBase}/subscribers/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://wabadisparos.com.br",
              Referer: "https://wabadisparos.com.br/#cadastro",
            },
            body: JSON.stringify(body),
          });

          const data = await upstream.json().catch(() => ({}));
          return Response.json(data, { status: upstream.status });
        } catch (error) {
          console.error("[wabadisparos] proxy cadastro WABA:", error);
          return Response.json(
            { error: "Falha ao conectar com o servidor WABA. Tente novamente em instantes." },
            { status: 502 },
          );
        }
      },
    },
  },
});
