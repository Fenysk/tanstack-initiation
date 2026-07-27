import {
	useQueryErrorResetBoundary,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import NewTodoCard from "@/components/NewTodoCard";
import RetryPanel from "@/components/RetryPanel";
import TodoCard from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { todosQueryOptions } from "@/queries/todo.queries";

const TODO_LIST = "mt-6 flex flex-col gap-2";

const SKELETON_KEYS = Array.from({ length: 4 }, (_, i) => `skeleton-${i}`);

export const Route = createFileRoute("/dashboard/todos")({
	component: TodosPage,
	pendingComponent: () => (
		<div className="flex flex-col gap-4">
			<Skeleton className="w-32 h-8" />
			<div className={TODO_LIST}>
				{SKELETON_KEYS.map((key) => (
					<Skeleton key={key} className="rounded-xl w-full h-28" />
				))}
			</div>
		</div>
	),
	pendingMs: 300,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(todosQueryOptions()),
	errorComponent: ({ error }) => {
		const router = useRouter();
		const queryErrorResetBoundary = useQueryErrorResetBoundary();

		useEffect(() => {
			queryErrorResetBoundary.reset();
		}, [queryErrorResetBoundary]);

		return (
			<RetryPanel
				message="Oups, une erreur est survenue lors du chargement des todos :"
				errorMessage={error.message}
				onRetry={() => router.invalidate()}
			/>
		);
	},
});

function TodosPage() {
	const { data } = useSuspenseQuery(todosQueryOptions());
	const [isDraftOpen, setIsDraftOpen] = useState(false);

	const showEmpty = data.todos.length === 0 && !isDraftOpen;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<h1 className="font-semibold text-2xl">Todos</h1>
				<Button
					type="button"
					disabled={isDraftOpen}
					onClick={() => setIsDraftOpen(true)}
				>
					<Plus data-icon="inline-start" />
					Nouvelle tâche
				</Button>
			</div>

			{showEmpty ? (
				<p className="text-muted-foreground">Aucune tâche pour le moment.</p>
			) : (
				<ul className={TODO_LIST}>
					{isDraftOpen && (
						<li>
							<NewTodoCard onDismiss={() => setIsDraftOpen(false)} />
						</li>
					)}
					{[...data.todos]
						.sort((a, b) => Number(a.completed) - Number(b.completed))
						.map((todo) => (
							<li key={todo.id}>
								<TodoCard todo={todo} />
							</li>
						))}
				</ul>
			)}
		</div>
	);
}
