import { cn } from "@vecchio/ui/lib/utils";
import type { ComponentProps, ReactNode } from "react";

/** Shared page canvas padding — matches the dashboard home. */
export const dsgPageMain =
	"flex min-h-full flex-col px-6 py-6 lg:px-8 lg:py-8";

export const dsgH1 =
	"font-semibold text-2xl text-[var(--dsg-text)] tracking-tight md:text-[28px]";

export const dsgH2 = "font-semibold text-[16px] text-[var(--dsg-text)]";

export const dsgLead =
	"max-w-[65ch] text-[15px] text-[var(--dsg-text-muted)] leading-relaxed";

export const dsgEyebrow =
	"font-medium text-[12px] text-[var(--dsg-text-muted)] uppercase tracking-[0.08em]";

export const dsgLabel =
	"font-medium text-[13px] text-[var(--dsg-text)]";

export const dsgInput =
	"h-11 w-full rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-[#f9fafb] px-4 text-[15px] text-[var(--dsg-text)] shadow-none outline-none placeholder:text-[var(--dsg-text-muted)] focus-visible:border-[var(--dsg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--dsg-primary)]/20";

export const dsgSelect =
	"h-10 rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-white px-3 text-[14px] text-[var(--dsg-text)] outline-none focus-visible:border-[var(--dsg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--dsg-primary)]/20";

export const dsgTextarea =
	"min-h-[140px] w-full resize-y rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-[#f9fafb] px-4 py-3 text-[15px] text-[var(--dsg-text)] shadow-none outline-none placeholder:text-[var(--dsg-text-muted)] focus-visible:border-[var(--dsg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--dsg-primary)]/20";

export const dsgBtnPrimary =
	"h-11 rounded-[var(--dsg-radius-control)] bg-[var(--dsg-primary)] px-6 font-medium text-[15px] text-white hover:bg-[var(--dsg-primary-hover)] active:scale-[0.98]";

export const dsgBtnOutline =
	"h-10 rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-white px-4 font-medium text-[14px] text-[var(--dsg-text)] shadow-none hover:bg-[#f9fafb] active:scale-[0.98]";

export const dsgDivide =
	"divide-y divide-[var(--dsg-border)]";

export const dsgTableHead =
	"bg-[#f9fafb] font-semibold text-[11px] text-[var(--dsg-text-muted)] uppercase tracking-[0.08em]";

/** White card surface used on every portale screen. */
export function DsgCard({ className, ...props }: ComponentProps<"div">) {
	return <div className={cn("dsg-card", className)} {...props} />;
}

interface DsgPanelHeaderProps {
	title: string;
	description?: string;
	icon?: ReactNode;
	action?: ReactNode;
	className?: string;
}

/** Standard card header row with optional icon tile. */
export function DsgPanelHeader({
	title,
	description,
	icon,
	action,
	className,
}: DsgPanelHeaderProps) {
	return (
		<div
			className={cn(
				"flex items-start justify-between gap-4 border-[var(--dsg-border)] border-b px-5 py-4",
				className,
			)}
		>
			<div className="flex min-w-0 items-center gap-3">
				{icon ? (
					<span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-[var(--dsg-kpi-blue)] text-[var(--dsg-primary)]">
						{icon}
					</span>
				) : null}
				<div className="min-w-0">
					<h2 className={dsgH2}>{title}</h2>
					{description ? (
						<p className="mt-1 text-[13px] text-[var(--dsg-text-muted)]">
							{description}
						</p>
					) : null}
				</div>
			</div>
			{action}
		</div>
	);
}

interface DsgStatusBadgeProps {
	stato: "archiviato" | "in-lavorazione";
}

/** Table/detail status pill aligned with dashboard request badges. */
export function DsgStatusBadge({ stato }: DsgStatusBadgeProps) {
	const isArchived = stato === "archiviato";
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-medium text-[12px]",
				isArchived
					? "bg-[#dcfce7] text-[#15803d]"
					: "bg-[#ffedd5] text-[#c2410c]",
			)}
		>
			<span
				className={cn(
					"size-2 rounded-full",
					isArchived ? "bg-[#16a34a]" : "bg-[#ea580c]",
				)}
				aria-hidden
			/>
			{isArchived ? "Archiviato" : "In lavorazione"}
		</span>
	);
}

interface DsgTagProps {
	children: ReactNode;
	tone?: "primary" | "neutral";
}

export function DsgTag({ children, tone = "neutral" }: DsgTagProps) {
	return (
		<span
			className={cn(
				"inline-flex rounded-full px-3 py-1 font-medium text-[12px]",
				tone === "primary"
					? "bg-[var(--dsg-kpi-blue)] text-[#1d4ed8]"
					: "border border-[var(--dsg-border)] bg-[#f9fafb] text-[var(--dsg-text)]",
			)}
		>
			{children}
		</span>
	);
}
