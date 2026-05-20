import { Button } from "@vecchio/ui/components/button";
import { Input } from "@vecchio/ui/components/input";
import { Label } from "@vecchio/ui/components/label";
import {
	CalendarDays,
	ChevronRight,
	Download,
	Search,
} from "lucide-react";
import Link from "next/link";
import { DwGlassPanel } from "@/components/dataweb/dw-glass-panel";
import { FascicoliClassToolbar } from "@/components/dataweb/fascicoli-class-toolbar";
import { dwTableRows } from "@/lib/dataweb-mock-data";

/** Fascicoli browser: advanced filters + sort/export chrome + results table (demo dataset). */
export default function FascicoliPage() {
	return (
		<main className="w-full px-5 py-7 lg:px-6 lg:py-9">
			{/* Stesso inset orizzontale della barra ricerca (vedi DataWebTopBar). */}
			<div className="flex flex-col gap-2">
				<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
					Classi documentali
				</p>
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-2">
						<h1 className="text-balance font-semibold text-3xl tracking-tight md:text-[34px]">
							Fascicoli Notarili
						</h1>
						<p className="font-medium text-sm text-zinc-600 dark:text-zinc-300">
							<span className="tabular-nums">10</span> risultati
						</p>
					</div>

					{/* Class tabs = segmented shell; Filtri opens the advanced search panel (same page anchor). */}
					<FascicoliClassToolbar filtersHref="#dw-fascicoli-filters" />
				</div>
			</div>

			<DwGlassPanel
				id="dw-fascicoli-filters"
				className="mt-7 scroll-mt-28 rounded-[var(--dw-radius-panel)]"
			>
				<div className="flex items-start justify-between gap-4 border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
					<div className="flex items-center gap-2">
						<span className="grid size-10 place-items-center rounded-[1.125rem] bg-[var(--dw-accent-soft)] shadow-[var(--dw-inner-lit)] ring-1 ring-[var(--dw-accent)]/18 dark:ring-white/12">
							<Search
								strokeWidth={1.5}
								className="size-4 text-zinc-900 dark:text-zinc-50"
							/>
						</span>
						<div>
							<h2 className="font-semibold text-sm tracking-tight">
								Ricerca avanzata
							</h2>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Affina per repertorio, raccolta, intervallo date e parti.
							</p>
						</div>
					</div>
					<Button
						type="button"
						variant="ghost"
						className="rounded-full font-semibold text-xs"
					>
						Azzera
					</Button>
				</div>

				{/* Keeps fields keyboard-friendly: labels above controls with generous tap targets. */}
				<form
					className="grid gap-4 px-5 py-5 md:grid-cols-2 xl:grid-cols-6"
					action="#"
					method="get"
				>
					<div className="grid gap-2 xl:col-span-1">
						<Label
							htmlFor="rep"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Numero repertorio
						</Label>
						<Input
							id="rep"
							name="rep"
							placeholder="es. 1562"
							autoComplete="off"
							spellCheck={false}
							className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
						/>
					</div>

					<div className="grid gap-2 xl:col-span-1">
						<Label
							htmlFor="rac"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Numero raccolta
						</Label>
						<Input
							id="rac"
							name="rac"
							placeholder="es. 1193"
							autoComplete="off"
							spellCheck={false}
							className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
						/>
					</div>

					<div className="grid gap-2 xl:col-span-1">
						<Label
							htmlFor="da"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Data atto — da
						</Label>
						<div className="relative">
							<CalendarDays
								strokeWidth={1.5}
								className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400"
								aria-hidden
							/>
							<Input
								id="da"
								name="da"
								type="date"
								className="h-11 rounded-full border-zinc-200/70 bg-white/72 pr-11 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
							/>
						</div>
					</div>

					<div className="grid gap-2 xl:col-span-1">
						<Label
							htmlFor="a"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Data atto — a
						</Label>
						<div className="relative">
							<CalendarDays
								strokeWidth={1.5}
								className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400"
								aria-hidden
							/>
							<Input
								id="a"
								name="a"
								type="date"
								className="h-11 rounded-full border-zinc-200/70 bg-white/72 pr-11 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
							/>
						</div>
					</div>

					<div className="grid gap-2 md:col-span-2 xl:col-span-2">
						<Label
							htmlFor="parti"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Anagrafica parti
						</Label>
						<Input
							id="parti"
							name="parti"
							placeholder="Cognome, denominazione o codice fiscale"
							autoComplete="off"
							spellCheck={false}
							className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
						/>
					</div>

					<div className="flex items-end justify-end md:col-span-2 xl:col-span-6">
						<Button
							type="submit"
							className="h-11 rounded-full px-8 shadow-[var(--dw-inner-lit)]"
						>
							Applica filtri
						</Button>
					</div>
				</form>
			</DwGlassPanel>

			<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<label className="flex items-center gap-2 font-semibold text-xs text-zinc-600 dark:text-zinc-300">
					<span className="text-[11px] text-zinc-500 uppercase tracking-wide dark:text-zinc-400">
						Ordina
					</span>
					<select
						name="sort"
						defaultValue="recent"
						className="h-10 rounded-full border border-zinc-200/75 bg-white/72 px-4 font-semibold text-xs text-zinc-900 shadow-[var(--dw-inner-lit)] outline-none ring-1 ring-zinc-950/[0.06] focus-visible:ring-2 dark:border-white/10 dark:bg-zinc-950/38 dark:text-zinc-50 dark:ring-white/10"
					>
						<option value="recent">Ordinato per Data atto — più recente</option>
						<option value="rep">Ordinato per Repertorio</option>
						<option value="rac">Ordinato per Raccolta</option>
					</select>
				</label>

				<Button
					type="button"
					variant="outline"
					className="h-10 rounded-full bg-white/72 shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.06] dark:bg-zinc-950/40 dark:ring-white/10"
				>
					<Download strokeWidth={1.5} className="size-4" />
					Esporta
				</Button>
			</div>

			<DwGlassPanel className="mt-4 overflow-hidden rounded-[var(--dw-radius-panel)]">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[980px] border-collapse text-left text-sm">
						<thead className="bg-white/35 font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.12em] dark:bg-white/5 dark:text-zinc-400">
							<tr className="[&_th]:border-zinc-950/5 [&_th]:border-b dark:[&_th]:border-white/10">
								<th className="px-5 py-4 font-semibold">Repertorio</th>
								<th className="px-5 py-4 font-semibold">Raccolta</th>
								<th className="px-5 py-4 font-semibold">Data atto</th>
								<th className="px-5 py-4 font-semibold">Anagrafica parti</th>
								<th className="px-5 py-4 font-semibold">Tipologia</th>
								<th className="px-5 py-4 font-semibold">Stato</th>
								<th className="px-5 py-4 font-semibold">
									<span className="sr-only">Apri</span>
								</th>
							</tr>
						</thead>
						<tbody className="[&_td]:border-zinc-950/5 [&_td]:border-b dark:[&_td]:border-white/10">
							{dwTableRows.map((row) => (
								<tr
									key={`${row.repertorio}-${row.raccolta}`}
									className="bg-white/25 hover:bg-white/45 dark:bg-transparent dark:hover:bg-white/5"
								>
									<td className="px-5 py-4 font-mono font-semibold text-sm tabular-nums">
										{row.repertorio}
									</td>
									<td className="px-5 py-4 font-mono font-semibold text-sm tabular-nums">
										{row.raccolta}
									</td>
									<td className="px-5 py-4 font-medium text-sm text-zinc-700 tabular-nums dark:text-zinc-200">
										{row.dataAtto}
									</td>
									<td className="max-w-[360px] px-5 py-4 font-semibold text-sm text-zinc-950 dark:text-zinc-50">
										<span className="line-clamp-2">{row.parti}</span>
									</td>
									<td className="px-5 py-4 font-medium text-sm text-zinc-700 dark:text-zinc-200">
										{row.tipologia}
									</td>
									<td className="px-5 py-4">
										<span
											className={
												row.stato === "archiviato"
													? "inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 font-semibold text-[11px] text-emerald-800 ring-1 ring-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/25"
													: "inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2.5 py-1 font-semibold text-[11px] text-amber-950 ring-1 ring-amber-500/15 dark:text-amber-200 dark:ring-amber-400/25"
											}
										>
											<span
												className={
													row.stato === "archiviato"
														? "size-2 rounded-full bg-emerald-600"
														: "size-2 rounded-full bg-amber-600"
												}
												aria-hidden
											/>
											{row.stato === "archiviato"
												? "Archiviato"
												: "In lavorazione"}
										</span>
									</td>
									<td className="px-5 py-4">
										<Button
											nativeButton={false}
											variant="ghost"
											size="icon-xs"
											aria-label={`Apri fascicolo ${row.repertorio}`}
											render={<Link href={`/fascicoli/${row.repertorio}`} />}
											className="rounded-full text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
										>
											<ChevronRight strokeWidth={1.5} className="size-4" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</DwGlassPanel>
		</main>
	);
}
