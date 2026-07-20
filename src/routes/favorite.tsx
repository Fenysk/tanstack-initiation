import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { savePokemonFn } from "@/server/pokemon";

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

function FavoritePage() {
	const [name, setName] = useState<string>("");
	const [status, setStatus] = useState<FormStatus>(FormStatus.idle);

	const savePokemon = useServerFn(savePokemonFn);

	const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!name.trim()) return;

		setStatus(FormStatus.saving);
		try {
			await savePokemon({ data: name });
			setStatus(FormStatus.success);
			setName("");
		} catch {
			setStatus(FormStatus.error);
		}
	};

	const getStatusMessage = () => {
		switch (status) {
			case FormStatus.saving:
				return "Saving...";
			case FormStatus.success:
				return `Successfully saved ${name}`;
			case FormStatus.error:
				return "Failed to save. Try again.";
			default:
				return "";
		}
	};

	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<h1>Save a Pokemon</h1>
			<form className="flex gap-1" onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border p-2 rounded"
					placeholder="Pikachu"
					disabled={status === FormStatus.saving}
					aria-label="Pokemon name"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
					disabled={status === FormStatus.saving || !name.trim()}
				>
					Save
				</button>
			</form>
			{status !== FormStatus.idle && <p className="mt-4">{getStatusMessage()}</p>}
		</main>
	);
}
