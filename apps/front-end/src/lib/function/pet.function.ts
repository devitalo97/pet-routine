import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { backend } from "@/lib/back-end.server";
import { authMiddleware } from "@/lib/middleware/auth.middleware";

export const createPetFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			name: z.string(),
			breed: z.string(),
			specie: z.string(),
			sex: z.enum(["male", "female"]),
			birthday: z.coerce.date(),
		}),
	)
	.middleware([authMiddleware])
	.handler(async ({ data }) => {
		return backend.petCreationUseCase.execute(data);
	});
