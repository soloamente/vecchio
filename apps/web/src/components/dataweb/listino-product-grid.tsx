"use client";

import { LayoutGrid } from "lucide-react";
import * as React from "react";
import { DsgCard, DsgPanelHeader } from "@/components/dataweb/dsg-ui";
import { ListinoProductMetaPills } from "@/components/dataweb/listino-product-meta-pills";
import { ListinoProductThumb } from "@/components/dataweb/listino-product-thumb";
import { ListinoTablePreviewLayer } from "@/components/dataweb/listino-table-image-preview";
import {
	type DwListinoProdotto,
	formatListinoPrezzo,
} from "@/lib/listino-prodotti-data";

interface ListinoProductGridProps {
	products: DwListinoProdotto[];
	totalCount: number;
}

/** Card grid — horizontal tiles with cursor-following image preview on thumb hover. */
export function ListinoProductGrid({
	products,
	totalCount,
}: ListinoProductGridProps) {
	const [hoveredProduct, setHoveredProduct] =
		React.useState<DwListinoProdotto | null>(null);
	const [pointer, setPointer] = React.useState<{ x: number; y: number } | null>(
		null,
	);

	const description =
		products.length === totalCount
			? `${totalCount} articoli nel listino Giustacchini.`
			: `${products.length} di ${totalCount} articoli (filtrati).`;

	const clearPreview = () => {
		setHoveredProduct(null);
		setPointer(null);
	};

	return (
		<>
			<DsgCard className="overflow-hidden">
				<DsgPanelHeader
					title="Catalogo"
					description={description}
					icon={<LayoutGrid strokeWidth={1.75} className="size-4" />}
				/>
				{products.length === 0 ? (
					<p className="px-5 py-10 text-center text-[14px] text-[var(--dsg-text-muted)]">
						Nessun prodotto corrisponde alla ricerca.
					</p>
				) : (
					<div
						className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3 [&>article]:min-w-0"
						onMouseLeave={clearPreview}
					>
						{products.map((product) => (
							<article
								key={product.codice}
								className="flex min-w-0 items-stretch gap-3 overflow-hidden rounded-[14px] bg-[#f3f4f6] p-3 transition-colors duration-150 hover:bg-[#eef1f5] sm:gap-4 sm:p-4"
							>
								<div
									className="relative shrink-0 self-stretch"
									onMouseEnter={() => {
										if (product.immaginePath) {
											setHoveredProduct(product);
										}
									}}
									onMouseMove={(event) => {
										if (!product.immaginePath) {
											return;
										}
										setHoveredProduct(product);
										setPointer({ x: event.clientX, y: event.clientY });
									}}
									onMouseLeave={clearPreview}
								>
									<ListinoProductThumb
										nome={product.nome}
										immaginePath={product.immaginePath}
										size="card"
										className="h-full"
									/>
									<span className="absolute bottom-1.5 left-1.5 rounded-[6px] bg-white/95 px-1.5 py-0.5 font-mono font-semibold text-[9px] text-[var(--dsg-text-muted)] shadow-sm ring-1 ring-[var(--dsg-border)] tabular-nums sm:text-[10px]">
										{product.codice}
									</span>
								</div>
								<div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden">
									<div className="flex min-w-0 flex-col gap-1.5">
										<h3
											className="wrap-break-word font-semibold text-[14px] text-[var(--dsg-text)] leading-snug sm:text-[15px]"
											title={product.nome}
										>
											{product.nome}
										</h3>
										<ListinoProductMetaPills descrizione={product.descrizione} />
									</div>
									<p className="font-semibold text-[16px] text-[var(--dsg-primary)] tabular-nums sm:text-[17px]">
										{formatListinoPrezzo(product.prezzo)}
									</p>
								</div>
							</article>
						))}
					</div>
				)}
			</DsgCard>

			<ListinoTablePreviewLayer product={hoveredProduct} pointer={pointer} />
		</>
	);
}
