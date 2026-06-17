import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyInscriptions() {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await api.get('/inscriptions/my');
    setInscriptions(res.data);
    setLoading(false);
  };

  const cancel = async (eventId) => {
    if (!confirm('¿Cancelar inscripción?')) return;
    await api.delete(`/inscriptions/${eventId}`);
    load();
  };

  if (loading) return <div style={s.loading}>Cargando...</div>;

  return (
    <div style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}>📋 Eventos inscritos</h2>
        <span style={s.count}>{inscriptions.length} inscripciones</span>
      </div>
      {inscriptions.length === 0 && (
        <div style={s.empty}>
          <span style={s.emptyIcon}>📭</span>
          <p>No estás inscrito en ningún evento aún.</p>
        </div>
      )}
      <div style={s.list}>
        {inscriptions.map(i => (
          <div key={i.id} style={s.card}>
            <div style={s.cardLeft}>
              <div style={s.dateBox}>
                <span style={s.dateDay}>{new Date(i.event.date).getDate()}</span>
                <span style={s.dateMonth}>{new Date(i.event.date).toLocaleDateString('es-CO', { month: 'short' })}</span>
              </div>
              <div>
                <h3 style={s.eventTitle}>{i.event.title}</h3>
                <p style={s.meta}>📍 {i.event.location} · 👥 {i.event.capacity} cupos</p>
                <p style={s.inscDate}>Inscrito el {new Date(i.createdAt).toLocaleDateString('es-CO')}</p>
              </div>
            </div>
            <button onClick={() => cancel(i.event.id)} style={s.btnCancel}>Cancelar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { padding: '32px', maxWidth: '900px', margin: '0 auto' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { color: '#1e293b', margin: 0, fontSize: '24px', fontWeight: 700 },
  count: { background: '#eff6ff', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 },
  loading: { textAlign: 'center', padding: '80px', color: '#64748b' },
  empty: { textAlign: 'center', padding: '60px', color: '#64748b' },
  emptyIcon: { fontSize: '48px', display: 'block', marginBottom: '12px' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: { background: 'white', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f1f5f9' },
  cardLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  dateBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#eff6ff', borderRadius: '12px', padding: '10px 14px', minWidth: '52px' },
  dateDay: { fontSize: '22px', fontWeight: 700, color: '#1e40af', lineHeight: 1 },
  dateMonth: { fontSize: '12px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 600 },
  eventTitle: { margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#1e293b' },
  meta: { margin: '0 0 2px', fontSize: '13px', color: '#64748b' },
  inscDate: { margin: 0, fontSize: '12px', color: '#94a3b8' },
  btnCancel: { padding: '8px 16px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
};