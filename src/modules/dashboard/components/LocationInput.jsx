import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// Recalcula el tamaño del mapa al abrir el modal
function FixMapResize() {
    const map = useMap();

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const modal = document.getElementById("default-modal");
            if (modal && !modal.classList.contains("hidden")) {
                setTimeout(() => map.invalidateSize(), 300);
            }
        });

        observer.observe(document.body, { attributes: true, subtree: true });
        return () => observer.disconnect();
    }, [map]);

    return null;
}

export function LocationPicker({ value, onChange }) {
    const [position, setPosition] = useState(value || null);
    const [mapCenter, setMapCenter] = useState(
        value ? [value.coordinates[1], value.coordinates[0]] : null
    );

    // Actualiza posición si cambia la prop value desde el exterior
    useEffect(() => {
        if (value) {
            setPosition(value);
            setMapCenter([value.coordinates[1], value.coordinates[0]]);
        }
    }, [value]);

    // Detectar ubicación actual si no hay valor inicial
    useEffect(() => {
        if (!value && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const coords = { type: "Point", coordinates: [longitude, latitude] };
                    setPosition(coords);
                    setMapCenter([latitude, longitude]);
                    onChange(coords);
                },
                (err) => {
                    console.warn("No se pudo obtener la ubicación:", err.message);
                    setMapCenter([3.8776, -77.0282]); // fallback a Buenaventura
                },
                { enableHighAccuracy: true }
            );
        } else if (!mapCenter) {
            setMapCenter([3.8776, -77.0282]); // fallback por si acaso
        }
    }, [value, onChange, mapCenter]);

    // Manejador de clics en el mapa
    const MapClick = () => {
        useMapEvents({
            click(e) {
                const coords = { type: "Point", coordinates: [e.latlng.lng, e.latlng.lat] };
                setPosition(coords);
                onChange(coords);
            },
        });
        return null;
    };

    if (!mapCenter) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
                Obteniendo ubicación actual...
            </div>
        );
    }

    return (
        <div className="h-64 min-h-[300px] w-full">
            <MapContainer center={mapCenter} zoom={15} className="h-full w-full rounded z-0">
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClick />
                <FixMapResize />
                {position && <Marker position={[position.coordinates[1], position.coordinates[0]]} />}
            </MapContainer>
        </div>
    );
}
