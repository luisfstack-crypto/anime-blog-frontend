import { Link, useNavigate } from 'react-router-dom';
import makiBg from '../assets/sakamoto.jpg';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registrando nuevo usuario...");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-slate-950">
      
      <div 
        className="relative md:w-1/2 flex flex-col justify-end p-12 bg-cover bg-center" 
        style={{ backgroundImage: `url(${makiBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30"></div>
        
        <div className="relative z-10 space-y-4 max-w-xl">
          <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-none">
            Crea el <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Mejor</span> Blog de Anime.
          </h1>
          <p className="text-xl text-slate-300">
            Estás a un paso de unirte a cientos de fans. Registra tus datos y comienza a escribir hoy mismo.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-slate-900 border-l border-slate-800">
        <div className="w-full max-w-md space-y-10">
          
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white tracking-tight">Crea tu cuenta</h2>
            <p className="text-slate-400 mt-2">Únete a nuestra plataforma y comparte tu pasión por el anime.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-300">Nombre Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="Tu Nombre Estudiante"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-300">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-300">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 mt-4"
            >
              Completar Registro
            </button>
          </form>

          <p className="mt-12 text-center text-slate-400">
            ¿Ya eres miembro?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}