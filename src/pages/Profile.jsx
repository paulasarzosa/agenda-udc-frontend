import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Profile() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    try {
      await api.patch('/auth/change-password', { currentPassword, newPassword });
      setMsg('Contraseña actualizada correctamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      setError(e.response?.data?.message || 'Error al cambiar contraseña');
    }
  };

  return (
    <div style={s.container}>
      <h2 style={s.title}>👤 Mi perfil</h2>
      <div style={s.grid}>
        <div style={s.card}>
          <div style={s.avatar}>{user?.name?.charAt(0).toUpperCase()}</div>
          <h3 style={s.name}>{user?.name}</h3>
          <p style={s.email}>{user?.email}</p>
          <span style={s.role}>{user?.role === 'admin' ? '👑 Administrador' : '🎓 Participante'}</span>
        </div>

        <div style={s.formCard}>
          <h3 style={s.formTitle}>Cambiar contraseña</h3>
          <form onSubmit={handleChangePassword} style={s.form} autoComplete="off">
            <div style={s.field}>
              <label style={s.label}>Contraseña actual</label>
              <input type="password" style={s.input} autoComplete="new-password"
                value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
            </div>
            <div style={s.field}>
              <label style={s.label}>Nueva contraseña</label>
              <input type="password" style={s.input} autoComplete="new-password"
                value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <div style={s.field}>
              <label style={s.label}>Confirmar nueva contraseña</label>
              <input type="password" style={s.input} autoComplete="new-password"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            {error && <div style={s.error}>{error}</div>}
            {msg && <div style={s.success}>{msg}</div>}
            <button type="submit" style={s.btn}>Actualizar contraseña</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { padding: '32px', maxWidth: '900px', margin: '0 auto' },
  title: { color: '#1e293b', fontSize: '24px', fontWeight: 700, marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' },
  card: { background: 'white', borderRadius: '16px', padding: '32px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', border: '1px solid #f1f5f9' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: 'white', fontSize: '32px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  name: { margin: 0, fontSize: '20px', fontWeight: 700, color: '#1e293b' },
  email: { margin: 0, fontSize: '14px', color: '#64748b' },
  role: { background: '#eff6ff', color: '#1e40af', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 },
  formCard: { background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' },
  formTitle: { margin: '0 0 24px', fontSize: '18px', fontWeight: 700, color: '#1e293b' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: 600, color: '#475569' },
  input: { padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' },
  btn: { padding: '12px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '15px', marginTop: '4px' },
  error: { background: '#fef2f2', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' },
  success: { background: '#f0fdf4', color: '#16a34a', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' },
};