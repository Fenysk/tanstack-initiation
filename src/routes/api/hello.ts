import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/hello")({
	server: {
		handlers: {
			GET: async () => {
				console.log("Someone hit our public API endpoint !");

				return Response.json(
					{ message: "Hello World !" },
					{
						headers: {
							"Cache-Control": "max-age=60, public",
							"Access-Control-Allow-Origin": "*",
						},
					},
				);
			},
		},
	},
});
