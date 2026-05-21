import { Button } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
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
import {
	DsgCard,
	DsgPanelHeader,
	DsgStatusBadge,
	DsgTag,
	dsgBtnOutline,
	dsgBtnPrimary,
	dsgDivide,
	dsgEyebrow,
	dsgH1,
	dsgLead,
	dsgPageMain,
} from "@/components/dataweb/dsg-ui";
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

export function generateStaticParams() {
	const ids = new Set<string>([
		...Object.keys(dwFascicoliDetailById),
		...dwTableRows.map((row) => row.repertorio),
		...dwRecentFascicoli.map((row) => row.id),
	]);
	return Array.from(ids).map((id) => ({ id }));
}

/** Three-pane dossier workspace — DSG portale cards and light surfaces. */
export default async function FascicoloDetailPage(
	props: FascicoloDetailPageProps,
) {
	const { id } = await props.params;

	if (!/^\d+$/.test(id)) {
		notFound();
	}

	const dossier = dwFascicoliDetailById[id] ?? fallbackDetail(id);

	return (
		<main className={dsgPageMain}>
			<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div className="min-w-0 space-y-4">
					<Button
						nativeButton={false}
						variant="ghost"
						size="sm"
						render={<Link href="/fascicoli" />}
						className="-ml-2 text-[var(--dsg-text-muted)] hover:text-[var(--dsg-text)]"
					>
						<ArrowLeft strokeWidth={1.75} className="size-4" />
						Fascicoli Notarili — Rep. {dossier.id}
					</Button>

					<div className="flex flex-wrap items-center gap-2">
						<DsgTag tone="primary">{dossier.repTag}</DsgTag>
						<DsgTag>{dossier.racTag}</DsgTag>
						<DsgStatusBadge stato={dossier.stato} />
					</div>

					<div className="space-y-1">
						<h1 className={dsgH1}>{dossier.titolo}</h1>
						<p className={dsgLead}>{dossier.sottotitolo}</p>
					</div>
				</div>

				<div className="flex w-full flex-col gap-3 lg:max-w-md lg:items-end">
					<div className="flex flex-wrap gap-2 lg:justify-end">
						<Button type="button" variant="outline" className={cn(dsgBtnOutline, "gap-2")}>
							<Star strokeWidth={1.75} className="size-4" />
							Preferito
						</Button>
						<Button type="button" variant="outline" className={cn(dsgBtnOutline, "gap-2")}>
							<Share2 strokeWidth={1.75} className="size-4" />
							Condividi
						</Button>
						<Button type="button" variant="outline" className={cn(dsgBtnOutline, "gap-2")}>
							<Printer strokeWidth={1.75} className="size-4" />
							Stampa
						</Button>
						<Button type="button" className={cn(dsgBtnPrimary, "gap-2")}>
							<Download strokeWidth={1.75} className="size-4" />
							Scarica PDF
						</Button>
					</div>

					<DsgCard className="flex w-full flex-wrap gap-6 px-5 py-4">
						<div>
							<p className={dsgEyebrow}>Pagine</p>
							<p className="mt-1 font-mono font-semibold text-2xl text-[var(--dsg-text)] tabular-nums">
								{dossier.pagine}
							</p>
						</div>
						<div>
							<p className={dsgEyebrow}>Allegati</p>
							<p className="mt-1 font-mono font-semibold text-2xl text-[var(--dsg-text)] tabular-nums">
								{dossier.allegati}
							</p>
						</div>
						<div>
							<p className={dsgEyebrow}>Sottofascicoli</p>
							<p className="mt-1 font-mono font-semibold text-2xl text-[var(--dsg-text)] tabular-nums">
								{dossier.sottofascicoli}
							</p>
						</div>
					</DsgCard>
				</div>
			</div>

			<section className="mt-8 grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)_340px]">
				<DsgCard className="p-4">
					<p className={cn(dsgEyebrow, "px-2")}>Pagine</p>
					<nav className="mt-3 space-y-1" aria-label="Indice fascicolo">
						{dwIndicePagine.map((voce, idx) => {
							const active = idx === 0;
							return (
								<button
									key={voce.id}
									type="button"
									className={cn(
										"flex w-full items-center justify-between gap-3 rounded-[var(--dsg-radius-control)] px-3 py-2 text-left text-[14px] transition-colors",
										active
											? "bg-[var(--dsg-kpi-blue)] font-medium text-[#1d4ed8]"
											: "font-medium text-[var(--dsg-text)] hover:bg-[#f3f4f6]",
									)}
								>
									<span className="min-w-0 truncate">
										<span className="mr-2 font-mono text-[12px] text-[var(--dsg-text-muted)] tabular-nums">
											{voce.id}
										</span>
										{voce.label}
									</span>
									<span className="flex items-center gap-2">
										{voce.allegato ? (
											<span className="rounded-md bg-[var(--dsg-kpi-blue)] px-1.5 py-0.5 font-medium text-[10px] text-[#1d4ed8]">
												ALL.
											</span>
										) : null}
										<ChevronRight
											strokeWidth={1.75}
											className="size-4 text-[var(--dsg-text-muted)]"
										/>
									</span>
								</button>
							);
						})}
					</nav>
				</DsgCard>

				<DsgCard>
					<div className="flex flex-wrap items-center justify-between gap-3 border-[var(--dsg-border)] border-b px-5 py-4">
						<div className="flex flex-wrap items-center gap-2 text-[14px] text-[var(--dsg-text-muted)]">
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className={dsgBtnOutline}
								aria-label="Pagina precedente"
							>
								<ChevronRight strokeWidth={1.75} className="size-4 rotate-180" />
							</Button>
							<span className="font-mono tabular-nums">
								1<span className="mx-1">/</span>18
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className={dsgBtnOutline}
								aria-label="Pagina successiva"
							>
								<ChevronRight strokeWidth={1.75} className="size-4" />
							</Button>
							<span className="ml-2 hidden font-medium text-[var(--dsg-text)] md:inline">
								Frontespizio
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className={dsgBtnOutline}
								aria-label="Zoom indietro"
							>
								<Minus strokeWidth={1.75} className="size-4" />
							</Button>
							<span className="min-w-[52px] text-center font-mono font-medium text-[13px] text-[var(--dsg-text)] tabular-nums">
								100%
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								className={dsgBtnOutline}
								aria-label="Zoom avanti"
							>
								<Plus strokeWidth={1.75} className="size-4" />
							</Button>
						</div>
					</div>

					<div className="p-5">
						<div className="relative mx-auto aspect-[210/297] max-h-[720px] w-full max-w-[620px] overflow-hidden rounded-[var(--dsg-radius-card)] border border-[var(--dsg-border)] bg-[#faf8f5] shadow-[var(--dsg-shadow-card)]">
							<div className="dw-doc-grain pointer-events-none absolute inset-0 opacity-50" />
							<div className="relative space-y-6 p-10">
								<div className="space-y-2">
									<p className="font-semibold text-[11px] text-zinc-600 uppercase tracking-[0.24em]">
										Repubblica Italiana
									</p>
									<p className="font-semibold text-sm text-zinc-800 uppercase tracking-[0.08em]">
										Atto
									</p>
								</div>
								<div className="space-y-3 pt-6">
									<div className="h-2 w-full rounded-full bg-zinc-900/8" />
									<div className="h-2 w-[92%] rounded-full bg-zinc-900/8" />
									<div className="h-2 w-[84%] rounded-full bg-zinc-900/8" />
									<div className="h-2 w-full rounded-full bg-zinc-900/8" />
									<div className="h-2 w-[76%] rounded-full bg-zinc-900/8" />
								</div>
								<div className="pointer-events-none absolute bottom-10 left-10 grid size-16 place-items-center rounded-full bg-rose-600 font-semibold text-[10px] text-white tracking-wide shadow-md ring-2 ring-white/80">
									SIGIL
								</div>
							</div>
						</div>
					</div>
				</DsgCard>

				<div className="space-y-5">
					<DsgCard>
						<DsgPanelHeader
							title="Dati fascicolo"
							description="Campi principali estratti dalla scheda."
						/>
						<div className={cn(dsgDivide, "px-5 py-2")}>
							{dossier.meta.map((row) => (
								<div key={row.label} className="grid gap-1 py-3">
									<p className={dsgEyebrow}>{row.label}</p>
									<p className="font-medium text-[14px] text-[var(--dsg-text)]">
										{row.value}
									</p>
								</div>
							))}
						</div>
					</DsgCard>

					<DsgCard>
						<DsgPanelHeader
							title="Sottofascicoli"
							description="Suddivisioni interne con conteggio pagine."
						/>
						<div className={cn(dsgDivide, "px-5 py-2")}>
							{dossier.sottoFascicoli.map((sf) => (
								<div
									key={sf.label}
									className="flex items-center justify-between gap-3 py-3"
								>
									<p className="font-medium text-[14px] text-[var(--dsg-text)]">
										{sf.label}
									</p>
									<p className="font-mono font-medium text-[13px] text-[var(--dsg-text-muted)] tabular-nums">
										{sf.pagine} pp
									</p>
								</div>
							))}
						</div>
					</DsgCard>

					<DsgCard>
						<DsgPanelHeader
							title="Cronologia"
							description="Ultime azioni registrate sul fascicolo."
						/>
						<div className="px-5 py-4">
							<ol className="relative space-y-5">
								<div
									className="absolute top-2 bottom-2 left-[9px] w-px bg-[var(--dsg-border)]"
									aria-hidden
								/>
								{dwCronologia.map((voce) => (
									<li
										key={`${voce.azione}-${voce.quando}`}
										className="relative pl-7"
									>
										<span className="absolute top-2 left-1 size-2 rounded-full bg-[var(--dsg-primary)] ring-4 ring-[var(--dsg-kpi-blue)]" />
										<p className="font-medium text-[14px] text-[var(--dsg-text)]">
											{voce.azione}
										</p>
										<p className="mt-1 text-[13px] text-[var(--dsg-text-muted)]">
											{voce.attore}
										</p>
										<p className="mt-1 font-medium text-[12px] text-[var(--dsg-text-muted)] tabular-nums">
											{voce.quando}
										</p>
									</li>
								))}
							</ol>
						</div>
					</DsgCard>
				</div>
			</section>
		</main>
	);
}
