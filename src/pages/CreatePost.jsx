import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate = useNavigate();

  // 1. Estados para los campos
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null); // Para el archivo real
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    
    // 2. Creamos el FormData (Obligatorio para [FromForm] en C#)
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Content', content);
    formData.append('Summary', summary || "Resumen automático del post");
    formData.append('UserId', 1); // 👈 Ojo: Asegúrate de que este ID de usuario exista en tu DB
    
    if (featuredImage) {
      formData.append('FeaturedImage', featuredImage);
    }

    try {
      const response = await fetch('https://localhost:7288/api/Posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // NOTA: No pongas 'Content-Type', el navegador lo pone solo al usar FormData
        },
        body: formData
      });

      if (response.ok) {
        alert("¡Post publicado con éxito! 🚀");
        navigate('/dashboard');
      } else {
        const err = await response.text();
        alert("Error al publicar: " + err);
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* ... Tu CSS se mantiene igual ... */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
        .cp-root { min-height: calc(100vh - 64px); background: #0A0806; font-family: 'DM Sans', sans-serif; color: #C8BFB6; }
        .cp-main { max-width: 860px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
        .cp-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 3rem; flex-wrap: wrap; }
        .cp-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.6rem; color: #F5F0EB; letter-spacing: 0.02em; line-height: 1; }
        .cp-btn-publish { background: #E6391E; color: #0A0806; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; padding: 0.65rem 1.5rem; border-radius: 3px; transition: all 0.2s; }
        .cp-btn-publish:disabled { background: #4A4240; cursor: not-allowed; }
        .cp-input { width: 100%; padding: 0.8rem 1rem; background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #D8CFC6; font-size: 0.9rem; outline: none; }
        .cp-textarea { width: 100%; padding: 0.9rem 1rem; background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #D8CFC6; min-height: 320px; outline: none; resize: vertical; }
        .file-input-wrapper { margin-top: 10px; }
      `}</style>

      <div className="cp-root">
        <main className="cp-main">
          <header className="cp-header">
            <div>
              <p className="cp-eyebrow">// Redacción</p>
              <h1 className="cp-title">Nuevo Artículo</h1>
            </div>
            <div className="cp-header-actions">
              <button type="button" className="cp-btn-cancel" onClick={() => navigate('/dashboard')}>Cancelar</button>
              <button type="submit" form="post-form" className="cp-btn-publish" disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar Post'}
              </button>
            </div>
          </header>

          <form id="post-form" onSubmit={handleSubmit} className="cp-form">
            <div>
              <label className="cp-field-label">Título del Artículo</label>
              <input 
                type="text" 
                required 
                className="cp-input cp-input-title" 
                placeholder="Ej: Análisis profundo del arco de Shibuya"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="cp-two-col">
               <div>
                <label className="cp-field-label">Resumen Breve</label>
                <input 
                  type="text" 
                  className="cp-input" 
                  placeholder="De qué trata el post..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              <div>
                <label className="cp-field-label">Imagen de Portada (Archivo)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="cp-input" 
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                />
              </div>
            </div>

            <div>
              <label className="cp-field-label">Contenido</label>
              <textarea 
                required 
                className="cp-textarea" 
                placeholder="Escribe tu artículo aquí..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="cp-bottom">
              <button type="submit" className="cp-btn-publish" disabled={loading}>
                {loading ? 'Subiendo...' : 'Publicar Post'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}