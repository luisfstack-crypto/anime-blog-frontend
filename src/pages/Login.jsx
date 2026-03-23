import { Link, useNavigate } from 'react-router-dom';
import namiBg from '../assets/nami.jpg'; 

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Autenticando usuario...");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-slate-950">
      
      <div 
        className="relative md:w-1/2 flex flex-col justify-end p-12 bg-cover bg-center" 
        style={{ backgroundImage: `url(${namiBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20"></div>
        
        <div className="relative z-10 space-y-4 max-w-xl">
          <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-none">
            Tu viaje al mundo del <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">Anime</span> comienza aquí.
          </h1>
          <p className="text-xl text-slate-300">
            Únete a nuestra comunidad de usuarios y comparte tus reseñas, noticias y teorías favoritas.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-slate-900 border-l border-slate-800">
        <div className="w-full max-w-md space-y-10">
          
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white tracking-tight">Bienvenido de nuevo</h2>
            <p className="text-slate-400 mt-2">Por favor, ingresa tus credenciales para acceder a tu panel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="admin@animeblog.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-300">Contraseña</label>
                <a href="#" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="mt-12 text-center text-slate-400">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-bold transition-colors">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}