import { useState, useEffect } from "react";

export const useUserIncidents = (userId, token) => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId || !token) return;

        const fetchIncidents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/v1/users/${userId}/incidents`, {
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
                setIncidents(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, [userId, token]);

    return { incidents, loading, error };
};
