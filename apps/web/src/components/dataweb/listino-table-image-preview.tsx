"use client";

import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { createPortal } from "react-dom";
import type { DwListinoProdotto } from "@/lib/listino-prodotti-data";

const PREVIEW_SIZE = 280;
const CURSOR_OFFSET = 20;
const VIEWPORT_MARGIN = 8;

function clampPreviewPosition(clientX: number, clientY: number) {
	if (typeof window === "undefined") {
		return { x: clientX + CURSOR_OFFSET, y: clientY + CURSOR_OFFSET };
	}

	const maxX = window.innerWidth - PREVIEW_SIZE - VIEWPORT_MARGIN;
	const maxY = window.innerHeight - PREVIEW_SIZE - VIEWPORT_MARGIN;

	return {
		x: Math.max(VIEWPORT_MARGIN, Math.min(clientX + CURSOR_OFFSET, maxX)),
		y: Math.max(VIEWPORT_MARGIN, Math.min(clientY + CURSOR_OFFSET, maxY)),
	};
}

interface ListinoTableImagePreviewProps {
	product: DwListinoProdotto;
	clientX: number;
	clientY: number;
}

/**
 * Floating product image that follows the cursor with a light spring.
 * Rendered in a portal so it is not clipped by card overflow.
 */
function ListinoTableImagePreview({
	product,
	clientX,
	clientY,
}: ListinoTableImagePreviewProps) {
	const x = useSpring(clientX + CURSOR_OFFSET, {
		stiffness: 420,
		damping: 32,
		mass: 0.45,
	});
	const y = useSpring(clientY + CURSOR_OFFSET, {
		stiffness: 420,
		damping: 32,
		mass: 0.45,
	});

	React.useEffect(() => {
		const { x: nextX, y: nextY } = clampPreviewPosition(clientX, clientY);
		x.set(nextX);
		y.set(nextY);
	}, [clientX, clientY, x, y]);

	if (!product.immaginePath) {
		return null;
	}

	return (
		<motion.div
			className="pointer-events-none fixed top-0 left-0 z-[90] overflow-hidden rounded-[12px] border border-[var(--dsg-border)] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
			style={{ x, y, width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
			initial={{ opacity: 0, scale: 0.92 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.92 }}
			transition={{ duration: 0.15 }}
		>
			<Image
				src={product.immaginePath}
				alt={product.nome}
				width={PREVIEW_SIZE}
				height={PREVIEW_SIZE}
				className="h-full w-full object-contain p-3"
			/>
		</motion.div>
	);
}

interface ListinoTablePreviewLayerProps {
	product: DwListinoProdotto | null;
	pointer: { x: number; y: number } | null;
}

/** Portal wrapper for the cursor-following preview. */
export function ListinoTablePreviewLayer({
	product,
	pointer,
}: ListinoTablePreviewLayerProps) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !product || !pointer) {
		return null;
	}

	return createPortal(
		<ListinoTableImagePreview
			product={product}
			clientX={pointer.x}
			clientY={pointer.y}
		/>,
		document.body,
	);
}
