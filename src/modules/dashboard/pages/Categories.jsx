import { IoAdd } from "react-icons/io5";
import { DataTableSection } from "../components/DataTableSection";
import { CategoryActionsDropdown } from "../components/CategoryActionsDropdown";
import { ModalCreateCategory } from "../components/ModalCreateCategory";
import { useCategoriesContext } from "../../context/CategoriesContext";

export function Categories() {
    const { categories, error, showSkeleton } = useCategoriesContext();

    return (
        <DataTableSection
            title="Gestión de categorías"
            description="Esta es la página de gestión de categorías"
            titleTable="Gestión de categorías"
            descriptionTable="Esta es la lista de todas las categorías"
            buttonText={
                <>
                    <IoAdd /> Crear categoría
                </>
            }
            loading={showSkeleton}
            error={error}
            data={categories}
            columns={["Id", "Nombre", "Acciones"]}
            ModalComponent={ModalCreateCategory}
            renderRow={(cat) => (
                <tr key={cat.id}>
                    <td className="px-6 py-4">{cat.id}</td>
                    <td className="px-6 py-4">{cat.attributes.name}</td>
                    <td className="px-6 py-4">
                        <CategoryActionsDropdown category={cat} />
                    </td>
                </tr>
            )}
        />
    );
}
