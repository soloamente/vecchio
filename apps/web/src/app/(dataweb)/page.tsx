import { Button, buttonVariants } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import {
	ArrowRight,
	ChevronRight,
	Download,
	FileText,
	Search as SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { DwGlassPanel } from "@/components/dataweb/dw-glass-panel";
import { FascicoliClassToolbar } from "@/components/dataweb/fascicoli-class-toolbar";
import { dwRecentFascicoli, dwRichiesteRecenti } from "@/lib/dataweb-mock-data";

/** Dashboard home: greeting, KPI tiles, recent dossiers, requests, and quick actions (Italian mock copy). */
export default function DataWebHomePage() {
	return (
		<main className="w-full px-5 py-7 lg:px-6 lg:py-9">
			{/* Stesso inset orizzontale della barra ricerca (shell px-4 + header px-1 mobile; lg + riga px-2). */}
			<div className="flex flex-col gap-2">
				<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
					Classi documentali
				</p>
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl space-y-2">
						<p className="font-semibold text-xs text-zinc-500 dark:text-zinc-400">
							Giovedì 14 Maggio
						</p>
						<h1 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
							Buon pomeriggio, Notaio.
						</h1>
						<p className="text-sm text-zinc-600 leading-relaxed md:text-base dark:text-zinc-300">
							Hai{" "}
							<span className="font-semibold text-zinc-900 dark:text-zinc-50">
								2 richieste in corso
							</span>{" "}
							e{" "}
							<span className="font-semibold text-zinc-900 dark:text-zinc-50">
								3 nuovi fascicoli
							</span>{" "}
							acquisiti dal{" "}
							<span className="font-semibold text-zinc-900 dark:text-zinc-50">
								1° maggio
							</span>
							.
						</p>
					</div>
					<FascicoliClassToolbar filtersHref="/fascicoli#dw-fascicoli-filters" />
				</div>
			</div>

			{/* KPI strip uses an asymmetric grid (not three equal cards) to avoid generic SaaS repetition. */}
			<section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.15fr_0.85fr_0.95fr_0.95fr]">
				<DwGlassPanel className="rounded-[var(--dw-radius-panel)] p-5">
					<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.12em] dark:text-zinc-400">
						Fascicoli totali
					</p>
					<p className="mt-3 font-mono font-semibold text-4xl text-zinc-950 tabular-nums tracking-tight dark:text-zinc-50">
						1.284
					</p>
					<p className="mt-2 font-medium text-xs text-zinc-500 dark:text-zinc-400">
						Aggiornato oggi
					</p>
				</DwGlassPanel>

				<DwGlassPanel className="rounded-[var(--dw-radius-panel)] p-5">
					<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.12em] dark:text-zinc-400">
						Questo mese
					</p>
					<div className="mt-3 flex items-end justify-between gap-3">
						<p className="font-mono font-semibold text-4xl text-zinc-950 tabular-nums tracking-tight dark:text-zinc-50">
							+3
						</p>
						<span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-semibold text-[11px] text-emerald-700 ring-1 ring-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20">
							+12%
						</span>
					</div>
					<p className="mt-2 font-medium text-xs text-zinc-500 dark:text-zinc-400">
						Acquisiti dal 1° maggio
					</p>
				</DwGlassPanel>

				<DwGlassPanel className="rounded-[var(--dw-radius-panel)] p-5">
					<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.12em] dark:text-zinc-400">
						Richieste in corso
					</p>
					<div className="mt-3 flex items-end justify-between gap-3">
						<p className="font-mono font-semibold text-4xl text-zinc-950 tabular-nums tracking-tight dark:text-zinc-50">
							2
						</p>
						<span className="rounded-full bg-orange-500/10 px-2.5 py-1 font-semibold text-[11px] text-orange-800 ring-1 ring-orange-500/15 dark:text-orange-200 dark:ring-orange-400/25">
							Attesa
						</span>
					</div>
					<p className="mt-2 font-medium text-xs text-zinc-500 dark:text-zinc-400">
						Evasione media 1,4 gg
					</p>
				</DwGlassPanel>

				<DwGlassPanel className="rounded-[var(--dw-radius-panel)] p-5">
					<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.12em] dark:text-zinc-400">
						Successioni
					</p>
					<p className="mt-3 font-mono font-semibold text-4xl text-zinc-950 tabular-nums tracking-tight dark:text-zinc-50">
						84
					</p>
					<p className="mt-2 font-medium text-xs text-zinc-500 dark:text-zinc-400">
						Di cui 1 in lavorazione
					</p>
				</DwGlassPanel>
			</section>

			<section className="mt-10">
				<div className="flex items-end justify-between gap-4">
					<div>
						<h2 className="font-semibold text-lg tracking-tight">
							Fascicoli consultati di recente
						</h2>
						<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
							Scorciatoie verso le ultime consultazioni dello studio.
						</p>
					</div>
					<Link
						href="/fascicoli"
						className="group inline-flex items-center gap-1 font-semibold text-[var(--dw-accent)] text-sm hover:underline"
					>
						Vedi tutti
						<ArrowRight
							strokeWidth={1.5}
							className="size-4 transition-transform group-hover:translate-x-0.5"
						/>
					</Link>
				</div>

				<div className="mt-4 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{dwRecentFascicoli.map((item) => (
						<DwGlassPanel
							key={item.id}
							className="w-[240px] shrink-0 rounded-[var(--dw-radius-panel)] p-4 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:shadow-[var(--dw-inner-lit),var(--dw-depth-a)] active:translate-y-0 active:scale-[0.99]"
						>
							<div className="flex items-start justify-between gap-3">
								<span className="inline-flex items-center rounded-full bg-[var(--dw-accent-soft)] px-2 py-1 font-semibold text-[11px] text-zinc-900 ring-1 ring-[var(--dw-accent)]/15 dark:text-zinc-50 dark:ring-white/10">
									{item.rep}
								</span>
								<Button
									nativeButton={false}
									variant="ghost"
									size="icon-xs"
									render={<Link href={`/fascicoli/${item.id}`} />}
									aria-label={`Apri fascicolo ${item.rep}`}
									className="rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
								>
									<ChevronRight strokeWidth={1.5} className="size-4" />
								</Button>
							</div>
							<p className="mt-4 font-semibold text-sm leading-snug">
								{item.titolo}
							</p>
							<p className="mt-1 text-xs text-zinc-600 leading-relaxed dark:text-zinc-400">
								{item.sottotitolo}
							</p>
							<div className="mt-4 flex items-center justify-between font-medium text-[11px] text-zinc-500 dark:text-zinc-400">
								<span className="tabular-nums">{item.data}</span>
								<span className="tabular-nums">{item.footer}</span>
							</div>
						</DwGlassPanel>
					))}
				</div>
			</section>

			<section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)]">
				<DwGlassPanel className="rounded-[var(--dw-radius-panel)]">
					<div className="border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
						<h2 className="font-semibold text-base tracking-tight">
							Richieste recenti
						</h2>
						<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
							Stato delle ultime pratiche richieste alla segreteria.
						</p>
					</div>
					<div className="divide-y divide-zinc-950/5 dark:divide-white/10">
						{dwRichiesteRecenti.map((row) => (
							<div
								key={row.id}
								className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
							>
								<div className="min-w-0">
									<p className="font-semibold text-xs text-zinc-500 uppercase tracking-wide dark:text-zinc-400">
										{row.id}
									</p>
									<p className="mt-1 font-semibold text-sm text-zinc-950 dark:text-zinc-50">
										{row.titolo}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<span className="font-medium text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
										{row.data}
									</span>
									<span
										className={
											row.stato === "evasa"
												? "rounded-full bg-emerald-500/10 px-2.5 py-1 font-semibold text-[11px] text-emerald-800 ring-1 ring-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/25"
												: "rounded-full bg-orange-500/10 px-2.5 py-1 font-semibold text-[11px] text-orange-900 ring-1 ring-orange-500/15 dark:text-orange-200 dark:ring-orange-400/25"
										}
									>
										{row.stato === "evasa" ? "Evasa" : "In corso"}
									</span>
								</div>
							</div>
						))}
					</div>
				</DwGlassPanel>

				<DwGlassPanel className="rounded-[var(--dw-radius-panel)]">
					<div className="border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
						<h2 className="font-semibold text-base tracking-tight">
							Azioni rapide
						</h2>
						<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
							Strumenti frequenti, raggruppati in modo chiaro.
						</p>
					</div>
					<div className="divide-y divide-zinc-950/5 p-2 dark:divide-white/10">
						<Button
							nativeButton={false}
							variant="ghost"
							className="h-auto w-full justify-between rounded-[var(--dw-radius-panel)] px-4 py-4 text-left active:scale-[0.99]"
							render={<Link href="/fascicoli" />}
						>
							<span className="flex items-center gap-3">
								<span className="grid size-10 place-items-center rounded-[1.125rem] bg-[var(--dw-accent-soft)] shadow-[var(--dw-inner-lit)] ring-1 ring-[var(--dw-accent)]/18 dark:ring-white/12">
									<SearchIcon
										strokeWidth={1.5}
										className="size-4 text-zinc-900 dark:text-zinc-50"
									/>
								</span>
								<span className="grid gap-0.5">
									<span className="font-semibold text-sm">
										Cerca un fascicolo
									</span>
									<span className="font-medium text-xs text-zinc-500 dark:text-zinc-400">
										Filtra per repertorio e parti
									</span>
								</span>
							</span>
							<ChevronRight
								strokeWidth={1.5}
								className="size-4 text-zinc-400"
							/>
						</Button>

						<Link
							href="/richiesta-fascicoli"
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"flex h-auto w-full items-center justify-between rounded-[var(--dw-radius-panel)] px-4 py-4 text-left active:scale-[0.99]",
							)}
						>
							<span className="flex items-center gap-3">
								<span className="grid size-10 place-items-center rounded-[1.125rem] bg-[var(--dw-accent-soft)] shadow-[var(--dw-inner-lit)] ring-1 ring-[var(--dw-accent)]/18 dark:ring-white/12">
									<FileText
										strokeWidth={1.5}
										className="size-4 text-zinc-900 dark:text-zinc-50"
									/>
								</span>
								<span className="grid gap-0.5">
									<span className="font-semibold text-sm">
										Richiesta nuovo fascicolo
									</span>
									<span className="font-medium text-xs text-zinc-500 dark:text-zinc-400">
										Invio alla conservazione digitale
									</span>
								</span>
							</span>
							<ChevronRight
								strokeWidth={1.5}
								className="size-4 text-zinc-400"
							/>
						</Link>

						<Button
							variant="ghost"
							className="h-auto w-full justify-between rounded-[var(--dw-radius-panel)] px-4 py-4 text-left active:scale-[0.99]"
							type="button"
						>
							<span className="flex items-center gap-3">
								<span className="grid size-10 place-items-center rounded-[1.125rem] bg-[var(--dw-accent-soft)] shadow-[var(--dw-inner-lit)] ring-1 ring-[var(--dw-accent)]/18 dark:ring-white/12">
									<Download
										strokeWidth={1.5}
										className="size-4 text-zinc-900 dark:text-zinc-50"
									/>
								</span>
								<span className="grid gap-0.5">
									<span className="font-semibold text-sm">Esporta elenco</span>
									<span className="font-medium text-xs text-zinc-500 dark:text-zinc-400">
										CSV con colonne studio-ready
									</span>
								</span>
							</span>
							<ChevronRight
								strokeWidth={1.5}
								className="size-4 text-zinc-400"
							/>
						</Button>
					</div>
				</DwGlassPanel>
			</section>
		</main>
	);
}
