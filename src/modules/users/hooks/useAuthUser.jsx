import { useEffect, useState } from "react";
import { showToast } from "../../shared/Toast";

export function useAuthUser() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || user) {
            setLoadingUser(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch("/api/v1/auth/me", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result?.message || "No se pudo obtener la información del usuario.");
                }

                const userData = result?.data;
                const attributes = userData?.attributes || {};
                const roles = userData?.relationships?.roles || [];

                const userRoles = roles.map((r) => r?.attributes?.name);
                const adminUser = userRoles.some(
                    (role) => role?.toLowerCase() === "admin"
                );

                setUser({
                    id: userData?.id,
                    name: attributes.name,
                    lastName: attributes.last_name,
                    email: attributes.email,
                    roles: userRoles,
                });

                setIsAdmin(adminUser);
            } catch (err) {
                const message = err.message || "Error al obtener el usuario.";
                showToast(message);
                setError(message);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isAdmin, loadingUser, error };
}
