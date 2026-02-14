import { h, text, type VNode } from "hyperapp";
import type { AppState } from "../../app.js";
import type { User } from "./schemas.js";

const UserRow = (user: User): VNode<AppState> =>
  h("li", { key: String(user.id) }, [
    h("strong", {}, text(user.name)),
    text(` — ${user.email} `),
    h(
      "span",
      { style: { color: "#888", fontSize: "0.85em" } },
      text(`[${user.role}]`),
    ),
  ]);

export const UsersView = (state: AppState): VNode<AppState> => {
  const users = state.routes.users.list;

  if (state.loading) return h("p", {}, text("Laden…"));

  return h("div", {}, [
    h("h1", {}, text("Users")),
    users.length === 0
      ? h("p", {}, text("Keine Daten."))
      : h("ul", {}, users.map(UserRow)),
  ]);
};
