import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AdminToolForm from './pages/AdminToolForm';
import ToolDetail from './pages/ToolDetail';
import Reviews from './pages/Reviews';
import { isLoggedIn } from './utils/auth';

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/tool/:id"   element={<ToolDetail />} />
        <Route path="/reviews"    element={<Reviews />} />
        <Route path="/admin"      element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/add"  element={<ProtectedRoute><AdminToolForm /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><AdminToolForm /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
