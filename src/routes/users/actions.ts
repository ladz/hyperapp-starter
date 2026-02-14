import { assocPath } from "ramda"
import { AppState } from "../../app.js"
import { FetchRoute } from "../../core/http.js"
import { RestoreScroll } from "../../core/router.js"
import { parseOrThrow } from "../../core/schemas.js"
import { User, UserListSchema } from "./schemas.js"

export const fetchUsers = (): Promise<User[]> =>
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((r) => r.json())
    .then((data) => parseOrThrow(UserListSchema, data, "fetchUsers"))

export const LoadUsers = (state: AppState) =>
  [
    { ...state, loading: true },
    FetchRoute([fetchUsers()], SetUsersData, SetError),
  ] as const

export const SetUsersData = (state: AppState, [users]: [User[]]) =>
  [
    assocPath(["routes", "users", "list"], users, {
      ...state,
      loading: false,
      currentRoute: "users",
    }) as AppState,
    RestoreScroll("users"),
  ] as const

export const SetError = (state: AppState, error: Error): AppState => ({
  ...state,
  loading: false,
  error: error.message ?? "Unbekannter Fehler",
})
