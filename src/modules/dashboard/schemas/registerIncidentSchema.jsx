import { z } from "zod";

export const registerIncidentSchema = z.object({
    category_id: z.number({
        required_error: "Selecciona una categoría"
    }),
    description: z
        .string({ required_error: "Ingresa una descripción" })
        .min(6, "Debe tener al menos 6 caracteres"),
    location: z.object({
        type: z.literal("Point"),
        coordinates: z.tuple([z.number(), z.number()]),
    }),
});
