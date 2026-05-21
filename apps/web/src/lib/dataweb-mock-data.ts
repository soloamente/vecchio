/** Static Italian mock dataset for DSG Portale screens (not wired to backend). */

export interface DwRecentFascicolo {
	id: string;
	rep: string;
	titolo: string;
	sottotitolo: string;
	data: string;
	footer: string;
}

export interface DwRichiesta {
	id: string;
	titolo: string;
	data: string;
	stato: "evasa" | "in-corso";
}

export interface DwFascicoloRow {
	repertorio: string;
	raccolta: string;
	dataAtto: string;
	parti: string;
	tipologia: string;
	stato: "archiviato" | "in-lavorazione";
}

export interface DwCronologiaVoce {
	azione: string;
	attore: string;
	quando: string;
}

export interface DwPaginaIndice {
	id: string;
	label: string;
	allegato?: boolean;
}

/** KPI tile on the dashboard home. */
export interface DwDashboardKpi {
	label: string;
	value: string;
	sublabel: string;
	trend: string;
	trendDirection: "up" | "down";
	trendTone: "green" | "orange";
	iconTone: "blue" | "green" | "orange" | "purple";
}

/** Monthly access bar chart (Gen–Dic). */
export interface DwChartBar {
	label: string;
	value: number;
}

export type DwAttivitaIcon = "success" | "folder" | "pending";

export interface DwAttivitaRecente {
	id: string;
	titolo: string;
	sottotitolo: string;
	quando: string;
	icon: DwAttivitaIcon;
}

export type DwRichiestaStatoBadge = "in-elaborazione" | "in-attesa";

export interface DwRichiestaInCorso {
	id: string;
	descrizione: string;
	data: string;
	stato: DwRichiestaStatoBadge;
}

export const dwDashboardKpis: DwDashboardKpi[] = [
	{
		label: "Fascicoli consultati",
		value: "38",
		sublabel: "Ultimo anno",
		trend: "12%",
		trendDirection: "up",
		trendTone: "green",
		iconTone: "blue",
	},
	{
		label: "Richieste inviate",
		value: "12",
		sublabel: "In attesa di risposta",
		trend: "8%",
		trendDirection: "up",
		trendTone: "green",
		iconTone: "green",
	},
	{
		label: "Da revisionare",
		value: "4",
		sublabel: "Richieste",
		trend: "2%",
		trendDirection: "down",
		trendTone: "orange",
		iconTone: "orange",
	},
	{
		label: "Tasso di evasione",
		value: "97%",
		sublabel: "Ultimi 12 mesi",
		trend: "5%",
		trendDirection: "up",
		trendTone: "green",
		iconTone: "purple",
	},
];

/** Accessi effettuati — ultimo anno (values 0–50 scale in the mock). */
export const dwAccessiMensili: DwChartBar[] = [
	{ label: "Gen", value: 18 },
	{ label: "Feb", value: 22 },
	{ label: "Mar", value: 28 },
	{ label: "Apr", value: 24 },
	{ label: "Mag", value: 32 },
	{ label: "Giu", value: 30 },
	{ label: "Lug", value: 26 },
	{ label: "Ago", value: 20 },
	{ label: "Set", value: 34 },
	{ label: "Ott", value: 38 },
	{ label: "Nov", value: 42 },
	{ label: "Dic", value: 36 },
];

/** Riepilogo ultimi 10 anni (2015–2024). */
export const dwRiepilogoAnnuale: DwChartBar[] = [
	{ label: "2015", value: 180 },
	{ label: "2016", value: 210 },
	{ label: "2017", value: 240 },
	{ label: "2018", value: 265 },
	{ label: "2019", value: 290 },
	{ label: "2020", value: 255 },
	{ label: "2021", value: 310 },
	{ label: "2022", value: 335 },
	{ label: "2023", value: 360 },
	{ label: "2024", value: 385 },
];

export const dwAttivitaRecenti: DwAttivitaRecente[] = [
	{
		id: "a1",
		titolo: "Richiesta #4729 inviata",
		sottotitolo: "Rep. 5212/4899 — Copia conforme",
		quando: "Oggi, 10:24",
		icon: "success",
	},
	{
		id: "a2",
		titolo: "Fascicolo Rep. 5212/4899 consultato",
		sottotitolo: "Consultazione fascicolo",
		quando: "Oggi, 09:15",
		icon: "folder",
	},
	{
		id: "a3",
		titolo: "Richiesta #4718 evasa",
		sottotitolo: "Rep. 6104 — Estratto cronologico",
		quando: "Ieri, 16:42",
		icon: "success",
	},
	{
		id: "a4",
		titolo: "Nuovo fascicolo disponibile Rep. 5340",
		sottotitolo: "Atto pubblico — Studio Marchetti",
		quando: "Ieri, 11:30",
		icon: "folder",
	},
	{
		id: "a5",
		titolo: "Richiesta #4712 in attesa",
		sottotitolo: "Rep. 4761 — Certificazione ipotecaria",
		quando: "12/05/2024",
		icon: "pending",
	},
];

export const dwRichiesteInCorso: DwRichiestaInCorso[] = [
	{
		id: "#4729",
		descrizione: "Copia conforme atto Rep. 5212/4899",
		data: "14/05/2024",
		stato: "in-elaborazione",
	},
	{
		id: "#4718",
		descrizione: "Estratto cronologico fascicolo Rep. 6104",
		data: "12/05/2024",
		stato: "in-elaborazione",
	},
	{
		id: "#4712",
		descrizione: "Certificazione ipotecaria Rep. 4761",
		data: "10/05/2024",
		stato: "in-attesa",
	},
	{
		id: "#4705",
		descrizione: "Richiesta allegati integrativi Rep. 4498",
		data: "08/05/2024",
		stato: "in-attesa",
	},
	{
		id: "#4698",
		descrizione: "Consultazione fascicolo Rep. 4102",
		data: "05/05/2024",
		stato: "in-elaborazione",
	},
];

export const dwRecentFascicoli: DwRecentFascicolo[] = [
	{
		id: "1562",
		rep: "Rep. 1562",
		titolo: "L. Colmayer — Bernabé",
		sottotitolo: "Compravendita immobiliare",
		data: "28/05/2019",
		footer: "18 pp — 4 all.",
	},
	{
		id: "6104",
		rep: "Rep. 6104",
		titolo: "Studio Vivaldi — Comune di Treviso",
		sottotitolo: "Nulla osta urbanistica",
		data: "03/11/2021",
		footer: "22 pp — 2 all.",
	},
	{
		id: "4899",
		rep: "Rep. 4899",
		titolo: "Consorzio Brentella Due",
		sottotitolo: "Costituzione di fondo patrimoniale",
		data: "17/01/2023",
		footer: "31 pp — 6 all.",
	},
	{
		id: "5212",
		rep: "Rep. 5212",
		titolo: "Eredità De Santis Maria",
		sottotitolo: "Successione — stato di famiglia",
		data: "08/03/2024",
		footer: "64 pp — 14 all.",
	},
	{
		id: "3321",
		rep: "Rep. 3321",
		titolo: "G. Moschin — Azienda agricola Padovan",
		sottotitolo: "Compravendita fondi rustici",
		data: "14/07/2018",
		footer: "12 pp — 1 all.",
	},
];

export const dwRichiesteRecenti: DwRichiesta[] = [
	{
		id: "R-2023-0142",
		titolo: "Copia conforme atto Rep. 6104",
		data: "12/05/2023",
		stato: "evasa",
	},
	{
		id: "R-2024-0089",
		titolo: "Estratto cronologico fascicolo Rep. 4899",
		data: "22/02/2024",
		stato: "in-corso",
	},
	{
		id: "R-2024-0117",
		titolo: "Richiesta allegati integrativi Rep. 5212",
		data: "01/03/2024",
		stato: "in-corso",
	},
	{
		id: "R-2022-0604",
		titolo: "Certificazione ipotecaria Rep. 1562",
		data: "09/08/2022",
		stato: "evasa",
	},
];

/** Successioni — separate dataset (own route `/successioni`). */
export interface DwSuccessioneRow {
	id: string;
	dataAtto: string;
	parti: string;
}

export const dwSuccessioniRows: DwSuccessioneRow[] = [
	{
		id: "succ-ferrari-2010",
		dataAtto: "25/10/2010",
		parti: "Ferrari Matteo — Ferrari Angelica",
	},
	{
		id: "5212",
		dataAtto: "08/03/2024",
		parti: "De Santis Maria — Curatore Fallimento Brentella",
	},
	{
		id: "succ-orsolini-2019",
		dataAtto: "14/06/2019",
		parti: "Famiglia Orsolini — Notaio Dimostrativo",
	},
	{
		id: "succ-brentella-2022",
		dataAtto: "03/11/2022",
		parti: "Consorzio Brentella Due — Eredi Moschin",
	},
];

export const dwTableRows: DwFascicoloRow[] = [
	{
		repertorio: "5340",
		raccolta: "4157",
		dataAtto: "22/04/2024",
		parti: "Studio Marchetti — Comune di Padova",
		tipologia: "Atto pubblico",
		stato: "archiviato",
	},
	{
		repertorio: "5212",
		raccolta: "4899",
		dataAtto: "08/03/2024",
		parti: "De Santis Maria — Curatore Fallimento Brentella",
		tipologia: "Successione",
		stato: "in-lavorazione",
	},
	{
		repertorio: "4761",
		raccolta: "3822",
		dataAtto: "29/11/2023",
		parti: "Impresa Edile Dal Fiore — Banca Altura",
		tipologia: "Mutuo fondiario",
		stato: "archiviato",
	},
	{
		repertorio: "4498",
		raccolta: "3310",
		dataAtto: "06/09/2023",
		parti: "Famiglia Orsolini — Notaio Dimostrativo",
		tipologia: "Donazione",
		stato: "archiviato",
	},
	{
		repertorio: "4102",
		raccolta: "2944",
		dataAtto: "14/07/2023",
		parti: "Cooperativa Ceres — Union Lease Nord",
		tipologia: "Locazione commerciale",
		stato: "in-lavorazione",
	},
	{
		repertorio: "3890",
		raccolta: "2766",
		dataAtto: "03/05/2023",
		parti: "Fondazione Carraro — Regione Veneto",
		tipologia: "Affido fiduciario",
		stato: "archiviato",
	},
];

/** Fascicoli notarili — dataset per `/fascicoli` (senza pratiche successione). */
export const dwFascicoliNotariliRows: DwFascicoloRow[] = [
	{
		repertorio: "1562",
		raccolta: "1100",
		dataAtto: "28/02/2019",
		parti: "L. Colmayer — Bernabé",
		tipologia: "Compravendita immobiliare",
		stato: "archiviato",
	},
	{
		repertorio: "11657",
		raccolta: "4326",
		dataAtto: "04/01/2011",
		parti: "Cervetto Lidia",
		tipologia: "Atto notarile",
		stato: "archiviato",
	},
	...dwTableRows.filter((row) => row.tipologia !== "Successione"),
];

export const dwCronologia: DwCronologiaVoce[] = [
	{
		azione: "Consultazione fascicolo",
		attore: "Notaio Dimostrativo",
		quando: "Oggi, 14:32",
	},
	{
		azione: "Aggiunta allegato",
		attore: "Protocollo automatico",
		quando: "Ieri, 09:18",
	},
	{
		azione: "Richiesta copia conforme",
		attore: "Segreteria — Studio Demo",
		quando: "10/05/2024, 16:04",
	},
];

export const dwIndicePagine: DwPaginaIndice[] = [
	{ id: "01", label: "Frontespizio" },
	{ id: "02", label: "Premesse e parti" },
	{ id: "03", label: "Oggetto del contratto", allegato: true },
	{ id: "04", label: "Clausole particolari" },
	{ id: "05", label: "Sottoscrizioni e attestazioni" },
];
