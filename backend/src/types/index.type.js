import z from "zod"

export const signupSchema = z.object({
    fullName: z.string(),
    email: z.email(),
    password: z.string().min(8)
});

export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export const updateProfileSchema = z.object({
    profilePic: z.string()
});

export const messageParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});

export const chatParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id")
});

export const messageBodySchema = z.object({
    text: z.string().trim().min(1).optional(),
    image: z.string().optional(),
})