import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const redirectIfAuthenticatedFn = createServerFn({
	method: "GET",
}).handler(async () => {
	const { isAuthenticated } = await auth();

	if (isAuthenticated) {
		throw redirect({ to: "/dashboard" });
	}
});

export const requireAuthFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const { isAuthenticated, userId } = await auth();

		if (!isAuthenticated || !userId) {
			throw redirect({ to: "/login/$" });
		}

		const user = await clerkClient().users.getUser(userId);
		const username =
			user.username ??
			user.firstName ??
			user.emailAddresses[0]?.emailAddress ??
			"Utilisateur";

		return { userId, username };
	},
);
