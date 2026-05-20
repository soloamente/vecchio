"use client";

import { buttonVariants } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import { Filter } from "lucide-react";
import { FascicoliClassSegmented } from "@/components/dataweb/fascicoli-class-segmented";

export interface FascicoliClassToolbarProps {
	/**
	 * Where “Filtri” sends the user: in-page anchor on `/fascicoli`, full path
	 * from other DataWeb routes (e.g. `/fascicoli#dw-fascicoli-filters`).
	 */
	filtersHref: string;
}

/**
 * Class segment shell + separate Filtri control (same pairing on list, home,
 * and fascicolo detail for consistent chrome).
 */
export function FascicoliClassToolbar({
	filtersHref,
}: FascicoliClassToolbarProps) {
	return (
		<div className="flex flex-wrap items-center justify-end gap-2">
			<FascicoliClassSegmented />
			<a
				href={filtersHref}
				className={cn(
					buttonVariants({ variant: "outline" }),
					"h-9 gap-1.5 rounded-full px-4 font-medium text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/6 dark:ring-white/10",
				)}
			>
				<Filter strokeWidth={1.5} className="size-4" aria-hidden />
				Filtri
			</a>
		</div>
	);
}
