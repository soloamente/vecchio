"use client";

import { Button } from "@vecchio/ui/components/button";
import { Input } from "@vecchio/ui/components/input";
import { Bell, Command, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ModeToggle } from "@/components/mode-toggle";

/** Floating glass toolbar: capsule search + circular chrome (Vision-like controls). */
export function DataWebTopBar() {
	React.useEffect(() => {
		const focusSearch = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase();
			const metaOrCtrl = event.metaKey || event.ctrlKey;
			if (metaOrCtrl && key === "k") {
				event.preventDefault();
				document.getElementById("dw-global-search")?.focus();
			}
		};

		window.addEventListener("keydown", focusSearch);
		return () => window.removeEventListener("keydown", focusSearch);
	}, []);

	return (
		<header className="sticky top-0 z-30 px-1 lg:static lg:px-0">
			<div
				className={
					"flex flex-col gap-3 rounded-none border-white/40 border-b bg-[var(--dw-surface)]/75 px-4 py-3 backdrop-blur-2xl backdrop-saturate-150 lg:rounded-full lg:border lg:shadow-[var(--dw-inner-lit),var(--dw-depth-a),var(--dw-depth-b)] dark:border-white/10 lg:dark:border-white/12"
				}
			>
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4 lg:px-2 lg:py-1">
					<div className="relative min-w-0 flex-1">
						<Search
							strokeWidth={1.5}
							className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
							aria-hidden
						/>
						<Input
							id="dw-global-search"
							type="search"
							name="q"
							placeholder="Cerca per repertorio, raccolta, parte, data atto..."
							autoComplete="off"
							spellCheck={false}
							className="h-12 rounded-full border-zinc-200/70 bg-white/72 pr-[5.25rem] pl-12 text-[15px] shadow-[var(--dw-inner-lit),0_16px_42px_-34px_oklch(0.22_0.04_264/0.35)] ring-1 ring-zinc-950/[0.05] placeholder:text-zinc-400 md:text-[15px] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
						/>
						<div className="pointer-events-none absolute top-1/2 right-2 hidden h-8 -translate-y-1/2 items-center gap-1 rounded-full bg-zinc-950/[0.05] px-2.5 font-semibold text-[11px] text-zinc-500 ring-1 ring-zinc-950/[0.06] sm:flex dark:bg-white/[0.07] dark:text-zinc-400 dark:ring-white/10">
							<Command
								strokeWidth={1.5}
								className="size-3.5 opacity-80"
								aria-hidden
							/>
							<span>K</span>
						</div>
					</div>

					<nav
						className="flex items-center gap-2 lg:hidden"
						aria-label="Collegamenti rapidi"
					>
						<Button
							nativeButton={false}
							variant="outline"
							size="sm"
							render={<Link href="/" />}
							className="h-9 rounded-full px-4"
						>
							Home
						</Button>
						<Button
							nativeButton={false}
							variant="outline"
							size="sm"
							render={<Link href="/fascicoli" />}
							className="h-9 rounded-full px-4"
						>
							Fascicoli
						</Button>
					</nav>

					<div className="flex items-center justify-end gap-2 lg:shrink-0">
						<div className="rounded-full bg-white/35 p-0.5 shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] backdrop-blur-md dark:bg-white/[0.06] dark:ring-white/10">
							<ModeToggle />
						</div>
						<Button
							variant="outline"
							size="icon"
							type="button"
							aria-label="Notifiche"
							className="relative size-11 rounded-full shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.06] dark:ring-white/10"
						>
							<Bell strokeWidth={1.5} className="size-[18px]" />
							<span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.2)]" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
