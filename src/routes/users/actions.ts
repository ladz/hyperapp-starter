import { assocPath } from "ramda";
import type { AppState } from "../../app.js";
import { FetchRoute } from "../../core/http.js";
import { parseOrThrow } from "../../core/schemas.js";
import { type User, UserListSchema } from "./schemas.js";

export const fetchUsers = (): Promise<User[]> =>
	fetch("https://jsonplaceholder.typicode.com/users")
		.then((r) => r.json())
		.then((data) => parseOrThrow(UserListSchema, data, "fetchUsers"));

export const LoadUsers = (
	state: AppState,
): [AppState, ReturnType<typeof FetchRoute>] => [
	{ ...state, loading: true },
	FetchRoute([fetchUsers()], SetUsersData, SetError),
];

export const SetUsersData = (state: AppState, [users]: [User[]]): AppState =>
	assocPath(["routes", "users", "list"], users, {
		...state,
		loading: false,
		currentRoute: "users",
	}) as AppState;

export const SetError = (state: AppState, error: Error): AppState => ({
	...state,
	loading: false,
	error: error.message ?? "Unbekannter Fehler",
});
