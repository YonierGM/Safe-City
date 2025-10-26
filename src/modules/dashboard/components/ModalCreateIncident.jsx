import { useEffect, useState } from "react";
import { LocationPicker } from "./LocationInput";
import { FaLocationDot } from "react-icons/fa6";
import { registerIncidentSchema } from "../schemas/registerIncidentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaTag } from "react-icons/fa";
import { useCategoriesContext } from "../../context/CategoriesContext";
import { useIncidentsContext } from "../../context/IncidentsContext";
import { Spinner } from "../../shared/Spinner";

// Componente del modal para crear o actualizar incidentes
export function ModalCreateIncident({ buttonText, incidentData, isOpen, onClose }) {

    const { createIncident, updateIncident, loading } = useIncidentsContext();
    const { categories } = useCategoriesContext();

    // Estado local para guardar la ubicación seleccionada en el mapa
    const [location, setLocation] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerIncidentSchema),
    });

    // Cargar datos del incidente cuando se abre para editar
    useEffect(() => {
        if (incidentData) {
            setValue("description", incidentData.attributes?.description || "");

            if (categories.length > 0) {
                const categoryId = incidentData.relationships?.category?.id;
                if (categoryId) setValue("category_id", categoryId);
            }

            // Cargar y ajustar ubicación del incidente
            const loc = incidentData.attributes?.location;
            if (loc?.coordinates?.length === 2) {
                const [lng, lat] = loc.coordinates;

                // Ajuste al formato usado por el mapa ([lat, lng])
                const fixedLocation = {
                    ...loc,
                    coordinates: [lat, lng],
                };

                setLocation(fixedLocation);
                setValue("location", fixedLocation);
            }
        }
    }, [incidentData, categories, setValue]);

    // Maneja cambios de ubicación desde el mapa
    const handleLocationChange = (loc) => {
        setLocation(loc);
        setValue("location", loc);
    };

    const onSubmit = async (data) => {
        const payload = {
            category_id: data.category_id,
            description: data.description,
            location: data.location,
        };

        // Si existe incidentData -> actualización, si no -> creación
        if (incidentData) {
            await updateIncident(incidentData.id, payload);
        } else {
            await createIncident(payload);
        }

        reset();
        onClose();
    };

    // Si el modal no está abierto, no renderiza nada
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between px-6 py-4 bg-black text-white">
                    <div className="flex items-center gap-3">
                        <FaTag className="text-lg" />
                        <div>
                            <h3 className="text-lg font-semibold">
                                {incidentData ? "Actualizar incidente" : "Registrar incidente"}
                            </h3>
                            <p className="text-sm text-gray-300">
                                {incidentData
                                    ? "Modifica los datos del incidente"
                                    : "Registra los detalles del incidente"}
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

                <div className="p-4 md:p-5 space-y-4">
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Categoría
                        </label>
                        <select
                            id="category_id"
                            {...register("category_id", { valueAsNumber: true })}
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        >
                            {loading ? (
                                <option>Cargando categorías...</option>
                            ) : (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat?.attributes?.name}
                                    </option>
                                ))
                            )}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-400 text-xs">{errors.category_id.message}</p>
                        )}

                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            rows="4"
                            className="block p-2.5 w-full mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                            placeholder="Tu descripción"
                        />
                        {errors.description && (
                            <p className="text-red-400 text-xs">{errors.description.message}</p>
                        )}

                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ubicación
                        </p>

                        <LocationPicker
                            value={location}          // valor actual
                            onChange={handleLocationChange}
                        />

                        {location && (
                            <div className="text-sm text-gray-700 flex items-center gap-2 mt-2 bg-gray-100 rounded-lg p-2">
                                <FaLocationDot />
                                <div>
                                    <p>Ubicación seleccionada</p>
                                    {location.coordinates[1].toFixed(6)}, {location.coordinates[0].toFixed(6)}
                                </div>
                            </div>
                        )}
                        {errors.location && (
                            <p className="text-red-400 text-xs">{errors.location.message}</p>
                        )}

                        <div className="flex items-center justify-end pt-4 border-t mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="ms-3 text-white bg-black hover:bg-black focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-8 py-2.5 cursor-pointer"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center h-5">
                                        <Spinner size="5" color="#FFFFFF " />
                                    </div>
                                ) : incidentData ? (
                                    "Actualizar"
                                ) : (
                                    "Crear"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
