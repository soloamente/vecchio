import { DataWebSidebar } from "@/components/dataweb/data-web-sidebar";
import { DataWebTopBar } from "@/components/dataweb/data-web-top-bar";

/** Shared dashboard chrome: inset floating sidebar + top bar on a spatial ambient canvas. */
export default function DataWebLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="dw-app-shell relative isolate flex min-h-dvh flex-col text-zinc-950 lg:flex-row lg:gap-4 lg:p-5 dark:text-zinc-50">
			{/* Fixed grain sits behind content; pointer-events none preserves hit targets. */}
			<div
				className="dw-ambient-grain pointer-events-none fixed inset-0 -z-10"
				aria-hidden
			/>
			<DataWebSidebar />
			<div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 lg:min-h-[calc(100dvh-2.5rem)]">
				<DataWebTopBar />
				<div className="min-h-0 flex-1 lg:overflow-auto">{children}</div>
			</div>
		</div>
	);
}
