/** Minimal dossier detail records keyed by repertorio id for the document viewer route. */

export interface DwFascicoloDetail {
	id: string;
	titolo: string;
	sottotitolo: string;
	repTag: string;
	racTag: string;
	stato: "archiviato" | "in-lavorazione";
	pagine: number;
	allegati: number;
	sottofascicoli: number;
	meta: Array<{ label: string; value: string }>;
	sottoFascicoli: Array<{ label: string; pagine: number }>;
}

export const dwFascicoliDetailById: Record<string, DwFascicoloDetail> = {
	"5212": {
		id: "5212",
		titolo: "Eredità De Santis Maria",
		sottotitolo: "Successione — stipulato il 08/03/2024 — Notaio Dimostrativo",
		repTag: "Rep. 5212",
		racTag: "Racc. 4899",
		stato: "in-lavorazione",
		pagine: 64,
		allegati: 14,
		sottofascicoli: 5,
		meta: [
			{ label: "Tipologia atto", value: "Successione testamentaria" },
			{ label: "Notaio rogante", value: "Notaio Dimostrativo" },
			{ label: "Data stipula", value: "08/03/2024" },
			{ label: "Luogo stipula", value: "Padova — Studio Demo" },
			{ label: "Parti principali", value: "De Santis Maria — Eredi ordinati" },
		],
		sottoFascicoli: [
			{ label: "Sottofascicolo A", pagine: 12 },
			{ label: "Sottofascicolo B", pagine: 9 },
			{ label: "Sottofascicolo C", pagine: 14 },
			{ label: "Sottofascicolo D", pagine: 18 },
			{ label: "Sottofascicolo E", pagine: 11 },
		],
	},
	"5340": {
		id: "5340",
		titolo: "Studio Marchetti — Comune di Padova",
		sottotitolo:
			"Atto pubblico — stipulato il 22/04/2024 — Notaio Dimostrativo",
		repTag: "Rep. 5340",
		racTag: "Racc. 4157",
		stato: "archiviato",
		pagine: 28,
		allegati: 5,
		sottofascicoli: 2,
		meta: [
			{ label: "Tipologia atto", value: "Atto pubblico" },
			{ label: "Notaio rogante", value: "Notaio Dimostrativo" },
			{ label: "Data stipula", value: "22/04/2024" },
			{ label: "Luogo stipula", value: "Padova — Studio Demo" },
			{
				label: "Parti principali",
				value: "Studio Marchetti — Comune di Padova",
			},
		],
		sottoFascicoli: [
			{ label: "Sottofascicolo A", pagine: 16 },
			{ label: "Sottofascicolo B", pagine: 12 },
		],
	},
};
