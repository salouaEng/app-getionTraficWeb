import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgotPassword';
import Resend from './pages/Resend';
import Reset from './pages/Reset';
import Recovered from './pages/Recovered';
import Login from './pages/Login';
import Profile from './Admin/pages/Profile';
import Dashboard from './Admin/pages/Dashboard';
import Settings from './Admin/pages/Settings';
import Users from './Admin/pages/Users';

import ProfileClient from './User/pages/ProfileClient';
import DashboardClient from './User/pages/DashboardClient';
import GeneratedLink from './User/pages/GeneratedLink';
import SettingsClient from './User/pages/SettingsClient';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import MaintenancePage from './pages/MaintenancePage';
import ClientGenerateLink from './Admin/pages/ClientGenerateLink';
import GeneratedLinks from './Admin/pages/GeneratedLinks';
import Pricing from './Admin/pages/Pricing';
import FlowCreation from './Admin/pages/FlowCreation';
import Verification from './pages/Verification';
import PaymentPage from './pages/PaymentPage';
import ClientProfile from './Admin/pages/ClientProfile';
import FlowEdit from './Admin/pages/FlowEdit';
import ClientFlowEdit from './User/pages/ClientFlowEdit';
import ClientFlowCreation from './User/pages/ClientFlowCreation';



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
        <Route path="resend" element={<Resend />} />
        <Route path="reset" element={<Reset />} />
        <Route path="recovered" element={<Recovered />} />
        <Route path="verification" element={<Verification />} />
        <Route path="pricing" element={<PaymentPage />} />

        
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="clients" element={<Users />} />
          <Route path="setting" element={<Settings />} />
          <Route path="client-generated-links" element={<ClientGenerateLink />} />
          <Route path="generated-links" element={<GeneratedLinks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="client-profile" element={<ClientProfile />}/>
          <Route path="flow-edit" element={<FlowEdit />} />
          <Route path="flow-creation" element={<FlowCreation />} />
        </Route>

        <Route path="client">
          <Route path="dashboard" element={<DashboardClient />} />
          <Route path="profile" element={<ProfileClient />} />
          <Route path="setting" element={<SettingsClient />} />
          <Route path="generated-links" element={<GeneratedLink />} />
          <Route path="flow-edit" element={<ClientFlowEdit />} />
          <Route path="flow-creation" element={<ClientFlowCreation />} />
        </Route>

        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="error500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
