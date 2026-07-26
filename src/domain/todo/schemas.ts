import { z } from "zod";

export const TodoSchema = z.object({
	id: z.uuid(),
	content: z.string().min(1),
	completed: z.boolean().default(false),
	createdAt: z.date().default(() => new Date()),
	deletedAt: z.date().nullable(),
});

export const TodoListSchema = z.object({
	todos: z.array(TodoSchema),
});

export const TodoIdSchema = z.uuid();

export const SaveTodoContentSchema = z.string().trim().min(1);

export const UpdateTodoSchema = z.object({
	id: TodoIdSchema,
	content: SaveTodoContentSchema,
});

export type Todo = z.infer<typeof TodoSchema>;
export type TodoList = z.infer<typeof TodoListSchema>;
export type TodoId = z.infer<typeof TodoIdSchema>;
export type SaveTodoContent = z.infer<typeof SaveTodoContentSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;
