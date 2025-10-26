import { useState } from "react";
import { showToast } from "../../shared/Toast";

export function useCreateIncident(token) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [incident, setIncident] = useState(null);

    const createIncident = async ({ category_id, description, location }) => {
        if (!token) {
            setError("Token no proporcionado");
            showToast("Token no proporcionado");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/incidents", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category_id, description, location })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("response: ", data);
            setIncident(data.data);
            showToast("Incidente creado");
            return data.data;
        } catch (err) {
            setError(err.message);
            showToast(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { createIncident, incident, loading, error };
};
