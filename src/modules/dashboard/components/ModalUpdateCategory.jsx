import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateCatery } from "../schemas/updateCategorySchema";
import { useUpdateCategory } from "../hook/categories/useUpdateCategory";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import { useCategoriesContext } from "../../context/CategoriesContext";
import { Spinner } from "../../shared/Spinner";

export function ModalUpdateCategory({ category, onClose }) {

    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const { token } = useAuthContext();
    const { updateCategory, loading } = useUpdateCategory(token);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateCatery),
    });

    useEffect(() => {
        if (category) {
            setValue("name", category.attributes.name || "");
        }
    }, [category, setValue]);

    const onSubmit = async (data) => {
        await updateCategory(data.name, category.id);
        reset();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 bg-black from-black to-gray-800 text-white">
                    <div className="flex items-center gap-3">
                        <FaEdit className="text-2xl" />
                        <div>
                            <h3 className="text-lg font-semibold">Editar categoría</h3>
                            <p className="text-sm text-gray-300">Actualiza el nombre de la categoría</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2 m-0 p-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input type="text" {...register("name")} name="name" id="name" className="bg-gray-50 border px-3 py-1 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />

                            {errors.name && <p className="text-shadow-amber-800 text-red-400 text-xs">{errors.name.message}</p>}
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end items-center px-6 py-4 gap-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={onClose}
                                type="button"
                                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer"
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 text-sm font-medium text-white bg-black rounded-lg focus:outline-none transition-all cursor-pointer"
                            >
                                {loading ? <Spinner size="5" color="#FFFFFF" /> : "Actualizar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
