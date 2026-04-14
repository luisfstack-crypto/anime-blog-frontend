import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = ['Publicaciones', 'Usuarios'];
const ROLES = ['admin', 'editor', 'lector'];

const statusCfg = {
  publicado: { label: 'Publicado', cls: 'badge-green' },
  pendiente: { label: 'Pendiente', cls: 'badge-amber' },
  rechazado: { label: 'Rechazado', cls: 'badge-red' },
};

const userStatusCfg = {
  activo: { label: 'Activo', cls: 'badge-green' },
  suspendido: { label: 'Suspendido', cls: 'badge-red' },
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://localhost:7288/api";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // 1. Cargar Publicaciones
        const resPosts = await fetch(`${API_URL}/Posts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (resPosts.ok) {
          const postsData = await resPosts.json();
          if (Array.isArray(postsData)) {
            setPostList(postsData.map(p => {
              // 🕵️ TRADUCTOR DE ESTADOS SQL -> REACT
              let dbStatus = (p.status || 'pendiente').toLowerCase();
              let finalStatus = dbStatus === 'published' ? 'publicado' : dbStatus;

              return {
                id: p.id,
                title: p.title || 'Sin título',
                author: p.user?.name || 'Anónimo',
                role: p.user?.role?.toLowerCase() || 'lector',
                date: new Date(p.createdAt).toLocaleDateString(),
                status: finalStatus, 
                category: p.category?.name || 'General'
              };
            }));
          }
        }

        // 2. Cargar Usuarios
        const resUsers = await fetch(`${API_URL}/Auth/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resUsers.ok) {
          const usersData = await resUsers.json();
          if (Array.isArray(usersData)) {
            setUserList(usersData.map(u => ({
              id: u.id,
              name: u.name || 'Usuario',
              email: u.email,
              role: (u.role || 'lector').toLowerCase(),
              posts: u.postsCount || 0,
              joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-MX', { month: 'short', year: 'numeric' }) : '2026',
              status: 'activo'
            })));
          }
        }
      } catch (err) {
        console.error("Error en sincronización:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const setPostStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/Posts/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newStatus)
      });
      if (response.ok) {
        setPostList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus.toLowerCase() } : p));
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'#0B0E14', color:'#E6391E', fontFamily:'Bebas Neue', fontSize:'2rem'}}>
      Sincronizando Base de Datos...
    </div>
  );

  return (
    <div className="adm-root">
      <style>{`
        .adm-root { background: #0B0E14; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; padding: 2rem; }
        .adm-container { max-width: 1200px; margin: 0 auto; }
        .adm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #1A1F29; padding-bottom: 1rem; }
        .adm-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: #E6391E; letter-spacing: 1px; }
        .tabs { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .tab-btn { background: #1A1F29; border: none; color: #888; padding: 0.8rem 1.5rem; cursor: pointer; border-radius: 4px; font-weight: 600; transition: 0.3s; }
        .tab-btn.active { background: #E6391E; color: #fff; }
        .adm-table { width: 100%; border-collapse: collapse; background: #151921; border-radius: 8px; overflow: hidden; }
        .adm-table th { background: #1A1F29; padding: 1rem; text-align: left; color: #E6391E; text-transform: uppercase; font-size: 0.8rem; }
        .adm-table td { padding: 1rem; border-bottom: 1px solid #1A1F29; font-size: 0.9rem; }
        .badge { padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; }
        .badge-green { background: rgba(16, 185, 129, 0.2); color: #10B981; }
        .badge-amber { background: rgba(245, 158, 11, 0.2); color: #F59E0B; }
        .badge-red { background: rgba(239, 68, 68, 0.2); color: #EF4444; }
        .btn-action { background: none; border: 1px solid #333; color: #fff; padding: 0.4rem; cursor: pointer; margin-right: 0.5rem; border-radius: 4px; font-size: 0.8rem; }
        .btn-action:hover { border-color: #E6391E; color: #E6391E; }
      `}</style>

      <div className="adm-container">
        <header className="adm-header">
          <h1 className="adm-title">Panel de Control General</h1>
          <div className="adm-stats">
            <span style={{color: '#888'}}>Pendientes: <b style={{color: '#E6391E'}}>{postList.filter(p => p.status === 'pendiente').length}</b></span>
          </div>
        </header>

        <div className="tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`tab-btn ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 ? (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Publicación</th>
                <th>Autor / Rol</th>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {postList.map(p => (
                <tr key={p.id}>
                  <td><b>{p.title}</b></td>
                  <td>{p.author} <br/><small style={{color:'#666'}}>{p.role}</small></td>
                  <td>{p.date}</td>
                  <td>{p.category}</td>
                  <td>
                    {/* 👇 Aquí se aplica el badge basado en el status normalizado */}
                    <span className={`badge ${statusCfg[p.status]?.cls || 'badge-amber'}`}>
                      {statusCfg[p.status]?.label || 'Pendiente'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action" onClick={() => setPostStatus(p.id, 'publicado')}>Aprobar</button>
                    <button className="btn-action" onClick={() => setPostStatus(p.id, 'rechazado')}>Rechazar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Posts</th>
                <th>Miembro desde</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(u => (
                <tr key={u.id}>
                  <td><b>{u.name}</b></td>
                  <td>{u.email}</td>
                  <td><span style={{color: '#E6391E', fontWeight: 'bold'}}>{u.role}</span></td>
                  <td>{u.posts}</td>
                  <td>{u.joined}</td>
                  <td><span className={`badge ${userStatusCfg[u.status]?.cls}`}>{userStatusCfg[u.status]?.label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}