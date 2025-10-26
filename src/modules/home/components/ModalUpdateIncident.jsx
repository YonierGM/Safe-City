import { useEffect, useState } from "react";
import { LocationPicker } from "./LocationInput";
import { FaLocationDot } from "react-icons/fa6";
import { registerIncidentSchema } from "../schemas/registerIncidentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaTag } from "react-icons/fa";
import { useCategoriesContext } from "../../context/CategoriesContext";
import { useIncidentsContext } from "../../context/IncidentsContext";

export function ModalUpdateIncident({ incidentData, onClose }) {
    const { updateIncident, loading } = useIncidentsContext();
    const { categories } = useCategoriesContext();

    const [location, setLocation] = useState(incidentData?.location || null);
    const [isOpen, setIsOpen] = useState(!!incidentData); // Se abre automáticamente si hay incidentData

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerIncidentSchema),
    });

    useEffect(() => {
        if (incidentData) {
            setValue("category_id", incidentData.category_id);
            setValue("description", incidentData.description);
            if (incidentData.location) setValue("location", incidentData.location);
            setLocation(incidentData.location || null);
        }
    }, [incidentData, setValue]);

    const onSubmit = async (data) => {
        const payload = {
            category_id: data.category_id,
            description: data.description,
            location: data.location,
        };

        if (incidentData) {
            await updateIncident(incidentData.id, payload);
        }

        reset();
        setIsOpen(false);
        if (onClose) onClose();
    };

    if (!isOpen) return null; // No renderiza si está cerrado

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) { setIsOpen(false); if (onClose) onClose(); } }}
        >
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 bg-black text-white">
                    <h3 className="text-lg font-semibold">Editar incidente</h3>
                    <button type="button" onClick={() => { setIsOpen(false); if (onClose) onClose(); }} className="text-gray-300 hover:text-white text-xl cursor-pointer">✕</button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                        <select
                            id="category_id"
                            {...register("category_id", { valueAsNumber: true })}
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        >
                            {loading ? <option>Cargando categorías...</option> :
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat?.attributes?.name}</option>
                                ))
                            }
                        </select>
                        {errors.category_id && <p className="text-red-400 text-xs">{errors.category_id.message}</p>}

                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea
                            id="description"
                            {...register("description")}
                            rows="4"
                            className="block p-2.5 w-full mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        />
                        {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}

                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</p>
                        <LocationPicker onChange={setLocation} />
                        {location && (
                            <div className="text-sm text-gray-700 flex items-center gap-2 mt-2 bg-gray-100 rounded-lg p-2">
                                <FaLocationDot />
                                <div>{location.coordinates[1].toFixed(5)}, {location.coordinates[0].toFixed(5)}</div>
                            </div>
                        )}
                        {errors.location && <p className="text-red-400 text-xs">{errors.location.message}</p>}

                        <div className="flex items-center justify-end pt-4 border-t mt-4">
                            <button type="button" onClick={() => { setIsOpen(false); if (onClose) onClose(); }} className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                                Cancelar
                            </button>
                            <button type="submit" className="ms-3 text-white bg-black hover:bg-black font-medium rounded-lg text-sm px-8 py-2.5 cursor-pointer">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

