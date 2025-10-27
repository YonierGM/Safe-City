import { IoAdd } from "react-icons/io5";
import { DataTableSection } from "../components/DataTableSection";
import { ModalCreateIncident } from "../components/ModalCreateIncident";
import { useIncidentsContext } from "../../context/IncidentsContext";
import { useAuthContext } from "../../context/AuthContext";
import { IncidentActionsDropdown } from "../components/IncidentActionsDropdown";

export function Incidents() {
    const { isAdmin } = useAuthContext();
    const { incidents, showSkeleton, error } = useIncidentsContext();

    return (
        <DataTableSection
            title={isAdmin ? "Gestión de Incidentes" : "Mis incidentes"}
            description={
                isAdmin
                    ? "Esta es la página de gestión de incidentes."
                    : "Aquí puedes ver los incidentes que tú has reportado."
            }
            titleTable={isAdmin ? "Lista de incidentes" : "Mis incidentes reportados"}
            descriptionTable={
                isAdmin
                    ? "Esta es la lista de todos los incidentes registrados."
                    : "Lista de incidentes asociados a tu cuenta"
            }
            buttonText={<><IoAdd /> Crear incidente</>}
            onButtonClick={() => console.log("Crear incidente")}
            loading={showSkeleton}
            error={error}
            data={incidents}
            columns={[
                "ID",
                "Reporte",
                "Categoría",
                "Estado",
                "Fecha del reporte",
                "Acciones",
            ]}
            renderRow={(inc) => (
                <tr key={inc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm">{inc.id}</td>
                    <td className="px-6 py-4">{inc.attributes.description}</td>
                    <td className="px-6 py-4">{inc.relationships.category.attributes.name}</td>
                    <td className="px-6 py-4">
                        <span>
                            <span className={`inline-block px-3 rounded-full ${inc.attributes.status === "Abierto" ? "bg-green-500 text-green-900" : inc.attributes.status === "reported" ? "bg-violet-400 text-violet-900" : inc.attributes.status === "En progreso" ? "bg-yellow-500 text-yellow-900" : "bg-gray-500 text-gray-900"}`}>

                                {inc.attributes.status}
                            </span>
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {new Date(inc.attributes.reported_at).toLocaleString("es-CO", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </td>
                    <td className="px-6 py-4 text-cente">
                        <IncidentActionsDropdown incident={inc} />
                    </td>
                </tr>
            )}
            ModalComponent={ModalCreateIncident}
        />
    );
}
