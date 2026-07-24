import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type RetryPanelProps = {
	message: string;
	errorMessage?: string;
	onRetry: () => void;
};

const RetryPanel = ({ message, errorMessage, onRetry }: RetryPanelProps) => {
	return (
		<div className="flex flex-col items-start gap-4 p-14">
			<Alert variant="destructive">
				<AlertCircle />
				<AlertTitle>{message}</AlertTitle>
				{errorMessage && <AlertDescription>{errorMessage}</AlertDescription>}
			</Alert>
			<Button type="button" onClick={onRetry}>
				Réessayer
			</Button>
		</div>
	);
};

export default RetryPanel;
