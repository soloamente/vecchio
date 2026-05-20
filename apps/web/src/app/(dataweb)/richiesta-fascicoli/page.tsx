import { Button, buttonVariants } from "@vecchio/ui/components/button";
import { Input } from "@vecchio/ui/components/input";
import { Label } from "@vecchio/ui/components/label";
import { cn } from "@vecchio/ui/lib/utils";
import { ArrowLeft, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DwGlassPanel } from "@/components/dataweb/dw-glass-panel";

export const metadata: Metadata = {
	title: "Richiesta fascicoli | DataWeb",
	description:
		"Modulo demo per richiedere copie o consultazioni di fascicoli notarili presso la conservazione digitale.",
};

/** Input chrome aligned with other DataWeb full-width fields (rounded “pill” row). */
const fieldClassName =
	"h-11 w-full rounded-full border border-zinc-200/70 bg-white/72 px-4 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] outline-none transition-[box-shadow,ring-color] focus-visible:ring-2 focus-visible:ring-sky-500/70 dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10";

const textareaClassName =
	"min-h-[140px] w-full resize-y rounded-[var(--dw-radius-panel)] border border-zinc-200/70 bg-white/72 px-4 py-3 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] outline-none transition-[box-shadow,ring-color] focus-visible:ring-2 focus-visible:ring-sky-500/70 dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10";

/**
 * Richiesta fascicoli — richiesta formale verso la segreteria / conservazione (mock UI).
 * Nessun backend: `action="#"` e submit solo dimostrativo.
 */
export default function RichiestaFascicoliPage() {
	return (
		<main className="w-full px-5 py-7 lg:px-6 lg:py-9">
			<div className="flex flex-col gap-2">
				<p className="font-semibold text-[11px] text-zinc-500 uppercase tracking-[0.14em] dark:text-zinc-400">
					Pratiche
				</p>
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div className="space-y-3">
						<Link
							href="/fascicoli"
							className={cn(
								buttonVariants({ variant: "ghost", size: "sm" }),
								"-ml-2 inline-flex items-center gap-2 rounded-full",
							)}
						>
							<ArrowLeft strokeWidth={1.5} className="size-4" />
							Torna ai fascicoli
						</Link>
						<div className="space-y-2">
							<h1 className="text-balance font-semibold text-3xl tracking-tight md:text-[34px]">
								Richiesta fascicoli
							</h1>
							<p className="max-w-[62ch] font-medium text-sm text-zinc-600 leading-relaxed dark:text-zinc-300">
								Compila i campi per aprire una pratica verso la conservazione digitale. In
								questa demo i dati non vengono inviati: serve solo a validare layout e flusso
								operativo.
							</p>
						</div>
					</div>
				</div>
			</div>

			<DwGlassPanel className="mt-7 rounded-[var(--dw-radius-panel)]">
				<div className="flex items-start justify-between gap-4 border-zinc-950/5 border-b px-5 py-4 dark:border-white/10">
					<div className="flex items-center gap-2">
						<span className="grid size-10 place-items-center rounded-[1.125rem] bg-[var(--dw-accent-soft)] shadow-[var(--dw-inner-lit)] ring-1 ring-[var(--dw-accent)]/18 dark:ring-white/12">
							<ScrollText
								strokeWidth={1.5}
								className="size-4 text-zinc-900 dark:text-zinc-50"
							/>
						</span>
						<div>
							<h2 className="font-semibold text-sm tracking-tight">Nuova richiesta</h2>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Tipologia, identificativi fascicolo e note per la segreteria.
							</p>
						</div>
					</div>
				</div>

				<form className="grid gap-6 px-5 py-6" action="#" method="get">
					<div className="grid gap-2 md:max-w-md">
						<Label
							htmlFor="tipo-richiesta"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Tipologia richiesta
						</Label>
						<select
							id="tipo-richiesta"
							name="tipo"
							required
							defaultValue=""
							className={fieldClassName}
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
							<Label
								htmlFor="rep-richiesta"
								className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
							>
								Numero repertorio
							</Label>
							<Input
								id="rep-richiesta"
								name="rep"
								placeholder="es. 1562"
								autoComplete="off"
								spellCheck={false}
								className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
							/>
						</div>
						<div className="grid gap-2">
							<Label
								htmlFor="rac-richiesta"
								className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
							>
								Numero raccolta
							</Label>
							<Input
								id="rac-richiesta"
								name="rac"
								placeholder="es. 1193"
								autoComplete="off"
								spellCheck={false}
								className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
							/>
						</div>
					</div>

					<div className="grid gap-2">
						<Label
							htmlFor="intestazione"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Intestazione / parti richiedenti
						</Label>
						<Input
							id="intestazione"
							name="intestazione"
							placeholder="Cognome e nome o denominazione"
							autoComplete="organization"
							spellCheck={false}
							className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
						/>
					</div>

					<div className="grid gap-2">
						<Label
							htmlFor="pec"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							PEC di recapito
						</Label>
						<Input
							id="pec"
							name="pec"
							type="email"
							autoComplete="email"
							spellCheck={false}
							placeholder="studio@pec.it"
							className="h-11 rounded-full border-zinc-200/70 bg-white/72 text-sm shadow-[var(--dw-inner-lit)] ring-1 ring-zinc-950/[0.05] dark:border-white/10 dark:bg-zinc-950/38 dark:ring-white/10"
						/>
					</div>

					<div className="grid gap-2">
						<Label
							htmlFor="note"
							className="font-semibold text-xs text-zinc-700 dark:text-zinc-200"
						>
							Note e finalità
						</Label>
						<textarea
							id="note"
							name="note"
							rows={5}
							placeholder="Indica scadenze, riferimenti di pratica interna o allegati da richiedere."
							spellCheck={true}
							className={textareaClassName}
						/>
					</div>

					{/* Native checkbox keeps the page a server component; tap target padded via peer row. */}
					<div className="flex items-start gap-3 rounded-[var(--dw-radius-panel)] bg-white/35 px-4 py-3 ring-1 ring-zinc-950/[0.05] dark:bg-white/[0.04] dark:ring-white/10">
						<input
							id="informativa"
							name="informativa"
							type="checkbox"
							required
							className="mt-1 size-4 shrink-0 rounded border border-zinc-300 text-sky-600 accent-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:ring-offset-2 dark:border-zinc-600"
						/>
						<label
							htmlFor="informativa"
							className="font-medium text-xs text-zinc-700 leading-relaxed dark:text-zinc-200"
						>
							Dichiaro di aver preso visione dell&apos;informativa sul trattamento dei dati e
							dell&apos;impegno a utilizzare le copie esclusivamente per finalità professionali
							consentite.
						</label>
					</div>

					<div className="flex flex-wrap items-center justify-end gap-3 border-zinc-950/5 border-t pt-2 dark:border-white/10">
						<Button
							type="reset"
							variant="ghost"
							className="rounded-full font-semibold text-xs"
						>
							Annulla
						</Button>
						<Button type="submit" className="rounded-full px-8 shadow-[var(--dw-inner-lit)]">
							Invia richiesta
						</Button>
					</div>
				</form>
			</DwGlassPanel>
		</main>
	);
}
