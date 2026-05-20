"use client";

import { cn } from "@vecchio/ui/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

/** Class tabs inside the shell (hash sync e.g. `#successioni`). “Filtri” is separate UI on the page. */
export type FascicoliClassTab = "tutti" | "notarili" | "successioni";

const TAB_ORDER = [
	"tutti",
	"notarili",
	"successioni",
] as const satisfies readonly FascicoliClassTab[];

function tabFromHash(hash: string): FascicoliClassTab {
	const key = hash.replace(/^#/, "").toLowerCase();
	if (key === "notarili") {
		return "notarili";
	}
	if (key === "successioni") {
		return "successioni";
	}
	/* `#filtri` / unknown hashes: keep class segment on Tutti (Filtri is not a tab). */
	return "tutti";
}

function replaceUrlHash(tab: FascicoliClassTab) {
	const { pathname, search } = window.location;
	const base = `${pathname}${search}`;
	// Tutti: strip hash so the URL stays clean; other tabs use `#segment`.
	if (tab === "tutti") {
		window.history.replaceState(null, "", base);
	} else {
		window.history.replaceState(null, "", `${base}#${tab}`);
	}
}

interface ChipRect {
	left: number;
	top: number;
	width: number;
	height: number;
}

/**
 * Capsule “shell” segmented control with an animated sliding chip (matches the
 * reference: dark track, lighter pill behind the active segment).
 * On `/fascicoli`, selection syncs with `location.hash`. On other routes, clicks
 * navigate to `/fascicoli` with the same hash contract.
 */
export function FascicoliClassSegmented() {
	const router = useRouter();
	const pathname = usePathname();
	const isFascicoliList = pathname === "/fascicoli";

	const shellRef = React.useRef<HTMLFieldSetElement>(null);
	const tabRefs = React.useRef<Map<FascicoliClassTab, HTMLButtonElement>>(
		new Map(),
	);

	const [selected, setSelected] = React.useState<FascicoliClassTab>("tutti");
	const [chip, setChip] = React.useState<ChipRect>({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	});

	const syncFromLocation = React.useCallback(() => {
		setSelected(tabFromHash(window.location.hash));
	}, []);

	// List route only: hydrate from hash and follow browser navigation.
	React.useEffect(() => {
		if (!isFascicoliList) {
			return;
		}
		syncFromLocation();
		window.addEventListener("hashchange", syncFromLocation);
		window.addEventListener("popstate", syncFromLocation);
		return () => {
			window.removeEventListener("hashchange", syncFromLocation);
			window.removeEventListener("popstate", syncFromLocation);
		};
	}, [isFascicoliList, syncFromLocation]);

	const measureChip = React.useCallback(() => {
		const shell = shellRef.current;
		const btn = tabRefs.current.get(selected);
		if (!(shell && btn)) {
			return;
		}
		const shellBox = shell.getBoundingClientRect();
		const btnBox = btn.getBoundingClientRect();
		setChip({
			left: btnBox.left - shellBox.left,
			top: btnBox.top - shellBox.top,
			width: btnBox.width,
			height: btnBox.height,
		});
	}, [selected]);

	React.useLayoutEffect(() => {
		measureChip();
	}, [measureChip]);

	React.useEffect(() => {
		const shell = shellRef.current;
		if (!shell) {
			return;
		}
		const ro = new ResizeObserver(() => measureChip());
		ro.observe(shell);
		window.addEventListener("resize", measureChip);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", measureChip);
		};
	}, [measureChip]);

	const handleSelect = (tab: FascicoliClassTab) => {
		setSelected(tab);
		if (isFascicoliList) {
			replaceUrlHash(tab);
			// replaceState does not emit `hashchange`; remeasure on the next frame.
			requestAnimationFrame(measureChip);
		} else {
			router.push(tab === "tutti" ? "/fascicoli" : `/fascicoli#${tab}`);
			requestAnimationFrame(measureChip);
		}
	};

	return (
		<fieldset
			ref={shellRef}
			className={cn(
				"relative m-0 inline-flex min-w-0 items-center gap-0.5 rounded-full border-0 p-1",
				/* Shell: dark matte track (light mode uses a softer zinc rail). */
				"bg-zinc-800/95 ring-1 ring-zinc-950/20 ring-inset",
				"dark:bg-zinc-950/90 dark:ring-white/10",
			)}
		>
			<legend className="sr-only">Filtra fascicoli per classe</legend>
			{/* Sliding chip: sits under labels; position/size come from button metrics. */}
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute rounded-full",
					"bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-zinc-950/8",
					"dark:bg-zinc-600/95 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:ring-white/12",
					"transition-[left,top,width,height] duration-200 ease-out motion-reduce:transition-none",
					chip.width === 0 && "opacity-0",
				)}
				style={{
					left: chip.left,
					top: chip.top,
					width: chip.width,
					height: chip.height,
				}}
			/>

			{TAB_ORDER.map((id) => {
				const isOn = selected === id;
				const label =
					id === "tutti"
						? "Tutti"
						: id === "notarili"
							? "Notarili"
							: "Successioni";

				return (
					<button
						key={id}
						ref={(el) => {
							if (el) {
								tabRefs.current.set(id, el);
							} else {
								tabRefs.current.delete(id);
							}
						}}
						type="button"
						aria-pressed={isOn}
						onClick={() => handleSelect(id)}
						className={cn(
							"relative z-10 flex h-9 shrink-0 cursor-pointer select-none items-center justify-center rounded-full px-4 font-medium text-sm",
							"outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 dark:focus-visible:ring-offset-zinc-950",
							isOn
								? "text-zinc-950 dark:text-zinc-50"
								: "text-zinc-300 hover:text-white dark:text-zinc-400 dark:hover:text-zinc-100",
						)}
					>
						{label}
					</button>
				);
			})}
		</fieldset>
	);
}
