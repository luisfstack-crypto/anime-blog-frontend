import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-950 text-slate-200">
      <main className="flex-1 p-8 sm:p-12 max-w-5xl mx-auto">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Nuevo Artículo</h1>
            <p className="text-slate-400 mt-1">Redacta y publica tu contenido en el blog.</p>
          </div>
          <div className="flex space-x-4">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')} 
              className="px-6 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              form="post-form" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
            >
              Publicar Post
            </button>
          </div>
        </header>

        <form id="post-form" onSubmit={handleSubmit} className="space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título del Artículo</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-lg font-medium" 
              placeholder="Ej: Análisis profundo del arco de Shibuya" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none">
                <option value="review">Reseña</option>
                <option value="theory">Teoría</option>
                <option value="news">Noticia</option>
                <option value="recommendation">Recomendación</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">URL de la Imagen de Portada</label>
              <input 
                type="url" 
                className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" 
                placeholder="https://..." 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Contenido</label>
            <textarea 
              required 
              rows="12" 
              className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y" 
              placeholder="Escribe tu artículo aquí..."
            ></textarea>
          </div>

        </form>
      </main>
    </div>
  );
}