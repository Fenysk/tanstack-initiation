import { notFound } from "@tanstack/react-router";
import type {
	SaveTodoContent,
	Todo,
	TodoId,
	TodoList,
	UpdateTodo,
} from "@/domain/todo/types";

const todos: Todo[] = [
	{
		id: crypto.randomUUID(),
		content: "Learn TypeScript",
		completed: false,
		createdAt: new Date(Date.now() - 86400000).toISOString(),
		deletedAt: null,
	},
	{
		id: crypto.randomUUID(),
		content: "Build a Todo App",
		completed: false,
		createdAt: new Date(Date.now() - 43200000).toISOString(),
		deletedAt: null,
	},
	{
		id: crypto.randomUUID(),
		content: "Review pull requests",
		completed: true,
		createdAt: new Date(Date.now() - 21600000).toISOString(),
		deletedAt: null,
	},
];

const findActiveTodo = (todoId: TodoId): Todo => {
	const todo = todos.find((todo) => todo.id === todoId && !todo.deletedAt);
	if (!todo) throw notFound();
	return todo;
};

export const fetchAllTodos = async (): Promise<TodoList> => ({
	todos: todos.filter((todo) => !todo.deletedAt),
});

export const saveOneTodo = async (content: SaveTodoContent): Promise<Todo> => {
	const newTodo: Todo = {
		id: crypto.randomUUID(),
		content,
		completed: false,
		createdAt: new Date().toISOString(),
		deletedAt: null,
	};
	todos.unshift(newTodo);
	return newTodo;
};

export const updateOneTodo = async ({
	id,
	content,
	completed,
}: UpdateTodo): Promise<Todo> => {
	const todo = findActiveTodo(id);
	if (content !== undefined) todo.content = content;
	if (completed !== undefined) todo.completed = completed;
	return todo;
};

export const deleteOneTodo = async (id: TodoId): Promise<Todo> => {
	const todo = findActiveTodo(id);
	todo.deletedAt = new Date().toISOString();
	return todo;
};
