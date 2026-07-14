import { createFileRoute } from "@tanstack/react-router";
import { PAGINADEVENDAS_DEPLOY_MARKER } from "@/lib/deploy-marker";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          ok: true,
          service: "waba_paginadevendas",
          deployMarker: PAGINADEVENDAS_DEPLOY_MARKER,
          features: {
            cadastroForm: true,
            registerProxy: "/api/subscribers/register",
          },
        });
      },
    },
  },
});
