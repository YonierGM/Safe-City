import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .string({ required_error: "Ingresa tu email" })
        .email({ message: "El correo no es válido" }),

});
