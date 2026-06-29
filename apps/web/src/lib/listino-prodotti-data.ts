import listinoProdottiJson from "@/lib/listino-prodotti-data.json";

/** Row in the DSG product price list (`/listino`) — sourced from Listino Giustacchini Excel. */
export interface DwListinoProdotto {
	codice: string;
	nome: string;
	descrizione: string;
	prezzo: number;
	/** Public path under `/listino/` when a matching file exists in IMMAGINI. */
	immaginePath: string | null;
}

/** Format EUR prices for the Italian listino. */
export function formatListinoPrezzo(prezzo: number): string {
	return new Intl.NumberFormat("it-IT", {
		style: "currency",
		currency: "EUR",
	}).format(prezzo);
}

/** Catalog imported from `Listino_Giustacchini_DataSystemGroup.xlsx`. */
export const dwListinoProdotti = listinoProdottiJson as DwListinoProdotto[];
