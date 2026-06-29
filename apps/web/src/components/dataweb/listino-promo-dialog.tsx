"use client";

import { Button } from "@vecchio/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@vecchio/ui/components/dialog";
import { Package, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { dsgBtnPrimary } from "@/components/dataweb/dsg-ui";
import { dismissListinoPromo, isListinoPromoDismissed } from "@/lib/listino-storage";

/**
 * One-time promotional dialog for the listino — shown on first portale visit.
 * Dismiss is permanent via localStorage (`dsg-listino-promo-dismissed`).
 */
export function ListinoPromoDialog() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (!isListinoPromoDismissed()) {
			setOpen(true);
		}
	}, []);

	const handleDismiss = () => {
		dismissListinoPromo();
		setOpen(false);
	};

	const handleOpenChange = (next: boolean) => {
		if (!next) {
			handleDismiss();
			return;
		}
		setOpen(true);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<div className="relative bg-gradient-to-br from-[var(--dsg-kpi-blue)] to-[var(--dsg-kpi-purple)] px-6 py-8 text-center">
					<button
						type="button"
						onClick={handleDismiss}
						className="absolute top-3 right-3 grid size-8 cursor-pointer place-items-center rounded-[8px] border border-[var(--dsg-border)] bg-white text-[var(--dsg-text-muted)] transition-colors hover:text-[var(--dsg-text)]"
						aria-label="Chiudi"
					>
						<X strokeWidth={1.75} className="size-4" />
					</button>
					<span className="mx-auto grid size-12 place-items-center rounded-[12px] bg-white text-[var(--dsg-primary)] shadow-[0_2px_8px_rgba(37,99,235,0.15)]">
						<Package strokeWidth={1.75} className="size-6" aria-hidden />
					</span>
				</div>

				<div className="px-5 py-5">
					<DialogTitle className="text-[18px]">
						Scopri il nuovo listino prodotti
					</DialogTitle>
					<DialogDescription className="mt-2">
						Listino Giustacchini Data System Group — articoli da ufficio con codici
						prodotto, descrizioni e prezzi sempre aggiornati.
					</DialogDescription>

					<DialogFooter className="mt-6 px-0 pb-0">
						<Button
							nativeButton={false}
							render={<Link href="/listino" onClick={handleDismiss} />}
							className={dsgBtnPrimary}
						>
							Vai al listino
						</Button>
						<Button
							type="button"
							variant="ghost"
							onClick={handleDismiss}
							className="h-9 cursor-pointer text-[13px] text-[var(--dsg-text-muted)]"
						>
							Chiudi
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
