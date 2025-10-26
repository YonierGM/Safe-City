import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string({ required_error: "Ingresa tu nombre" })
        .min(6, "Debe tener al menos 8 caracteres"),

    last_name: z
        .string({ required_error: "Ingresa tus apellidos" })
        .min(6, "Debe contener al menos 8 caracteres"),

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

