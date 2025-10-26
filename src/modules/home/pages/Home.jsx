
import { useAuthUser } from "../../users/hooks/useAuthUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Home() {
    const { user, isAdmin, loadingUser, error } = useAuthUser();
    return (
        <>
            {error ? (
                <p className="text-sm text-red-600 text-center">Error al cargar usuario</p>
            ) : loadingUser ? (
                <>
                    <Skeleton count={1} width={40} />
                    <Skeleton count={1} width={46} />
                </>
            ) : (
                <div>
                    <h2>Hola {user?.name}</h2>
                    {isAdmin ? (
                        <p>Eres administrador</p>
                    ) : (
                        <p>Usuario normal</p>
                    )}
                </div>

            )}
        </>
    )
}