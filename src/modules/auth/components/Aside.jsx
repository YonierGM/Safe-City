import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export function Aside({ title, description, phrase, urlImage }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="relative flex flex-col justify-center gap-3 h-dvh md:rounded-tr-2xl md:rounded-br-2xl p-6 md:p-12 lg:px-16 bg-cover bg-center overflow-hidden">
            {!imageLoaded && (
                <div className="absolute inset-0">
                    <Skeleton height="100%" width="100%" />
                </div>
            )}

            <img
                src={urlImage}
                alt="aside"
                className={`absolute inset-0 object-cover w-full h-full rounded-tr-2xl rounded-br-2xl transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
            />

            {/* Capa oscura */}
            <div className="absolute inset-0 bg-black opacity-30 rounded-tr-2xl rounded-br-2xl"></div>

            {/* Contenido */}
            <div className="relative z-10 text-white flex flex-col items-center justify-end h-dvh">
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-center">
                    {title}
                </h1>
                <p className="mb-6 text-base font-normal text-gray-200 text-center">{description}</p>
                <p className="font-bold text-base text-gray-100">{phrase}</p>
            </div>
        </div>
    );
}
