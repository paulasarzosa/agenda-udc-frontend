import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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

function HomeRedirect() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <Navigate to="/admin/events" replace />;
  }

  return <Navigate to="/events" replace />;
}

function EventsRedirect() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <Navigate to="/admin/events" replace />;
  }

  return <Events />;
}

function UpcomingRedirect() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <Navigate to="/admin/upcoming" replace />;
  }

  return <UpcomingEvents />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeRedirect />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/events"
            element={
              <PrivateRoute>
                <EventsRedirect />
              </PrivateRoute>
            }
          />

          <Route
            path="/upcoming"
            element={
              <PrivateRoute>
                <UpcomingRedirect />
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
                <Navigate to="/admin/events" replace />
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

          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}