import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegBuilding, FaUserCircle } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import { RiExpandUpDownLine } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Notiflix from "notiflix";

export function Navbar() {
    const { logout, loading, user, isAdmin, error } = useAuthContext();

    return (
        <>
            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center mt-2 ms-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 
            1.5H2.75A.75.75 0 012 
            4.75zm0 10.5a.75.75 0 
            01.75-.75h7.5a.75.75 0 
            010 1.5h-7.5a.75.75 0 
            01-.75-.75zM2 10a.75.75 0 
            01.75-.75h14.5a.75.75 0 
            010 1.5H2.75A.75.75 0 
            012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="logo-sidebar"
                className="p-2 fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full grid grid-rows-[12%_88%] overflow-y-auto p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-2.5">
                        <Link to="/" className="logo bg-black rounded-xl w-auto p-1.5">
                            <img
                                src="/logo-aside.webp"
                                className="h-5 sm:h-7"
                                alt="Logo safe city"
                            />
                        </Link>
                        <div className="flex flex-col leading-none gap-0.5">
                            <span className="self-center text-lg m-0 p-0 leading-none font-semibold whitespace-nowrap dark:text-white">
                                SafeCity
                            </span>
                            <p className="text-lg m-0 p-0 leading-none">v0.1.0</p>
                        </div>
                    </div>

                    <ul className="flex flex-col justify-between space-y-2 font-medium">
                        {error ? (
                            <p className="text-sm text-red-600 text-center">
                                Error al cargar usuario
                            </p>
                        ) : loading ? (
                            // Skeleton general mientras se carga todo el contenido del usuario
                            <div>
                                {/* Skeleton del bloque de opciones */}
                                <div className="space-y-3 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} height={36} borderRadius={8} />
                                    ))}
                                </div>

                                {/* Skeleton del bloque de usuario */}
                                <div className="flex items-center justify-between gap-3 p-2 mt-6">
                                    <Skeleton circle={true} height={24} width={24} />
                                    <Skeleton width={120} height={8} />
                                    <Skeleton width={20} height={24} />
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Mostrar solo si es admin */}
                                {isAdmin && (
                                    <div className="options-admin m-0">
                                        <li>
                                            <Link
                                                to="/"
                                                className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <LuLayoutDashboard className="text-xl" />
                                                <span className="ms-2 text-lg font-normal">
                                                    Dashboard
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/"
                                                className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <FiUsers className="text-xl" />
                                                <span className="ms-2 text-lg font-normal">
                                                    Usuarios
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/dashboard/categories"
                                                className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <MdOutlineCategory className="text-[23px]" />
                                                <span className="ms-2 text-lg font-normal">
                                                    Categorías
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/"
                                                className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <FaRegBuilding className="text-xl" />
                                                <span className="ms-2 text-lg font-normal">
                                                    Centros de control
                                                </span>
                                            </Link>
                                        </li>
                                    </div>
                                )}

                                <div className="options-user flex flex-col gap-4 justify-between h-full">
                                    <li>
                                        <Link
                                            to="/dashboard/incidentes"
                                            className="flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <GoAlert className="text-xl" />
                                            <span className="ms-2 text-lg font-normal">Incidentes</span>
                                        </Link>
                                    </li>

                                    <li className="w-full">
                                        <div className="flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white">
                                            <FaUserCircle
                                                onClick={() => {
                                                    logout()
                                                }}
                                                className={`text-xl cursor-pointer ${loading ? "opacity-50" : ""}`}
                                                title="Cerrar sesión"
                                            />

                                            <span className="ms-2 text-lg font-normal truncate w-40 block">
                                                {user?.email || "Usuario no disponible"}
                                            </span>
                                            <Link to="/dashboard/forgot-password">
                                                <RiExpandUpDownLine
                                                    className="text-xl"
                                                    title="Configuraciones"
                                                />
                                            </Link>
                                        </div>
                                    </li>
                                </div>
                            </>
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
}
