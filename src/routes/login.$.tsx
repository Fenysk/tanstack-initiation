import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { redirectIfAuthenticatedFn } from "@/server/auth/auth.functions";

export const Route = createFileRoute("/login/$")({
	beforeLoad: async () => await redirectIfAuthenticatedFn(),
	component: LoginPage,
});

function LoginPage() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<SignIn
				path="/login"
				withSignUp
				signUpUrl="/login/sign-up"
				fallbackRedirectUrl="/dashboard"
				signUpFallbackRedirectUrl="/dashboard"
			/>
		</div>
	);
}
