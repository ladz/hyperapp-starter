import { describe, expect, it } from "vitest";
import { UserListSchema, UserSchema } from "@/routes/users/schemas.js";

describe("UserSchema", () => {
	const validUser = {
		id: 1,
		name: "Leanne Graham",
		email: "sincere@april.biz",
	};

	it("parsed einen validen User", () => {
		const result = UserSchema.safeParse(validUser);
		expect(result.success).toBe(true);
	});

	it("setzt role auf 'viewer' wenn nicht vorhanden", () => {
		const result = UserSchema.safeParse(validUser);
		expect(result.success && result.data.role).toBe("viewer");
	});

	it("akzeptiert explizite role", () => {
		const result = UserSchema.safeParse({ ...validUser, role: "admin" });
		expect(result.success && result.data.role).toBe("admin");
	});

	it("lehnt ungültige Email ab", () => {
		const result = UserSchema.safeParse({ ...validUser, email: "kein-email" });
		expect(result.success).toBe(false);
	});

	it("lehnt fehlende id ab", () => {
		const { id: _, ...withoutId } = validUser;
		const result = UserSchema.safeParse(withoutId);
		expect(result.success).toBe(false);
	});
});

describe("UserListSchema", () => {
	it("parsed eine Liste von Usern", () => {
		const list = [
			{ id: 1, name: "Leanne Graham", email: "sincere@april.biz" },
			{ id: 2, name: "Ervin Howell", email: "shanna@melissa.tv" },
		];
		const result = UserListSchema.safeParse(list);
		expect(result.success).toBe(true);
		expect(result.success && result.data).toHaveLength(2);
	});

	it("lehnt Liste mit ungültigem Eintrag ab", () => {
		const list = [
			{ id: 1, name: "Leanne Graham", email: "sincere@april.biz" },
			{ id: "falsch", name: "Kaputt", email: "kaputt@example.com" },
		];
		const result = UserListSchema.safeParse(list);
		expect(result.success).toBe(false);
	});
});
