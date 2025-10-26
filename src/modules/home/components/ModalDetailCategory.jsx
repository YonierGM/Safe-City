import { useEffect } from "react";
import { FaTag } from "react-icons/fa";

export function ModalDetailCategory({ category, onClose }) {

    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

                <div className="flex items-center bg-black justify-between px-6 py-4 text-white">
                    <div className="flex items-center gap-3">
                        <FaTag className="text-xl" />
                        <div>
                            <h3 className="text-lg font-semibold leading-tight">
                                Detalles de la categoría
                            </h3>
                            <p className="text-sm text-gray-300">
                                Información general y fechas de registro
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white text-xl cursor-pointer transition-all"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-6 text-gray-700 dark:text-gray-300">
                    <div className="grid grid-cols-2 gap-4">

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">
                                ID
                            </p>
                            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                                {category.id}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">
                                Nombre
                            </p>
                            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                                {category.attributes.name}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 col-span-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">
                                Descripción
                            </p>
                            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                                {category.attributes.description || "Sin descripción"}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">
                                Creado el
                            </p>
                            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                                {new Date(category.attributes.created_at).toLocaleString("es-CO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">
                                Actualizado el
                            </p>
                            <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                                {new Date(category.attributes.updated_at).toLocaleString("es-CO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end items-center px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-5 py-2 text-sm font-medium text-white bg-black rounded-lg transition-all cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
