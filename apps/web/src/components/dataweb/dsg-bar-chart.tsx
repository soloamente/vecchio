import { cn } from "@vecchio/ui/lib/utils";
import type { DwChartBar } from "@/lib/dataweb-mock-data";

interface DsgBarChartProps {
	data: DwChartBar[];
	barColor: string;
	maxValue?: number;
	className?: string;
	/** Accessible title for the chart graphic. */
	title: string;
}

/**
 * Full-width bar chart using flex columns — bars stretch across the entire card.
 */
export function DsgBarChart({
	data,
	barColor,
	maxValue,
	className,
	title,
}: DsgBarChartProps) {
	const peak = maxValue ?? Math.max(...data.map((d) => d.value), 1);

	return (
		<figure className={cn("w-full", className)} aria-label={title}>
			{/* Plot area with horizontal grid lines. */}
			<div className="relative h-[200px] w-full">
				{[0.25, 0.5, 0.75].map((tick) => (
					<div
						key={tick}
						className="absolute right-0 left-0 border-[var(--dsg-border)] border-t border-dashed"
						style={{ bottom: `${tick * 100}%` }}
						aria-hidden
					/>
				))}
				<div
					className="absolute right-0 bottom-0 left-0 border-[var(--dsg-border)] border-t"
					aria-hidden
				/>
				<div className="flex h-full w-full items-end gap-1 px-1">
					{data.map((point) => {
						const heightPct = (point.value / peak) * 100;
						return (
							<div
								key={point.label}
								className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
							>
								<div
									className="w-[58%] max-w-10 min-w-[6px] rounded-t-[4px] transition-[height] duration-300"
									style={{
										height: `${heightPct}%`,
										backgroundColor: barColor,
									}}
									role="presentation"
								/>
							</div>
						);
					})}
				</div>
			</div>
			{/* Month/year labels — evenly distributed under the plot. */}
			<div className="mt-2 flex w-full gap-1 px-1">
				{data.map((point) => (
					<span
						key={point.label}
						className="flex-1 text-center font-medium text-[11px] text-[var(--dsg-text-muted)] tabular-nums"
					>
						{point.label}
					</span>
				))}
			</div>
		</figure>
	);
}
