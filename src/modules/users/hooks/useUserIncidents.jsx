import { useEffect, useState } from "react";
import { showToast } from "../../shared/Toast";

export function useUserIncidents(userId, isAdmin) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);

        const fetchIncidents = async () => {
            try {
                const token = localStorage.getItem("token");
                const endpoint = isAdmin
                    ? `/api/v1/incidents`
                    : `/api/v1/users/${userId}/incidents`;

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Error al obtener los incidentes");
                }

                // Mapeo a estructura simplificada
                const mapped = data?.data?.map((item) => ({
                    id: item.id,
                    title: item.attributes.title,
                    description: item.attributes.description,
                    status: item.attributes.status,
                    location: item.attributes.location,
                    reportedAt: item.attributes.reported_at,
                    categoryName:
                        item.relationships?.category?.attributes?.name || "Sin categoría",
                    reporterName: `${item.relationships?.reporter?.attributes?.name || ""} ${item.relationships?.reporter?.attributes?.last_name || ""
                        }`.trim(),
                    reporterEmail:
                        item.relationships?.reporter?.attributes?.email || "Desconocido",
                })) || [];

                setIncidents(mapped || []);
                console.log("🚀 Mapeo recibido: ", mapped);

            } catch (err) {
                showToast(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, [userId, isAdmin]);

    return { incidents, loading, error };
}

