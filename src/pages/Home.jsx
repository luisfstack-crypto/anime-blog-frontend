import { Link } from 'react-router-dom';
import makiImg from '../assets/maki_despertar.png';
import animesImg from '../assets/animes_primavera.jpg';
import arquiImg from '../assets/arqui_shingeki.jpg';

export default function Home() {
  const featuredPost = {
    id: 1,
    title: "El despertar de la nueva era: Análisis del Gear 5",
    excerpt: "Exploramos las implicaciones narrativas y el impacto visual de la transformación más esperada en la historia reciente de One Piece.",
    author: "Luis Pech",
    date: "22 Mar 2026",
    category: "Análisis",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1974&auto=format&fit=crop"
  };

  const recentPosts = [
    { id: 2, title: "Maki Zen'in: Evolución y el límite del cuerpo físico", excerpt: "Análisis profundo sobre el desarrollo del personaje y cómo redefinió las reglas de combate.", author: "Admin", date: "20 Mar 2026", category: "Personajes", readTime: "5 min", imageUrl: makiImg },
    { id: 3, title: "Guía Esencial: Animes imperdibles de Primavera 2026", excerpt: "Nuestra selección curada de los estrenos que no puedes dejar pasar este año.", author: "Estudiante 01", date: "18 Mar 2026", category: "Noticias", readTime: "8 min", imageUrl: animesImg },
    { id: 4, title: "La Psicología detrás de las Murallas: Arquitectura en Shingeki no Kyojin", excerpt: "Cómo el diseño de las ciudades refleja la mente de una humanidad acorralada.", author: "Luis Pech", date: "15 Mar 2026", category: "Mundo", readTime: "12 min", imageUrl: arquiImg }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .home-root { min-height: 100vh; background: #0A0806; font-family: 'DM Sans', sans-serif; }


        .hero { position: relative; width: 100%; height: 88vh; min-height: 580px; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.65) 50%, rgba(10,8,6,0.15) 100%); }
        .hero-rule { position: absolute; left: 2.5rem; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, rgba(230,57,30,0.35) 40%, rgba(230,57,30,0.35) 70%, transparent); display: none; }
        @media (min-width: 1024px) { .hero-rule { display: block; } }

        .hero-content { position: relative; height: 100%; max-width: 1100px; margin: 0 auto; padding: 0 1.5rem 4rem; display: flex; flex-direction: column; justify-content: flex-end; }

        .hero-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .hero-cat { font-family: 'Bebas Neue', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.35); padding: 3px 10px; border-radius: 2px; }
        .hero-issue { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,240,235,0.3); font-weight: 500; }

        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 6.5rem); color: #F5F0EB; line-height: 0.95; letter-spacing: 0.02em; max-width: 850px; margin-bottom: 1.25rem; }
        .hero-excerpt { font-size: clamp(0.85rem, 1.4vw, 1rem); font-weight: 300; color: #9A8F85; max-width: 540px; line-height: 1.65; margin-bottom: 2rem; font-style: italic; }

        .hero-meta { display: flex; align-items: center; gap: 1.25rem; padding-top: 1.25rem; border-top: 1px solid rgba(245,240,235,0.07); width: max-content; }
        .hero-avatar { width: 34px; height: 34px; border-radius: 50%; background: #1A1512; border: 1px solid #E6391E; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #E6391E; flex-shrink: 0; }
        .hero-author { font-size: 0.78rem; font-weight: 500; color: #C8BFB6; letter-spacing: 0.04em; }
        .hero-sep { width: 1px; height: 14px; background: rgba(245,240,235,0.1); }
        .hero-date { font-size: 0.72rem; color: #4A4240; letter-spacing: 0.06em; }

        .hero-read-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 1.5rem; background: #E6391E; color: #0A0806; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; padding: 0.6rem 1.3rem; border-radius: 3px; transition: background 0.2s, transform 0.15s; width: max-content; }
        .hero-read-btn:hover { background: #FF4A2E; transform: translateY(-1px); }


        .recent { max-width: 1100px; margin: 0 auto; padding: 5rem 1.5rem; }
        .recent-head { display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 3rem; }
        .recent-title { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.3em; color: #F5F0EB; white-space: nowrap; }
        .recent-line { flex: 1; height: 1px; background: rgba(245,240,235,0.06); }
        .recent-count { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; color: rgba(230,57,30,0.4); }

        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background: rgba(245,240,235,0.04); }
        @media (max-width: 900px) { .cards-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .cards-grid { grid-template-columns: 1fr; } }

        .card { background: #0A0806; display: flex; flex-direction: column; overflow: hidden; transition: background 0.2s; text-decoration: none; }
        .card:hover { background: #100C09; }

        .card-img-wrap { position: relative; height: 210px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; filter: brightness(0.82) saturate(0.85); }
        .card:hover .card-img { transform: scale(1.04); filter: brightness(0.95) saturate(1); }

        .card-cat-badge { position: absolute; top: 0; left: 0; font-family: 'Bebas Neue', sans-serif; font-size: 0.6rem; letter-spacing: 0.25em; color: #0A0806; background: #E6391E; padding: 4px 10px; }

        .card-body { padding: 1.2rem 1.35rem 1.4rem; flex: 1; display: flex; flex-direction: column; border-bottom: 1px solid rgba(245,240,235,0.045); }
        .card-title { font-size: 0.95rem; font-weight: 600; color: #D8CFC6; line-height: 1.4; margin-bottom: 0.55rem; transition: color 0.2s; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card:hover .card-title { color: #F5F0EB; }
        .card-excerpt { font-size: 0.75rem; font-weight: 300; color: #3D3A38; line-height: 1.6; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 1.1rem; font-style: italic; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; }
        .card-date { font-size: 0.62rem; letter-spacing: 0.1em; color: #2E2B29; font-weight: 500; text-transform: uppercase; }
        .card-readtime { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; color: #E6391E; }

        .load-more-wrap { display: flex; justify-content: center; margin-top: 3.5rem; }
        .load-more-btn { background: none; border: 1px solid rgba(245,240,235,0.07); color: #3D3A38; font-family: 'DM Sans', sans-serif; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; padding: 0.65rem 2rem; border-radius: 3px; transition: all 0.2s; }
        .load-more-btn:hover { border-color: rgba(245,240,235,0.18); color: #9A8F85; }
      `}</style>

      <div className="home-root">
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${featuredPost.imageUrl})` }} />
          <div className="hero-overlay" />
          <div className="hero-rule" />
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-cat">{featuredPost.category}</span>
              <span className="hero-issue">Destacado · {featuredPost.date}</span>
            </div>
            <h1 className="hero-title">{featuredPost.title}</h1>
            <p className="hero-excerpt">{featuredPost.excerpt}</p>
            <div className="hero-meta">
              <div className="hero-avatar">L</div>
              <span className="hero-author">{featuredPost.author}</span>
              <div className="hero-sep" />
              <span className="hero-date">{featuredPost.date}</span>
            </div>
            <Link to={`/post/${featuredPost.id}`} className="hero-read-btn">
              Leer análisis
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>

        <section className="recent">
          <div className="recent-head">
            <span className="recent-title">Artículos Recientes</span>
            <div className="recent-line" />
            <span className="recent-count">{recentPosts.length} entradas</span>
          </div>

          <div className="cards-grid">
            {recentPosts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} className="card">
                <div className="card-img-wrap">
                  <img src={post.imageUrl} alt={post.title} className="card-img" />
                  <span className="card-cat-badge">{post.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-excerpt">{post.excerpt}</p>
                  <div className="card-footer">
                    <span className="card-date">{post.date}</span>
                    <span className="card-readtime">{post.readTime} lectura</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="load-more-wrap">
            <button className="load-more-btn">Ver todos los artículos</button>
          </div>
        </section>
      </div>
    </>
  );
}