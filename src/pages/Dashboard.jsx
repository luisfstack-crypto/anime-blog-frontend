import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 🛡️ DATOS DE SESIÓN (Desde localStorage) ---
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userRole = localStorage.getItem('userRole'); 
  const currentUserId = localStorage.getItem('userId'); 

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://localhost:7288/api/Posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error al cargar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este post?")) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:7288/api/Posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Filtramos el post borrado del estado para que desaparezca de la vista
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert("No tienes permisos para borrar este contenido.");
      }
    } catch (error) {
      alert("Error de conexión al intentar eliminar.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        .db-root { min-height: 100vh; background: #0A0806; color: #C8BFB6; font-family: 'DM Sans', sans-serif; padding-top: 64px; }
        .db-main { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem; }
        .db-header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(245, 240, 235, 0.07); margin-bottom: 3.5rem; }
        .db-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.4rem, 5vw, 3.8rem); color: #F5F0EB; line-height: 1; }
        .db-title span { color: #E6391E; }
        .db-card { border: 1px solid rgba(245, 240, 235, 0.06); background: rgba(245, 240, 235, 0.025); padding: 1.5rem; margin-bottom: 1rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; transition: 0.3s; }
        .db-card:hover { border-color: rgba(230, 57, 30, 0.3); background: rgba(230, 57, 30, 0.02); }
        
        .btn-group { display: flex; gap: 10px; }
        .btn-action { background: none; border: 1px solid #333; color: #999; padding: 6px 12px; cursor: pointer; font-size: 0.75rem; border-radius: 3px; transition: 0.2s; font-weight: 600; text-transform: uppercase; }
        .btn-action:hover { background: rgba(245, 240, 235, 0.05); color: #fff; border-color: #555; }
        .btn-view { border-color: #6B6259; }
        .btn-delete { color: #E6391E; border-color: rgba(230, 57, 30, 0.3); }
        .btn-delete:hover { background: rgba(230, 57, 30, 0.1); border-color: #E6391E; }
      `}</style>

      <div className="db-root">
        <main className="db-main">
          <header className="db-header">
            <div>
              <p style={{ color: '#E6391E', fontFamily: 'Bebas Neue', letterSpacing: '0.2em', fontSize: '0.7rem' }}>// Sistema de Gestión</p>
              <h1 className="db-title">Hola, <span>{userName}</span></h1>
            </div>
            <button 
              style={{ background: '#E6391E', color: '#0A0806', border: 'none', padding: '0.8rem 1.8rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '3px', fontFamily: 'DM Sans' }}
              onClick={() => navigate('/create-post')}
            >
              NUEVA ENTRADA
            </button>
          </header>

          <section>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#6B6259', fontFamily: 'Bebas Neue', fontSize: '1.5rem' }}>Sincronizando con el servidor...</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="db-card">
                  <div>
                    <p style={{ fontSize: '1.1rem', color: '#F5F0EB', marginBottom: '4px', fontWeight: '500' }}>{post.title}</p>
                    <span style={{ fontSize: '0.7rem', color: '#4A4240', letterSpacing: '0.1em' }}>
                      POST ID: {post.id} | AUTOR ID: {post.userId}
                    </span>
                  </div>
                  
                  <div className="btn-group">
                    {/* BOTÓN VER: Redirige a la vista pro usando el SLUG */}
                    <button 
                      className="btn-action btn-view" 
                      onClick={() => navigate(`/post/${post.slug}`)}
                    >
                      Ver
                    </button>

                    {/* VALIDACIÓN: Solo dueño o admin ven Editar y Eliminar */}
                    {(userRole === 'admin' || post.userId.toString() === currentUserId) && (
                      <>
                        <button 
                          className="btn-action" 
                          onClick={() => navigate(`/edit-post/${post.id}`)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn-action btn-delete" 
                          onClick={() => handleDelete(post.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
            {!loading && posts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#4A4240', marginTop: '3rem' }}>No hay publicaciones disponibles todavía.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}