import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Admin from './pages/Admin';
import AdminEvents from './pages/AdminEvents';
import AdminUpcomingEvents from './pages/AdminUpcomingEvents';
import MyInscriptions from './pages/MyInscriptions';
import UpcomingEvents from './pages/UpcomingEvents';
import MyAttendance from './pages/MyAttendance';
import Profile from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/events" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-inscriptions"
            element={
              <PrivateRoute>
                <MyInscriptions />
              </PrivateRoute>
            }
          />

          <Route
            path="/upcoming"
            element={
              <PrivateRoute>
                <UpcomingEvents />
              </PrivateRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <PrivateRoute>
                <MyAttendance />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <Navigate to="/admin/events" />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/events"
            element={
              <PrivateRoute adminOnly>
                <AdminEvents />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/create"
            element={
              <PrivateRoute adminOnly>
                <Admin />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/upcoming"
            element={
              <PrivateRoute adminOnly>
                <AdminUpcomingEvents />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}