import { Button } from "@vecchio/ui/components/button";
import { Input } from "@vecchio/ui/components/input";
import { Label } from "@vecchio/ui/components/label";
import { ScrollText } from "lucide-react";
import type { Metadata } from "next";
import {
	DsgCard,
	DsgPanelHeader,
	dsgBtnPrimary,
	dsgH1,
	dsgInput,
	dsgLabel,
	dsgLead,
	dsgPageMain,
	dsgSelect,
	dsgTextarea,
} from "@/components/dataweb/dsg-ui";

export const metadata: Metadata = {
	title: "Nuova richiesta | DSG Portale",
	description:
		"Modulo demo per richiedere copie o consultazioni di fascicoli notarili.",
};

/** Richiesta fascicoli — form card in DSG portale style (mock, no backend). */
export default function RichiestaFascicoliPage() {
	return (
		<main className={dsgPageMain}>
			<div className="space-y-1">
				<h1 className={dsgH1}>Richiesta fascicoli</h1>
				<p className={dsgLead}>
					Compila i campi per aprire una pratica verso la conservazione digitale. In
					questa demo i dati non vengono inviati.
				</p>
			</div>

			<DsgCard className="mt-8">
				<DsgPanelHeader
					title="Nuova richiesta"
					description="Tipologia, identificativi fascicolo e note per la segreteria."
					icon={<ScrollText strokeWidth={1.75} className="size-4" />}
				/>
				<form className="grid gap-6 px-5 py-6" action="#" method="get">
					<div className="grid gap-2 md:max-w-md">
						<Label htmlFor="tipo-richiesta" className={dsgLabel}>
							Tipologia richiesta
						</Label>
						<select
							id="tipo-richiesta"
							name="tipo"
							required
							defaultValue=""
							className={dsgSelect}
						>
							<option value="" disabled>
								Seleziona…
							</option>
							<option value="copia-informale">Copia informale / estratto</option>
							<option value="copia-conforme">Copia conforme</option>
							<option value="consultazione">Consultazione in sede</option>
							<option value="trasmissione">Trasmissione telematica atti</option>
						</select>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="rep-richiesta" className={dsgLabel}>
								Numero repertorio
							</Label>
							<Input
								id="rep-richiesta"
								name="rep"
								placeholder="es. 1562"
								autoComplete="off"
								spellCheck={false}
								className={dsgInput}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="rac-richiesta" className={dsgLabel}>
								Numero raccolta
							</Label>
							<Input
								id="rac-richiesta"
								name="rac"
								placeholder="es. 1193"
								autoComplete="off"
								spellCheck={false}
								className={dsgInput}
							/>
						</div>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="intestazione" className={dsgLabel}>
							Intestazione / parti richiedenti
						</Label>
						<Input
							id="intestazione"
							name="intestazione"
							placeholder="Cognome e nome o denominazione"
							autoComplete="organization"
							spellCheck={false}
							className={dsgInput}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="pec" className={dsgLabel}>
							PEC di recapito
						</Label>
						<Input
							id="pec"
							name="pec"
							type="email"
							autoComplete="email"
							spellCheck={false}
							placeholder="studio@pec.it"
							className={dsgInput}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="note" className={dsgLabel}>
							Note e finalità
						</Label>
						<textarea
							id="note"
							name="note"
							rows={5}
							placeholder="Indica scadenze, riferimenti di pratica interna o allegati da richiedere."
							spellCheck={true}
							className={dsgTextarea}
						/>
					</div>

					<div className="flex items-start gap-3 rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-[#f9fafb] px-4 py-3">
						<input
							id="informativa"
							name="informativa"
							type="checkbox"
							required
							className="mt-1 size-4 shrink-0 rounded border-[var(--dsg-border)] accent-[var(--dsg-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dsg-primary)]/30"
						/>
						<label
							htmlFor="informativa"
							className="text-[13px] text-[var(--dsg-text-muted)] leading-relaxed"
						>
							Dichiaro di aver preso visione dell&apos;informativa sul trattamento dei
							dati e dell&apos;impegno a utilizzare le copie esclusivamente per finalità
							professionali consentite.
						</label>
					</div>

					<div className="flex flex-wrap items-center justify-end gap-3 border-[var(--dsg-border)] border-t pt-4">
						<Button
							type="reset"
							variant="ghost"
							className="font-medium text-[14px] text-[var(--dsg-text-muted)]"
						>
							Annulla
						</Button>
						<Button type="submit" className={dsgBtnPrimary}>
							Invia richiesta
						</Button>
					</div>
				</form>
			</DsgCard>
		</main>
	);
}
