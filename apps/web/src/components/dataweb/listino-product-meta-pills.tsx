import { cn } from "@vecchio/ui/lib/utils";
import { Box, Package, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ListinoMetaPart {
	label: string;
	icon: LucideIcon;
}

/** Split the Excel-derived description into marca, unità, confezione. */
export function parseListinoMeta(descrizione: string): ListinoMetaPart[] {
	const [marca, unitaVendita, confezione] = descrizione
		.split(" · ")
		.map((part) => part.trim());

	const parts: ListinoMetaPart[] = [];

	if (marca) {
		parts.push({ label: marca, icon: Tag });
	}
	if (unitaVendita) {
		parts.push({ label: unitaVendita, icon: Package });
	}
	if (confezione) {
		parts.push({ label: confezione, icon: Box });
	}

	return parts;
}

interface ListinoProductMetaPillsProps {
	descrizione: string;
	className?: string;
}

function MetaPill({ label, icon: Icon }: ListinoMetaPart) {
	return (
		<span className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--dsg-border)] bg-white/80 px-2 py-0.5 font-medium text-[10px] text-[var(--dsg-text-muted)] sm:text-[11px]">
			<Icon
				strokeWidth={1.75}
				className="size-3 shrink-0 text-[var(--dsg-text-muted)]"
				aria-hidden
			/>
			<span className="truncate">{label}</span>
		</span>
	);
}

/** Secondary pills for marca, unità di vendita e confezione. */
export function ListinoProductMetaPills({
	descrizione,
	className,
}: ListinoProductMetaPillsProps) {
	const meta = parseListinoMeta(descrizione);

	if (meta.length === 0) {
		return null;
	}

	return (
		<ul className={cn("flex flex-wrap gap-1.5", className)}>
			{meta.map((item) => (
				<li key={item.label}>
					<MetaPill {...item} />
				</li>
			))}
		</ul>
	);
}
