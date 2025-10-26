import { useState } from "react";
import { ActionsDropdown } from "./ActionsDropdown";
import { ModalDetailCategory } from "./ModalDetailCategory";
import { ModalUpdateCategory } from "./ModalUpdateCategory";
import { useDeleteCategory } from "../hook/categories/useDeleteCategory";
import { useAuthContext } from "../../context/AuthContext";

export function CategoryActionsDropdown({ category }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const { token } = useAuthContext();
    const { deleteCategory } = useDeleteCategory(token);

    const handleDelete = async () => {
        await deleteCategory(category.id);
    };

    return (
        <>
            <ActionsDropdown
                onView={() => setShowDetail(true)}
                onEdit={() => setShowUpdate(true)}
                onDelete={handleDelete}
            />

            {showDetail && (
                <ModalDetailCategory
                    category={category}
                    onClose={() => setShowDetail(false)}
                />
            )}

            {showUpdate && (
                <ModalUpdateCategory
                    category={category}
                    onClose={() => setShowUpdate(false)}
                />
            )}
        </>
    );
}
