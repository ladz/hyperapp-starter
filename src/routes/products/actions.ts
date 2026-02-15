import type { AppState } from "../../app.js";

export const LoadProducts = (state: AppState): AppState => ({
	...state,
	currentRoute: "products",
	loading: false,
	error: null,
});
