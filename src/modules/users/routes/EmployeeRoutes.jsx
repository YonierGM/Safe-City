import { Routes, Route } from "react-router-dom";
import { EmployeeList } from "../pages/EmployeeList";
import { EmployeeDetail } from "../pages/EmployeeDetail";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path=":id" element={<EmployeeDetail />} />
    </Routes>
  );
};

export default EmployeeRoutes;
