import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { showToast } from "../shared/Toast";
import Notiflix, { Confirm } from "notiflix";

const IncidentsContext = createContext();

export const IncidentsProvider = ({ children }) => {
    {/*Controla la primera carga del skeleton*/ }
    const [initialLoading, setInitialLoading] = useState(true);
    const { token, isAdmin, user } = useAuthContext();

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchIncidents = async () => {
        if (!token || !user) {
            showToast("No se encontró el usuario, no se puede obtener incidentes aún")
            return;
        }

        try {
            setLoading(true);

            const endpoint = isAdmin
                ? "/api/v1/incidents"
                : `/api/v1/users/${user?.id}/incidents`;

            const res = await fetch(endpoint, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error al obtener los incidentes");

            const data = await res.json();
            const sortedIncidents = (data?.data || []).sort((a, b) => a.id - b.id);
            setIncidents(sortedIncidents);

        } catch (err) {
            console.error(err);
            setError(err.message);
            showToast("Error al obtener los incidentes");
        } finally {
            setLoading(false);
        }
    };

    const createIncident = async (incidentData) => {
        if (!token) return;

        try {
            setLoading(true);
            const res = await fetch("/api/v1/incidents", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(incidentData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data?.message || "Error al crear incidente");

            showToast("Incidente creado exitosamente");
            await fetchIncidents();
        } catch (err) {
            console.error(err);
            showToast(err.message || "Error al crear el incidente");
        } finally {
            setLoading(false);
        }
    };

    const updateIncident = async (id, updatedData) => {
        if (!token) return;

        try {
            setLoading(true);
            const res = await fetch(`/api/v1/incidents/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data?.message || "Error al actualizar incidente");

            showToast("Incidente actualizado correctamente");
            await fetchIncidents();
        } catch (err) {
            console.error(err);
            showToast(err.message || "Error al crear el incidente");
        } finally {
            setLoading(false);
        }
    };

    const deleteIncident = async (id) => {
        Confirm.show(
            "Eliminar incidente",
            "¿Estás seguro de eliminar este incidente?",
            "Sí, eliminar",
            "Cancelar",
            async () => {
                if (!token) return;
                setLoading(true);
                Notiflix.Loading.circle("Eliminando incidente...", {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    svgColor: "#ffffff",
                });

                try {
                    const res = await fetch(`/api/v1/incidents/${id}`, {
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!res.ok) throw new Error("Error al eliminar incidente");

                    Notiflix.Loading.remove();
                    showToast("Incidente eliminado correctamente");
                    await fetchIncidents();
                } catch (err) {
                    Notiflix.Loading.remove();
                    showToast(err.message || "Error al eliminar el incidente");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },
            () => console.log("Eliminación cancelada"),
            { titleColor: "#111", okButtonBackground: "#FF0000" }
        );
    };

    { /*se dispara cuando cambia el usuario, el token o si es admin (los datos de autenticación listos)*/ }
    useEffect(() => {
        if (user && token) {
            fetchIncidents().finally(() => setInitialLoading(false));
        }
    }, [user, token, isAdmin]);

    { /*muestra el skeleton solo en la primera petición o si no si está cargando y no hay incidentes*/ }
    const showSkeleton = (initialLoading || (loading && incidents.length === 0));

    return (
        <IncidentsContext.Provider
            value={{
                incidents,
                loading,
                error,
                fetchIncidents,
                createIncident,
                updateIncident,
                deleteIncident,
                showSkeleton
            }}
        >
            {children}
        </IncidentsContext.Provider>
    );
};

export const useIncidentsContext = () => useContext(IncidentsContext);
