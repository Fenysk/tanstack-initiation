import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { showErrorToast } from "@/lib/toast";

type RetryPanelProps = {
	message: string;
	errorMessage?: string;
	onRetry: () => void;
};

const RetryPanel = ({ message, errorMessage, onRetry }: RetryPanelProps) => {
	useEffect(() => {
		showErrorToast(message, {
			description: errorMessage,
			action: { label: "Réessayer", onClick: onRetry },
		});
	}, [message, errorMessage, onRetry]);

	return (
		<div className="flex justify-center p-14">
			<Button type="button" onClick={onRetry}>
				Réessayer
			</Button>
		</div>
	);
};

export default RetryPanel;
