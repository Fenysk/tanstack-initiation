import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/domain/todo/types";
import { showSaveErrorToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { todosQueryOptions } from "@/queries/todo.queries";
import { deleteTodoFn, updateTodoFn } from "@/server/todo/todo.functions";

type TodoCardProps = {
	todo: Todo;
};

const TodoCard = ({ todo }: TodoCardProps) => {
	const [content, setContent] = useState(todo.content);
	const queryClient = useQueryClient();
	const updateTodo = useServerFn(updateTodoFn);
	const deleteTodo = useServerFn(deleteTodoFn);

	useEffect(() => {
		setContent(todo.content);
	}, [todo.content]);

	const invalidateList = () =>
		queryClient.invalidateQueries({
			queryKey: todosQueryOptions().queryKey,
		});

	const toggleMutation = useMutation({
		mutationFn: (completed: boolean) =>
			updateTodo({ data: { id: todo.id, completed } }),
		onSuccess: () => invalidateList(),
		onError: showSaveErrorToast,
	});

	const updateContentMutation = useMutation({
		mutationFn: (nextContent: string) =>
			updateTodo({ data: { id: todo.id, content: nextContent } }),
		onSuccess: () => invalidateList(),
		onError: () => {
			setContent(todo.content);
			showSaveErrorToast();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => deleteTodo({ data: todo.id }),
		onSuccess: () => invalidateList(),
		onError: showSaveErrorToast,
	});

	const isBusy =
		toggleMutation.isPending ||
		updateContentMutation.isPending ||
		deleteMutation.isPending;

	const commitEdit = () => {
		if (updateContentMutation.isPending) return;
		const trimmed = content.trim();
		if (!trimmed || trimmed === todo.content) {
			setContent(todo.content);
			return;
		}
		updateContentMutation.mutate(trimmed);
	};

	return (
		<Card size="sm">
			<CardHeader className="items-center">
				<div className="z-10 relative flex flex-1 items-center gap-3 min-w-0">
					<Checkbox
						className="dark:bg-transparent"
						checked={todo.completed}
						disabled={isBusy}
						onCheckedChange={(checked) => {
							if (checked === "indeterminate") return;
							toggleMutation.mutate(checked);
						}}
						aria-label={
							todo.completed
								? `Marquer « ${todo.content} » comme à faire`
								: `Marquer « ${todo.content} » comme terminée`
						}
					/>
					<Input
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						onBlur={commitEdit}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								e.currentTarget.blur();
							}
							if (e.key === "Escape") {
								e.preventDefault();
								setContent(todo.content);
								e.currentTarget.blur();
							}
						}}
						disabled={isBusy}
						aria-label={`Contenu de « ${todo.content} »`}
						className={cn(
							"bg-transparent dark:bg-transparent shadow-none p-0 border-0 rounded-none focus-visible:ring-0 h-auto font-heading font-medium text-base md:text-base",
							todo.completed && "text-muted-foreground line-through",
						)}
					/>
				</div>
				<CardAction className="z-10 relative flex gap-1">
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						disabled={isBusy}
						onMouseDown={(e) => e.preventDefault()}
						onClick={() => deleteMutation.mutate()}
						aria-label={`Supprimer « ${todo.content} »`}
					>
						<Trash2 />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-xs">
					{new Date(todo.createdAt).toLocaleString("fr-FR")}
				</p>
			</CardContent>
		</Card>
	);
};

export default TodoCard;
