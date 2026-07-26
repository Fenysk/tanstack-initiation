import { notFound } from "@tanstack/react-router";
import type {
	SaveTodoContent,
	Todo,
	TodoId,
	TodoList,
	UpdateTodo,
} from "@/domain/todo/types";

const todos: Todo[] = [];

const findActiveTodo = (todoId: TodoId): Todo => {
	const todo = todos.find((todo) => todo.id === todoId && !todo.deletedAt);
	if (!todo) throw notFound();
	return todo;
};

export const fetchAllTodos = async (): Promise<TodoList> => ({
	todos: todos.filter((todo) => !todo.deletedAt),
});

export const fetchOneTodo = async (todoId: TodoId): Promise<Todo> =>
	findActiveTodo(todoId);

export const saveOneTodo = async (content: SaveTodoContent): Promise<Todo> => {
	const newTodo: Todo = {
		id: crypto.randomUUID(),
		content,
		completed: false,
		createdAt: new Date(),
		deletedAt: null,
	};
	todos.push(newTodo);
	return newTodo;
};

export const updateOneTodo = async ({
	id,
	content,
}: UpdateTodo): Promise<Todo> => {
	const todo = findActiveTodo(id);
	todo.content = content;
	return todo;
};

export const deleteOneTodo = async (id: TodoId): Promise<Todo> => {
	const todo = findActiveTodo(id);
	todo.deletedAt = new Date();
	return todo;
};
