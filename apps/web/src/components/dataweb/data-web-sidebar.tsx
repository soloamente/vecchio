"use client";

import { cn } from "@vecchio/ui/lib/utils";
import {
	Bookmark,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	FolderOpen,
	HelpCircle,
	Home,
	LogOut,
	ScrollText,
	Settings,
	Users,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const navPrimary = [
	{ href: "/", label: "Dashboard", icon: Home },
	{ href: "/richiesta-fascicoli", label: "Richiesta fascicoli", icon: ScrollText },
] as const;

/** Elenco documenti — pagine separate come nel portale legacy. */
const navDocumenti = [
	{ href: "/fascicoli", label: "Fascicoli Notarili", icon: FolderOpen },
	{ href: "/successioni", label: "Successioni", icon: Users },
] as const;

const navFooter = [
	{ href: "#", label: "Impostazioni", icon: Settings },
	{ href: "#", label: "Assistenza", icon: HelpCircle },
] as const;

function NavLink({
	href,
	label,
	icon: Icon,
	active,
	collapsed,
}: {
	href: ComponentProps<typeof Link>["href"];
	label: string;
	icon: React.ComponentType<{ strokeWidth?: number; className?: string }>;
	active: boolean;
	collapsed: boolean;
}) {
	return (
		<Link
			href={href}
			title={collapsed ? label : undefined}
			className={cn(
				"flex items-center gap-3 rounded-[var(--dsg-radius-control)] px-3 py-2.5 font-medium text-[14px] transition-colors duration-150",
				active
					? "bg-[var(--dsg-sidebar-active)] text-white"
					: "text-[var(--dsg-sidebar-text)] hover:bg-[var(--dsg-sidebar-hover)]",
				collapsed && "justify-center px-2",
			)}
		>
			<Icon strokeWidth={1.75} className="size-[18px] shrink-0" />
			{!collapsed ? <span>{label}</span> : null}
		</Link>
	);
}

/** Sidebar con sezioni Navigazione + Elenco documenti (fascicoli e successioni separati). */
export function DataWebSidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [collapsed, setCollapsed] = useState(false);

	const handleExitAccount = () => {
		toast.success("Sessione chiusa (demo)");
		router.push("/");
	};

	const isPrimaryActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	const isDocumentiActive = (href: string) => {
		if (href === "/fascicoli") {
			return (
				pathname === "/fascicoli" || pathname.startsWith("/fascicoli/")
			);
		}
		return pathname === "/successioni" || pathname.startsWith("/successioni/");
	};

	return (
		<div className="relative flex h-dvh shrink-0">
			<aside
				className={cn(
					"flex h-full flex-col bg-[var(--dsg-sidebar)] text-white transition-[width] duration-200 ease-out",
					collapsed ? "w-[72px]" : "w-[240px]",
				)}
			>
				<div
					className={cn(
						"flex items-center gap-3 border-white/10 border-b px-5 py-4",
						collapsed && "justify-center px-2",
					)}
				>
					<Bookmark
						strokeWidth={1.75}
						className="size-6 shrink-0 text-white"
						aria-hidden
					/>
					{!collapsed ? (
						<p className="font-semibold text-[15px] tracking-tight">
							DSG | Portale
						</p>
					) : null}
				</div>

				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4">
					{!collapsed ? (
						<p className="px-3 pb-2 font-medium text-[11px] text-[var(--dsg-sidebar-muted)] uppercase tracking-[0.1em]">
							Navigazione
						</p>
					) : null}
					<nav className="flex flex-col gap-1" aria-label="Navigazione">
						{navPrimary.map((item) => (
							<NavLink
								key={item.label}
								{...item}
								active={isPrimaryActive(item.href)}
								collapsed={collapsed}
							/>
						))}
					</nav>

					{!collapsed ? (
						<p className="mt-6 px-3 pb-2 font-medium text-[11px] text-[var(--dsg-sidebar-muted)] uppercase tracking-[0.1em]">
							Elenco documenti
						</p>
					) : (
						<div className="mt-4 border-white/10 border-t" aria-hidden />
					)}
					<nav className="flex flex-col gap-1" aria-label="Elenco documenti">
						{navDocumenti.map((item) => (
							<NavLink
								key={item.label}
								{...item}
								active={isDocumentiActive(item.href)}
								collapsed={collapsed}
							/>
						))}
					</nav>
				</div>

				<div className="mt-auto flex shrink-0 flex-col gap-1 border-white/10 border-t px-3 py-4">
					{navFooter.map((item) => (
						<NavLink
							key={item.label}
							{...item}
							active={false}
							collapsed={collapsed}
						/>
					))}

					<div
						className={cn(
							"border-white/10 border-t pt-3",
							collapsed && "flex justify-center",
						)}
					>
						<button
							type="button"
							className={cn(
								"flex w-full items-center gap-2.5 rounded-[var(--dsg-radius-control)] px-2 py-2 text-left transition-colors hover:bg-[var(--dsg-sidebar-hover)]",
								collapsed && "justify-center px-0",
							)}
							aria-haspopup="menu"
							aria-expanded={false}
						>
							<span
								className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 font-semibold text-white text-xs ring-1 ring-white/25"
								aria-hidden
							>
								ND
							</span>
							{!collapsed ? (
								<>
									<span className="min-w-0 flex-1 truncate font-medium text-[14px]">
										Notaio Dimostrativo
									</span>
									<ChevronDown
										strokeWidth={1.75}
										className="size-4 shrink-0 text-[var(--dsg-sidebar-muted)]"
										aria-hidden
									/>
								</>
							) : null}
						</button>
					</div>

					<button
						type="button"
						onClick={handleExitAccount}
						title={collapsed ? "Logout" : undefined}
						className={cn(
							"flex w-full items-center gap-3 rounded-[var(--dsg-radius-control)] px-3 py-2.5 font-medium text-[14px] text-[#f87171] transition-colors hover:bg-[var(--dsg-sidebar-hover)]",
							collapsed && "justify-center px-2",
						)}
					>
						<LogOut strokeWidth={1.75} className="size-[18px] shrink-0" />
						{!collapsed ? <span>Logout</span> : null}
					</button>
				</div>
			</aside>

			<button
				type="button"
				onClick={() => setCollapsed((prev) => !prev)}
				aria-label={collapsed ? "Espandi menu" : "Comprimi menu"}
				className="absolute top-[4.5rem] -right-3 z-20 grid size-7 place-items-center rounded-full border border-[var(--dsg-border)] bg-white text-[var(--dsg-text-muted)] shadow-sm transition-transform hover:text-[var(--dsg-text)]"
			>
				{collapsed ? (
					<ChevronRight strokeWidth={2} className="size-4" />
				) : (
					<ChevronLeft strokeWidth={2} className="size-4" />
				)}
			</button>
		</div>
	);
}
