import { useState } from "react";
import { showToast } from "../../shared/Toast";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const registerHook = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMsg =
                    data.errors?.email?.[0] ||
                    data.message ||
                    "Error al crear el usuario";

                if (errorMsg === "The email has already been taken.") {
                    errorMsg = "El correo electrónico ya está registrado.";
                }
                throw new Error(errorMsg);
            }

            setUser(data.data);
            showToast("Usuario creado de manera exitosa");
            return data.data;

        } catch (err) {
            showToast(err.message || "Error al crear el usuario");
            setError(err.message);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { registerHook, user, loading, error };
}
