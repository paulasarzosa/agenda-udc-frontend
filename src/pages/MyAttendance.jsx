import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyAttendance() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await api.get('/inscriptions/my/history');
    setHistory(res.data);
    setLoading(false);
  };

  if (loading) return <div style={s.loading}>Cargando...</div>;

  const past = history.filter(i => new Date(i.event.date) < new Date());
  const future = history.filter(i => new Date(i.event.date) >= new Date());

  return (
    <div style={s.container}>
      <h2 style={s.title}>✅ Mis asistencias</h2>

      <h3 style={s.section}>Eventos pasados ({past.length})</h3>
      {past.length === 0 && <p style={s.empty}>Sin eventos pasados.</p>}
      <div style={s.list}>
        {past.map(i => (
          <div key={i.id} style={{ ...s.card, borderLeft: '4px solid #22c55e' }}>
            <div>
              <h4 style={s.eventTitle}>{i.event.title}</h4>
              <p style={s.meta}>📍 {i.event.location} · 📅 {new Date(i.event.date).toLocaleDateString('es-CO')}</p>
            </div>
            <span style={s.attended}>✅ Asistido</span>
          </div>
        ))}
      </div>

      <h3 style={{ ...s.section, marginTop: '32px' }}>Próximas inscripciones ({future.length})</h3>
      {future.length === 0 && <p style={s.empty}>Sin próximas inscripciones.</p>}
      <div style={s.list}>
        {future.map(i => (
          <div key={i.id} style={{ ...s.card, borderLeft: '4px solid #3b82f6' }}>
            <div>
              <h4 style={s.eventTitle}>{i.event.title}</h4>
              <p style={s.meta}>📍 {i.event.location} · 📅 {new Date(i.event.date).toLocaleDateString('es-CO')}</p>
            </div>
            <span style={s.upcoming}>🔜 Pendiente</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { padding: '32px', maxWidth: '900px', margin: '0 auto' },
  title: { color: '#1e293b', fontSize: '24px', fontWeight: 700, marginBottom: '24px' },
  section: { color: '#475569', fontSize: '16px', fontWeight: 600, marginBottom: '12px' },
  loading: { textAlign: 'center', padding: '80px', color: '#64748b' },
  empty: { color: '#94a3b8', fontSize: '14px', padding: '12px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: { background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  eventTitle: { margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#1e293b' },
  meta: { margin: 0, fontSize: '13px', color: '#64748b' },
  attended: { background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 },
  upcoming: { background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 },
};