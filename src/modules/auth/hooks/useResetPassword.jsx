import { useState } from "react";
import { showToast } from "../../shared/Toast";

export function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetPasswordHook = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/reset-password", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    token: data.token,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                }),
            });

            {/*  se espera un 204 como exito */ }
            if (!response.ok) {
                let errorResult = {};
                try {
                    const text = await response.text();
                    if (text) errorResult = JSON.parse(text);
                } catch { }
                throw new Error(errorResult.message || "Error al restablecer la contraseña.");
            }

            showToast("Contraseña actualizada correctamente.");
            return true; {/* no hay JSON que devolver */ }
        } catch (err) {
            setError(err.message);
            showToast(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { resetPasswordHook, loading, error };
}
