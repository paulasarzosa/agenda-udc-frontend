import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      login(res.data.token, res.data.user);
      navigate('/events');
    } catch (e) {
      alert(e.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} autoComplete="off">
          <input placeholder="Nombre completo" style={styles.input} autoComplete="off"
            {...register('name', { required: 'Nombre requerido' })} />
          {errors.name && <span style={styles.error}>{errors.name.message}</span>}

          <input placeholder="Email" type="email" style={styles.input} autoComplete="off"
            {...register('email', { required: 'Email requerido' })} />
          {errors.email && <span style={styles.error}>{errors.email.message}</span>}

          <input placeholder="Contraseña (mín. 6 caracteres)" type="password" style={styles.input} autoComplete="new-password"
            {...register('password', { required: 'Contraseña requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })} />
          {errors.password && <span style={styles.error}>{errors.password.message}</span>}

          <button type="submit" style={styles.btn}>Registrarse</button>
        </form>
        <p style={styles.footer}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
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