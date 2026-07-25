import { QueryClient } from "@tanstack/react-query";
import {
	createRouter as createTanStackRouter,
	isNotFound,
	isRedirect,
} from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60_000,
				retry: (failureCount, error) =>
					!isNotFound(error) && !isRedirect(error) && failureCount < 2,
			},
		},
	});

	const router = createTanStackRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		/**
		 * false : pas de préchargement des données
		 * intent : précharge les données au chargement de la page
		 * viewport : précharge les données au scroll de la page
		 * render : précharge les données au rendu de la page
		 */
		defaultPreloadStaleTime: 0,
	});

	setupRouterSsrQueryIntegration({ router, queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
