import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState({ title: '', summary: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://localhost:7288/api/Posts/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error("Error al cargar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('Title', post.title);
    formData.append('Summary', post.summary || '');
    formData.append('Content', post.content);

    try {
      const response = await fetch(`https://localhost:7288/api/Posts/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      alert("Error al conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: '#E6391E', textAlign: 'center', marginTop: '20%' }}>CARGANDO EDITOR...</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        
        .edit-root { min-height: 100vh; background: #0A0806; color: #C8BFB6; font-family: 'DM Sans', sans-serif; padding: 40px 20px; }
        .edit-container { max-width: 900px; margin: 0 auto; background: #0D0A07; border: 1px solid rgba(245,240,235,0.04); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
        
        .edit-header { padding: 30px; border-bottom: 1px solid rgba(245,240,235,0.07); display: flex; justify-content: space-between; align-items: center; }
        .edit-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: #F5F0EB; letter-spacing: 1px; }
        .edit-title span { color: #E6391E; }

        .edit-form { padding: 30px; }
        .form-group { margin-bottom: 25px; }
        .form-label { display: block; font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; color: #6B6259; letter-spacing: 2px; margin-bottom: 10px; text-transform: uppercase; }
        
        .form-input, .form-textarea { 
          width: 100%; background: rgba(245,240,235,0.02); border: 1px solid rgba(245,240,235,0.08); 
          border-radius: 4px; padding: 12px; color: #F5F0EB; font-family: 'DM Sans', sans-serif; outline: none; transition: 0.3s;
        }
        .form-input:focus, .form-textarea:focus { border-color: #E6391E; background: rgba(230,57,30,0.02); }
        .form-textarea { height: 300px; resize: vertical; line-height: 1.6; }

        .btn-save { 
          background: #E6391E; color: #0A0806; border: none; padding: 12px 30px; 
          font-weight: 800; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; border-radius: 4px; transition: 0.2s; 
        }
        .btn-save:hover { background: #FF4A2E; transform: translateY(-2px); }
        .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-cancel { color: #6B6259; text-decoration: none; font-size: 0.8rem; margin-right: 20px; transition: 0.2s; }
        .btn-cancel:hover { color: #F5F0EB; }
      `}</style>

      <div className="edit-root">
        <div className="edit-container">
          <header className="edit-header">
            <h1 className="edit-title">Editar <span>Publicación</span></h1>
            <Link to="/dashboard" className="btn-cancel">CANCELAR</Link>
          </header>

          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Título del Post</label>
              <input 
                className="form-input"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="Escribe un título impactante..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Resumen Breve</label>
              <input 
                className="form-input"
                value={post.summary}
                onChange={(e) => setPost({...post, summary: e.target.value})}
                placeholder="¿De qué trata este artículo?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contenido Principal</label>
              <textarea 
                className="form-textarea"
                value={post.content}
                onChange={(e) => setPost({...post, content: e.target.value})}
                placeholder="Escribe aquí tu historia..."
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button type="submit" className="btn-save" disabled={saving}>
                {saving ? 'Guardando...' : 'Actualizar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}