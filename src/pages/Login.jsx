import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      if (res.data.user.role === 'admin') {
        navigate('/admin/events');
      } else {
        navigate('/events');
      }
    } catch (e) {
      alert(e.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} autoComplete="off">
          <input placeholder="Email" type="email" style={styles.input} autoComplete="off"
            {...register('email', { required: 'Email requerido' })} />
          {errors.email && <span style={styles.error}>{errors.email.message}</span>}

          <input placeholder="Contraseña" type="password" style={styles.input} autoComplete="new-password"
            {...register('password', { required: 'Contraseña requerida' })} />
          {errors.password && <span style={styles.error}>{errors.password.message}</span>}

          <button type="submit" style={styles.btn}>Entrar</button>
        </form>
        <p style={styles.footer}>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f1f5f9' },
  card: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { textAlign: 'center', marginBottom: '24px', color: '#1e40af' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' },
  btn: { padding: '10px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  error: { color: '#ef4444', fontSize: '13px' },
  footer: { textAlign: 'center', marginTop: '16px', color: '#64748b' },
};