"use client";

import * as React from "react";
import { ListinoProductGrid } from "@/components/dataweb/listino-product-grid";
import { useListinoSearch } from "@/components/dataweb/listino-search-context";
import { dsgH1, dsgLead, dsgPageMain } from "@/components/dataweb/dsg-ui";
import type { DwListinoProdotto } from "@/lib/listino-prodotti-data";
import { filterListinoProducts } from "@/lib/filter-listino-products";

interface ListinoCatalogProps {
	products: DwListinoProdotto[];
}

/** Client shell for listino — search via top bar, card grid with hover preview. */
export function ListinoCatalog({ products }: ListinoCatalogProps) {
	const { query } = useListinoSearch();

	const filteredProducts = React.useMemo(
		() => filterListinoProducts(products, query),
		[products, query],
	);

	return (
		<main className={dsgPageMain}>
			<div className="space-y-1">
				<h1 className={dsgH1}>Listino prodotti</h1>
				<p className={dsgLead}>
					Listino Giustacchini Data System Group — articoli da ufficio con codice,
					descrizione e prezzi aggiornati.
				</p>
			</div>

			<div className="mt-8">
				<ListinoProductGrid
					products={filteredProducts}
					totalCount={products.length}
				/>
			</div>
		</main>
	);
}
