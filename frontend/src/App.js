import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserSignup from './components/Auth/UserSignup';
import ManagerSignup from './components/Auth/ManagerSignup';
import OwnerSignup from './components/Auth/OwnerSignup';
import Signup from './components/Auth/Signup'; // Original signup component
import OrganizationSignup from './components/Auth/OrganisationSignup';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup/organization" element={<OrganizationSignup />} />
                <Route path="/signup/user" element={<UserSignup />} />
                <Route path="/signup/manager" element={<ManagerSignup />} />
                <Route path="/signup/owner" element={<OwnerSignup />} />
                <Route path="/signup" element={<Signup />} />
                {/* Other routes */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;