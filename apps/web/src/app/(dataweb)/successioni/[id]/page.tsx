import { Button } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	DsgCard,
	DsgPanelHeader,
	DsgTag,
	dsgBtnPrimary,
	dsgEyebrow,
	dsgH1,
	dsgLead,
	dsgPageMain,
} from "@/components/dataweb/dsg-ui";
import { dwCronologia, dwIndicePagine, dwSuccessioniRows } from "@/lib/dataweb-mock-data";
import { dwFascicoliDetailById } from "@/lib/dataweb-detail";

interface SuccessioneDetailPageProps {
	params: Promise<{ id: string }>;
}

export function generateStaticParams() {
	return dwSuccessioniRows.map((row) => ({ id: row.id }));
}

/** Dettaglio pratica successione — stesso layout DSG del fascicolo notarile. */
export default async function SuccessioneDetailPage(
	props: SuccessioneDetailPageProps,
) {
	const { id } = await props.params;
	const row = dwSuccessioniRows.find((r) => r.id === id);

	if (!row) {
		notFound();
	}

	const dossier =
		dwFascicoliDetailById[id] ??
		dwFascicoliDetailById["5212"] ?? {
			id,
			titolo: `Successione — ${row.parti}`,
			sottotitolo: `Pratica del ${row.dataAtto} (dataset demo).`,
			repTag: "Successione",
			racTag: row.dataAtto,
			stato: "archiviato" as const,
			pagine: 24,
			allegati: 6,
			sottofascicoli: 1,
			meta: [
				{ label: "Data atto", value: row.dataAtto },
				{ label: "Anagrafica parti", value: row.parti },
				{ label: "Tipologia", value: "Successione" },
			],
			sottoFascicoli: [{ label: "Sottofascicolo principale", pagine: 24 }],
		};

	return (
		<main className={dsgPageMain}>
			<div className="space-y-4">
				<Button
					nativeButton={false}
					variant="ghost"
					size="sm"
					render={<Link href="/successioni" />}
					className="-ml-2 text-[var(--dsg-text-muted)] hover:text-[var(--dsg-text)]"
				>
					<ArrowLeft strokeWidth={1.75} className="size-4" />
					Torna a Successioni
				</Button>

				<div className="flex flex-wrap items-center gap-2">
					<DsgTag tone="primary">Successione</DsgTag>
					<DsgTag>{row.dataAtto}</DsgTag>
				</div>

				<div className="space-y-1">
					<h1 className={dsgH1}>{dossier.titolo}</h1>
					<p className={dsgLead}>{dossier.sottotitolo}</p>
				</div>

				<div className="flex flex-wrap gap-2">
					<Button type="button" className={cn(dsgBtnPrimary, "gap-2")}>
						<Download strokeWidth={1.75} className="size-4" />
						Scarica PDF
					</Button>
				</div>
			</div>

			<section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
				<DsgCard className="p-5">
					<p className={dsgEyebrow}>Anteprima documento</p>
					<div className="relative mx-auto mt-4 aspect-[210/297] max-h-[640px] w-full max-w-[520px] overflow-hidden rounded-[var(--dsg-radius-card)] border border-[var(--dsg-border)] bg-[#faf8f5]">
						<div className="dw-doc-grain pointer-events-none absolute inset-0 opacity-50" />
						<div className="relative space-y-4 p-8 text-sm text-zinc-700">
							<p className="font-semibold uppercase tracking-[0.2em]">
								Pratica successorio
							</p>
							<p>{row.parti}</p>
							<div className="space-y-2 pt-4">
								<div className="h-2 w-full rounded-full bg-zinc-900/8" />
								<div className="h-2 w-[90%] rounded-full bg-zinc-900/8" />
								<div className="h-2 w-[80%] rounded-full bg-zinc-900/8" />
							</div>
						</div>
					</div>
				</DsgCard>

				<div className="space-y-5">
					<DsgCard>
						<DsgPanelHeader
							title="Dati pratica"
							description="Informazioni principali della successione."
						/>
						<div className="divide-y divide-[var(--dsg-border)] px-5 py-2">
							{dossier.meta.map((item) => (
								<div key={item.label} className="grid gap-1 py-3">
									<p className={dsgEyebrow}>{item.label}</p>
									<p className="font-medium text-[14px] text-[var(--dsg-text)]">
										{item.value}
									</p>
								</div>
							))}
						</div>
					</DsgCard>

					<DsgCard>
						<DsgPanelHeader title="Indice pagine" />
						<ul className="divide-y divide-[var(--dsg-border)] px-5">
							{dwIndicePagine.slice(0, 4).map((voce) => (
								<li
									key={voce.id}
									className="py-3 font-medium text-[14px] text-[var(--dsg-text)]"
								>
									<span className="mr-2 font-mono text-[12px] text-[var(--dsg-text-muted)]">
										{voce.id}
									</span>
									{voce.label}
								</li>
							))}
						</ul>
					</DsgCard>

					<DsgCard>
						<DsgPanelHeader title="Cronologia" />
						<ul className="space-y-4 px-5 py-4">
							{dwCronologia.map((voce) => (
								<li key={voce.quando}>
									<p className="font-medium text-[14px] text-[var(--dsg-text)]">
										{voce.azione}
									</p>
									<p className="text-[13px] text-[var(--dsg-text-muted)]">
										{voce.attore} · {voce.quando}
									</p>
								</li>
							))}
						</ul>
					</DsgCard>
				</div>
			</section>
		</main>
	);
}
