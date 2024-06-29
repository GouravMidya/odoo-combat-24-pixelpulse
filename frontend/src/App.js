import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSignup from "./components/Auth/UserSignup";
import ManagerSignup from "./components/Auth/ManagerSignup";
import OwnerSignup from "./components/Auth/OwnerSignup";
import OrganizationSignup from "./components/Auth/OrganisationSignup";
import CreateOrganizationWithOwner from "./components/Auth/createOrgWithOwner";
import Dashboard from "./components/Dashboard";
import Reservations from "./components/Reservations";
import Maintenance from "./components/Maintenance";
import Signup from "./components/Auth/Signup"; // Original signup component
import ReservationForm from "./components/User/ReservationForm"
import Login from "./components/Auth/Login";
import CreateEmployee from "./components/createEmployee";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/owner/create-employee" element={<CreateEmployee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/organization" element={<OrganizationSignup />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/manager" element={<ManagerSignup />} />
        <Route path="/signup/owner" element={<OwnerSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manager/dashboard" element={<Dashboard />} />
        <Route path="/manager/reservations" element={<Reservations />} />
        <Route path="/manager/maintenance" element={<Maintenance />} />
        <Route path="/user/reservation" element={<ReservationForm facilityId="667fb9d31bcbf5bbb9a7e7da"/>}/>
        <Route
          path="/signup/create-organization-with-owner"
          element={<CreateOrganizationWithOwner />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
