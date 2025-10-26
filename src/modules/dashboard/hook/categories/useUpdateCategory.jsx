import { useState } from "react";
import { showToast } from "../../../shared/Toast";
import { useCategoriesContext } from "../../../context/CategoriesContext";

export const useUpdateCategory = (token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [incident, setIncident] = useState(null);

    const { fetchCategories } = useCategoriesContext();

    const updateCategory = async (name, category_id) => {
        if (!token) {
            setError("Usuario no autenticado");
            showToast("Usuario no autenticado")
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/v1/incidentCategories/${category_id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setIncident(data.data);
            showToast("Categoría actualizada")
            await fetchCategories();
            return data.data;
        } catch (err) {
            setError(err.message);
            showToast("Error al actualizar la categoría")
        } finally {
            setLoading(false);

        }
    };

    return { updateCategory, loading, error };
};
