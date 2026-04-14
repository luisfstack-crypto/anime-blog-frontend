import { useState, useEffect } from 'react'; // 1. Importamos hooks
import { Link } from 'react-router-dom';

export default function Home() {
  // 2. Estados para los posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL base para las imágenes que subes a wwwroot
  const API_URL = "https://localhost:7288";

  useEffect(() => {
    const fetchHomePosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Posts`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error cargando el Home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomePosts();
  }, []);

  // Tomamos el primer post como el "Destacado" y los demás como "Recientes"
  const featuredPost = posts[0]; 
  const recentPosts = posts.slice(1);

  if (loading) return <div style={{background: '#0A0806', minHeight: '100vh', color: '#E6391E', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontFamily: 'Bebas Neue', fontSize: '2rem'}}>CARGANDO...</div>;

  return (
    <>
      <style>{`
        /* ... Tu CSS se mantiene exactamente igual ... */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
        .home-root { min-height: 100vh; background: #0A0806; font-family: 'DM Sans', sans-serif; }
        .hero { position: relative; width: 100%; height: 88vh; min-height: 580px; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.65) 50%, rgba(10,8,6,0.15) 100%); }
        .hero-content { position: relative; height: 100%; max-width: 1100px; margin: 0 auto; padding: 0 1.5rem 4rem; display: flex; flex-direction: column; justify-content: flex-end; }
        .hero-cat { font-family: 'Bebas Neue', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.35); padding: 3px 10px; border-radius: 2px; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 6.5rem); color: #F5F0EB; line-height: 0.95; letter-spacing: 0.02em; max-width: 850px; margin-bottom: 1.25rem; }
        .hero-excerpt { font-size: clamp(0.85rem, 1.4vw, 1rem); font-weight: 300; color: #9A8F85; max-width: 540px; line-height: 1.65; margin-bottom: 2rem; font-style: italic; }
        .hero-meta { display: flex; align-items: center; gap: 1.25rem; padding-top: 1.25rem; border-top: 1px solid rgba(245,240,235,0.07); width: max-content; }
        .hero-avatar { width: 34px; height: 34px; border-radius: 50%; background: #1A1512; border: 1px solid #E6391E; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #E6391E; }
        .hero-read-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 1.5rem; background: #E6391E; color: #0A0806; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; padding: 0.6rem 1.3rem; border-radius: 3px; transition: all 0.2s; }
        .recent { max-width: 1100px; margin: 0 auto; padding: 5rem 1.5rem; }
        .recent-head { display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 3rem; }
        .recent-title { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.3em; color: #F5F0EB; }
        .recent-line { flex: 1; height: 1px; background: rgba(245,240,235,0.06); }
        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background: rgba(245,240,235,0.04); }
        .card { background: #0A0806; display: flex; flex-direction: column; overflow: hidden; transition: background 0.2s; text-decoration: none; }
        .card-img-wrap { position: relative; height: 210px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.82); }
        .card-cat-badge { position: absolute; top: 0; left: 0; font-family: 'Bebas Neue', sans-serif; font-size: 0.6rem; color: #0A0806; background: #E6391E; padding: 4px 10px; }
        .card-body { padding: 1.2rem 1.35rem 1.4rem; flex: 1; }
        .card-title { font-size: 0.95rem; font-weight: 600; color: #D8CFC6; line-height: 1.4; margin-bottom: 0.55rem; }
        .card-excerpt { font-size: 0.75rem; font-weight: 300; color: #3D3A38; line-height: 1.6; font-style: italic; }
      `}</style>

      <div className="home-root">
        {featuredPost && (
          <section className="hero">
            <div 
              className="hero-bg" 
              style={{ backgroundImage: `url(${API_URL}${featuredPost.featuredImage})` }} 
            />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-cat">{featuredPost.category?.name || "ANÁLISIS"}</span>
                <span className="hero-issue">Última Entrada</span>
              </div>
              <h1 className="hero-title">{featuredPost.title}</h1>
              <p className="hero-excerpt">{featuredPost.summary}</p>
              <div className="hero-meta">
                <div className="hero-avatar">{featuredPost.user?.username?.charAt(0) || 'A'}</div>
                <span className="hero-author">{featuredPost.user?.username || 'Admin'}</span>
                <div className="hero-sep" />
                <span className="hero-date">{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
              </div>
              <Link to={`/post/${featuredPost.slug}`} className="hero-read-btn">
                Leer análisis
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </section>
        )}

        <section className="recent">
          <div className="recent-head">
            <span className="recent-title">Artículos Recientes</span>
            <div className="recent-line" />
            <span className="recent-count">{recentPosts.length} entradas adicionales</span>
          </div>

          <div className="cards-grid">
            {recentPosts.map((post) => (
              <Link to={`/post/${post.slug}`} key={post.id} className="card">
                <div className="card-img-wrap">
                  <img src={`${API_URL}${post.featuredImage}`} alt={post.title} className="card-img" />
                  <span className="card-cat-badge">{post.category?.name || "ANIME"}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-excerpt">{post.summary}</p>
                  <div className="card-footer">
                    <span className="card-date" style={{color: '#4A4240', fontSize: '0.65rem'}}>
                       {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}