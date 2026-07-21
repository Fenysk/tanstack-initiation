type RetryPanelProps = {
	message: string;
	errorMessage?: string;
	onRetry: () => void;
};

const RetryPanel = ({ message, errorMessage, onRetry }: RetryPanelProps) => {
	return (
		<div className="p-14">
			<p>{message}</p>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			<button
				type="button"
				onClick={onRetry}
				className="cursor-pointer bg-black text-white px-4 py-2 rounded-md"
			>
				Réessayer
			</button>
		</div>
	);
};

export default RetryPanel;
