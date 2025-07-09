import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import OnboardBusiness from './pages/OnboardBusiness';
import Advertisement from './pages/Advertisement';
import Login from './pages/Login';
import BusinessDashboard from './pages/Business/BusinessDashboard';
import BusinessInvoices from './pages/Business/BusinessInvoices';
import BusinessCustomers from './pages/Business/BusinessCustomers';
import BusinessCredits from './pages/Business/BusinessCredits';
import BusinessProfile from './pages/Business/BusinessProfile';
import CustomerPage from './pages/Customer';
import ShopPage from './pages/Shop';
import MainLayout from './components/MainLayout';
import PrivateRoute from './components/PrivateRoute'; // If you have this as a separate file, else keep inline
import RoleBasedRedirect from './components/RoleBasedRedirect'; // If you have this as a separate file, else keep inline

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/business/dashboard" element={<PrivateRoute allowedRoles={['business']}><BusinessDashboard /></PrivateRoute>} />
                <Route path="/business/invoices" element={<PrivateRoute allowedRoles={['business']}><BusinessInvoices /></PrivateRoute>} />
                <Route path="/business/customers" element={<PrivateRoute allowedRoles={['business']}><BusinessCustomers /></PrivateRoute>} />
                <Route path="/business/credits" element={<PrivateRoute allowedRoles={['business']}><BusinessCredits /></PrivateRoute>} />
                <Route path="/business/profile" element={<PrivateRoute allowedRoles={['business']}><BusinessProfile /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute allowedRoles={['admin']}><Dashboard /></PrivateRoute>} />
                <Route path="/analytics" element={<PrivateRoute allowedRoles={['admin']}><Analytics /></PrivateRoute>} />
                <Route path="/reports" element={<PrivateRoute allowedRoles={['admin']}><Reports /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute allowedRoles={['admin']}><Settings /></PrivateRoute>} />
                <Route path="/onboard-business" element={<PrivateRoute allowedRoles={['admin']}><OnboardBusiness /></PrivateRoute>} />
                <Route path="/advertisement" element={<PrivateRoute allowedRoles={['admin']}><Advertisement /></PrivateRoute>} />
                <Route path="/customers/:customerNumber" element={<PrivateRoute allowedRoles={['admin']}><CustomerPage /></PrivateRoute>} />
                <Route path="/shops/:shopId" element={<PrivateRoute allowedRoles={['admin']}><ShopPage /></PrivateRoute>} />
                <Route path="*" element={<RoleBasedRedirect />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
