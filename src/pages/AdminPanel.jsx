import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = ['Publicaciones', 'Usuarios'];

const posts = [
  { id: 1, title: "Análisis del Gear 5 de Luffy: Impacto y Narrativa", author: "Luis Pech", role: "editor", date: "20 Mar 2026", status: "pendiente", category: "Análisis" },
  { id: 2, title: "Maki Zen'in y la evolución de las restricciones celestiales", author: "Estudiante 01", role: "lector", date: "21 Mar 2026", status: "pendiente", category: "Personajes" },
  { id: 3, title: "Reseña: Los 3 mejores estrenos de la primavera 2026", author: "Luis Pech", role: "editor", date: "19 Mar 2026", status: "publicado", category: "Reseña" },
  { id: 4, title: "La psicología detrás de las murallas: Arquitectura en SnK", author: "Admin", role: "admin", date: "17 Mar 2026", status: "publicado", category: "Mundo" },
  { id: 5, title: "Top 10 openings que marcaron una generación", author: "Estudiante 02", role: "lector", date: "22 Mar 2026", status: "rechazado", category: "Lista" },
];

const users = [
  { id: 1, name: "Luis Pech", email: "luis@animeblog.com", role: "editor", posts: 12, joined: "Ene 2026", status: "activo" },
  { id: 2, name: "Admin", email: "admin@animeblog.com", role: "admin", posts: 30, joined: "Dic 2025", status: "activo" },
  { id: 3, name: "Usuario 01", email: "Usu01@animeblog.com", role: "lector", posts: 3, joined: "Feb 2026", status: "activo" },
  { id: 4, name: "Usuario 02", email: "Usu02@animeblog.com", role: "lector", posts: 1, joined: "Mar 2026", status: "suspendido" },
  { id: 5, name: "Kenji Taro", email: "kenji@animeblog.com", role: "editor", posts: 7, joined: "Feb 2026", status: "activo" },
];

const ROLES = ['admin', 'editor', 'lector'];

const statusCfg = {
  publicado:  { label: 'Publicado',  cls: 'badge-green' },
  pendiente:  { label: 'Pendiente',  cls: 'badge-amber' },
  rechazado:  { label: 'Rechazado', cls: 'badge-red'   },
};

const userStatusCfg = {
  activo:     { label: 'Activo',     cls: 'badge-green' },
  suspendido: { label: 'Suspendido', cls: 'badge-red'   },
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [postList, setPostList] = useState(posts);
  const [userList, setUserList] = useState(users);
  const [roleModal, setRoleModal] = useState(null); 

  const setPostStatus = (id, status) =>
    setPostList(p => p.map(x => x.id === id ? { ...x, status } : x));

  const toggleUserStatus = (id) =>
    setUserList(u => u.map(x => x.id === id ? { ...x, status: x.status === 'activo' ? 'suspendido' : 'activo' } : x));

  const setUserRole = (id, role) => {
    setUserList(u => u.map(x => x.id === id ? { ...x, role } : x));
    setRoleModal(null);
  };

  const pendingCount = postList.filter(p => p.status === 'pendiente').length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .adm-root { min-height: calc(100vh - 64px); background: #0A0806; font-family: 'DM Sans', sans-serif; color: #C8BFB6; }
        .adm-main { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }


        .adm-header { padding-bottom: 2rem; border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 2.5rem; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .adm-eyebrow { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: rgba(230,57,30,0.5); margin-bottom: 0.4rem; }
        .adm-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; color: #F5F0EB; letter-spacing: 0.02em; line-height: 1; }
        .adm-sub { font-size: 0.78rem; font-weight: 300; color: #4A4240; margin-top: 0.35rem; }


        .adm-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5px; background: rgba(245,240,235,0.04); margin-bottom: 2.5rem; }
        @media (max-width: 700px) { .adm-stats { grid-template-columns: 1fr 1fr; } }
        .adm-stat { background: #0A0806; padding: 1.25rem 1.5rem; }
        .adm-stat-label { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: #3D3A38; font-weight: 600; margin-bottom: 0.4rem; }
        .adm-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: #F5F0EB; letter-spacing: 0.03em; line-height: 1; }
        .adm-stat-val.red { color: #E6391E; }
        .adm-stat-val.amber { color: #C9882A; }
        .adm-stat-val.green { color: #3DBF7A; }


        .adm-tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 2rem; }
        .adm-tab { background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #3D3A38; cursor: pointer; padding: 0.75rem 1.25rem; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color 0.2s, border-color 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .adm-tab.active { color: #F5F0EB; border-bottom-color: #E6391E; }
        .adm-tab:hover:not(.active) { color: #9A8F85; }
        .adm-tab-badge { background: #E6391E; color: #0A0806; font-size: 0.55rem; font-weight: 800; padding: 1px 5px; border-radius: 2px; letter-spacing: 0.05em; }


        .adm-table-wrap { overflow-x: auto; }
        .adm-table { width: 100%; border-collapse: collapse; }
        .adm-th { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: #3D3A38; font-weight: 600; padding: 0 1rem 0.75rem; text-align: left; border-bottom: 1px solid rgba(245,240,235,0.05); white-space: nowrap; }
        .adm-tr { border-bottom: 1px solid rgba(245,240,235,0.04); transition: background 0.15s; }
        .adm-tr:hover { background: rgba(245,240,235,0.02); }
        .adm-td { padding: 1rem 1rem; font-size: 0.82rem; color: #9A8F85; vertical-align: middle; white-space: nowrap; }
        .adm-td.main { color: #D8CFC6; font-weight: 500; white-space: normal; max-width: 280px; line-height: 1.4; }


        .badge { display: inline-block; font-family: 'Bebas Neue', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; padding: 3px 8px; border-radius: 2px; }
        .badge-green  { background: rgba(61,191,122,0.1);  color: #3DBF7A; border: 1px solid rgba(61,191,122,0.2);  }
        .badge-amber  { background: rgba(201,136,42,0.1);  color: #C9882A; border: 1px solid rgba(201,136,42,0.2);  }
        .badge-red    { background: rgba(230,57,30,0.1);   color: #E6391E; border: 1px solid rgba(230,57,30,0.2);   }
        .badge-indigo { background: rgba(99,102,241,0.1);  color: #818CF8; border: 1px solid rgba(99,102,241,0.2);  }
        .badge-gray   { background: rgba(245,240,235,0.05); color: #6B6259; border: 1px solid rgba(245,240,235,0.08); }


        .act-btn { background: none; border: 1px solid rgba(245,240,235,0.08); color: #6B6259; font-family: 'DM Sans', sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; padding: 0.3rem 0.65rem; border-radius: 2px; transition: all 0.18s; }
        .act-btn:hover { border-color: rgba(245,240,235,0.2); color: #C8BFB6; }
        .act-btn.approve { border-color: rgba(61,191,122,0.2); color: #3DBF7A; }
        .act-btn.approve:hover { background: rgba(61,191,122,0.08); }
        .act-btn.reject { border-color: rgba(230,57,30,0.2); color: #E6391E; }
        .act-btn.reject:hover { background: rgba(230,57,30,0.08); }
        .act-btn.ban { border-color: rgba(230,57,30,0.2); color: #E6391E; }
        .act-btn.ban:hover { background: rgba(230,57,30,0.08); }
        .act-btn.unban { border-color: rgba(61,191,122,0.2); color: #3DBF7A; }
        .act-btn.unban:hover { background: rgba(61,191,122,0.08); }
        .act-btn.role { border-color: rgba(245,240,235,0.1); color: #9A8F85; }
        .act-btn.role:hover { background: rgba(245,240,235,0.04); color: #F5F0EB; }

        .act-group { display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap; }


        .role-chip { font-family: 'Bebas Neue', sans-serif; font-size: 0.6rem; letter-spacing: 0.18em; }


        .modal-backdrop { position: fixed; inset: 0; background: rgba(10,8,6,0.85); z-index: 100; display: flex; align-items: center; justify-content: center; }
        .modal { background: #110E0B; border: 1px solid rgba(245,240,235,0.08); border-radius: 4px; padding: 2rem; min-width: 280px; }
        .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; color: #F5F0EB; letter-spacing: 0.05em; margin-bottom: 0.3rem; }
        .modal-sub { font-size: 0.72rem; color: #4A4240; margin-bottom: 1.5rem; }
        .modal-roles { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .modal-role-btn { background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.07); color: #9A8F85; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em; text-transform: capitalize; cursor: pointer; padding: 0.65rem 1rem; border-radius: 3px; text-align: left; transition: all 0.18s; }
        .modal-role-btn:hover { border-color: rgba(230,57,30,0.3); color: #F5F0EB; background: rgba(245,240,235,0.04); }
        .modal-role-btn.current { border-color: rgba(230,57,30,0.3); color: #E6391E; }
        .modal-cancel { background: none; border: none; color: #3D3A38; font-family: 'DM Sans', sans-serif; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: color 0.2s; }
        .modal-cancel:hover { color: #9A8F85; }


        .user-posts { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: #F5F0EB; letter-spacing: 0.05em; }
      `}</style>

      <div className="adm-root">
        <main className="adm-main">


          <header className="adm-header">
            <div>
              <p className="adm-eyebrow">// Panel de administración</p>
              <h1 className="adm-title">Control General</h1>
              <p className="adm-sub">Gestiona publicaciones, usuarios y permisos.</p>
            </div>
          </header>


          <div className="adm-stats">
            <div className="adm-stat">
              <p className="adm-stat-label">Usuarios totales</p>
              <p className="adm-stat-val">{userList.length}</p>
            </div>
            <div className="adm-stat">
              <p className="adm-stat-label">Publicaciones</p>
              <p className="adm-stat-val green">{postList.filter(p => p.status === 'publicado').length}</p>
            </div>
            <div className="adm-stat">
              <p className="adm-stat-label">Pendientes</p>
              <p className="adm-stat-val amber">{postList.filter(p => p.status === 'pendiente').length}</p>
            </div>
            <div className="adm-stat">
              <p className="adm-stat-label">Suspendidos</p>
              <p className="adm-stat-val red">{userList.filter(u => u.status === 'suspendido').length}</p>
            </div>
          </div>


          <div className="adm-tabs">
            {TABS.map((t, i) => (
              <button key={i} className={`adm-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>
                {t}
                {i === 0 && pendingCount > 0 && <span className="adm-tab-badge">{pendingCount}</span>}
              </button>
            ))}
          </div>


          {tab === 0 && (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th className="adm-th">Artículo</th>
                    <th className="adm-th">Autor</th>
                    <th className="adm-th">Categoría</th>
                    <th className="adm-th">Fecha</th>
                    <th className="adm-th">Estado</th>
                    <th className="adm-th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {postList.map(post => (
                    <tr key={post.id} className="adm-tr">
                      <td className="adm-td main">{post.title}</td>
                      <td className="adm-td">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ color: '#C8BFB6', fontWeight: 500 }}>{post.author}</span>
                          <span className={`badge role-chip ${post.role === 'admin' ? 'badge-red' : post.role === 'editor' ? 'badge-indigo' : 'badge-gray'}`}>{post.role}</span>
                        </div>
                      </td>
                      <td className="adm-td">{post.category}</td>
                      <td className="adm-td">{post.date}</td>
                      <td className="adm-td">
                        <span className={`badge ${statusCfg[post.status].cls}`}>{statusCfg[post.status].label}</span>
                      </td>
                      <td className="adm-td">
                        <div className="act-group">
                          {post.status !== 'publicado' && (
                            <button className="act-btn approve" onClick={() => setPostStatus(post.id, 'publicado')}>Aprobar</button>
                          )}
                          {post.status !== 'rechazado' && (
                            <button className="act-btn reject" onClick={() => setPostStatus(post.id, 'rechazado')}>Rechazar</button>
                          )}
                          {post.status === 'publicado' && (
                            <button className="act-btn reject" onClick={() => setPostStatus(post.id, 'pendiente')}>Bajar</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          {tab === 1 && (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th className="adm-th">Usuario</th>
                    <th className="adm-th">Rol</th>
                    <th className="adm-th">Posts</th>
                    <th className="adm-th">Miembro desde</th>
                    <th className="adm-th">Estado</th>
                    <th className="adm-th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map(user => (
                    <tr key={user.id} className="adm-tr">
                      <td className="adm-td main">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ color: '#D8CFC6' }}>{user.name}</span>
                          <span style={{ fontSize: '0.7rem', color: '#3D3A38' }}>{user.email}</span>
                        </div>
                      </td>
                      <td className="adm-td">
                        <span className={`badge role-chip ${user.role === 'admin' ? 'badge-red' : user.role === 'editor' ? 'badge-indigo' : 'badge-gray'}`}>{user.role}</span>
                      </td>
                      <td className="adm-td">
                        <span className="user-posts">{user.posts}</span>
                      </td>
                      <td className="adm-td">{user.joined}</td>
                      <td className="adm-td">
                        <span className={`badge ${userStatusCfg[user.status].cls}`}>{userStatusCfg[user.status].label}</span>
                      </td>
                      <td className="adm-td">
                        <div className="act-group">
                          <button className="act-btn role" onClick={() => setRoleModal({ userId: user.id, current: user.role })}>
                            Rol ▾
                          </button>
                          {user.status === 'activo'
                            ? <button className="act-btn ban" onClick={() => toggleUserStatus(user.id)}>Suspender</button>
                            : <button className="act-btn unban" onClick={() => toggleUserStatus(user.id)}>Reactivar</button>
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>


      {roleModal && (
        <div className="modal-backdrop" onClick={() => setRoleModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <p className="modal-title">Cambiar Rol</p>
            <p className="modal-sub">Selecciona el nuevo rol para este usuario.</p>
            <div className="modal-roles">
              {ROLES.map(r => (
                <button
                  key={r}
                  className={`modal-role-btn${roleModal.current === r ? ' current' : ''}`}
                  onClick={() => setUserRole(roleModal.userId, r)}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                  {roleModal.current === r && ' ✓'}
                </button>
              ))}
            </div>
            <button className="modal-cancel" onClick={() => setRoleModal(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}