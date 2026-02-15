import type { AppState } from "../../app.js";
import { RestoreScroll } from "../../core/router.js";

export const LoadProducts = (
	state: AppState,
): [AppState, ReturnType<typeof RestoreScroll>] => [
	{ ...state, currentRoute: "products", loading: false, error: null },
	RestoreScroll(),
];
