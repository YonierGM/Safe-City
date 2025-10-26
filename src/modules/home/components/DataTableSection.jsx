import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export function DataTableSection({
    title,
    description,
    titleTable,
    descriptionTable,
    buttonText,
    loading,
    error,
    data,
    columns,
    renderRow,
    ModalComponent,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    {loading ? (
                        <>
                            <Skeleton width={220} height={30} />
                            <Skeleton width={300} height={18} />
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {description}
                            </p>
                        </>
                    )}
                </div>


                {!loading && ModalComponent && (
                    <>
                        <button
                            onClick={openModal}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-900"
                        >
                            {buttonText}
                        </button>
                        <ModalComponent isOpen={isModalOpen} onClose={closeModal} />
                    </>
                )}
            </div>

            <div className="w-full mx-auto p-6 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex flex-col">
                    {loading ? (
                        <>
                            <Skeleton width={180} height={24} />
                            <Skeleton width={250} height={16} />
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {titleTable}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {descriptionTable}
                            </p>
                        </>
                    )}
                </div>

                {error ? (
                    <div className="flex items-center justify-center bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl p-4 mt-6 shadow-sm">
                        <p className="text-sm font-medium text-center">
                            {error || "No se pudieron cargar los datos. Inténtalo nuevamente."}
                        </p>
                    </div>
                ) : loading ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md dark:border-gray-700 p-4">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700 h-14">
                                <tr>
                                    {columns.map((_, i) => (
                                        <th key={i}>
                                            <Skeleton width={100} />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        {columns.map((_, j) => (
                                            <td key={j}>
                                                <Skeleton width={100} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700 h-14">
                                <tr>
                                    {columns.map((col) => (
                                        <th
                                            key={col}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-600 dark:text-gray-300 uppercase"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {data.map((item) => renderRow(item))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
