import { Link, useNavigate } from 'react-router-dom';
import makiBg from '../assets/sakamoto.jpg';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .reg-root { min-height: calc(100vh - 64px); display: flex; background: #0A0806; font-family: 'DM Sans', sans-serif; }

        .reg-panel-img { position: relative; flex: 1; display: none; flex-direction: column; justify-content: flex-end; padding: 3rem; background-size: cover; background-position: center; }
        @media (min-width: 768px) { .reg-panel-img { display: flex; } }

        .reg-panel-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.75) 50%, rgba(10,8,6,0.25) 100%); }

        .reg-panel-copy { position: relative; z-index: 1; max-width: 480px; }
        .reg-panel-tag { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.3); padding: 3px 10px; border-radius: 2px; display: inline-block; margin-bottom: 1rem; }
        .reg-panel-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 4vw, 3.8rem); color: #F5F0EB; line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 1rem; }
        .reg-panel-title span { color: #E6391E; }
        .reg-panel-sub { font-size: 0.88rem; font-weight: 300; color: #6B6259; line-height: 1.65; font-style: italic; }

        .reg-panel-form { width: 100%; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; border-left: 1px solid rgba(245,240,235,0.04); background: #0D0A07; }
        @media (min-width: 768px) { .reg-panel-form { width: 460px; flex-shrink: 0; } }

        .reg-form-inner { width: 100%; max-width: 360px; }

        .reg-form-eyebrow { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: rgba(230,57,30,0.5); margin-bottom: 0.5rem; }
        .reg-form-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: #F5F0EB; letter-spacing: 0.02em; line-height: 1; margin-bottom: 0.4rem; }
        .reg-form-sub { font-size: 0.78rem; font-weight: 300; color: #4A4240; margin-bottom: 2.5rem; }

        .field { margin-bottom: 1.1rem; }
        .field-label { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B6259; margin-bottom: 0.5rem; }
        .field-wrap { position: relative; }
        .field-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #2E2B29; pointer-events: none; }
        .field-input { width: 100%; padding: 0.75rem 0.85rem 0.75rem 2.5rem; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #C8BFB6; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; outline: none; transition: border-color 0.2s, background 0.2s; }
        .field-input::placeholder { color: #2E2B29; }
        .field-input:focus { border-color: rgba(230,57,30,0.4); background: rgba(245,240,235,0.05); }

        .submit-btn { width: 100%; margin-top: 1.75rem; background: #E6391E; color: #0A0806; border: none; padding: 0.85rem; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; border-radius: 3px; transition: background 0.2s, transform 0.15s; }
        .submit-btn:hover { background: #FF4A2E; transform: translateY(-1px); }

        .reg-footer { margin-top: 2rem; text-align: center; font-size: 0.75rem; color: #3D3A38; }
        .reg-footer a { color: #E6391E; text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .reg-footer a:hover { color: #FF4A2E; }

        .divider { width: 100%; height: 1px; background: rgba(245,240,235,0.04); margin: 2rem 0; }
      `}</style>

      <div className="reg-root">
        <div className="reg-panel-img" style={{ backgroundImage: `url(${makiBg})` }}>
          <div className="reg-panel-img-overlay" />
          <div className="reg-panel-copy">
            <span className="reg-panel-tag">AnimeBlog</span>
            <h1 className="reg-panel-title">Crea el <span>Mejor</span> Blog de Anime.</h1>
            <p className="reg-panel-sub">Estás a un paso de unirte a cientos de fans. Registra tus datos y comienza a escribir hoy mismo.</p>
          </div>
        </div>

        <div className="reg-panel-form">
          <div className="reg-form-inner">
            <p className="reg-form-eyebrow">// Registro</p>
            <h2 className="reg-form-title">Crea tu cuenta</h2>
            <p className="reg-form-sub">Únete y comparte tu pasión por el anime.</p>

            <form onSubmit={handleRegister}>
              <div className="field">
                <label className="field-label">Nombre Completo</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </span>
                  <input type="text" required className="field-input" placeholder="Tu Nombre" />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Correo Electrónico</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                  </span>
                  <input type="email" required className="field-input" placeholder="tu@correo.com" />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Contraseña</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </span>
                  <input type="password" required className="field-input" placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" className="submit-btn">Completar Registro</button>
            </form>

            <div className="divider" />

            <p className="reg-footer">
              ¿Ya eres miembro? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}