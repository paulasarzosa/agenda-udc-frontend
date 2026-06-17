import { useEffect, useState } from 'react';
import api from '../api/axios';

function InscriptionsList({ eventId }) {
  const [inscriptions, setInscriptions] = useState([]);
  const [show, setShow] = useState(false);

  const load = async () => {
    try {
      const res = await api.get(`/events/${eventId}/inscriptions`);
      setInscriptions(res.data);
      setShow(true);
    } catch (e) {
      alert('Error al cargar inscritos');
    }
  };

  return (
    <div style={s.inscriptionsBox}>
      <button onClick={show ? () => setShow(false) : load} style={s.btnView}>
        {show ? 'Ocultar inscritos' : 'Ver inscritos'}
      </button>

      {show && (
        <div style={s.inscList}>
          {inscriptions.length === 0 && (
            <p style={s.noInscriptions}>Sin inscritos aún</p>
          )}

          {inscriptions.map((i) => (
            <div key={i.id} style={s.inscItem}>
              <span style={s.inscName}>👤 {i.user.name}</span>
              <span style={s.inscEmail}>{i.user.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (error) {
      alert('Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={s.loading}>Cargando eventos...</div>;
  }

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}>Panel de eventos</h2>
        <span style={s.count}>
          {events.length} {events.length === 1 ? 'evento' : 'eventos'}
        </span>
      </div>

      {events.length === 0 && (
        <div style={s.empty}>
          <span style={s.emptyIcon}>📅</span>
          <p>No hay eventos creados.</p>
        </div>
      )}

      <div style={s.grid}>
        {events.map((event) => (
          <div key={event.id} style={s.card}>
            <div style={s.dateBadge}>
              📅{' '}
              {new Date(event.date).toLocaleDateString('es-CO', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>

            <h3 style={s.eventTitle}>{event.title}</h3>

            <p style={s.desc}>{event.description}</p>

            <div style={s.meta}>
              <span>📍 {event.location}</span>
              <span>
                👥 {event.capacity} {event.capacity === 1 ? 'cupo' : 'cupos'}
              </span>
            </div>

            <InscriptionsList eventId={event.id} />
          </div>
        ))}
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
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  title: {
    color: '#1e293b',
    margin: 0,
    fontSize: '26px',
    fontWeight: 700,
  },
  count: {
    background: '#eff6ff',
    color: '#1e40af',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 700,
  },
  loading: {
    textAlign: 'center',
    padding: '80px',
    color: '#64748b',
    fontSize: '16px',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  dateBadge: {
    alignSelf: 'flex-start',
    background: '#f0fdf4',
    color: '#16a34a',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 700,
  },
  eventTitle: {
    color: '#1e293b',
    margin: 0,
    fontSize: '19px',
    fontWeight: 700,
    textAlign: 'center',
  },
  desc: {
    color: '#64748b',
    fontSize: '14px',
    margin: 0,
    lineHeight: 1.5,
    textAlign: 'center',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '14px',
    color: '#475569',
    alignItems: 'center',
  },
  inscriptionsBox: {
    marginTop: '8px',
    textAlign: 'center',
  },
  btnView: {
    padding: '8px 14px',
    background: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
  },
  inscList: {
    marginTop: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  inscItem: {
    background: '#f8fafc',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  inscName: {
    color: '#1e293b',
    fontWeight: 700,
    fontSize: '14px',
  },
  inscEmail: {
    color: '#475569',
    fontSize: '13px',
    wordBreak: 'break-word',
  },
  noInscriptions: {
    color: '#64748b',
    fontSize: '14px',
    margin: 0,
  },
};