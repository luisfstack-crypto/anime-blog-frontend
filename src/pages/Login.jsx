import { useState } from 'react'; // 👈 1. Importamos useState
import { Link, useNavigate } from 'react-router-dom';
import namiBg from '../assets/nami.jpg';

export default function Login() {
  const navigate = useNavigate();
  
  // 👈 2. Creamos los "espacios de memoria" para lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    try {
      const response = await fetch('https://localhost:7288/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // 🛡️ GUARDADO DE SESIÓN COMPLETO
        localStorage.setItem('token', data.token); // Tu token JWT
        
        // Aquí es donde sucede la magia del nombre:
        // Si C# no manda el nombre por error, usamos el inicio del email como plan C
        localStorage.setItem('userName', data.userName || email.split('@')[0]); 
        
        // Estos dos son para que el Dashboard sepa qué botones mostrar
        localStorage.setItem('userRole', data.userRole); 
        localStorage.setItem('userId', data.userId);

        navigate('/dashboard'); 
      } else {
        const errText = await response.text();
        setErrorMsg(errText || 'Credenciales incorrectas. Intenta de nuevo.');
      }
    } catch (err) {
      setErrorMsg('No se pudo conectar con el servidor. ¿Está encendida la API en Visual Studio?');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .login-root { min-height: calc(100vh - 64px); display: flex; background: #0A0806; font-family: 'DM Sans', sans-serif; }

        .login-panel-img { position: relative; flex: 1; display: flex; flex-direction: column; justify-content: flex-end; padding: 3rem; background-size: cover; background-position: center; display: none; }
        @media (min-width: 768px) { .login-panel-img { display: flex; } }

        .login-panel-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.7) 50%, rgba(10,8,6,0.2) 100%); }

        .login-panel-copy { position: relative; z-index: 1; max-width: 480px; }
        .login-panel-tag { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.3); padding: 3px 10px; border-radius: 2px; display: inline-block; margin-bottom: 1rem; }
        .login-panel-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 4vw, 3.8rem); color: #F5F0EB; line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 1rem; }
        .login-panel-title span { color: #E6391E; }
        .login-panel-sub { font-size: 0.88rem; font-weight: 300; color: #6B6259; line-height: 1.65; font-style: italic; }

        .login-panel-form { width: 100%; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; border-left: 1px solid rgba(245,240,235,0.04); background: #0D0A07; }
        @media (min-width: 768px) { .login-panel-form { width: 460px; flex-shrink: 0; } }

        .login-form-inner { width: 100%; max-width: 360px; }

        .login-form-eyebrow { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: rgba(230,57,30,0.5); margin-bottom: 0.5rem; }
        .login-form-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: #F5F0EB; letter-spacing: 0.02em; line-height: 1; margin-bottom: 0.4rem; }
        .login-form-sub { font-size: 0.78rem; font-weight: 300; color: #4A4240; margin-bottom: 1.5rem; }

        .field { margin-bottom: 1.25rem; }
        .field-label { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B6259; margin-bottom: 0.5rem; }
        .field-wrap { position: relative; }
        .field-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #2E2B29; pointer-events: none; }
        .field-input { width: 100%; padding: 0.75rem 0.85rem 0.75rem 2.5rem; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #C8BFB6; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 400; outline: none; transition: border-color 0.2s, background 0.2s; }
        .field-input::placeholder { color: #2E2B29; }
        .field-input:focus { border-color: rgba(230,57,30,0.4); background: rgba(245,240,235,0.05); }

        .field-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
        .field-forgot { font-size: 0.68rem; color: #E6391E; text-decoration: none; letter-spacing: 0.06em; transition: color 0.2s; }
        .field-forgot:hover { color: #FF4A2E; }

        .submit-btn { width: 100%; margin-top: 1.75rem; background: #E6391E; color: #0A0806; border: none; padding: 0.85rem; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; border-radius: 3px; transition: background 0.2s, transform 0.15s; }
        .submit-btn:hover { background: #FF4A2E; transform: translateY(-1px); }

        .login-footer { margin-top: 2rem; text-align: center; font-size: 0.75rem; color: #3D3A38; }
        .login-footer a { color: #E6391E; text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .login-footer a:hover { color: #FF4A2E; }

        .divider { width: 100%; height: 1px; background: rgba(245,240,235,0.04); margin: 2rem 0; }
        
        .error-message { color: #E6391E; font-size: 0.8rem; margin-bottom: 1rem; text-align: center; font-weight: bold; background: rgba(230,57,30,0.1); padding: 8px; border-radius: 4px;}
      `}</style>

      <div className="login-root">
        <div className="login-panel-img" style={{ backgroundImage: `url(${namiBg})` }}>
          <div className="login-panel-img-overlay" />
          <div className="login-panel-copy">
            <span className="login-panel-tag">AnimeBlog</span>
            <h1 className="login-panel-title">Tu viaje al mundo del <span>Anime</span> comienza aquí.</h1>
            <p className="login-panel-sub">Únete a nuestra comunidad y comparte tus reseñas, noticias y teorías favoritas.</p>
          </div>
        </div>

        <div className="login-panel-form">
          <div className="login-form-inner">
            <p className="login-form-eyebrow">// Acceso</p>
            <h2 className="login-form-title">Bienvenido de nuevo</h2>
            <p className="login-form-sub">Ingresa tus credenciales para continuar.</p>

            {/* 👇 Mensaje de error si la contraseña está mal 👇 */}
            {errorMsg && <div className="error-message">{errorMsg}</div>}

            <form onSubmit={handleLogin}>
              <div className="field">
                <label className="field-label">Correo Electrónico</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                  </span>
                  {/* 👇 Conectamos el input con el estado email 👇 */}
                  <input 
                    type="email" 
                    required 
                    className="field-input" 
                    placeholder="admin@animeblog.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>

              <div className="field">
                <div className="field-row">
                  <label className="field-label" style={{ marginBottom: 0 }}>Contraseña</label>
                  <a href="/Forgotpassword"  className="field-forgot">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="field-wrap" style={{ marginTop: '0.5rem' }}>
                  <span className="field-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </span>
                  {/* 👇 Conectamos el input con el estado password 👇 */}
                  <input 
                    type="password" 
                    required 
                    className="field-input" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">Iniciar Sesión</button>
            </form>

            <div className="divider" />

            <p className="login-footer">
              ¿No tienes una cuenta? <Link to="/register">Regístrate gratis</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}