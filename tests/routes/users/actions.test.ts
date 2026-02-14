import { describe, expect, it } from "vitest";
import type { AppState } from "@/app.js";
import { SetError, SetUsersData } from "@/routes/users/actions.js";
import type { User } from "@/routes/users/schemas.js";

const baseState: AppState = {
	currentRoute: null,
	loading: true,
	error: null,
	routes: {
		home: {},
		users: { list: [] },
	},
};

const mockUsers: User[] = [
	{ id: 1, name: "Leanne Graham", email: "sincere@april.biz", role: "viewer" },
	{ id: 2, name: "Ervin Howell", email: "shanna@melissa.tv", role: "editor" },
];

describe("SetUsersData", () => {
	it("setzt die User-Liste im State", () => {
		const [newState] = SetUsersData(baseState, [mockUsers]);
		expect(newState.routes.users.list).toEqual(mockUsers);
	});

	it("setzt loading auf false", () => {
		const [newState] = SetUsersData(baseState, [mockUsers]);
		expect(newState.loading).toBe(false);
	});

	it("setzt currentRoute auf 'users'", () => {
		const [newState] = SetUsersData(baseState, [mockUsers]);
		expect(newState.currentRoute).toBe("users");
	});

	it("mutiert den originalen State nicht", () => {
		SetUsersData(baseState, [mockUsers]);
		expect(baseState.routes.users.list).toHaveLength(0);
	});
});

describe("SetError", () => {
	it("setzt die Fehlermeldung", () => {
		const error = new Error("API nicht erreichbar");
		const newState = SetError(baseState, error);
		expect(newState.error).toBe("API nicht erreichbar");
	});

	it("setzt loading auf false", () => {
		const newState = SetError(baseState, new Error("x"));
		expect(newState.loading).toBe(false);
	});

	it("mutiert den originalen State nicht", () => {
		SetError(baseState, new Error("x"));
		expect(baseState.error).toBeNull();
	});
});
