import { useState, useEffect } from "react";

export const useIncidentDetail = (incidentId, token) => {
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!incidentId || !token) return;

        const fetchIncident = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/v1/incidents/${incidentId}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setIncident(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncident();
    }, [incidentId, token]);

    return { incident, loading, error };
};
