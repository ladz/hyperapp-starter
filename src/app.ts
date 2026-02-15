import type { VNode } from "hyperapp";
import { a, main, nav, p, text } from "@hyperapp/html";
import { Navigate } from "./core/router.js";
import { HomeView } from "./routes/home/index.js";
import type { User } from "./routes/users/schemas.js";
import { UsersView } from "./routes/users/view.js";
import { ArticlesView } from "./routes/articles/view.js";
import { ProductsView } from "./routes/products/view.js";

// --- Root State ---

export interface AppState {
	currentRoute: string | null;
	loading: boolean;
	error: string | null;
	routes: {
		home: Record<string, never>;
		users: {
			list: User[];
		};
		articles: Record<string, never>;
		products: Record<string, never>;
	};
}

export const init: AppState = {
	currentRoute: null,
	loading: false,
	error: null,
	routes: {
		home: {},
		users: { list: [] },
		articles: {},
		products: {},
	},
};

export const SetRoute = (state: AppState, route: string): AppState => ({
	...state,
	currentRoute: route,
	loading: false,
	error: null,
});

// --- Root View ---

const Nav = (): VNode<AppState> =>
	nav(
		{
			style: {
				position: "fixed",
				top: "0",
				left: "0",
				right: "0",
				background: "#fff",
				borderBottom: "1px solid #ddd",
				padding: "1rem",
				zIndex: "1000",
			},
		},
		[
			a(
				{
					href: "/",
					onclick: (state: AppState, e: MouseEvent) => {
						e.preventDefault();
						return [state, Navigate("/")];
					},
				},
				text("Home"),
			),
			text(" | "),
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
			text(" | "),
			a(
				{
					href: "/articles",
					onclick: (state: AppState, e: MouseEvent) => {
						e.preventDefault();
						return [state, Navigate("/articles")];
					},
				},
				text("Artikel"),
			),
			text(" | "),
			a(
				{
					href: "/products",
					onclick: (state: AppState, e: MouseEvent) => {
						e.preventDefault();
						return [state, Navigate("/products")];
					},
				},
				text("Produkte"),
			),
		],
	);

const ErrorView = (message: string): VNode<AppState> =>
	p({ style: { color: "red" } }, text(`Fehler: ${message}`));

export const view = (state: AppState): VNode<AppState> =>
	main({ style: { paddingTop: "4rem" } }, [
		Nav(),
		state.error ? ErrorView(state.error) : null,
		state.currentRoute === "home" ? HomeView() : null,
		state.currentRoute === "users" ? UsersView(state) : null,
		state.currentRoute === "articles" ? ArticlesView() : null,
		state.currentRoute === "products" ? ProductsView() : null,
		state.currentRoute === null ? p({}, text("Route wird aufgelöst…")) : null,
	]);
