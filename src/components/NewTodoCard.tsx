import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { showSaveErrorToast } from "@/lib/toast";
import { todosQueryOptions } from "@/queries/todo.queries";
import { saveTodoFn } from "@/server/todo/todo.functions";

type NewTodoCardProps = {
	onDismiss: () => void;
};

const NewTodoCard = ({ onDismiss }: NewTodoCardProps) => {
	const [content, setContent] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const skipCommitRef = useRef(false);
	const queryClient = useQueryClient();
	const saveTodo = useServerFn(saveTodoFn);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const saveMutation = useMutation({
		mutationFn: (nextContent: string) => saveTodo({ data: nextContent }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: todosQueryOptions().queryKey,
			});
			onDismiss();
		},
		onError: showSaveErrorToast,
	});

	const commitOrDismiss = () => {
		if (skipCommitRef.current || saveMutation.isPending) return;
		const trimmed = content.trim();
		if (!trimmed) {
			onDismiss();
			return;
		}
		saveMutation.mutate(trimmed);
	};

	return (
		<Card size="sm">
			<CardHeader className="items-center">
				<div className="z-10 relative flex flex-1 items-center gap-3 min-w-0">
					<Checkbox
						className="dark:bg-transparent"
						disabled
						checked={false}
						aria-hidden
						tabIndex={-1}
					/>
					<Input
						ref={inputRef}
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						onBlur={commitOrDismiss}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								e.currentTarget.blur();
							}
							if (e.key === "Escape") {
								e.preventDefault();
								skipCommitRef.current = true;
								onDismiss();
							}
						}}
						placeholder="Nouvelle tâche"
						disabled={saveMutation.isPending}
						aria-label="Contenu de la nouvelle tâche"
						className="bg-transparent dark:bg-transparent shadow-none p-0 border-0 focus-visible:ring-0 h-auto font-heading font-medium text-base md:text-base"
					/>
				</div>
				<CardAction className="z-10 relative flex gap-1" aria-hidden>
					<span className="size-7" />
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-xs">Brouillon</p>
			</CardContent>
		</Card>
	);
};

export default NewTodoCard;
