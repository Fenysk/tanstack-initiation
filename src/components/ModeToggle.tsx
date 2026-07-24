import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Button
			variant="outline"
			size="icon"
			type="button"
			className="relative"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label="Basculer le thème"
			aria-pressed={isDark}
		>
			<Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		</Button>
	);
}
