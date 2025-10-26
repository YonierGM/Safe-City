import { useState } from "react";
import Notiflix, { Confirm } from "notiflix";
import { showToast } from "../../../shared/Toast";
import { useCategoriesContext } from "../../../context/CategoriesContext";

export const useDeleteCategory = (token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { fetchCategories } = useCategoriesContext();

    const deleteCategory = async (category_id) => {
        if (!category_id || !token) {
            setError("Faltan datos necesarios");
            showToast("Faltan datos necesarios");
            return false;
        }

        Confirm.show(
            "Eliminar Categoría",
            "¿Desea eliminar la categoría seleccionada?",
            "Sí",
            "No",
            async () => {
                setLoading(true);

                Notiflix.Loading.circle("Eliminando...", {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    svgColor: "#ffffff",
                });

                try {
                    const response = await fetch(`/api/v1/incidentCategories/${category_id}`, {
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok && response.status !== 204) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }

                    showToast("Categoría eliminada correctamente");
                    await fetchCategories();
                } catch (err) {
                    setError(err.message);
                    showToast("Error al eliminar la categoría");
                } finally {
                    Notiflix.Loading.remove();
                    setLoading(false);
                }
            },
            () => {
                console.log("Cancelado");
            },
            {
                titleColor: "#111",
                okButtonBackground: "#FF0000",
                okButtonColor: "#fff",
                cancelButtonBackground: "#ccc",
                cancelButtonColor: "#000",
                borderRadius: "10px",
                width: "350px",
            }
        );
    };

    return { deleteCategory, loading, error };
};
