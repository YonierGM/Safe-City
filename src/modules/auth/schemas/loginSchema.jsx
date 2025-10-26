import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Ingresa tu email" })
        .email({ message: "El correo no es válido" }),

    password: z
        .string({ required_error: "Ingresa una contraseña" })
});
