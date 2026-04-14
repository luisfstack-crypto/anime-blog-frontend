import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams(); // Este parámetro recibe el 'slug' de la URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para saber si el usuario ya reaccionó en esta sesión local
  const [reacted, setReacted] = useState(new Set());

  const API_URL = "https://localhost:7288";

  const fetchFullPost = async () => {
    try {
      // Llamada al endpoint GetPostBySlug de tu C#
      const response = await fetch(`${API_URL}/api/Posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("No se encontró el post");
      }
    } catch (error) {
      console.error("Error al invocar el post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullPost();
  }, [id]);

  const handleReaction = async (type) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Debes iniciar sesión para reaccionar.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/Posts/${post.id}/react`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 👈 Enviamos el token para saber quién es el usuario
        },
        body: JSON.stringify(type) 
      });

      if (response.ok) {
        const data = await response.json(); // Recibimos { count: X }
        
        // 1. Actualizamos dinámicamente el contador específico (fire o heart)
        setPost(prev => ({
          ...prev,
          [type === 'fire' ? 'fireCount' : 'heartCount']: data.count
        }));

        // 2. Toggle visual: Si ya estaba en el Set, lo quitamos; si no, lo agregamos
        setReacted(prev => {
          const newSet = new Set(prev);
          if (newSet.has(type)) {
            newSet.delete(type);
          } else {
            newSet.add(type);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error al reaccionar:", error);
    }
  };

  if (loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0A0806', color: '#E6391E', fontFamily: 'Bebas Neue', fontSize: '2rem'}}>
      SINCRONIZANDO CON EL SERVIDOR...
    </div>
  );

  if (!post) return (
    <div style={{background: '#0A0806', minHeight: '100vh', color: '#F5F0EB', textAlign: 'center', padding: '100px'}}>
      <h1 style={{fontFamily: 'Bebas Neue'}}>ERROR 404: POST NO ENCONTRADO</h1>
      <Link to="/dashboard" style={{color: '#E6391E', textDecoration: 'none'}}>VOLVER AL PANEL</Link>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        .pv-root { min-height: calc(100vh - 64px); background: #0A0806; font-family: 'DM Sans', sans-serif; color: #C8BFB6; }
        .pv-cover { position: relative; width: 100%; height: 60vh; min-height: 420px; overflow: hidden; border-bottom: 1px solid rgba(230,57,30,0.2); }
        .pv-cover-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.5) saturate(0.8); }
        .pv-cover-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.4) 60%, transparent 100%); }
        .pv-cover-content { position: relative; height: 100%; max-width: 800px; margin: 0 auto; padding: 0 1.5rem 3rem; display: flex; flex-direction: column; justify-content: flex-end; }
        .pv-cat { font-family: 'Bebas Neue', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.4); padding: 4px 12px; border-radius: 2px; display: inline-block; margin-bottom: 1rem; }
        .pv-cover-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 6vw, 4.5rem); color: #F5F0EB; line-height: 0.95; letter-spacing: 0.02em; }
        .pv-body { max-width: 800px; margin: 0 auto; padding: 0 1.5rem 5rem; }
        .pv-author-strip { display: flex; align-items: center; gap: 1rem; padding: 2rem 0; border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 3rem; }
        .pv-author-av { width: 45px; height: 45px; border-radius: 50%; background: #1A1512; border: 1px solid #E6391E; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; color: #E6391E; }
        .pv-article { margin-bottom: 4rem; }
        .pv-p { font-family: 'Lora', serif; font-size: 1.15rem; color: #C8BFB6; line-height: 1.9; margin-bottom: 1.5rem; white-space: pre-wrap; }
        .pv-lead { font-family: 'Lora', serif; font-size: 1.3rem; color: #F5F0EB; line-height: 1.8; margin-bottom: 2.5rem; font-style: italic; border-left: 3px solid #E6391E; padding-left: 1.5rem; }
        .pv-reactions { display: flex; gap: 1rem; border-top: 1px solid rgba(245,240,235,0.06); padding-top: 2rem; }
        .pv-react-btn { background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.08); color: #6B6259; padding: 12px 24px; border-radius: 4px; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 10px; font-weight: 600; font-family: 'DM Sans', sans-serif; }
        .pv-react-btn:hover { border-color: #E6391E; color: #F5F0EB; background: rgba(230,57,30,0.05); }
        .pv-react-btn.active { border-color: #E6391E; color: #E6391E; background: rgba(230, 57, 30, 0.1); }
        .pv-react-count { font-weight: bold; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; }
      `}</style>

      <div className="pv-root">
        {/* 🖼️ Cabecera con Imagen */}
        <div className="pv-cover">
          <div className="pv-cover-img" style={{ backgroundImage: `url(${API_URL}${post.featuredImage})` }} />
          <div className="pv-cover-overlay" />
          <div className="pv-cover-content">
            <div><span className="pv-cat">{post.category?.name || 'CONTENIDO'}</span></div>
            <h1 className="pv-cover-title">{post.title}</h1>
          </div>
        </div>

        <div className="pv-body">
          {/* 👤 Info del Autor */}
          <div className="pv-author-strip">
            <div className="pv-author-av">{post.user?.name?.charAt(0) || 'A'}</div>
            <div>
              <p style={{ color: '#F5F0EB', fontWeight: 'bold', margin: 0 }}>{post.user?.name || 'Autor Anónimo'}</p>
              <p style={{ color: '#6B6259', fontSize: '0.8rem', margin: 0 }}>{new Date(post.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* 📝 Cuerpo del Artículo */}
          <article className="pv-article">
            {post.summary && <p className="pv-lead">{post.summary}</p>}
            <p className="pv-p">{post.content}</p>
          </article>

          {/* 🔥 SECCIÓN DE REACCIONES */}
          <div className="pv-reactions">
            <button 
              className={`pv-react-btn ${reacted.has('fire') ? 'active' : ''}`}
              onClick={() => handleReaction('fire')}
            >
              <span style={{fontSize: '1.4rem'}}>🔥</span>
              <span>ÉPICO</span>
              <span className="pv-react-count">{post.fireCount || 0}</span>
            </button>

            <button 
              className={`pv-react-btn ${reacted.has('heart') ? 'active' : ''}`}
              onClick={() => handleReaction('heart')}
            >
              <span style={{fontSize: '1.4rem'}}>❤️</span>
              <span>ME GUSTA</span>
              <span className="pv-react-count">{post.heartCount || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}