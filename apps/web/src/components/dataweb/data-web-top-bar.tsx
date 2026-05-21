"use client";

import { Input } from "@vecchio/ui/components/input";
import { Command, Search } from "lucide-react";
import { useEffect } from "react";

/** White header strip: global search only (profile and notifications live in the sidebar). */
export function DataWebTopBar() {
	useEffect(() => {
		const focusSearch = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase();
			if ((event.metaKey || event.ctrlKey) && key === "k") {
				event.preventDefault();
				document.getElementById("dsg-global-search")?.focus();
			}
		};
		window.addEventListener("keydown", focusSearch);
		return () => window.removeEventListener("keydown", focusSearch);
	}, []);

	return (
		<header className="sticky top-0 z-30 shrink-0 border-[var(--dsg-border)] border-b bg-[var(--dsg-surface)] px-6 py-3">
			<div className="relative min-w-0">
				<Search
					strokeWidth={1.75}
					className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-[var(--dsg-text-muted)]"
					aria-hidden
				/>
				<Input
					id="dsg-global-search"
					type="search"
					name="q"
					placeholder="Cerca fascicolo, repertorio..."
					autoComplete="off"
					spellCheck={false}
					className="h-11 w-full rounded-[var(--dsg-radius-control)] border-[var(--dsg-border)] bg-[#f9fafb] pr-16 pl-11 text-[15px] shadow-none placeholder:text-[var(--dsg-text-muted)]"
				/>
				<div className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-[var(--dsg-border)] bg-white px-2 py-1 font-medium text-[11px] text-[var(--dsg-text-muted)] sm:flex">
					<Command strokeWidth={1.75} className="size-3.5" aria-hidden />
					<span>K</span>
				</div>
			</div>
		</header>
	);
}
