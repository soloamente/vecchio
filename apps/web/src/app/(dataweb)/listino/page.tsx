import type { Metadata } from "next";
import { ListinoCatalog } from "@/components/dataweb/listino-catalog";
import { dwListinoProdotti } from "@/lib/listino-prodotti-data";

export const metadata: Metadata = {
	title: "Listino prodotti | DSG Portale",
	description:
		"Listino Giustacchini Data System Group — catalogo articoli con codici, descrizioni e prezzi.",
};

/** Pagina listino prodotti — vista tabella o griglia con preferenza salvata. */
export default function ListinoPage() {
	return <ListinoCatalog products={dwListinoProdotti} />;
}
