import { ScriptOnce } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

const isTheme = (value: unknown): value is Theme =>
	value === "light" || value === "dark";

const applyTheme = (theme: Theme) => {
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(theme);
	root.style.colorScheme = theme;
};

// Injecté avant le premier paint pour éviter un flash de thème au chargement.
const getBlockingScript = (storageKey: string, defaultTheme: Theme) =>
	`(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t!=='light'&&t!=='dark'){t=${JSON.stringify(defaultTheme)}}var e=document.documentElement;e.classList.add(t);e.style.colorScheme=t}catch(e){}})();`;

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "theme",
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(defaultTheme);

	// Le script bloquant a déjà posé la classe sur <html>. On ne resynchronise
	// que l'état React, après hydratation, pour éviter un mismatch serveur/client.
	useEffect(() => {
		const stored = localStorage.getItem(storageKey);
		if (isTheme(stored)) setThemeState(stored);
	}, [storageKey]);

	const setTheme = (next: Theme) => {
		localStorage.setItem(storageKey, next);
		setThemeState(next);
		applyTheme(next);
	};

	return (
		<ThemeProviderContext value={{ theme, setTheme }}>
			<ScriptOnce>{getBlockingScript(storageKey, defaultTheme)}</ScriptOnce>
			{children}
		</ThemeProviderContext>
	);
}

export function useTheme() {
	const context = useContext(ThemeProviderContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
