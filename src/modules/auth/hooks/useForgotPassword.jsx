import { useState } from "react";
import { showToast } from "../../shared/Toast";

export function useForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const forgotPasswordHook = async (email) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/forgot-password", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            {/*Caso de error → el backend devuelve data.data.email*/ }
            if (!response.ok || data?.data?.email) {
                let errorMsg = data?.data?.email || "Error al solicitar restablecimiento de contraseña";

                {/* Traducción de error común */ }
                if (errorMsg === "We can't find a user with that email address.") {
                    errorMsg = "No existe una cuenta asociada a ese correo electrónico.";
                }

                throw new Error(errorMsg);
            }

            {/* Caso de éxito → el backend devuelve data.data.status */ }
            const successMsg =
                data?.data?.status === "We have emailed your password reset link."
                    ? "Se ha enviado un enlace de restablecimiento a tu correo electrónico."
                    : "Solicitud de restablecimiento enviada correctamente.";

            showToast(successMsg);
            return data;

        } catch (err) {
            setError(err.message);
            showToast(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { forgotPasswordHook, loading, error };
}
