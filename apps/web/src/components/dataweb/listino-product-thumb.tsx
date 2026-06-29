import { cn } from "@vecchio/ui/lib/utils";
import { Package } from "lucide-react";
import Image from "next/image";

interface ListinoProductThumbProps {
	nome: string;
	immaginePath: string | null;
	size?: "sm" | "md" | "lg" | "card";
	className?: string;
}

const SIZE_CLASS = {
	sm: "size-10 rounded-[8px]",
	md: "size-12 rounded-[10px]",
	lg: "aspect-square w-full rounded-[10px]",
	/** Horizontal grid card — square thumb, larger minimum size, grows with card height. */
	card: "aspect-square h-full min-h-[120px] w-[120px] shrink-0 rounded-[12px] sm:min-h-[140px] sm:w-[140px]",
} as const;

const IMAGE_SIZES = {
	sm: 40,
	md: 48,
	lg: 112,
	card: 140,
} as const;

/** Product thumbnail — real image from `/public/listino` or placeholder tile. */
export function ListinoProductThumb({
	nome,
	immaginePath,
	size = "sm",
	className,
}: ListinoProductThumbProps) {
	if (immaginePath) {
		if (size === "lg" || size === "card") {
			return (
				<div
					className={cn(
						"relative shrink-0 overflow-hidden border border-[var(--dsg-border)] bg-white",
						SIZE_CLASS[size],
						className,
					)}
				>
					<Image
						src={immaginePath}
						alt={nome}
						fill
						sizes={size === "card" ? "200px" : "(max-width: 768px) 50vw, 33vw"}
						className={cn(
							"object-contain",
							size === "card" ? "p-2" : "p-2",
						)}
					/>
				</div>
			);
		}

		const px = IMAGE_SIZES[size];
		return (
			<div
				className={cn(
					"relative shrink-0 overflow-hidden border border-[var(--dsg-border)] bg-white",
					SIZE_CLASS[size],
					className,
				)}
			>
				<Image
					src={immaginePath}
					alt={nome}
					width={px}
					height={px}
					className="h-full w-full object-contain p-0.5"
				/>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"grid shrink-0 place-items-center bg-gradient-to-br from-[var(--dsg-kpi-blue)] to-[var(--dsg-kpi-purple)] text-[var(--dsg-primary)]",
				SIZE_CLASS[size],
				className,
			)}
			aria-hidden
		>
			<Package
				strokeWidth={1.75}
				className={
					size === "lg" || size === "card" ? "size-10" : "size-4"
				}
			/>
		</div>
	);
}
