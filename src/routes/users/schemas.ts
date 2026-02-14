import { z } from "zod"

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
})

export const UserListSchema = z.array(UserSchema)

export type User = z.infer<typeof UserSchema>
export type UserList = z.infer<typeof UserListSchema>
