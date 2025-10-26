import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTag } from "react-icons/fa";
import { Spinner } from "../../shared/Spinner";
import { useAuthContext } from "../../context/AuthContext";
import { useCreateCategory } from "../hook/categories/useCreateCategory";
import { createCatery } from "../schemas/createCategorySchema";

export function ModalCreateCategory({ isOpen, onClose }) {
    const { token } = useAuthContext();
    const { crerateCategory, loading } = useCreateCategory(token);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createCatery),
    });

    const onSubmit = async (data) => {
        await crerateCategory(data.name);
        reset();
        onClose(); // 👈 cerrar modal desde DataTableSection
    };

    if (!isOpen) return null; // 👈 no renderizar si está cerrado

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <FaTag className="text-lg" />
                        <div>
                            <h3 className="text-lg font-semibold">Registrar categoría</h3>
                            <p className="text-sm text-gray-300">
                                Ingresa los datos de la categoría
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-300 hover:text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="ml-3 text-white bg-black rounded-lg text-sm px-8 py-2.5 hover:bg-gray-900"
                        >
                            {loading ? <Spinner color="#FFFFFF" size="5" /> : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
