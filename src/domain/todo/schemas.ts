import { z } from "zod";

export const TodoSchema = z.object({
	id: z.uuid(),
	content: z.string().min(1),
	completed: z.boolean().default(false),
	createdAt: z.string().default(() => new Date().toISOString()),
	deletedAt: z.string().nullable(),
});

export const TodoListSchema = z.object({
	todos: z.array(TodoSchema),
});

export const TodoIdSchema = z.uuid();

export const SaveTodoContentSchema = z.string().trim().min(1);

export const UpdateTodoSchema = z
	.object({
		id: TodoIdSchema,
		content: SaveTodoContentSchema.optional(),
		completed: z.boolean().optional(),
	})
	.refine(
		(data) => data.content !== undefined || data.completed !== undefined,
		{ message: "At least content or completed is required" },
	);

export type Todo = z.infer<typeof TodoSchema>;
export type TodoList = z.infer<typeof TodoListSchema>;
export type TodoId = z.infer<typeof TodoIdSchema>;
export type SaveTodoContent = z.infer<typeof SaveTodoContentSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;
