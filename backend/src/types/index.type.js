import z from "zod"

export const signupSchema = z.object({
    fullName: z.string(),
    email: z.email(),
    password: z.string().min(8)
});