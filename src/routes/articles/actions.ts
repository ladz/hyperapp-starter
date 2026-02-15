import type { AppState } from "../../app.js";

export const LoadArticles = (state: AppState): AppState => ({
	...state,
	currentRoute: "articles",
	loading: false,
	error: null,
});
