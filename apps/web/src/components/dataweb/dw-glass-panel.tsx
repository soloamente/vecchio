import type { ComponentProps } from "react";
import { DsgCard } from "@/components/dataweb/dsg-ui";

/** @deprecated Use `DsgCard` — alias for legacy imports. */
export function DwGlassPanel(props: ComponentProps<typeof DsgCard>) {
	return <DsgCard {...props} />;
}
