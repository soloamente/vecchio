"use client";

import { buttonVariants } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import { Filter } from "lucide-react";
import { FascicoliClassSegmented } from "@/components/dataweb/fascicoli-class-segmented";
import { dsgBtnOutline } from "@/components/dataweb/dsg-ui";

export interface FascicoliClassToolbarProps {
	filtersHref: string;
}

/** Class segment + Filtri control — DSG portale styling. */
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
					dsgBtnOutline,
					"inline-flex h-9 items-center gap-1.5 px-4",
				)}
			>
				<Filter strokeWidth={1.75} className="size-4" aria-hidden />
				Filtri
			</a>
		</div>
	);
}
