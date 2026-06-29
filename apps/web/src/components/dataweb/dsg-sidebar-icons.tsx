import { cn } from "@vecchio/ui/lib/utils";

interface DsgSidebarIconProps {
	className?: string;
	strokeWidth?: number;
}

/** Shared SVG props — icons inherit sidebar link color via currentColor. */
const SVG_BASE = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 18 18",
	width: 18,
	height: 18,
	"aria-hidden": true,
} as const;

/** Dashboard — Agentation reference icon for Navigazione. */
export function DsgNavIconDashboard({ className }: DsgSidebarIconProps) {
	return (
		<svg {...SVG_BASE} className={cn("size-[18px] shrink-0", className)}>
			<path
				d="M14.855 5.95L9.605 1.96C9.247 1.688 8.752 1.688 8.395 1.96L3.145 5.95C2.896 6.139 2.75 6.434 2.75 6.747V14.251C2.75 15.356 3.645 16.251 4.75 16.251H7.25V12.251C7.25 11.699 7.698 11.251 8.25 11.251H9.75C10.302 11.251 10.75 11.699 10.75 12.251V16.251H13.25C14.355 16.251 15.25 15.356 15.25 14.251V6.746C15.25 6.433 15.104 6.14 14.855 5.95Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/** Richiesta fascicoli — Agentation reference icon. */
export function DsgNavIconRichiestaFascicoli({ className }: DsgSidebarIconProps) {
	return (
		<svg {...SVG_BASE} className={cn("size-[18px] shrink-0", className)}>
			<path
				d="M14.75,15.75c.828,0,1.5-.672,1.5-1.5v-1c0-.276-.224-.5-.5-.5h-7.5c-.276,0-.5,.224-.5,.5v1c0,.828-.672,1.5-1.5,1.5h0c-.828,0-1.5-.672-1.5-1.5V3.75c0-.828-.672-1.5-1.5-1.5h0c-.828,0-1.5,.672-1.5,1.5v2c0,.552,.448,1,1,1h2"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line
				x1="14.75"
				y1="15.75"
				x2="6.25"
				y2="15.75"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3.25,2.25H12.75c.828,0,1.5,.672,1.5,1.5v6.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line
				x1="7.5"
				y1="5.75"
				x2="11.5"
				y2="5.75"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.72}
			/>
			<line
				x1="7.5"
				y1="8.75"
				x2="11.5"
				y2="8.75"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.72}
			/>
		</svg>
	);
}

/** Listino prodotti — Agentation reference icon (package). */
export function DsgNavIconListino({ className }: DsgSidebarIconProps) {
	return (
		<svg {...SVG_BASE} className={cn("size-[18px] shrink-0", className)}>
			<polyline
				points="5.25 9.25 5.25 6.083 12 3.083"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.72}
			/>
			<path
				d="M9.406,1.931l6.344,2.819-6.344,2.819c-.259,.115-.554,.115-.812,0L2.25,4.75,8.594,1.931c.259-.115,.554-.115,.812,0Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.25,4.75v7.85c0,.395,.233,.753,.594,.914l5.75,2.556c.259,.115,.554,.115,.812,0l5.75-2.556c.361-.161,.594-.519,.594-.914V4.75"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line
				x1="9"
				y1="7.656"
				x2="9"
				y2="16.069"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/** Fascicoli Notarili — Agentation reference icon. */
export function DsgNavIconFascicoli({ className }: DsgSidebarIconProps) {
	return (
		<svg {...SVG_BASE} className={cn("size-[18px] shrink-0", className)}>
			<path
				d="M5,14.75h-.75c-1.105,0-2-.895-2-2V4.75c0-1.105,.895-2,2-2h1.825c.587,0,1.144,.258,1.524,.705l1.524,1.795h4.626c1.105,0,2,.895,2,2v1"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.72}
			/>
			<path
				d="M16.148,13.27l.843-3.13c.257-.953-.461-1.89-1.448-1.89H6.15c-.678,0-1.272,.455-1.448,1.11l-.942,3.5c-.257,.953,.461,1.89,1.448,1.89H14.217c.904,0,1.696-.607,1.931-1.48Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/** Successioni — Agentation reference icon. */
export function DsgNavIconSuccessioni({ className }: DsgSidebarIconProps) {
	return (
		<svg {...SVG_BASE} className={cn("size-[18px] shrink-0", className)}>
			<circle
				cx="5"
				cy="7.5"
				r="1.75"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.72}
			/>
			<circle
				cx="12.5"
				cy="4"
				r="2.25"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.217,10.686c.639-1.155,1.87-1.936,3.283-1.936h0c2.071,0,3.75,1.679,3.75,3.75v2.75c0,.552-.448,1-1,1h-4.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5,11.75h0c1.794,0,3.25,1.456,3.25,3.25v.25c0,.552-.448,1-1,1H2.75c-.552,0-1-.448-1-1v-.25c0-1.794,1.456-3.25,3.25-3.25Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.72}
			/>
		</svg>
	);
}
