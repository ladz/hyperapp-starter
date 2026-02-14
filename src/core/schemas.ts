import { z } from "zod"

// Generischer Validator für API-Responses.
// Wirft einen lesbaren Fehler mit Feldpfad wenn die Daten nicht passen.

export const parseOrThrow = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string
): T => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join(", ")
    throw new Error(`[${context}] Validierungsfehler: ${issues}`)
  }
  return result.data
}
