import { useState } from "react";

export const useUpdateIncident = (token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [incident, setIncident] = useState(null);

    const updateIncident = async (incidentId, { category_id, description, status, location }) => {
        if (!incidentId || !token) {
            setError("Faltan datos necesarios");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/v1/incidents/${incidentId}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category_id, description, status, location })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setIncident(data.data);
            return data.data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateIncident, incident, loading, error };
};
