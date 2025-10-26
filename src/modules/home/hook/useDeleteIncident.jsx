import { useState } from "react";

export const useDeleteIncident = (token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteIncident = async (incidentId) => {
        if (!incidentId || !token) {
            setError("Faltan datos necesarios");
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/v1/incidents/${incidentId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok && response.status !== 204) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return true; // Eliminación exitosa
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteIncident, loading, error };
};
