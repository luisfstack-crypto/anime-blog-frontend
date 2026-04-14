import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const namiBg = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); 
  const [email, setEmail] = useState('');
  // Volvemos al estado de array para los 6 cuadros
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const API_URL = "https://localhost:7288/api";

  // Manejo de los cuadros individuales del PIN
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

  // --- 🚀 PASO 0: SOLICITAR PIN ---
  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/Auth/forgot-password?email=${email}`, {
        method: 'POST'
      });
      if (response.ok) {
        setStep(1);
      } else {
        const err = await response.text();
        alert(err);
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // --- 🚀 PASO 2: GUARDAR NUEVA CONTRASEÑA ---
  const handleResetPassword = async () => {
    if (password !== confirm) return alert("Las contraseñas no coinciden.");
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/Auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          token: otp.join(''), // Unimos los 6 cuadros para mandarlos como un solo string
          newPassword: password
        })
      });

      if (response.ok) {
        setStep(3);
      } else {
        const err = await response.text();
        alert(err);
      }
    } catch (err) {
      alert("Error de red.");
    } finally {
      setLoading(false);
    }
  };

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
        .fp-panel-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 4vw, 3.8rem); color: #F5F0EB; line-height: 0.95; }
        .fp-panel-title span { color: #E6391E; }
        .fp-panel-form { width: 100%; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; background: #0D0A07; }
        @media (min-width: 768px) { .fp-panel-form { width: 460px; } }
        .fp-form-inner { width: 100%; max-width: 360px; }
        .fp-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: #F5F0EB; margin-bottom: 0.4rem; }
        .fp-sub { font-size: 0.78rem; color: #4A4240; margin-bottom: 2.5rem; }
        .otp-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 1.5rem; }
        .otp-input { width: 100%; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #F5F0EB; font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; text-align: center; padding: 0.6rem 0; outline: none; }
        .otp-input:focus { border-color: #E6391E; }
        .field { margin-bottom: 1.25rem; }
        .field-label { display: block; font-size: 0.68rem; color: #6B6259; margin-bottom: 0.5rem; text-transform: uppercase; }
        .field-input { width: 100%; padding: 0.75rem; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #C8BFB6; outline: none; }
        .submit-btn { width: 100%; background: #E6391E; color: #0A0806; border: none; padding: 0.85rem; font-weight: 700; cursor: pointer; border-radius: 3px; text-transform: uppercase; margin-top: 1rem; }
        .submit-btn:disabled { opacity: 0.4; }
        .spinner { width: 14px; height: 14px; border: 2px solid #000; border-top-color: transparent; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .slide-in { animation: slideIn 0.3s ease both; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <div className="fp-root">
        <div className="fp-panel-img" style={{ backgroundImage: `url(${namiBg})` }}>
          <div className="fp-panel-img-overlay" />
          <div className="fp-panel-copy">
            <h1 className="fp-panel-title">Tu viaje al <span>Anime</span> comienza aquí.</h1>
          </div>
        </div>

        <div className="fp-panel-form">
          <div className="fp-form-inner">
            {step === 0 && (
              <div className="slide-in">
                <h2 className="fp-title">Recuperar acceso</h2>
                <p className="fp-sub">Ingresa tu correo para recibir tu código de 6 dígitos.</p>
                <div className="field">
                  <label className="field-label">Correo electrónico</label>
                  <input type="email" className="field-input" placeholder="tucorreo@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button className="submit-btn" onClick={handleSendEmail} disabled={!email.includes('@') || loading}>
                  {loading && <div className="spinner" />} Enviar código
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="slide-in">
                <h2 className="fp-title">Verificación</h2>
                <p className="fp-sub">Ingresa el PIN enviado a tu correo.</p>
                <div className="otp-grid">
                  {otp.map((d, i) => (
                    <input
                      key={i} id={`otp-${i}`} className="otp-input"
                      type="text" maxLength={1} value={d}
                      onChange={e => handleOtp(e.target.value, i)}
                      onKeyDown={e => handleOtpKey(e, i)}
                    />
                  ))}
                </div>
                <button className="submit-btn" onClick={() => setStep(2)} disabled={!otpFilled}>
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="slide-in">
                <h2 className="fp-title">Nueva contraseña</h2>
                <div className="field">
                  <label className="field-label">Nueva Contraseña</label>
                  <input type={showPw ? "text" : "password"} className="field-input" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="field">
                  <label className="field-label">Confirmar</label>
                  <input type={showConfirm ? "text" : "password"} className="field-input" value={confirm} onChange={e => setConfirm(e.target.value)} />
                </div>
                <button className="submit-btn" onClick={handleResetPassword} disabled={!pwMatch || loading}>
                  {loading && <div className="spinner" />} Restablecer
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="slide-in" style={{textAlign: 'center'}}>
                <h2 className="fp-title">¡Todo listo!</h2>
                <p className="fp-sub">Contraseña actualizada correctamente.</p>
                <Link to="/login" className="submit-btn" style={{display:'block', textDecoration:'none', textAlign:'center'}}>Volver al Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}