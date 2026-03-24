import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// Reemplaza esta URL por la ruta correcta de tu imagen, por ejemplo:
// import namiBg from '../assets/nami.jpg';   <-- descomenta si tienes el archivo
const namiBg = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80';

export default function ForgotPassword() {
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=password, 3=done
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const timerRef = useRef(null);

  const goNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 0) startTimer();
      setStep(s => s + 1);
    }, 1100);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(60);
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); setTimerActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleOtp = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0)
      document.getElementById(`otp-${idx - 1}`)?.focus();
  };

  const getStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = getStrength(password);
  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength];
  const strengthColor = ['#2E2B29', '#E6391E', '#D97706', '#CA8A04', '#16A34A'][strength];
  const otpFilled = otp.every(d => d !== '');
  const pwMatch = password && confirm && password === confirm;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .fp-root { min-height: calc(100vh - 64px); display: flex; background: #0A0806; font-family: 'DM Sans', sans-serif; }

        .fp-panel-img { position: relative; flex: 1; display: none; flex-direction: column; justify-content: flex-end; padding: 3rem; background-size: cover; background-position: center; }
        @media (min-width: 768px) { .fp-panel-img { display: flex; } }
        .fp-panel-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.7) 50%, rgba(10,8,6,0.2) 100%); }
        .fp-panel-copy { position: relative; z-index: 1; max-width: 480px; }
        .fp-panel-tag { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.3); padding: 3px 10px; border-radius: 2px; display: inline-block; margin-bottom: 1rem; }
        .fp-panel-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 4vw, 3.8rem); color: #F5F0EB; line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 1rem; }
        .fp-panel-title span { color: #E6391E; }
        .fp-panel-sub { font-size: 0.88rem; font-weight: 300; color: #6B6259; line-height: 1.65; font-style: italic; }

        .fp-panel-form { width: 100%; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; border-left: 1px solid rgba(245,240,235,0.04); background: #0D0A07; }
        @media (min-width: 768px) { .fp-panel-form { width: 460px; flex-shrink: 0; } }

        .fp-form-inner { width: 100%; max-width: 360px; }

        .fp-eyebrow { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: rgba(230,57,30,0.5); margin-bottom: 0.5rem; }
        .fp-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: #F5F0EB; letter-spacing: 0.02em; line-height: 1; margin-bottom: 0.4rem; }
        .fp-sub { font-size: 0.78rem; font-weight: 300; color: #4A4240; margin-bottom: 2.5rem; line-height: 1.6; }
        .fp-sub strong { color: #6B6259; font-weight: 500; }

        .fp-steps { display: flex; gap: 5px; margin-bottom: 2rem; }
        .fp-step { height: 2px; border-radius: 2px; transition: all 0.4s ease; }
        .fp-step.active { background: #E6391E; flex: 2; }
        .fp-step.done { background: rgba(230,57,30,0.35); flex: 1; }
        .fp-step.pending { background: rgba(245,240,235,0.06); flex: 1; }

        .field { margin-bottom: 1.25rem; }
        .field-label { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6B6259; margin-bottom: 0.5rem; }
        .field-wrap { position: relative; }
        .field-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #2E2B29; pointer-events: none; display: flex; align-items: center; }
        .field-input { width: 100%; padding: 0.75rem 0.85rem 0.75rem 2.5rem; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #C8BFB6; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 400; outline: none; transition: border-color 0.2s, background 0.2s; }
        .field-input::placeholder { color: #2E2B29; }
        .field-input:focus { border-color: rgba(230,57,30,0.4); background: rgba(245,240,235,0.05); }
        .field-input.valid { border-color: rgba(22,163,74,0.4); }
        .field-input.invalid { border-color: rgba(230,57,30,0.5); }

        .field-eye { position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #2E2B29; display: flex; align-items: center; padding: 0; transition: color 0.2s; }
        .field-eye:hover { color: #6B6259; }

        .otp-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 1.25rem; width: 100%; }
        .otp-input { width: 100%; min-width: 0; box-sizing: border-box; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #F5F0EB; font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; letter-spacing: 0.05em; text-align: center; padding: 0.6rem 0; outline: none; transition: border-color 0.2s, background 0.2s; }
        .otp-input:focus { border-color: rgba(230,57,30,0.4); background: rgba(245,240,235,0.05); }

        .resend-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .resend-timer { font-size: 0.72rem; font-weight: 300; color: #3D3A38; }
        .resend-btn { background: none; border: none; cursor: pointer; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #E6391E; font-family: 'DM Sans', sans-serif; padding: 0; transition: color 0.2s; }
        .resend-btn:disabled { color: #3D3A38; cursor: not-allowed; }
        .resend-btn:not(:disabled):hover { color: #FF4A2E; }

        .strength-bar { display: flex; gap: 4px; margin-top: 0.5rem; }
        .strength-seg { flex: 1; height: 2px; border-radius: 2px; transition: background 0.3s; }
        .strength-label { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.35rem; }

        .submit-btn { width: 100%; margin-top: 1.75rem; background: #E6391E; color: #0A0806; border: none; padding: 0.85rem; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; border-radius: 3px; transition: background 0.2s, transform 0.15s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .submit-btn:hover:not(:disabled) { background: #FF4A2E; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        .spinner { width: 14px; height: 14px; border: 2px solid rgba(10,8,6,0.3); border-top-color: #0A0806; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .fp-back { background: none; border: none; cursor: pointer; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #6B6259; font-family: 'DM Sans', sans-serif; padding: 0; margin-top: 1.5rem; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .fp-back:hover { color: #C8BFB6; }

        .divider { width: 100%; height: 1px; background: rgba(245,240,235,0.04); margin: 2rem 0; }
        .fp-footer { text-align: center; font-size: 0.75rem; color: #3D3A38; }
        .fp-footer a { color: #E6391E; text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .fp-footer a:hover { color: #FF4A2E; }

        .success-icon { width: 56px; height: 56px; border: 1px solid rgba(230,57,30,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; animation: pop 0.4s ease; }
        @keyframes pop { from { transform: scale(0.6); opacity: 0; } 80% { transform: scale(1.08); } to { transform: scale(1); opacity: 1; } }

        .slide-in { animation: slideIn 0.3s ease both; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <div className="fp-root">

        {/* LEFT — igual que Login */}
        <div className="fp-panel-img" style={{ backgroundImage: `url(${namiBg})` }}>
          <div className="fp-panel-img-overlay" />
          <div className="fp-panel-copy">
            <span className="fp-panel-tag">AnimeBlog</span>
            <h1 className="fp-panel-title">Tu viaje al mundo del <span>Anime</span> comienza aquí.</h1>
            <p className="fp-panel-sub">Únete a nuestra comunidad y comparte tus reseñas, noticias y teorías favoritas.</p>
          </div>
        </div>

        {/* RIGHT — formulario */}
        <div className="fp-panel-form">
          <div className="fp-form-inner">

            <div className="fp-steps">
              {[0, 1, 2].map(i => (
                <div key={i} className={`fp-step ${i < step ? 'done' : i === step ? 'active' : 'pending'}`} />
              ))}
            </div>

            {/* STEP 0 — EMAIL */}
            {step === 0 && (
              <div className="slide-in">
                <p className="fp-eyebrow">// Recuperar acceso</p>
                <h2 className="fp-title">¿Olvidaste tu contraseña?</h2>
                <p className="fp-sub">Ingresa tu correo registrado y te enviaremos un código de verificación para restablecer tu contraseña.</p>

                <div className="field">
                  <label className="field-label">Correo electrónico</label>
                  <div className="field-wrap">
                    <span className="field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="field-input"
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button className="submit-btn" onClick={goNext} disabled={!email.includes('@') || loading}>
                  {loading && <span className="spinner" />}
                  {loading ? 'Enviando...' : 'Enviar código de verificación'}
                </button>

                <div className="divider" />
                <p className="fp-footer">
                  ¿Recordaste tu contraseña? <Link to="/login">Iniciar sesión</Link>
                </p>
              </div>
            )}

            {/* STEP 1 — OTP */}
            {step === 1 && (
              <div className="slide-in">
                <p className="fp-eyebrow">// Verificación</p>
                <h2 className="fp-title">Código de verificación</h2>
                <p className="fp-sub">
                  Ingresa el código de 6 dígitos enviado a <strong>{email}</strong>.
                </p>

                <div className="otp-grid">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      className="otp-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={e => handleOtp(e.target.value, i)}
                      onKeyDown={e => handleOtpKey(e, i)}
                    />
                  ))}
                </div>

                <div className="resend-row">
                  <span className="resend-timer">
                    {timerActive ? `Reenviar en 0:${String(timer).padStart(2, '0')}` : '¿No recibiste el código?'}
                  </span>
                  <button className="resend-btn" disabled={timerActive} onClick={startTimer}>
                    Reenviar
                  </button>
                </div>

                <button className="submit-btn" onClick={goNext} disabled={!otpFilled || loading}>
                  {loading && <span className="spinner" />}
                  {loading ? 'Verificando...' : 'Verificar código'}
                </button>

                <button className="fp-back" onClick={() => { setStep(0); setOtp(['','','','','','']); }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Cambiar correo
                </button>
              </div>
            )}

            {/* STEP 2 — NUEVA CONTRASEÑA */}
            {step === 2 && (
              <div className="slide-in">
                <p className="fp-eyebrow">// Nueva contraseña</p>
                <h2 className="fp-title">Restablecer contraseña</h2>
                <p className="fp-sub">Elige una contraseña segura con al menos 8 caracteres, una mayúscula y un número.</p>

                <div className="field">
                  <label className="field-label">Nueva contraseña</label>
                  <div className="field-wrap">
                    <span className="field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </span>
                    <input
                      type={showPw ? 'text' : 'password'}
                      className="field-input"
                      placeholder="••••••••"
                      style={{ paddingRight: '2.5rem' }}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button className="field-eye" onClick={() => setShowPw(s => !s)} type="button">
                      {showPw
                        ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                        : <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      }
                    </button>
                  </div>
                  {password && (
                    <>
                      <div className="strength-bar">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="strength-seg" style={{ background: i <= strength ? strengthColor : 'rgba(245,240,235,0.06)' }} />
                        ))}
                      </div>
                      <p className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</p>
                    </>
                  )}
                </div>

                <div className="field">
                  <label className="field-label">Confirmar contraseña</label>
                  <div className="field-wrap">
                    <span className="field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </span>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      className={`field-input ${confirm ? (pwMatch ? 'valid' : 'invalid') : ''}`}
                      placeholder="••••••••"
                      style={{ paddingRight: '2.5rem' }}
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                    />
                    <button className="field-eye" onClick={() => setShowConfirm(s => !s)} type="button">
                      {showConfirm
                        ? <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                        : <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      }
                    </button>
                  </div>
                  {confirm && !pwMatch && (
                    <p style={{ fontSize: '0.68rem', color: '#E6391E', marginTop: '0.35rem', fontWeight: 500, letterSpacing: '0.06em' }}>
                      Las contraseñas no coinciden
                    </p>
                  )}
                </div>

                <button className="submit-btn" onClick={goNext} disabled={!pwMatch || strength < 2 || loading}>
                  {loading && <span className="spinner" />}
                  {loading ? 'Guardando...' : 'Restablecer contraseña'}
                </button>
              </div>
            )}

            {/* STEP 3 — ÉXITO */}
            {step === 3 && (
              <div className="slide-in">
                <div className="success-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#E6391E" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p className="fp-eyebrow">// ¡Listo!</p>
                <h2 className="fp-title">Contraseña restablecida</h2>
                <p className="fp-sub" style={{ marginBottom: '1.5rem' }}>
                  Tu contraseña fue actualizada exitosamente. Ya puedes iniciar sesión con tus nuevas credenciales.
                </p>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button className="submit-btn" style={{ marginTop: 0 }}>
                    Ir a iniciar sesión
                  </button>
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}