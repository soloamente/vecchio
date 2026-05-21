import { Button } from "@vecchio/ui/components/button";
import { Input } from "@vecchio/ui/components/input";
import { Label } from "@vecchio/ui/components/label";
import { List } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DsgMostraButton } from "@/components/dataweb/dsg-mostra-button";
import {
	DsgCard,
	DsgPanelHeader,
	dsgBtnPrimary,
	dsgEyebrow,
	dsgH1,
	dsgInput,
	dsgLabel,
	dsgLead,
	dsgPageMain,
	dsgTableHead,
} from "@/components/dataweb/dsg-ui";
import { dwSuccessioniRows } from "@/lib/dataweb-mock-data";

export const metadata: Metadata = {
	title: "Successioni | DSG Portale",
	description: "Ricerca e consultazione fascicoli di successione.",
};

/** Pagina dedicata alle successioni (separata da Fascicoli Notarili). */
export default function SuccessioniPage() {
	return (
		<main className={dsgPageMain}>
			<div className="space-y-1">
				<p className={dsgEyebrow}>Elenco documenti</p>
				<h1 className={dsgH1}>Successioni</h1>
				<p className={dsgLead}>
					Ricerca per data atto e anagrafica parti delle pratiche successorie.
				</p>
			</div>

			<DsgCard id="dw-successioni-search" className="mt-8 scroll-mt-28">
				<DsgPanelHeader
					title="Ricerca documento"
					description="Filtra le pratiche di successione dello studio."
				/>
				<form
					className="grid gap-4 px-5 py-5 md:grid-cols-2"
					action="#"
					method="get"
				>
					<div className="grid gap-2">
						<Label htmlFor="data-atto-succ" className={dsgLabel}>
							Data atto
						</Label>
						<Input
							id="data-atto-succ"
							name="data-atto"
							type="date"
							className={dsgInput}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="parti-succ" className={dsgLabel}>
							Anagrafica parti
						</Label>
						<Input
							id="parti-succ"
							name="parti"
							placeholder="Cognome o denominazione"
							autoComplete="off"
							spellCheck={false}
							className={dsgInput}
						/>
					</div>
					<div className="flex items-end justify-end md:col-span-2">
						<Button type="submit" className={dsgBtnPrimary}>
							Cerca
						</Button>
					</div>
				</form>
			</DsgCard>

			<DsgCard className="mt-6 overflow-hidden">
				<DsgPanelHeader
					title="Risultati ricerca"
					description={`${dwSuccessioniRows.length} pratiche trovate (demo).`}
					icon={<List strokeWidth={1.75} className="size-4" />}
				/>
				<div className="overflow-x-auto">
					<table className="w-full min-w-[640px] border-collapse text-left text-sm">
						<thead className={dsgTableHead}>
							<tr className="[&_th]:border-[var(--dsg-border)] [&_th]:border-b">
								<th className="px-5 py-4">Data atto</th>
								<th className="px-5 py-4">Anagrafica parti</th>
								<th className="px-5 py-4">Sottofascicoli</th>
							</tr>
						</thead>
						<tbody className="[&_td]:border-[var(--dsg-border)] [&_td]:border-b">
							{dwSuccessioniRows.map((row) => (
								<tr
									key={row.id}
									className="transition-colors hover:bg-[#f9fafb]"
								>
									<td className="px-5 py-4 text-[var(--dsg-text-muted)] tabular-nums">
										{row.dataAtto}
									</td>
									<td className="max-w-[480px] px-5 py-4 font-medium text-[var(--dsg-text)]">
										{row.parti}
									</td>
									<td className="px-5 py-4">
										<DsgMostraButton href={`/successioni/${row.id}`} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</DsgCard>

			<p className="mt-8 text-[12px] text-[var(--dsg-text-muted)]">
				Per gli atti notarili generici apri{" "}
				<Link
					href="/fascicoli"
					className="font-medium text-[var(--dsg-primary)] hover:underline"
				>
					Fascicoli Notarili
				</Link>
				.
			</p>
		</main>
	);
}
