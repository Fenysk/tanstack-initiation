import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { savePokemonFn } from "@/server/pokemon/pokemon.functions";

export const Route = createFileRoute("/favorite")({
	component: FavoritePage,
});

const FormStatus = {
	idle: "idle",
	saving: "saving",
	success: "success",
	error: "error",
} as const;

type FormStatus = (typeof FormStatus)[keyof typeof FormStatus];

type StatusAlert = {
	title: string;
	description?: string;
	variant?: "destructive";
};

function FavoritePage() {
	const [name, setName] = useState<string>("");
	const [status, setStatus] = useState<FormStatus>(FormStatus.idle);
	const [savedName, setSavedName] = useState<string>("");

	const savePokemon = useServerFn(savePokemonFn);

	const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!name.trim()) return;

		const nextName = name.trim();
		setStatus(FormStatus.saving);
		try {
			await savePokemon({ data: nextName });
			setSavedName(nextName);
			setStatus(FormStatus.success);
			setName("");
		} catch {
			setStatus(FormStatus.error);
		}
	};

	const getStatusAlert = (): StatusAlert | null => {
		switch (status) {
			case FormStatus.saving:
				return { title: "Saving..." };
			case FormStatus.success:
				return {
					title: "Success",
					description: `Successfully saved ${savedName}`,
				};
			case FormStatus.error:
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
							disabled={status === FormStatus.saving}
							aria-label="Pokemon name"
						/>
						<Button
							type="submit"
							disabled={status === FormStatus.saving || !name.trim()}
						>
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
