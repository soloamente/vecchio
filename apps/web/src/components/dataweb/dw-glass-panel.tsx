import { cn } from "@vecchio/ui/lib/utils";
import type { ComponentProps } from "react";

/**
 * Vision-style glass: heavy blur + saturation lift, inner luminance edge, stacked depth shadows.
 * Matches floating “material” panels rather than flat cards.
 */
export function DwGlassPanel({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"border border-white/65 bg-[var(--dw-surface)] backdrop-blur-2xl backdrop-saturate-150",
				"shadow-[var(--dw-inner-lit),var(--dw-depth-a),var(--dw-depth-b)]",
				"dark:border-white/12 dark:backdrop-saturate-125",
				className,
			)}
			{...props}
		/>
	);
}
