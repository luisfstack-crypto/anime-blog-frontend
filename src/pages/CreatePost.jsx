import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .cp-root { min-height: calc(100vh - 64px); background: #0A0806; font-family: 'DM Sans', sans-serif; color: #C8BFB6; }

        .cp-main { max-width: 860px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }


        .cp-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 3rem; flex-wrap: wrap; }

        .cp-header-left {}
        .cp-eyebrow { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: rgba(230,57,30,0.5); margin-bottom: 0.4rem; }
        .cp-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.6rem; color: #F5F0EB; letter-spacing: 0.02em; line-height: 1; }
        .cp-sub { font-size: 0.78rem; font-weight: 300; color: #4A4240; margin-top: 0.35rem; }

        .cp-header-actions { display: flex; align-items: center; gap: 0.75rem; }

        .cp-btn-cancel { background: none; border: none; color: #4A4240; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; padding: 0.6rem 1rem; border-radius: 3px; transition: color 0.2s; }
        .cp-btn-cancel:hover { color: #9A8F85; }

        .cp-btn-publish { background: #E6391E; color: #0A0806; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; padding: 0.65rem 1.5rem; border-radius: 3px; transition: background 0.2s, transform 0.15s; }
        .cp-btn-publish:hover { background: #FF4A2E; transform: translateY(-1px); }


        .cp-form { display: flex; flex-direction: column; gap: 1.75rem; }

        .cp-field-label { display: block; font-size: 0.67rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #6B6259; margin-bottom: 0.55rem; }

        .cp-input { width: 100%; padding: 0.8rem 1rem; background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #D8CFC6; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.2s, background 0.2s; }
        .cp-input::placeholder { color: #2E2B29; font-style: italic; }
        .cp-input:focus { border-color: rgba(230,57,30,0.35); background: rgba(245,240,235,0.04); }

        .cp-input-title { font-size: 1.1rem; font-weight: 500; }

        .cp-select { width: 100%; padding: 0.8rem 1rem; background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #9A8F85; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; outline: none; transition: border-color 0.2s; appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A4240' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; }
        .cp-select:focus { border-color: rgba(230,57,30,0.35); }
        .cp-select option { background: #1A1512; color: #C8BFB6; }

        .cp-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 600px) { .cp-two-col { grid-template-columns: 1fr; } }

        .cp-textarea { width: 100%; padding: 0.9rem 1rem; background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #D8CFC6; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; line-height: 1.7; outline: none; resize: vertical; min-height: 320px; transition: border-color 0.2s, background 0.2s; }
        .cp-textarea::placeholder { color: #2E2B29; font-style: italic; }
        .cp-textarea:focus { border-color: rgba(230,57,30,0.35); background: rgba(245,240,235,0.04); }


        .cp-bottom { display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 2rem; border-top: 1px solid rgba(245,240,235,0.06); margin-top: 0.5rem; }
      `}</style>

      <div className="cp-root">
        <main className="cp-main">

          <header className="cp-header">
            <div className="cp-header-left">
              <p className="cp-eyebrow">// Redacción</p>
              <h1 className="cp-title">Nuevo Artículo</h1>
              <p className="cp-sub">Redacta y publica tu contenido en el blog.</p>
            </div>
            <div className="cp-header-actions">
              <button type="button" className="cp-btn-cancel" onClick={() => navigate('/dashboard')}>Cancelar</button>
              <button type="submit" form="post-form" className="cp-btn-publish">Publicar Post</button>
            </div>
          </header>

          <form id="post-form" onSubmit={handleSubmit} className="cp-form">

            <div>
              <label className="cp-field-label">Título del Artículo</label>
              <input type="text" required className="cp-input cp-input-title" placeholder="Ej: Análisis profundo del arco de Shibuya" />
            </div>

            <div className="cp-two-col">
              <div>
                <label className="cp-field-label">Categoría</label>
                <select className="cp-select">
                  <option value="review">Reseña</option>
                  <option value="theory">Teoría</option>
                  <option value="news">Noticia</option>
                  <option value="recommendation">Recomendación</option>
                </select>
              </div>
              <div>
                <label className="cp-field-label">URL de la Imagen de Portada</label>
                <input type="url" className="cp-input" placeholder="https://..." />
              </div>
            </div>

            <div>
              <label className="cp-field-label">Contenido</label>
              <textarea required className="cp-textarea" placeholder="Escribe tu artículo aquí..." />
            </div>

            <div className="cp-bottom">
              <button type="button" className="cp-btn-cancel" onClick={() => navigate('/dashboard')}>Cancelar</button>
              <button type="submit" className="cp-btn-publish">Publicar Post</button>
            </div>

          </form>
        </main>
      </div>
    </>
  );
}