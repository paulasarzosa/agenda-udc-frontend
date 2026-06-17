import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={s.nav}>
      <div style={s.brand}>
        🎓 <span style={s.brandText}>AGENDA UDC</span>
      </div>

      {user && (
        <div style={s.links}>
          {user.role === 'admin' ? (
            <>
              <NavLink
                to="/admin/events"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                🗓 Eventos
              </NavLink>

              <NavLink
                to="/admin/create"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                ➕ Crear evento
              </NavLink>

              <NavLink
                to="/admin/upcoming"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                ⏰ Próximos
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/events"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                🗓 Eventos
              </NavLink>

              <NavLink
                to="/upcoming"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                ⏰ Próximos
              </NavLink>

              <NavLink
                to="/my-inscriptions"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                📋 Inscritos
              </NavLink>

              <NavLink
                to="/attendance"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                ✅ Asistencias
              </NavLink>

              <NavLink
                to="/profile"
                style={({ isActive }) => ({
                  ...s.link,
                  ...(isActive ? s.active : {}),
                })}
              >
                👤 Perfil
              </NavLink>
            </>
          )}
        </div>
      )}

      {user && (
        <div style={s.right}>
          <span style={s.username}>Hola, {user.name}</span>
          <button onClick={handleLogout} style={s.btn}>
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}

const s = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '60px',
    background: 'linear-gradient(135deg, #1e3a8a, #1e40af)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '20px',
  },
  brandText: {
    color: 'white',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  links: {
    display: 'flex',
    gap: '4px',
  },
  link: {
    color: '#bfdbfe',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  active: {
    color: 'white',
    background: 'rgba(255,255,255,0.15)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  username: {
    color: '#bfdbfe',
    fontSize: '14px',
  },
  btn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
  },
};