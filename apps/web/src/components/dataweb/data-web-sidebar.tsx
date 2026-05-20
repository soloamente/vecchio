"use client";

import { Button } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import {
	Archive,
	Clock,
	FolderOpen,
	Home,
	LogOut,
	ScrollText,
	Star,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const navMain = [
	{
		href: "/",
		label: "Home",
		icon: Home,
		badge: undefined as string | undefined,
	},
	{
		href: "/fascicoli",
		label: "Fascicoli Notarili",
		icon: FolderOpen,
		badge: "7",
	},
	{ href: "/fascicoli#successioni", label: "Successioni", icon: Users, badge: "2" },
	{
		href: "/richiesta-fascicoli",
		label: "Richiesta fascicoli",
		icon: ScrollText,
		badge: undefined,
	},
] as const;

const navDoc = [
	{ href: "#", label: "Recenti", icon: Clock },
	{ href: "#", label: "Preferiti", icon: Star },
	{ href: "#", label: "Archivio storico", icon: Archive },
] as const;

export function DataWebSidebar() {
	const pathname = usePathname();
	const router = useRouter();

	/** Demo-only: nessun backend auth; chiude la sessione UI e torna alla home DataWeb. */
	const handleExitAccount = () => {
		toast.success("Sessione chiusa (demo)");
		router.push("/");
	};

	return (
		<aside
			className={cn(
				"flex w-full shrink-0 flex-col px-4 py-4 backdrop-blur-2xl backdrop-saturate-150",
				/* Mobile: slim strip; desktop: floating Vision panel — altezza minima così il blocco utente resta in basso. */
				"border-white/45 border-b bg-[var(--dw-surface)] lg:w-[272px] dark:border-white/10",
				"lg:min-h-[calc(100dvh-2.5rem)] lg:rounded-[var(--dw-radius-shell)] lg:border lg:shadow-[var(--dw-inner-lit),var(--dw-depth-a),var(--dw-depth-b)] lg:dark:border-white/12",
			)}
		>
			{/* Brand lockup — volumetric orb (specular ring + inner highlight). */}
			<div className="flex items-center gap-3 px-1">
				<div className="relative grid size-[3.25rem] select-none place-items-center rounded-full bg-gradient-to-br from-sky-400/95 via-sky-600/88 to-zinc-700/92 font-semibold text-[11px] text-white tracking-tight shadow-[0_16px_44px_-22px_var(--dw-accent),var(--dw-inner-lit)] ring-1 ring-white/45">
					DW
					<span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,0.38)]" />
				</div>
				<div className="min-w-0 leading-tight">
					<p className="truncate font-semibold text-sm text-zinc-950 tracking-tight dark:text-zinc-50">
						DataWeb
					</p>
					<p className="truncate font-medium text-[11px] text-zinc-500 tracking-wide dark:text-zinc-400">
						Portale atti notarili
					</p>
				</div>
			</div>

			<div className="mt-7 flex min-h-0 flex-1 flex-col space-y-7 overflow-x-auto lg:overflow-visible">
				<div>
					<p className="px-3 font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.16em] dark:text-zinc-400">
						Navigazione
					</p>
					<nav
						className="mt-3 flex gap-2 lg:flex-col lg:gap-1.5"
						aria-label="Navigazione principale"
					>
						{navMain.map((item) => {
							const pathOnly = item.href.includes("#")
								? item.href.slice(0, item.href.indexOf("#"))
								: item.href;
							const hasHash = item.href.includes("#");
							const active =
								pathOnly !== "#" &&
								(pathOnly === "/"
									? pathname === "/"
									: hasHash
										? pathname === pathOnly
										: pathname === pathOnly ||
											pathname.startsWith(`${pathOnly}/`));
							const Icon = item.icon;
							return (
								<Link
									key={item.label}
									href={item.href}
									className={cn(
										"group flex min-w-[156px] items-center gap-2.5 px-3.5 py-2.5 font-medium text-sm transition-[transform,background-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-w-0",
										/* Capsule rows — Mobbin-style segmented nav clarity */
										"rounded-full text-zinc-600 dark:text-zinc-300",
										active
											? "bg-white text-zinc-950 shadow-[var(--dw-inner-lit),0_18px_42px_-28px_oklch(0.22_0.04_264/0.38)] ring-1 ring-zinc-950/[0.06] dark:bg-white/12 dark:text-white dark:ring-white/14"
											: "hover:bg-white/50 hover:text-zinc-900 active:scale-[0.99] dark:hover:bg-white/[0.07] dark:hover:text-white",
									)}
								>
									<Icon
										strokeWidth={1.5}
										className={cn(
											"size-[18px] shrink-0 transition-colors",
											active
												? "text-sky-700 dark:text-sky-300"
												: "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300",
										)}
									/>
									<span className="min-w-0 flex-1 truncate">{item.label}</span>
									{item.badge ? (
										<span className="rounded-full bg-zinc-950/[0.06] px-2.5 py-0.5 font-semibold text-[11px] text-zinc-600 tabular-nums ring-1 ring-zinc-950/[0.04] dark:bg-white/10 dark:text-zinc-200 dark:ring-white/10">
											{item.badge}
										</span>
									) : null}
								</Link>
							);
						})}
					</nav>
				</div>

				<div>
					<p className="px-3 font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.16em] dark:text-zinc-400">
						Classi documentali
					</p>
					<nav
						className="mt-3 flex gap-2 lg:flex-col lg:gap-1.5"
						aria-label="Classi documentali"
					>
						{navDoc.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.label}
									href={item.href}
									className="group flex min-w-[156px] items-center gap-2.5 rounded-full px-3.5 py-2.5 font-medium text-sm text-zinc-600 transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/50 hover:text-zinc-900 active:scale-[0.99] lg:min-w-0 dark:text-zinc-400 dark:hover:bg-white/[0.07] dark:hover:text-zinc-100"
								>
									<Icon
										strokeWidth={1.5}
										className="size-[18px] shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
									/>
									<span className="truncate">{item.label}</span>
								</Link>
							);
						})}
					</nav>
				</div>
			</div>

			{/* Account + uscita: in basso nella colonna (desktop); stesso blocco anche su mobile sotto la nav. */}
			<div className="mt-6 border-white/35 border-t pt-6 lg:mt-auto lg:border-transparent lg:pt-10 dark:border-white/10">
				<div className="flex items-center gap-3 rounded-[var(--dw-radius-panel)] bg-white/45 p-3.5 shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] backdrop-blur-xl dark:bg-white/[0.06] dark:ring-white/10">
					<div
						className="grid size-11 shrink-0 select-none place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 font-semibold text-white text-xs shadow-[0_14px_36px_-18px_rgba(234,88,12,0.55)] ring-1 ring-white/35"
						aria-hidden
					>
						ND
					</div>
					<div className="min-w-0 flex-1 leading-tight">
						<p className="truncate font-semibold text-sm text-zinc-950 dark:text-zinc-50">
							Notaio Dimostrativo
						</p>
						<p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
							Studio Demo — Padova
						</p>
					</div>
					<Button
						type="button"
						variant="outline"
						size="icon"
						aria-label="Esci dall'account"
						title="Esci dall'account"
						onClick={handleExitAccount}
						className="size-11 shrink-0 rounded-full shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.06] dark:ring-white/10"
					>
						<LogOut strokeWidth={1.5} className="size-[18px]" />
					</Button>
				</div>
			</div>
		</aside>
	);
}
