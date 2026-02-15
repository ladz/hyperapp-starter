import { div, h1, li, p, span, strong, text, ul } from "@hyperapp/html";
import type { VNode } from "hyperapp";
import type { AppState } from "../../app.js";
import type { User } from "./schemas.js";

const UserRow = (user: User): VNode<AppState> =>
  li({ key: String(user.id) }, [
    strong({}, text(user.name)),
    text(` — ${user.email} `),
    span(
      { style: { color: "#888", fontSize: "0.85em" } },
      text(`[${user.role}]`),
    ),
  ]);

export const UsersView = (state: AppState): VNode<AppState> => {
  const users = state.routes.users.list;

  if (state.loading) return p({}, text("Laden…"));

  return div({}, [
    h1({}, text("Users")),
    users.length === 0
      ? p({}, text("Keine Daten."))
      : ul({}, users.map(UserRow)),
  ]);
};
