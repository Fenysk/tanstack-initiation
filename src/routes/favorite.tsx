import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pokemonsQueryOptions } from "@/queries/pokemon.queries";
import { savePokemonFn } from "@/server/pokemon/pokemon.functions";

export const Route = createFileRoute("/favorite")({
	component: FavoritePage,
});

type StatusAlert = {
	title: string;
	description?: string;
	variant?: "destructive";
};

function FavoritePage() {
	const [name, setName] = useState<string>("");
	const queryClient = useQueryClient();
	const savePokemon = useServerFn(savePokemonFn);

	const savePokemonMutation = useMutation({
		mutationFn: (nextName: string) => savePokemon({ data: nextName }),
		onSuccess: () => {
			setName("");
			return queryClient.invalidateQueries({
				queryKey: pokemonsQueryOptions().queryKey,
			});
		},
	});

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName) return;
		savePokemonMutation.mutate(trimmedName);
	};

	const getStatusAlert = (): StatusAlert | null => {
		switch (savePokemonMutation.status) {
			case "pending":
				return { title: "Saving..." };
			case "success":
				return {
					title: "Success",
					description: `Successfully saved ${savePokemonMutation.data.savedName}`,
				};
			case "error":
				return {
					title: "Error",
					description: "Failed to save. Try again.",
					variant: "destructive",
				};
			default:
				return null;
		}
	};

	const statusAlert = getStatusAlert();

	return (
		<main className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-8 pt-14">
			<h1 className="text-2xl font-semibold">Save a Pokemon</h1>
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<Label htmlFor="pokemon-name">Pokemon name</Label>
					<div className="flex gap-2">
						<Input
							id="pokemon-name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Pikachu"
							disabled={savePokemonMutation.isPending}
							aria-label="Pokemon name"
						/>
						<Button type="submit" disabled={savePokemonMutation.isPending || !name.trim()}>
							Save
						</Button>
					</div>
				</div>
			</form>
			{statusAlert && (
				<Alert variant={statusAlert.variant}>
					<AlertTitle>{statusAlert.title}</AlertTitle>
					{statusAlert.description && (
						<AlertDescription>{statusAlert.description}</AlertDescription>
					)}
				</Alert>
			)}
		</main>
	);
}
