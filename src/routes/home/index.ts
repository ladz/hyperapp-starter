import type { VNode } from "hyperapp";
import { a, div, h1, p, text } from "@hyperapp/html";
import type { AppState } from "../../app.js";
import { Navigate } from "../../core/router.js";

export const SetHome = (state: AppState): AppState => ({
	...state,
	currentRoute: "home",
	loading: false,
	error: null,
});

export const HomeView = (): VNode<AppState> =>
	div({}, [
		h1({}, text("Home")),
		p(
			{},
			text(
				"Willkommen. Das ist ein minimales Hyperapp + Navigo + Ramda + Zod Boilerplate.",
			),
		),
		p({}, [
			text("Geh zu "),
			a(
				{
					href: "/users",
					onclick: (state: AppState, e: MouseEvent) => {
						e.preventDefault();
						return [state, Navigate("/users")];
					},
				},
				text("Users"),
			),
		]),
	]);
