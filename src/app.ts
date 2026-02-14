import { h, text, type VNode } from "hyperapp";
import { Navigate } from "./core/router.js";
import { HomeView } from "./routes/home/index.js";
import type { User } from "./routes/users/schemas.js";
import { UsersView } from "./routes/users/view.js";

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
  };
}

export const init: AppState = {
  currentRoute: null,
  loading: false,
  error: null,
  routes: {
    home: {},
    users: { list: [] },
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
  h("nav", {}, [
    h(
      "a",
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
    h(
      "a",
      {
        href: "/users",
        onclick: (state: AppState, e: MouseEvent) => {
          e.preventDefault();
          return [state, Navigate("/users")];
        },
      },
      text("Users"),
    ),
  ]);

const ErrorView = (message: string): VNode<AppState> =>
  h("p", { style: { color: "red" } }, text(`Fehler: ${message}`));

export const view = (state: AppState): VNode<AppState> =>
  h("main", {}, [
    Nav(),
    state.error ? ErrorView(state.error) : null,
    state.currentRoute === "home" ? HomeView() : null,
    state.currentRoute === "users" ? UsersView(state) : null,
    state.currentRoute === null
      ? h("p", {}, text("Route wird aufgelöst…"))
      : null,
  ]);
