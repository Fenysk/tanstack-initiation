import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSaveErrorToast, showSuccessToast } from "@/lib/toast";
import { pokemonsQueryOptions } from "@/queries/pokemon.queries";
import { savePokemonFn } from "@/server/pokemon/pokemon.functions";

export const Route = createFileRoute("/favorite")({
	component: FavoritePage,
});

function FavoritePage() {
	const [name, setName] = useState<string>("");
	const queryClient = useQueryClient();
	const savePokemon = useServerFn(savePokemonFn);

	const savePokemonMutation = useMutation({
		mutationFn: (nextName: string) => savePokemon({ data: nextName }),
		onSuccess: (data) => {
			setName("");
			showSuccessToast("Succès", `Pokémon ${data.savedName} enregistré.`);
			return queryClient.invalidateQueries({
				queryKey: pokemonsQueryOptions().queryKey,
			});
		},
		onError: showSaveErrorToast,
	});

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName) return;
		savePokemonMutation.mutate(trimmedName);
	};

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
		</main>
	);
}
