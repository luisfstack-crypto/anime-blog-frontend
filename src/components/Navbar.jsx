import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Detecta cambios de URL para re-verificar el token

  useEffect(() => {
    // Revisamos si el token existe cada vez que el usuario cambia de página
    const token = localStorage.getItem('token');
    setIsLogged(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Borramos la sesión
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          background: rgba(10, 8, 6, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(230, 57, 30, 0.15);
          font-family: 'DM Sans', sans-serif;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo { display: flex; align-items: baseline; gap: 2px; text-decoration: none; }
        .nav-logo-jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; font-size: 0.65rem; color: #E6391E; letter-spacing: 0.1em; margin-right: 6px; }
        .nav-logo-main { font-family: 'Bebas Neue', sans-serif; font-size: 1.9rem; color: #F5F0EB; letter-spacing: 0.04em; line-height: 1; transition: color 0.2s; }
        .nav-logo-dot { color: #E6391E; }
        .nav-logo:hover .nav-logo-main { color: #E6391E; }

        .nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .nav-link { color: #9A8F85; text-decoration: none; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.4rem 0.85rem; border-radius: 4px; transition: all 0.2s; }
        .nav-link:hover { color: #F5F0EB; background: rgba(245, 240, 235, 0.06); }

        .nav-divider { width: 1px; height: 18px; background: rgba(245, 240, 235, 0.1); margin: 0 0.5rem; }

        .nav-cta { text-decoration: none; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0A0806; background: #E6391E; padding: 0.5rem 1.25rem; border-radius: 3px; transition: all 0.2s; margin-left: 0.5rem; }
        .nav-cta:hover { background: #FF4A2E; transform: translateY(-1px); }

        .nav-logout-btn { background: transparent; border: 1px solid rgba(230, 57, 30, 0.4); color: #E6391E; font-size: 0.75rem; font-weight: 700; padding: 0.5rem 1.25rem; border-radius: 3px; cursor: pointer; transition: all 0.2s; margin-left: 0.5rem; letter-spacing: 0.12em; }
        .nav-logout-btn:hover { background: rgba(230, 57, 30, 0.1); color: #FF4A2E; }

        .nav-issue { font-family: 'Bebas Neue', sans-serif; font-size: 0.7rem; color: rgba(230, 57, 30, 0.5); letter-spacing: 0.15em; margin-left: 1.5rem; display: none; }
        @media (min-width: 768px) { .nav-issue { display: block; } }
        @media (max-width: 767px) { .nav-links { display: none; } }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-jp">アニメ</span>
            <span className="nav-logo-main">AnimeBlog<span className="nav-logo-dot">.</span></span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="nav-links">
              <Link to="/" className="nav-link">Inicio</Link>
              
              {/* Solo mostramos Panel y Admin si hay sesión */}
              {isLogged && (
                <>
                  <Link to="/dashboard" className="nav-link">Panel</Link>
                  <Link to="/admin" className="nav-link">Admin</Link>
                </>
              )}
              
              <div className="nav-divider" />

              {/* Botones condicionales */}
              {isLogged ? (
                <button onClick={handleLogout} className="nav-logout-btn">Salir</button>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Entrar</Link>
                  <Link to="/register" className="nav-cta">Registrarse</Link>
                </>
              )}
            </div>
            <span className="nav-issue">VOL. 26 · 2026</span>
          </div>
        </div>
      </nav>
    </>
  );
}