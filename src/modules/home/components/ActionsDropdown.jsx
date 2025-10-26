import { useState, useRef, useEffect } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useAuthContext } from "../../context/AuthContext";

export function ActionsDropdown({ onView, onEdit, onDelete }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    const { logout, loading, user, isAdmin, error } = useAuthContext();

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors duration-150"
                title="Opciones"
            >
                <SlOptionsVertical className="text-lg cursor-pointer" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
                    {onView && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                onView();
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                        >
                            Ver detalles
                        </button>
                    )}

                    {isAdmin && onEdit && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                onEdit();
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                        >
                            Editar
                        </button>
                    )}


                    {isAdmin && onDelete && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                onDelete();
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
