import { describe, expect, it } from "vitest";
import { z } from "zod";
import { parseOrThrow } from "@/core/schemas.js";

describe("parseOrThrow", () => {
	const Schema = z.object({
		id: z.number(),
		name: z.string(),
	});

	it("gibt valide Daten zurück", () => {
		const data = { id: 1, name: "Matze" };
		expect(parseOrThrow(Schema, data, "test")).toEqual(data);
	});

	it("wirft bei fehlendem Pflichtfeld", () => {
		const data = { id: 1 };
		expect(() => parseOrThrow(Schema, data, "test")).toThrow(
			"[test] Validierungsfehler",
		);
	});

	it("wirft bei falschem Typ", () => {
		const data = { id: "keine-zahl", name: "Matze" };
		expect(() => parseOrThrow(Schema, data, "test")).toThrow("id:");
	});

	it("enthält den Context im Fehler", () => {
		expect(() => parseOrThrow(Schema, {}, "fetchUsers")).toThrow("fetchUsers");
	});
});
