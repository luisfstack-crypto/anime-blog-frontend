import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const posts = [
    { id: 1, title: "Análisis del Gear 5 de Luffy: Impacto y Narrativa", status: "Publicado", views: "1.2k", comments: "15", date: "20 Mar 2026", tag: "ANÁLISIS" },
    { id: 2, title: "Maki Zen'in y la evolución de las restricciones celestiales", status: "Borrador", views: "-", comments: "-", date: "21 Mar 2026", tag: "JJK" },
    { id: 3, title: "Reseña: Los 3 mejores estrenos de la primavera 2026", status: "Publicado", views: "840", comments: "7", date: "19 Mar 2026", tag: "RESEÑA" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .db-root {
          min-height: 100vh;
          background: #0A0806;
          color: #C8BFB6;
          font-family: 'DM Sans', sans-serif;
          padding-top: 64px;
        }


        .db-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .db-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
          position: relative;
          z-index: 1;
        }


        .db-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 2rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(245, 240, 235, 0.07);
          margin-bottom: 3.5rem;
        }

        .db-eyebrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          color: #E6391E;
          margin-bottom: 0.6rem;
        }

        .db-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          color: #F5F0EB;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .db-title span {
          color: #E6391E;
        }

        .db-subtitle {
          margin-top: 0.6rem;
          font-size: 0.85rem;
          font-weight: 300;
          color: #6B6259;
          letter-spacing: 0.02em;
        }

        .db-subtitle strong {
          color: #9A8F85;
          font-weight: 500;
        }

        .db-new-btn {
          background: #E6391E;
          color: #0A0806;
          border: none;
          padding: 0.75rem 1.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 3px;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }

        .db-new-btn:hover {
          background: #FF4A2E;
          transform: translateY(-1px);
        }


        .db-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .db-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.2em;
          color: #F5F0EB;
        }

        .db-sort-btn {
          background: none;
          border: none;
          color: #6B6259;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .db-sort-btn:hover { color: #E6391E; }


        .db-card {
          border: 1px solid rgba(245, 240, 235, 0.06);
          border-left: 3px solid transparent;
          background: rgba(245, 240, 235, 0.025);
          border-radius: 4px;
          display: grid;
          grid-template-columns: 1fr auto auto;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 1.75rem;
          margin-bottom: 0.75rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .db-card:hover {
          border-color: rgba(245, 240, 235, 0.1);
          border-left-color: #E6391E;
          background: rgba(245, 240, 235, 0.04);
        }

        .db-card-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .db-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          padding: 2px 8px;
          border-radius: 2px;
          background: rgba(230, 57, 30, 0.12);
          color: #E6391E;
          border: 1px solid rgba(230, 57, 30, 0.2);
        }

        .db-status-pub {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3DBF7A;
        }

        .db-status-draft {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9882A;
        }

        .db-card-date {
          font-size: 0.7rem;
          color: #4A4240;
          font-weight: 300;
        }

        .db-card-title {
          font-size: 1rem;
          font-weight: 500;
          color: #D8CFC6;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .db-card:hover .db-card-title { color: #F5F0EB; }


        .db-stats {
          display: flex;
          align-items: center;
          gap: 0;
          border-left: 1px solid rgba(245, 240, 235, 0.06);
          border-right: 1px solid rgba(245, 240, 235, 0.06);
        }

        .db-stat {
          text-align: center;
          padding: 0 1.5rem;
        }

        .db-stat:first-child {
          border-right: 1px solid rgba(245, 240, 235, 0.06);
        }

        .db-stat-label {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #4A4240;
          font-weight: 500;
          margin-bottom: 0.2rem;
        }

        .db-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.05em;
          color: #F5F0EB;
          line-height: 1;
        }

        .db-stat-val.accent { color: #E6391E; }


        .db-actions {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 80px;
        }

        .db-act-edit {
          background: none;
          border: 1px solid rgba(245, 240, 235, 0.1);
          color: #9A8F85;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0.4rem 0.75rem;
          border-radius: 3px;
          transition: all 0.2s;
        }

        .db-act-edit:hover {
          border-color: #F5F0EB;
          color: #F5F0EB;
          background: rgba(245, 240, 235, 0.06);
        }

        .db-act-del {
          background: none;
          border: none;
          color: #4A4240;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0.4rem 0.75rem;
          border-radius: 3px;
          transition: color 0.2s;
          text-align: center;
        }

        .db-act-del:hover { color: #E6391E; }


        .db-load-more {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
        }

        .db-load-btn {
          background: none;
          border: 1px solid rgba(245, 240, 235, 0.08);
          color: #4A4240;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0.6rem 1.5rem;
          border-radius: 3px;
          transition: all 0.2s;
        }

        .db-load-btn:hover {
          border-color: rgba(245, 240, 235, 0.2);
          color: #9A8F85;
        }

        @media (max-width: 768px) {
          .db-header { grid-template-columns: 1fr; }
          .db-card { grid-template-columns: 1fr; }
          .db-stats { border: none; border-top: 1px solid rgba(245,240,235,0.06); border-bottom: 1px solid rgba(245,240,235,0.06); padding: 1rem 0; justify-content: center; }
          .db-actions { flex-direction: row; }
        }
      `}</style>

      <div className="db-root">
        <main className="db-main">


          <header className="db-header">
            <div>
              <p className="db-eyebrow">// Panel de autor</p>
              <h1 className="db-title">Hola, <span>Jujutsu_fan</span></h1>
              <p className="db-subtitle">
                <strong>2 artículos publicados</strong> · 1 borrador pendiente
              </p>
            </div>
            <button className="db-new-btn" onClick={() => navigate('/create-post')}>
              + Nueva Entrada
            </button>
          </header>


          <section>
            <div className="db-section-head">
              <h2 className="db-section-title">Tus Publicaciones</h2>
              <button className="db-sort-btn">
                Recientes
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>

            {posts.map((post) => (
              <div key={post.id} className="db-card">

                <div>
                  <div className="db-card-meta">
                    <span className="db-tag">{post.tag}</span>
                    <span className={post.status === 'Publicado' ? 'db-status-pub' : 'db-status-draft'}>
                      {post.status}
                    </span>
                    <span className="db-card-date">{post.date}</span>
                  </div>
                  <p className="db-card-title">{post.title}</p>
                </div>


                <div className="db-stats">
                  <div className="db-stat">
                    <p className="db-stat-label">Vistas</p>
                    <p className="db-stat-val">{post.views}</p>
                  </div>
                  <div className="db-stat">
                    <p className="db-stat-label">Comentarios</p>
                    <p className="db-stat-val accent">{post.comments}</p>
                  </div>
                </div>


                <div className="db-actions">
                  <button className="db-act-edit">Editar</button>
                  <button className="db-act-del">Eliminar</button>
                </div>
              </div>
            ))}
          </section>

          <div className="db-load-more">
            <button className="db-load-btn">Cargar publicaciones antiguas</button>
          </div>

        </main>
      </div>
    </>
  );
}