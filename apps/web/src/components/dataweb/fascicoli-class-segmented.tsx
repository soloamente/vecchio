"use client";

import { cn } from "@vecchio/ui/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

/** Class tabs inside the shell (hash sync e.g. `#successioni`). */
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
	return "tutti";
}

function replaceUrlHash(tab: FascicoliClassTab) {
	const { pathname, search } = window.location;
	const base = `${pathname}${search}`;
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
 * Light segmented filter — same visual language as dashboard chart tabs / portale controls.
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
			requestAnimationFrame(measureChip);
		} else {
			router.push(tab === "tutti" ? "/fascicoli" : `/fascicoli#${tab}`);
			requestAnimationFrame(measureChip);
		}
	};

	return (
		<fieldset
			ref={shellRef}
			className="relative m-0 inline-flex min-w-0 items-center gap-0.5 rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-[#eef1f5] p-1"
		>
			<legend className="sr-only">Filtra fascicoli per classe</legend>
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute rounded-[8px] bg-white shadow-[var(--dsg-shadow-card)] ring-1 ring-[var(--dsg-border)]",
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
							"relative z-10 flex h-9 shrink-0 cursor-pointer select-none items-center justify-center rounded-[8px] px-4 font-medium text-[14px] outline-none",
							"focus-visible:ring-2 focus-visible:ring-[var(--dsg-primary)]/30 focus-visible:ring-offset-2",
							isOn
								? "text-[var(--dsg-text)]"
								: "text-[var(--dsg-text-muted)] hover:text-[var(--dsg-text)]",
						)}
					>
						{label}
					</button>
				);
			})}
		</fieldset>
	);
}
