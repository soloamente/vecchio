/** Static Italian mock dataset for DataWeb dashboard screens (not wired to backend). */

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
