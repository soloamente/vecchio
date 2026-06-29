"use client";

import * as React from "react";

interface ListinoSearchContextValue {
	query: string;
	setQuery: (query: string) => void;
}

const ListinoSearchContext = React.createContext<ListinoSearchContextValue | null>(
	null,
);

/** Shares top-bar search query with the listino catalog page. */
export function ListinoSearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = React.useState("");

	const value = React.useMemo(
		() => ({
			query,
			setQuery,
		}),
		[query],
	);

	return (
		<ListinoSearchContext.Provider value={value}>
			{children}
		</ListinoSearchContext.Provider>
	);
}

export function useListinoSearch(): ListinoSearchContextValue {
	const context = React.useContext(ListinoSearchContext);
	if (!context) {
		throw new Error("useListinoSearch must be used within ListinoSearchProvider");
	}
	return context;
}

/** Optional hook for top bar — returns null outside provider (should not happen). */
export function useListinoSearchOptional(): ListinoSearchContextValue | null {
	return React.useContext(ListinoSearchContext);
}
