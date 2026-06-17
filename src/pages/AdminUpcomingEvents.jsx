import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminUpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    try {
      const eventsRes = await api.get('/events');

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const weekLater = new Date(today);
      weekLater.setDate(today.getDate() + 7);
      weekLater.setHours(23, 59, 59, 999);

      const upcoming = eventsRes.data.filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);

        return eventDate >= today && eventDate <= weekLater;
      });

      setEvents(upcoming);
    } catch (error) {
      console.error('Error cargando próximos eventos:', error);
      alert('Error cargando próximos eventos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={s.loading}>Cargando...</div>;
  }

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}> Próximos eventos</h2>
        <span style={s.subtitle}>Esta semana</span>
      </div>

      {events.length === 0 && (
        <div style={s.empty}>
          <span style={s.emptyIcon}></span>
          <p>No hay eventos programados para esta semana.</p>
        </div>
      )}

      <div style={s.grid}>
        {events.map((event) => {
          const date = new Date(event.date);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);

          const daysLeft = Math.ceil(
            (eventDate - today) / (1000 * 60 * 60 * 24),
          );

          return (
            <div key={event.id} style={s.card}>
              <div style={s.urgency}>
                <span
                  style={{
                    ...s.badge,
                    background: daysLeft <= 2 ? '#fef2f2' : '#eff6ff',
                    color: daysLeft <= 2 ? '#ef4444' : '#1e40af',
                  }}
                >
                  {daysLeft === 0
                    ? '¡Hoy!'
                    : daysLeft === 1
                    ? 'Mañana'
                    : `En ${daysLeft} días`}
                </span>
              </div>

              <h3 style={s.eventTitle}>{event.title}</h3>

              <p style={s.desc}>{event.description}</p>

              <div style={s.meta}>
                <span>📍 {event.location}</span>
                <span>
                  📅{' '}
                  {date.toLocaleDateString('es-CO', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span>
                  👥 {event.capacity} {event.capacity === 1 ? 'cupo' : 'cupos'}
                </span>
              </div>

              <button style={s.btnStatus} disabled>
                Evento programado
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  container: {
    padding: '32px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  title: {
    color: '#1e293b',
    margin: 0,
    fontSize: '24px',
    fontWeight: 700,
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
  },
  loading: {
    textAlign: 'center',
    padding: '80px',
    color: '#64748b',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#64748b',
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    border: '1px solid #f1f5f9',
  },
  urgency: {
    display: 'flex',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
  },
  eventTitle: {
    color: '#1e293b',
    margin: 0,
    fontSize: '17px',
    fontWeight: 700,
  },
  desc: {
    color: '#64748b',
    fontSize: '14px',
    margin: 0,
    lineHeight: 1.5,
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '13px',
    color: '#475569',
  },
  btnStatus: {
    padding: '10px',
    background: '#e0f2fe',
    color: '#0369a1',
    border: 'none',
    borderRadius: '10px',
    cursor: 'not-allowed',
    fontWeight: 700,
  },
};