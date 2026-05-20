import { Button } from "@vecchio/ui/components/button";
import {
	ArrowLeft,
	ChevronRight,
	Download,
	Minus,
	Plus,
	Printer,
	Share2,
	Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DwGlassPanel } from "@/components/dataweb/dw-glass-panel";
import { FascicoliClassToolbar } from "@/components/dataweb/fascicoli-class-toolbar";
import type { DwFascicoloDetail } from "@/lib/dataweb-detail";
import { dwFascicoliDetailById } from "@/lib/dataweb-detail";
import {
	dwCronologia,
	dwIndicePagine,
	dwRecentFascicoli,
	dwTableRows,
} from "@/lib/dataweb-mock-data";

interface FascicoloDetailPageProps {
	params: Promise<{ id: string }>;
}

function fallbackDetail(id: string): DwFascicoloDetail {
	return {
		id,
		titolo: `Fascicolo repertorio ${id}`,
		sottotitolo:
			"Scheda dimostrativa — dataset mock non ancora arricchito per questo repertorio.",
		repTag: `Rep. ${id}`,
		racTag: "Racc. —",
		stato: "archiviato",
		pagine: 18,
		allegati: 3,
		sottofascicoli: 1,
		meta: [
			{ label: "Tipologia atto", value: "Documentazione allegata" },
			{ label: "Notaio rogante", value: "Notaio Dimostrativo" },
			{ label: "Data stipula", value: "—" },
			{ label: "Luogo stipula", value: "Padova — Studio Demo" },
			{
				label: "Note interne",
				value: "Aprire una richiesta per indicizzazione completa.",
			},
		],
		sottoFascicoli: [{ label: "Sottofascicolo unico", pagine: 18 }],
	};
}

/** Static generation paths mirror the demo table/recent cards so previews stay fast. */
export function generateStaticParams() {
	const ids = new Set<string>([
		...Object.keys(dwFascicoliDetailById),
		...dwTableRows.map((row) => row.repertorio),
		...dwRecentFascicoli.map((row) => row.id),
	]);

	return Array.from(ids).map((id) => ({ id }));
}

/** Three-pane dossier workspace: index, preview canvas, metadata + history (Italian labels). */
export default async function FascicoloDetailPage(
	props: FascicoloDetailPageProps,
) {
	const { id } = await props.params;

	if (!/^\d+$/.test(id)) {
		notFound();
	}

	const dossier = dwFascicoliDetailById[id] ?? fallbackDetail(id);

	return (
		<main className="w-full px-5 py-7 lg:px-6 lg:py-9">
			{/* Stesso inset orizzontale della barra ricerca (vedi DataWebTopBar). */}
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div className="min-w-0 space-y-3">
						<Button
							nativeButton={false}
							variant="ghost"
							size="sm"
							render={<Link href="/fascicoli" />}
							className="-ml-2 rounded-full"
						>
							<ArrowLeft strokeWidth={1.5} className="size-4" />
							Fascicoli Notarili — Rep. {dossier.id}
						</Button>

						<div className="flex flex-wrap items-center gap-2">
							<span className="rounded-full bg-[var(--dw-accent-soft)] px-3 py-1 font-semibold text-[11px] text-zinc-950 ring-1 ring-[var(--dw-accent)]/15 dark:text-zinc-50 dark:ring-white/10">
								{dossier.repTag}
							</span>
							<span className="rounded-full bg-white/65 px-3 py-1 font-semibold text-[11px] text-zinc-800 ring-1 ring-zinc-950/5 dark:bg-white/5 dark:text-zinc-200 dark:ring-white/10">
								{dossier.racTag}
							</span>
							<span
								className={
									dossier.stato === "archiviato"
										? "inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-[11px] text-emerald-900 ring-1 ring-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-400/25"
										: "inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 font-semibold text-[11px] text-amber-950 ring-1 ring-amber-500/15 dark:text-amber-200 dark:ring-amber-400/25"
								}
							>
								<span
									className={
										dossier.stato === "archiviato"
											? "size-2 rounded-full bg-emerald-600"
											: "size-2 rounded-full bg-amber-600"
									}
									aria-hidden
								/>
								{dossier.stato === "archiviato"
									? "Archiviato"
									: "In lavorazione"}
							</span>
						</div>

						<div className="space-y-2">
							<h1 className="text-balance font-semibold text-3xl tracking-tight md:text-[34px]">
								{dossier.titolo}
							</h1>
							<p className="max-w-[72ch] text-sm text-zinc-600 leading-relaxed dark:text-zinc-300">
								{dossier.sottotitolo}
							</p>
						</div>
					</div>

					<div className="flex flex-col items-stretch gap-3 lg:items-end">
						<div className="flex flex-wrap gap-2 lg:justify-end">
							<Button
								type="button"
								variant="outline"
								className="rounded-full bg-white/72 shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.06] dark:bg-zinc-950/38 dark:ring-white/10"
							>
								<Star strokeWidth={1.5} className="size-4" />
								Preferito
							</Button>
							<Button
								type="button"
								variant="outline"
								className="rounded-full bg-white/72 shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.06] dark:bg-zinc-950/38 dark:ring-white/10"
							>
								<Share2 strokeWidth={1.5} className="size-4" />
								Condividi
							</Button>
							<Button
								type="button"
								variant="outline"
								className="rounded-full bg-white/72 shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.06] dark:bg-zinc-950/38 dark:ring-white/10"
							>
								<Printer strokeWidth={1.5} className="size-4" />
								Stampa
							</Button>
							<Button
								type="button"
								className="rounded-full px-6 shadow-[var(--dw-inner-lit)]"
							>
								<Download strokeWidth={1.5} className="size-4" />
								Scarica PDF
							</Button>
						</div>

						<DwGlassPanel className="flex w-full flex-wrap gap-4 rounded-[var(--dw-radius-panel)] px-4 py-3 lg:max-w-xl lg:justify-end">
							<div className="min-w-[110px]">
								<p className="font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
									Pagine
								</p>
								<p className="mt-1 font-mono font-semibold text-2xl tabular-nums tracking-tight">
									{dossier.pagine}
								</p>
							</div>
							<div className="min-w-[110px]">
								<p className="font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
									Allegati
								</p>
								<p className="mt-1 font-mono font-semibold text-2xl tabular-nums tracking-tight">
									{dossier.allegati}
								</p>
							</div>
							<div className="min-w-[140px]">
								<p className="font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
									Sottofascicoli
								</p>
								<p className="mt-1 font-mono font-semibold text-2xl tabular-nums tracking-tight">
									{dossier.sottofascicoli}
								</p>
							</div>
						</DwGlassPanel>
					</div>
				</div>
			</div>

			{/* Same class toolbar as list/home: jumps to fascicoli filters + tab navigation. */}
			<div className="mt-4 flex flex-col gap-2">
				<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
					Classi documentali
				</p>
				<div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
					<FascicoliClassToolbar filtersHref="/fascicoli#dw-fascicoli-filters" />
				</div>
			</div>

			<section className="mt-8 grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)_340px]">
				<DwGlassPanel className="rounded-[var(--dw-radius-panel)] p-4">
					<p className="px-2 font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
						Pagine
					</p>
					<nav className="mt-3 space-y-1" aria-label="Indice fascicolo">
						{dwIndicePagine.map((voce, idx) => {
							const active = idx === 0;
							return (
								<button
									key={voce.id}
									type="button"
									className={
										active
											? "flex w-full items-center justify-between gap-3 rounded-full bg-white px-3 py-2 text-left font-semibold text-sm text-zinc-950 shadow-[var(--dw-inner-lit),0_18px_42px_-30px_oklch(0.22_0.04_264/0.35)] ring-1 ring-zinc-950/6 dark:bg-white/12 dark:text-zinc-50 dark:ring-white/12"
											: "flex w-full items-center justify-between gap-3 rounded-full px-3 py-2 text-left font-medium text-sm text-zinc-700 transition-colors hover:bg-white/55 dark:text-zinc-200 dark:hover:bg-white/5"
									}
								>
									<span className="min-w-0 truncate">
										<span className="mr-2 font-mono font-semibold text-xs text-zinc-400 tabular-nums">
											{voce.id}
										</span>
										{voce.label}
									</span>
									<span className="flex items-center gap-2">
										{voce.allegato ? (
											<span className="rounded-md bg-[var(--dw-accent-soft)] px-1.5 py-0.5 font-semibold text-[10px] text-zinc-900 ring-1 ring-[var(--dw-accent)]/15 dark:text-zinc-50 dark:ring-white/10">
												ALL.
											</span>
										) : null}
										<ChevronRight
											strokeWidth={1.5}
											className="size-4 text-zinc-400"
										/>
									</span>
								</button>
							);
						})}
					</nav>
				</DwGlassPanel>

				<DwGlassPanel className="rounded-[var(--dw-radius-panel)]">
					<div className="flex flex-wrap items-center justify-between gap-3 border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
						<div className="flex flex-wrap items-center gap-2 font-semibold text-xs text-zinc-600 dark:text-zinc-300">
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className="rounded-full"
								aria-label="Pagina precedente"
							>
								<ChevronRight strokeWidth={1.5} className="size-4 rotate-180" />
							</Button>
							<span className="font-mono tabular-nums">
								1<span className="mx-1 text-zinc-400">/</span>18
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className="rounded-full"
								aria-label="Pagina successiva"
							>
								<ChevronRight strokeWidth={1.5} className="size-4" />
							</Button>
							<span className="ml-2 hidden font-semibold text-sm text-zinc-950 md:inline dark:text-zinc-50">
								Frontespizio
							</span>
						</div>

						<div className="flex items-center gap-2">
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className="rounded-full"
								aria-label="Zoom indietro"
							>
								<Minus strokeWidth={1.5} className="size-4" />
							</Button>
							<span className="min-w-[52px] text-center font-mono font-semibold text-xs text-zinc-700 tabular-nums dark:text-zinc-200">
								100%
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className="rounded-full"
								aria-label="Zoom avanti"
							>
								<Plus strokeWidth={1.5} className="size-4" />
							</Button>
						</div>
					</div>

					{/* Preview pane reads like parchment + subtle grain; avoids embedding heavy PDF viewers for the demo. */}
					<div className="p-5">
						<div className="relative mx-auto aspect-[210/297] max-h-[720px] w-full max-w-[620px] overflow-hidden rounded-[var(--dw-radius-panel)] bg-[oklch(0.97_0.03_95)] shadow-[var(--dw-inner-lit),0_28px_72px_-36px_oklch(0.22_0.04_264/0.45)] ring-1 ring-zinc-950/10 dark:bg-[oklch(0.23_0.02_95)] dark:ring-white/10">
							<div className="dw-doc-grain pointer-events-none absolute inset-0 opacity-70" />
							<div className="relative space-y-6 p-10">
								<div className="space-y-2">
									<p className="font-semibold text-[11px] text-zinc-700 uppercase tracking-[0.24em]">
										Repubblica Italiana
									</p>
									<p className="font-semibold text-sm text-zinc-900 uppercase tracking-[0.08em]">
										Atto
									</p>
								</div>
								<div className="space-y-3 pt-6">
									<div className="h-2 w-full rounded-full bg-zinc-900/10" />
									<div className="h-2 w-[92%] rounded-full bg-zinc-900/10" />
									<div className="h-2 w-[84%] rounded-full bg-zinc-900/10" />
									<div className="h-2 w-full rounded-full bg-zinc-900/10" />
									<div className="h-2 w-[76%] rounded-full bg-zinc-900/10" />
								</div>

								<div className="pointer-events-none absolute bottom-10 left-10 grid size-16 place-items-center rounded-full bg-rose-600/90 font-semibold text-[10px] text-white tracking-wide shadow-[0_18px_44px_-26px_rgba(225,29,72,0.65)] ring-2 ring-white/35">
									SIGIL
								</div>
							</div>
						</div>
					</div>
				</DwGlassPanel>

				<div className="space-y-5">
					<DwGlassPanel className="rounded-[var(--dw-radius-panel)]">
						<div className="border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
							<h2 className="font-semibold text-sm tracking-tight">
								Dati fascicolo
							</h2>
							<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
								Campi principali estratti dalla scheda.
							</p>
						</div>
						<div className="divide-y divide-zinc-950/5 px-5 py-2 dark:divide-white/10">
							{dossier.meta.map((row) => (
								<div key={row.label} className="grid gap-1 py-3">
									<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-wide dark:text-zinc-400">
										{row.label}
									</p>
									<p className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
										{row.value}
									</p>
								</div>
							))}
						</div>
					</DwGlassPanel>

					<DwGlassPanel className="rounded-[var(--dw-radius-panel)]">
						<div className="border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
							<h2 className="font-semibold text-sm tracking-tight">
								Sottofascicoli
							</h2>
							<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
								Suddivisioni interne con conteggio pagine.
							</p>
						</div>
						<div className="divide-y divide-zinc-950/5 px-5 py-2 dark:divide-white/10">
							{dossier.sottoFascicoli.map((sf) => (
								<div
									key={sf.label}
									className="flex items-center justify-between gap-3 py-3"
								>
									<p className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
										{sf.label}
									</p>
									<p className="font-mono font-semibold text-xs text-zinc-600 tabular-nums dark:text-zinc-300">
										{sf.pagine} pp
									</p>
								</div>
							))}
						</div>
					</DwGlassPanel>

					<DwGlassPanel className="rounded-[var(--dw-radius-panel)]">
						<div className="border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
							<h2 className="font-semibold text-sm tracking-tight">
								Cronologia
							</h2>
							<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
								Ultime azioni registrate sul fascicolo.
							</p>
						</div>
						<div className="px-5 py-4">
							<ol className="relative space-y-5">
								<div
									className="absolute top-2 bottom-2 left-[9px] w-px bg-zinc-950/10 dark:bg-white/10"
									aria-hidden
								/>
								{dwCronologia.map((voce) => (
									<li
										key={`${voce.azione}-${voce.quando}`}
										className="relative pl-7"
									>
										<span className="absolute top-2 left-1 size-2 rounded-full bg-[var(--dw-accent)] shadow-[0_0_0_6px_var(--dw-accent-soft)]" />
										<p className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
											{voce.azione}
										</p>
										<p className="mt-1 font-medium text-xs text-zinc-600 dark:text-zinc-300">
											{voce.attore}
										</p>
										<p className="mt-1 font-semibold text-[11px] text-zinc-500 tabular-nums dark:text-zinc-400">
											{voce.quando}
										</p>
									</li>
								))}
							</ol>
						</div>
					</DwGlassPanel>
				</div>
			</section>
		</main>
	);
}
