import type { AppState } from "../../app.js";
import { RestoreScroll } from "../../core/router.js";

export const LoadArticles = (
	state: AppState,
): [AppState, ReturnType<typeof RestoreScroll>] => [
	{ ...state, currentRoute: "articles", loading: false, error: null },
	RestoreScroll(),
];
