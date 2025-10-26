import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";

export const useGetCategories = () => {
    const { token } = useAuthContext();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchCategories = async () => {
            setLoading(true);
            try {
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
                setCategories(data?.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [token]);

    return {
        categories,
        loading,
        error,
    };
};
