import { DataWebSidebar } from "@/components/dataweb/data-web-sidebar";
import { DataWebTopBar } from "@/components/dataweb/data-web-top-bar";

/** DSG Portale shell: fixed sidebar + top bar + scrollable main canvas. */
export default function DataWebLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="dsg-app-shell flex h-dvh overflow-hidden">
			<DataWebSidebar />
			<div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
				<DataWebTopBar />
				<div className="min-h-0 flex-1 overflow-auto">{children}</div>
			</div>
		</div>
	);
}
