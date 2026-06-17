import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await api.get('/events');
    setEvents(res.data);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        capacity: Number(data.capacity),
      };

      if (editing) {
        await api.put(`/events/${editing}`, payload);
        alert('Evento actualizado');
      } else {
        await api.post('/events', payload);
        alert('Evento creado');
      }

      reset();
      setEditing(null);
      loadEvents();
    } catch (e) {
      alert(e.response?.data?.message || 'Error');
    }
  };

  const handleEdit = (event) => {
    setEditing(event.id);
    setValue('title', event.title);
    setValue('description', event.description);
    setValue('location', event.location);
    setValue('date', event.date.split('T')[0]);
    setValue('capacity', event.capacity);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este evento?')) return;

    try {
      await api.delete(`/events/${id}`);
      loadEvents();
    } catch (error) {
      alert('Error al eliminar el evento');
    }
  };

  const cancelEdit = () => {
    reset();
    setEditing(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Panel de creación de eventos</h2>

      <div style={styles.layout}>
        <div style={styles.formCard}>
          <h3 style={styles.subtitle}>
            {editing ? '✏️ Editar evento' : '➕ Crear evento'}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <input
              placeholder="Título"
              style={styles.input}
              {...register('title', { required: 'Requerido' })}
            />
            {errors.title && (
              <span style={styles.error}>{errors.title.message}</span>
            )}

            <textarea
              placeholder="Descripción"
              style={{ ...styles.input, height: '80px' }}
              {...register('description', { required: 'Requerido' })}
            />
            {errors.description && (
              <span style={styles.error}>{errors.description.message}</span>
            )}

            <input
              placeholder="Lugar"
              style={styles.input}
              {...register('location', { required: 'Requerido' })}
            />
            {errors.location && (
              <span style={styles.error}>{errors.location.message}</span>
            )}

            <input
              type="date"
              style={styles.input}
              {...register('date', { required: 'Requerido' })}
            />
            {errors.date && (
              <span style={styles.error}>{errors.date.message}</span>
            )}

            <input
              type="number"
              placeholder="Capacidad"
              style={styles.input}
              {...register('capacity', {
                required: 'Requerido',
                min: {
                  value: 1,
                  message: 'La capacidad debe ser mayor a cero',
                },
              })}
            />
            {errors.capacity && (
              <span style={styles.error}>{errors.capacity.message}</span>
            )}

            <button type="submit" style={styles.btnCreate}>
              {editing ? 'Actualizar evento' : 'Crear evento'}
            </button>

            {editing && (
              <button type="button" onClick={cancelEdit} style={styles.btnCancelForm}>
                Cancelar edición
              </button>
            )}
          </form>
        </div>

        <div style={styles.list}>
          <h3 style={styles.subtitle}>Eventos existentes ({events.length})</h3>

          {events.length === 0 && (
            <p style={{ color: '#64748b' }}>No hay eventos aún.</p>
          )}

          {events.map((event) => (
            <div key={event.id} style={styles.eventItem}>
              <div style={{ flex: 1 }}>
                <strong style={styles.eventTitle}>{event.title}</strong>

                <p style={styles.eventMeta}>
                  📍 {event.location} · 📅{' '}
                  {new Date(event.date).toLocaleDateString('es-CO')} · 👥{' '}
                  {event.capacity} {event.capacity === 1 ? 'cupo' : 'cupos'}
                </p>
              </div>

              <div style={styles.actions}>
                <button onClick={() => handleEdit(event)} style={styles.btnEdit}>
                  Editar
                </button>

                <button onClick={() => handleDelete(event.id)} style={styles.btnDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  title: {
    color: '#1e40af',
    marginBottom: '24px',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 700,
  },
  subtitle: {
    color: '#1e293b',
    marginBottom: '16px',
    fontSize: '20px',
    fontWeight: 700,
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  formCard: {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  btnCreate: {
    padding: '10px',
    background: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
  },
  btnCancelForm: {
    padding: '10px',
    background: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
  },
  error: {
    color: '#ef4444',
    fontSize: '12px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  eventItem: {
    background: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  eventTitle: {
    color: '#1e293b',
    fontSize: '16px',
  },
  eventMeta: {
    color: '#64748b',
    fontSize: '13px',
    margin: '6px 0 0',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  btnEdit: {
    padding: '6px 12px',
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  btnDelete: {
    padding: '6px 12px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};