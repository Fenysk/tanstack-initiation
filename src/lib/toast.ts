import { toast } from "sonner";

export const showSaveErrorToast = () =>
	toast.error("Erreur", {
		description: "Impossible d'enregistrer. Réessaie.",
	});

export const showErrorToast = (
	title: string,
	options?: {
		description?: string;
		action?: { label: string; onClick: () => void };
	},
) => toast.error(title, options);

export const showSuccessToast = (title: string, description?: string) =>
	toast.success(title, { description });
