import { createServerFn } from "@tanstack/react-start";
import {
	SaveTodoContentSchema,
	TodoIdSchema,
	UpdateTodoSchema,
} from "@/domain/todo/schemas";
import {
	deleteOneTodo,
	fetchAllTodos,
	saveOneTodo,
	updateOneTodo,
} from "./todo.server";

export const getTodosFn = createServerFn({ method: "GET" }).handler(() =>
	fetchAllTodos(),
);

export const saveTodoFn = createServerFn({ method: "POST" })
	.validator(SaveTodoContentSchema)
	.handler(({ data }) => saveOneTodo(data));

export const updateTodoFn = createServerFn({ method: "POST" })
	.validator(UpdateTodoSchema)
	.handler(({ data }) => updateOneTodo(data));

export const deleteTodoFn = createServerFn({ method: "POST" })
	.validator(TodoIdSchema)
	.handler(({ data }) => deleteOneTodo(data));
