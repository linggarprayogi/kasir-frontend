import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import DataMasterPage from './pages/admin/DataMasterPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-master" element={
          <ProtectedRoute>
            <DataMasterPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
