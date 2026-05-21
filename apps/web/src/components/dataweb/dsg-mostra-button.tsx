import { Button } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { dsgBtnOutline } from "@/components/dataweb/dsg-ui";

interface DsgMostraButtonProps {
	/** Dynamic fascicolo/successione paths from mock data. */
	href: string;
	label?: string;
}

/** “Mostra” action from the legacy portale results tables. */
export function DsgMostraButton({
	href,
	label = "Mostra",
}: DsgMostraButtonProps) {
	return (
		<Button
			nativeButton={false}
			variant="outline"
			size="sm"
			render={
				<Link href={href as ComponentProps<typeof Link>["href"]} />
			}
			className={cn(dsgBtnOutline, "inline-flex h-9 gap-2 px-4")}
		>
			<FolderOpen strokeWidth={1.75} className="size-4" aria-hidden />
			{label}
		</Button>
	);
}
