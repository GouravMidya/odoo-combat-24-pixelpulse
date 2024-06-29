import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSignup from "./components/Auth/UserSignup";
import ManagerSignup from "./components/Auth/ManagerSignup";
import OwnerSignup from "./components/Auth/OwnerSignup";
import Signup from "./components/Auth/Signup"; // Original signup component
import OrganizationSignup from "./components/Auth/OrganisationSignup";
import CreateOrganizationWithOwner from "./components/Auth/createOrgWithOwner";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSignup from "./components/Auth/UserSignup";
import ManagerSignup from "./components/Auth/ManagerSignup";
import OwnerSignup from "./components/Auth/OwnerSignup";
import Signup from "./components/Auth/Signup"; // Original signup component
import OrganizationSignup from "./components/Auth/OrganisationSignup";
import Dashboard from "./components/Dashboard";
import Reservations from "./components/Reservations";
import Maintenance from "./components/Maintenance";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup/organization" element={<OrganizationSignup />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/manager" element={<ManagerSignup />} />
        <Route path="/signup/owner" element={<OwnerSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manager/dashboard" element={<Dashboard />} />
        <Route path="/manager/reservations" element={<Reservations />} />
        <Route path="/manager/maintenance" element={<Maintenance />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup/organization" element={<OrganizationSignup />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/manager" element={<ManagerSignup />} />
        <Route path="/signup/owner" element={<OwnerSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/signup/create-organization-with-owner"
          element={<CreateOrganizationWithOwner />}
        />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
