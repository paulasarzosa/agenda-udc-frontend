import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [myInscriptions, setMyInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [evRes, insRes] = await Promise.all([
      api.get('/events'),
      api.get('/inscriptions/my'),
    ]);
    const inscribedIds = insRes.data.map(i => i.event.id);
    setMyInscriptions(inscribedIds);
    setEvents(evRes.data.filter(e => !inscribedIds.includes(e.id)));
    setLoading(false);
  };

  const inscribe = async (eventId) => {
    try {
      await api.post(`/inscriptions/${eventId}`);
      loadData();
    } catch (e) {
      alert(e.response?.data?.message || 'Error al inscribirse');
    }
  };

  if (loading) return <div style={s.loading}>Cargando eventos...</div>;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}>Eventos disponibles</h2>
        <span style={s.count}>{events.length} eventos</span>
      </div>
      {events.length === 0 && (
        <div style={s.empty}>
          <span style={s.emptyIcon}>🎉</span>
          <p>Ya estás inscrito en todos los eventos disponibles.</p>
        </div>
      )}
      <div style={s.grid}>
        {events.map(event => (
          <div key={event.id} style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.tag}>📅 {new Date(event.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <h3 style={s.eventTitle}>{event.title}</h3>
            <p style={s.desc}>{event.description}</p>
            <div style={s.meta}>
              <span>📍 {event.location}</span>
              <span>👥 {event.capacity} cupos</span>
            </div>
            <button onClick={() => inscribe(event.id)} style={s.btnInscribe}>
              Inscribirse →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { padding: '32px', maxWidth: '1100px', margin: '0 auto' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { color: '#1e293b', margin: 0, fontSize: '24px', fontWeight: 700 },
  count: { background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 },
  loading: { textAlign: 'center', padding: '80px', color: '#64748b', fontSize: '16px' },
  empty: { textAlign: 'center', padding: '60px', color: '#64748b' },
  emptyIcon: { fontSize: '48px', display: 'block', marginBottom: '12px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #f1f5f9', transition: 'transform 0.2s' },
  cardHeader: { display: 'flex', justifyContent: 'space-between' },
  tag: { background: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 },
  eventTitle: { color: '#1e293b', margin: 0, fontSize: '17px', fontWeight: 700 },
  desc: { color: '#64748b', fontSize: '14px', margin: 0, lineHeight: 1.5 },
  meta: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#475569' },
  btnInscribe: { padding: '10px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, marginTop: '4px' },
};