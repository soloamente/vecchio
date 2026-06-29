/** localStorage key for first-visit listino promo dismiss. */

export const LISTINO_PROMO_DISMISSED_KEY = "dsg-listino-promo-dismissed";

export function isListinoPromoDismissed(): boolean {
	if (typeof window === "undefined") {
		return false;
	}

	try {
		return window.localStorage.getItem(LISTINO_PROMO_DISMISSED_KEY) === "1";
	} catch {
		return false;
	}
}

export function dismissListinoPromo(): void {
	try {
		window.localStorage.setItem(LISTINO_PROMO_DISMISSED_KEY, "1");
	} catch {
		// Ignore storage errors for demo.
	}
}
