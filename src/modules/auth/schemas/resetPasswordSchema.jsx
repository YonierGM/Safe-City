import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z
        .string({ required_error: "Ingresa tu email" })
        .email({ message: "El correo no es válido" }),

    password: z
        .string({ required_error: "Ingresa una contraseña" })
        .min(8, "La contraseña debe tener al menos 8 caracteres"),

    password_confirmation: z
        .string({ required_error: "Confirma la contraseña" })
})
    .refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"], // 👈 muestra el error debajo del campo de confirmación
        message: "Las contraseñas no coinciden",
    });
