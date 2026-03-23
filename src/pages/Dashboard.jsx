import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto p-8 sm:p-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Panel Principal</h1>
            <p className="text-slate-400 text-lg">Bienvenido de nuevo. Aquí puedes gestionar tus publicaciones.</p>
          </div>
          
          <button 
            onClick={() => navigate('/create-post')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Artículo
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Posts Publicados', value: '12', color: 'indigo' },
            { label: 'Vistas Totales', value: '1.2k', color: 'emerald' },
            { label: 'Comentarios', value: '48', color: 'orange' },
            { label: 'Seguidores', value: '156', color: 'purple' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition-all group">
              <p className="text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold text-white group-hover:text-${stat.color}-400 transition-colors`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Publicaciones Recientes</h3>
            <button className="text-slate-400 hover:text-white text-sm font-semibold transition-colors">Ver todas</button>
          </div>
          
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-800">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v4a2 2 0 002 2h4" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white">No tienes posts todavía</h4>
            <p className="text-slate-400 max-w-sm mx-auto">Comienza a compartir tus pensamientos sobre anime con la comunidad creando tu primer artículo.</p>
            <button 
              onClick={() => navigate('/create-post')}
              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors mt-4 inline-block"
            >
              Crear mi primer post &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}