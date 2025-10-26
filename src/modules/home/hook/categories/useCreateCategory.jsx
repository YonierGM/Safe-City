import { useState } from "react";
import { showToast } from "../../../shared/Toast";
import { useCategoriesContext } from "../../../context/CategoriesContext";

export const useCreateCategory = (token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("")

    const { fetchCategories } = useCategoriesContext()

    const crerateCategory = async (name) => {
        if (!token) {
            setError("Usuario no autenticado");
            showToast("Usuario no autenticado")
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/v1/incidentCategories`, {
                method: "POST",
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
            setCategory(data.data);
            showToast("Categoría creada")
            await fetchCategories();
            return data.data;
        } catch (err) {
            setError(err.message);
            console.log("error: ", err)
            showToast("Error al crear la categoría")
        } finally {
            setLoading(false);
        }
    };

    return { crerateCategory, loading, error };
};
