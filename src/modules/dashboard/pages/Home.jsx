import { useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthContext } from "../../context/AuthContext";
import { useIncidentsContext } from "../../context/IncidentsContext";
import { useCategoriesContext } from "../../context/CategoriesContext";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E74C3C", "#8E44AD"];

export function Home() {
    const { user, loading, error } = useAuthContext();
    const { incidents } = useIncidentsContext();
    const { categories } = useCategoriesContext();

    // Calcular métricas
    const stats = useMemo(() => {
        if (!incidents?.length || !categories?.length) return null;

        const totalIncidents = incidents.length;

        // Tiempo promedio de resolución (reported_at → resolved_at)
        const resolvedIncidents = incidents.filter(
            (i) => i.attributes?.resolved_at && i.attributes?.reported_at
        );
        const avgResolutionTime =
            resolvedIncidents.length > 0
                ? resolvedIncidents.reduce((acc, i) => {
                    const start = new Date(i.attributes.reported_at);
                    const end = new Date(i.attributes.resolved_at);
                    return acc + (end - start);
                }, 0) /
                resolvedIncidents.length /
                (1000 * 60 * 60) // horas
                : 0;

        // Incidentes por día
        const incidentsPerDay = incidents.reduce((acc, inc) => {
            const date = new Date(inc.attributes?.reported_at).toISOString().split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        const sortedPerDay = Object.entries(incidentsPerDay).map(([date, count]) => ({
            date,
            count,
        }));

        // Incidentes por categoría
        const byCategory = categories.map((cat) => {
            const count = incidents.filter(
                (i) => i.relationships?.category?.id === cat.id
            ).length;
            return { name: cat.attributes?.name || "Sin categoría", value: count };
        });

        // Usuario más activo
        const reporters = {};
        incidents.forEach((i) => {
            const reporter = i.relationships?.reporter?.attributes?.name || "Desconocido";
            reporters[reporter] = (reporters[reporter] || 0) + 1;
        });
        const [topReporter, topCount] =
            Object.entries(reporters).sort((a, b) => b[1] - a[1])[0] || [];

        // Zonas más afectadas
        const byLocation = incidents.reduce((acc, i) => {
            const loc = i.attributes?.location || "Sin ubicación";
            acc[loc] = (acc[loc] || 0) + 1;
            return acc;
        }, {});
        const topLocations = Object.entries(byLocation)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, value]) => ({ name, value }));

        // Porcentaje resueltos vs abiertos
        const resolved = incidents.filter((i) => i.attributes?.status === "resuelto").length;
        const open = totalIncidents - resolved;
        const statusRatio = [
            { name: "Resueltos", value: resolved },
            { name: "Abiertos", value: open },
        ];

        // Promedio de asignación (reported_at → assigned_at)
        const assignedIncidents = incidents.filter(
            (i) => i.attributes?.assigned_at && i.attributes?.reported_at
        );
        const avgAssignTime =
            assignedIncidents.length > 0
                ? assignedIncidents.reduce((acc, i) => {
                    const start = new Date(i.attributes.reported_at);
                    const end = new Date(i.attributes.assigned_at);
                    return acc + (end - start);
                }, 0) /
                assignedIncidents.length /
                (1000 * 60) // minutos
                : 0;

        return {
            totalIncidents,
            avgResolutionTime,
            sortedPerDay,
            byCategory,
            topReporter,
            topCount,
            topLocations,
            statusRatio,
            avgAssignTime,
        };
    }, [incidents, categories]);

    if (loading)
        return (
            <div className="space-y-4">
                <Skeleton height={30} width={200} />
                <Skeleton count={5} height={100} />
            </div>
        );

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!stats) return;

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">
                Hola {user?.name}, bienvenido al panel de administración
            </h2>

            {/* === TARJETAS DE RESUMEN === */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card title="🚨 Total de incidentes" value={stats.totalIncidents} />
                <Card
                    title="🕒 Promedio de resolución"
                    value={`${stats.avgResolutionTime.toFixed(1)} h`}
                />
                <Card
                    title="⏳ Tiempo promedio de asignación"
                    value={`${stats.avgAssignTime.toFixed(1)} min`}
                />
                <Card
                    title="👤 Usuario más activo"
                    value={stats.topReporter ? `${stats.topReporter} (${stats.topCount})` : "N/A"}
                />
            </div>

            {/* === GRÁFICOS === */}
            <div className="grid md:grid-cols-2 gap-6">
                {/*Incidentes por día */}
                <ChartCard title="📅 Evolución de incidentes por día">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={stats.sortedPerDay}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#0088FE"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Incidentes por categoría */}
                <ChartCard title="🧩 Distribución por categoría">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={stats.byCategory}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                dataKey="value"
                            >
                                {stats.byCategory.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/*Porcentaje resueltos vs abiertos */}
            <ChartCard title="🔁 Estado de incidentes">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={stats.statusRatio}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {stats.statusRatio.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartCard>

        </div>
    );
}

// Componentes auxiliares
function Card({ title, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow text-center">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-3">{title}</h4>
            {children}
        </div>
    );
}
