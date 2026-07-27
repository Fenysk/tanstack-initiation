import { queryOptions } from "@tanstack/react-query";
import { getTodosFn } from "@/server/todo/todo.functions";

export const todosQueryOptions = () =>
	queryOptions({
		queryKey: ["todos", "list"] as const,
		queryFn: () => getTodosFn(),
	});
