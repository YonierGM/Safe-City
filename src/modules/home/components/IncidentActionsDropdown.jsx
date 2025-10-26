import { useState } from "react";
import { ActionsDropdown } from "./ActionsDropdown";
import { useCategoriesContext } from "../../context/CategoriesContext";
import { useIncidentsContext } from "../../context/IncidentsContext";
import { ModalDetailIncident } from "./ModalDetailIncident";
import { ModalUpdateIncident } from "./ModalUpdateIncident";
import { ModalCreateIncident } from "./ModalCreateIncident";

export function IncidentActionsDropdown({ incident }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const { deleteIncident } = useIncidentsContext();

    const handleDelete = async () => {
        await deleteIncident(incident.id);
    };

    return (
        <>
            <ActionsDropdown
                onView={() => setShowDetail(true)}
                onEdit={() => setShowUpdate(true)}
                onDelete={handleDelete}
            />

            {showDetail && (
                <ModalDetailIncident
                    incident={incident}
                    onClose={() => setShowDetail(false)}
                />
            )}

            <ModalCreateIncident
                isOpen={showUpdate}
                onClose={() => setShowUpdate(false)}
                incidentData={incident}
                buttonText="Actualizar incidente"
            />
        </>
    );
}


