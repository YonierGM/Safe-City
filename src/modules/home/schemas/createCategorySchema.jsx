import { z } from "zod";

export const createCatery = z.object({
    name: z
        .string({ required_error: "Ingresa un nombre" })
        .min(4, "Debe tener al menos 4 caracteres"),
});