import type { DwListinoProdotto } from "@/lib/listino-prodotti-data";

/** Match listino products by codice, nome, or descrizione (case-insensitive). */
export function filterListinoProducts(
	products: DwListinoProdotto[],
	query: string,
): DwListinoProdotto[] {
	const term = query.trim().toLowerCase();
	if (!term) {
		return products;
	}

	return products.filter((product) => {
		return (
			product.codice.toLowerCase().includes(term) ||
			product.nome.toLowerCase().includes(term) ||
			product.descrizione.toLowerCase().includes(term)
		);
	});
}
