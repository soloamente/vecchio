"use client";

import { cn } from "@vecchio/ui/lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";

interface DialogProps {
	/** When true, opens the native modal dialog. */
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

/**
 * Accessible modal shell built on the native `<dialog>` element.
 * Portaled to `document.body` so parent overflow/transform cannot offset centering.
 */
function Dialog({ open, onOpenChange, children, className }: DialogProps) {
	const dialogRef = React.useRef<HTMLDialogElement>(null);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	React.useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}

		if (open && !dialog.open) {
			dialog.showModal();
			return;
		}

		if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	const dialogNode = (
		<dialog
			ref={dialogRef}
			className={cn(
				// UA styles use `display:block` on open — override with open:flex for centering.
				"fixed inset-0 z-[100] m-0 hidden max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-[rgba(17,24,39,0.35)]",
				"open:flex open:h-dvh open:w-full open:items-center open:justify-center",
				"open:animate-in open:fade-in-0 open:duration-200 motion-reduce:open:animate-none",
				className,
			)}
			onClose={() => onOpenChange(false)}
		>
			{children}
		</dialog>
	);

	if (!mounted) {
		return null;
	}

	return createPortal(dialogNode, document.body);
}

function DialogContent({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"relative w-full max-w-md overflow-hidden rounded-[var(--dsg-radius-card,12px)] border border-[var(--dsg-border,#e5e7eb)] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

function DialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-1 px-5 pt-5", className)} {...props} />
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn(
				"text-center font-semibold text-[16px] text-[var(--dsg-text,#111827)]",
				className,
			)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-center text-[13px] text-[var(--dsg-text-muted,#6b7280)] leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col gap-2 px-5 pb-5", className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
};
