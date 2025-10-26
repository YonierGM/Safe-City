import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Navbar } from "../../shared/Navbar";
import { Categories } from "../pages/categories";
import { ForgotPassword } from "../../auth/pages/ForgotPassword";
import { Incidents } from "../pages/Incidents";

const HomeRoutes = () => {
    return (
        <section className="grid md:grid-cols-[320px_1fr] p-3">
            <div className="aside">
                <Navbar />
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/incidentes" element={<Incidents />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </div>
        </section>
    );
};

export default HomeRoutes;