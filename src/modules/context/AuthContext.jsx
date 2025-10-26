import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../shared/Toast";
import Notiflix, { Confirm } from "notiflix";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMsg =
                    data.errors?.email?.[0] ||
                    data.message ||
                    "Error al iniciar sesión";

                if (errorMsg === "The provided credentials are incorrect.") {
                    errorMsg = "Las credenciales proporcionadas son incorrectas.";
                }

                throw new Error(errorMsg);
            }

            const accessToken = data?.data?.attributes?.access_token;
            if (!accessToken) throw new Error("Token no recibido.");

            localStorage.setItem("token", accessToken);
            setToken(accessToken);

            await fetchUser(accessToken);
            return accessToken;
        } catch (err) {
            setError(err.message);
            showToast(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        Confirm.show(
            "Safe City",
            "¿Desea cerrar sesión?",
            "Sí",
            "No",
            async () => {
                setLoadingLogout(true);
                Notiflix.Loading.circle("Cerrando sesión...", {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    svgColor: "#ffffff",
                });

                try {
                    const response = await fetch("/api/v1/auth/logout", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const text = await response.text();
                    const result = text ? JSON.parse(text) : null;

                    if (!response.ok) {
                        throw new Error(result?.message || "Error al cerrar sesión.");
                    }

                    Notiflix.Loading.remove();
                } catch (error) {
                    Notiflix.Loading.remove();
                    showToast("Ocurrió un error al cerrar sesión")
                } finally {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                    setIsAdmin(false);
                    setLoadingLogout(false);
                    navigate("/login");
                }
            },
            () => {
                console.log("Cierre de sesión cancelado");
            },
            {
                titleColor: "#111",
                okButtonBackground: "#000",
            }
        );
    };


    {/* Obtener usuario autenticado*/ }
    const fetchUser = async (currentToken = token) => {
        if (!currentToken) return;

        setLoading(true);
        try {
            const response = await fetch("/api/v1/auth/me", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${currentToken}`,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message || "No se pudo obtener la información del usuario."
                );
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
            console.error("Error al obtener usuario:", err);
            showToast(err.message || "Error al obtener el usuario");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    {/*Si hay token guardado, cargar usuario al montar*/ }
    useEffect(() => {
        if (token) fetchUser(token);
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAdmin,
                isAuthenticated,
                loading,
                loadingLogout,
                error,
                login,
                logout,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
