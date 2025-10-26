import { createContext, useContext, useEffect, useState } from "react";
import { showToast } from "../shared/Toast";
import { useAuthContext } from "./AuthContext";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const { token } = useAuthContext();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    {/*Controla la primera carga del skeleton*/ }
    const [initialLoading, setInitialLoading] = useState(true);


    const fetchCategories = async () => {
        if (!token) return; //Evita que haga la petición
        try {
            setLoading(true);
            const res = await fetch("/api/v1/incidentCategories", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error al obtener las categorías");
            const data = await res.json();
            // Ordenar por id antes de guardar
            const sortedCategories = (data?.data || []).sort((a, b) => a.id - b.id);
            setCategories(sortedCategories);
            setCategories(data?.data || []);
        } catch (err) {
            setError(err.message);
            showToast("Error al obtener las categorías")
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [token]);

    { /*muestra el skeleton solo en la primera petición o si no si está cargando y no hay incidentes*/ }
    const showSkeleton = initialLoading || (loading && categories.length === 0);


    return (
        <CategoriesContext.Provider value={{ categories, loading, error, fetchCategories, showSkeleton }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
