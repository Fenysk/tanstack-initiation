import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/hello")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				// CRITICAL: Always await request.json()
				const body = await request.json();
				return Response.json({ message: `Hello ${body.pseudo} !` });
			},
		},
	},
	component: HelloComponent,
});

function HelloComponent() {
	const [reply, setReply] = useState<string>("");

	return (
		<main>
			<button
				className="cursor-pointer bg-black text-white px-4 py-2 rounded-md"
				type="button"
				onClick={() => {
					fetch("/hello", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ pseudo: "Fenysk" }),
					})
						.then((response) => response.json())
						.then((data) => setReply(data.message));
				}}
			>
				Say Hello {reply && `- ${reply}`}
			</button>
		</main>
	);
}
