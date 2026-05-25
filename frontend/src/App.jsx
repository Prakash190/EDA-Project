import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import SummaryPage from './pages/SummaryPage';
import CleaningDashboard from './pages/CleaningDashboard';
import VisualizationDashboard from './pages/VisualizationDashboard';
import InsightsPage from './pages/InsightsPage';
import ReportPage from './pages/ReportPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/dashboard" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
        <Route path="/summary" element={<PrivateRoute><SummaryPage /></PrivateRoute>} />
        <Route path="/cleaning" element={<PrivateRoute><CleaningDashboard /></PrivateRoute>} />
        <Route path="/visualization" element={<PrivateRoute><VisualizationDashboard /></PrivateRoute>} />
        <Route path="/insights" element={<PrivateRoute><InsightsPage /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
