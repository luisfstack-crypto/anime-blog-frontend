import { useState } from 'react';
import { Link } from 'react-router-dom';
import makiImg from '../assets/maki_despertar.png';
import animesImg from '../assets/animes_primavera.jpg';
import arquiImg from '../assets/arqui_shingeki.jpg';

const post = {
  id: 1,
  title: "Análisis del Gear 5 de Luffy: Impacto y Narrativa",
  category: "Análisis",
  date: "22 Mar 2026",
  readTime: "8 min",
  coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1974&auto=format&fit=crop",
  author: { name: "Luis Pech", role: "Editor", joined: "Ene 2026", posts: 12, bio: "Escritor apasionado por la narrativa del manga y la animación japonesa. Especializado en análisis de personajes y estructura de arcos." },
  content: [
    { type: "lead", text: "El Gear 5 no es simplemente otra transformación de poder en One Piece. Es una declaración filosófica sobre la naturaleza de la libertad, la alegría y el caos creativo que Oda ha estado construyendo desde el capítulo 1." },
    { type: "h2", text: "El Lenguaje Visual del Caos" },
    { type: "p", text: "Cuando Luffy despierta su Devil Fruit, el manga literalmente cambia de estilo. Las páginas adoptan una estética de dibujos animados clásicos — referenciando directamente a Looney Tunes y las primeras animaciones de Fleischer Studios. Esta no es una decisión accidental. Oda comunicó algo profundo: Luffy no pelea dentro de las reglas del mundo, él las reescribe." },
    { type: "p", text: "La transformación blanca, el cabello que flota como humo, la risa que literalmente sacude el ambiente — todo apunta a un ser que existe más allá de los límites físicos convencionales de One Piece. Es el Yami-Yami de la libertad absoluta." },
    { type: "h2", text: "Implicaciones Narrativas para el Arco Final" },
    { type: "p", text: "Lo que hace al Gear 5 devastador narrativamente es lo que implica sobre Joyboy. Durante décadas de lectura, Joyboy existió como una figura histórica enigmática. Con el despertar, Oda revela que Luffy no es la reencarnación de Joyboy — Luffy simplemente se convirtió en Joyboy porque su naturaleza siempre fue esa. El nombre no define al portador, el portador define al nombre." },
    { type: "quote", text: "La naturaleza de mi Akuma no Mi... es la más ridícula del mundo." },
    { type: "p", text: "Esta cita de Zunesha encapsula la paradoja: la fruta 'más ridícula' es la más poderosa no por sus capacidades de combate, sino porque su poder fundamental es la libertad de ignorar cualquier regla, incluyendo las del poder mismo." },
  ],
};

const REACTIONS = [
  { emoji: '🔥', label: 'Épico',    count: 142 },
  { emoji: '🧠', label: 'Análisis', count: 89  },
  { emoji: '💬', label: 'Debate',   count: 34  },
  { emoji: '❤️', label: 'Me gusta', count: 210 },
];

const comments = [
  { id: 1, author: "Kenji Taro", date: "22 Mar 2026", text: "Excelente análisis. La conexión con Joyboy siempre la sentí implícita pero nunca la había visto articulada tan bien. La parte del lenguaje visual del caos es oro puro.", likes: 24, avatar: "K" },
  { id: 2, author: "Usuario 01", date: "22 Mar 2026", text: "Oda realmente llevó 20 años construyendo esto y se nota. Lo del estilo Looney Tunes lo mencionó en una entrevista también, confirma todo lo que dices aquí.", likes: 11, avatar: "E" },
  { id: 3, author: "turbo_abuela", date: "21 Mar 2026", text: "¿Crees que Blackbeard tendrá una respuesta equivalente al Gear 5? El Yami-Yami absorbe poderes... si absorbe el Hito-Hito Model Nika la pelea final sería una locura.", likes: 18, avatar: "A" },
];

const related = [
  { id: 2, title: "Maki Zen'in: Evolución y el límite del cuerpo físico", category: "Personajes", readTime: "5 min", imageUrl: makiImg },
  { id: 3, title: "Guía Esencial: Animes imperdibles de Primavera 2026", category: "Noticias", readTime: "8 min", imageUrl: animesImg },
  { id: 4, title: "La Psicología detrás de las Murallas: Arquitectura en SnK", category: "Mundo", readTime: "12 min", imageUrl: arquiImg },
];

export default function PostView() {
  const [reactions, setReactions] = useState(REACTIONS);
  const [reacted, setReacted] = useState(new Set());
  const [commentList, setCommentList] = useState(comments);
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());

  const handleReact = (i) => {
    if (reacted.has(i)) return;
    setReacted(prev => new Set([...prev, i]));
    setReactions(prev => prev.map((r, idx) => idx === i ? { ...r, count: r.count + 1 } : r));
  };

  const handleLikeComment = (id) => {
    if (likedComments.has(id)) return;
    setLikedComments(prev => new Set([...prev, id]));
    setCommentList(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentList(prev => [
      { id: Date.now(), author: "Tú", date: "Ahora", text: commentText, likes: 0, avatar: "T" },
      ...prev,
    ]);
    setCommentText('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pv-root { min-height: calc(100vh - 64px); background: #0A0806; font-family: 'DM Sans', sans-serif; color: #C8BFB6; }


        .pv-cover { position: relative; width: 100%; height: 60vh; min-height: 420px; overflow: hidden; }
        .pv-cover-img { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.6) saturate(0.85); }
        .pv-cover-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0806 0%, rgba(10,8,6,0.5) 60%, transparent 100%); }
        .pv-cover-content { position: relative; height: 100%; max-width: 780px; margin: 0 auto; padding: 0 1.5rem 3rem; display: flex; flex-direction: column; justify-content: flex-end; }
        .pv-cover-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .pv-cat { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.3em; color: #E6391E; border: 1px solid rgba(230,57,30,0.35); padding: 3px 10px; border-radius: 2px; }
        .pv-readtime { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(245,240,235,0.3); }
        .pv-cover-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 5.5vw, 4rem); color: #F5F0EB; line-height: 0.97; letter-spacing: 0.02em; }


        .pv-body { max-width: 780px; margin: 0 auto; padding: 0 1.5rem 5rem; }


        .pv-author-strip { display: flex; align-items: center; gap: 1rem; padding: 1.5rem 0; border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 3rem; }
        .pv-author-av { width: 40px; height: 40px; border-radius: 50%; background: #1A1512; border: 1px solid #E6391E; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: #E6391E; flex-shrink: 0; }
        .pv-author-name { font-size: 0.82rem; font-weight: 600; color: #D8CFC6; }
        .pv-author-date { font-size: 0.68rem; color: #3D3A38; margin-top: 2px; letter-spacing: 0.04em; }
        .pv-sep { flex: 1; }
        .pv-date-pill { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: #3D3A38; }


        .pv-article { margin-bottom: 3rem; }
        .pv-lead { font-family: 'Lora', serif; font-size: clamp(1rem, 1.8vw, 1.15rem); font-weight: 400; color: #C8BFB6; line-height: 1.75; margin-bottom: 2rem; font-style: italic; border-left: 2px solid #E6391E; padding-left: 1.25rem; }
        .pv-h2 { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 0.06em; color: #F5F0EB; margin: 2.5rem 0 1rem; }
        .pv-p { font-family: 'Lora', serif; font-size: 0.95rem; color: #9A8F85; line-height: 1.85; margin-bottom: 1.25rem; }
        .pv-quote { margin: 2rem 0; padding: 1.25rem 1.5rem; background: rgba(230,57,30,0.05); border-left: 3px solid #E6391E; }
        .pv-quote p { font-family: 'Lora', serif; font-size: 1rem; color: #D8CFC6; line-height: 1.7; font-style: italic; }


        .pv-reactions { display: flex; flex-wrap: wrap; gap: 0.6rem; padding: 1.75rem 0; border-top: 1px solid rgba(245,240,235,0.06); border-bottom: 1px solid rgba(245,240,235,0.06); margin-bottom: 3.5rem; }
        .pv-react-btn { display: flex; align-items: center; gap: 0.5rem; background: rgba(245,240,235,0.03); border: 1px solid rgba(245,240,235,0.07); border-radius: 3px; padding: 0.5rem 0.9rem; cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif; }
        .pv-react-btn:hover { background: rgba(245,240,235,0.06); border-color: rgba(245,240,235,0.14); }
        .pv-react-btn.active { border-color: rgba(230,57,30,0.3); background: rgba(230,57,30,0.06); }
        .pv-react-emoji { font-size: 1rem; line-height: 1; }
        .pv-react-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #6B6259; }
        .pv-react-count { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; color: #F5F0EB; letter-spacing: 0.05em; }
        .pv-react-btn.active .pv-react-label { color: #E6391E; }


        .pv-author-card { background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-left: 3px solid #E6391E; border-radius: 3px; padding: 1.5rem; display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 3.5rem; }
        .pv-ac-av { width: 52px; height: 52px; border-radius: 50%; background: #1A1512; border: 1px solid rgba(230,57,30,0.35); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: #E6391E; flex-shrink: 0; }
        .pv-ac-name { font-size: 0.92rem; font-weight: 600; color: #F5F0EB; margin-bottom: 2px; }
        .pv-ac-role { font-family: 'Bebas Neue', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; color: #E6391E; margin-bottom: 0.6rem; }
        .pv-ac-bio { font-size: 0.78rem; font-weight: 300; color: #6B6259; line-height: 1.6; font-style: italic; margin-bottom: 0.75rem; }
        .pv-ac-stats { display: flex; gap: 1.25rem; }
        .pv-ac-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: #F5F0EB; }
        .pv-ac-stat-label { font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: #3D3A38; }


        .pv-comments-title { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 0.25em; color: #F5F0EB; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; }
        .pv-comments-count { font-family: 'Bebas Neue', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; color: rgba(230,57,30,0.45); }


        .pv-comment-form { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
        .pv-comment-textarea { width: 100%; padding: 0.8rem 1rem; background: rgba(245,240,235,0.025); border: 1px solid rgba(245,240,235,0.06); border-radius: 3px; color: #C8BFB6; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; line-height: 1.6; outline: none; resize: none; min-height: 90px; transition: border-color 0.2s; }
        .pv-comment-textarea::placeholder { color: #2E2B29; font-style: italic; }
        .pv-comment-textarea:focus { border-color: rgba(230,57,30,0.3); }
        .pv-comment-submit { align-self: flex-end; background: #E6391E; color: #0A0806; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; padding: 0.6rem 1.3rem; border-radius: 3px; transition: background 0.2s, transform 0.15s; }
        .pv-comment-submit:hover { background: #FF4A2E; transform: translateY(-1px); }


        .pv-comment { display: flex; gap: 1rem; padding: 1.25rem 0; border-bottom: 1px solid rgba(245,240,235,0.04); }
        .pv-comment-av { width: 34px; height: 34px; border-radius: 50%; background: #1A1512; border: 1px solid rgba(245,240,235,0.08); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; color: #9A8F85; flex-shrink: 0; margin-top: 2px; }
        .pv-comment-body {}
        .pv-comment-meta { display: flex; align-items: baseline; gap: 0.65rem; margin-bottom: 0.4rem; }
        .pv-comment-author { font-size: 0.8rem; font-weight: 600; color: #D8CFC6; }
        .pv-comment-date { font-size: 0.65rem; color: #2E2B29; }
        .pv-comment-text { font-size: 0.83rem; font-weight: 300; color: #9A8F85; line-height: 1.65; margin-bottom: 0.6rem; }
        .pv-comment-like { background: none; border: none; color: #3D3A38; font-family: 'DM Sans', sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: color 0.2s; }
        .pv-comment-like:hover { color: #E6391E; }
        .pv-comment-like.liked { color: #E6391E; }


        .pv-related { margin-top: 4rem; }
        .pv-related-head { display: flex; align-items: baseline; gap: 1.25rem; margin-bottom: 2rem; }
        .pv-related-title { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.3em; color: #F5F0EB; white-space: nowrap; }
        .pv-related-line { flex: 1; height: 1px; background: rgba(245,240,235,0.05); }

        .pv-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background: rgba(245,240,235,0.04); }
        @media (max-width: 650px) { .pv-related-grid { grid-template-columns: 1fr; } }

        .pv-rc { background: #0A0806; text-decoration: none; display: flex; flex-direction: column; overflow: hidden; transition: background 0.2s; }
        .pv-rc:hover { background: #100C09; }
        .pv-rc-img { width: 100%; height: 130px; object-fit: cover; filter: brightness(0.75) saturate(0.8); transition: filter 0.4s, transform 0.5s; }
        .pv-rc:hover .pv-rc-img { filter: brightness(0.9) saturate(1); transform: scale(1.03); }
        .pv-rc-img-wrap { overflow: hidden; position: relative; }
        .pv-rc-cat { position: absolute; top: 0; left: 0; font-family: 'Bebas Neue', sans-serif; font-size: 0.55rem; letter-spacing: 0.25em; color: #0A0806; background: #E6391E; padding: 3px 8px; }
        .pv-rc-body { padding: 0.9rem 1rem 1.1rem; }
        .pv-rc-title { font-size: 0.82rem; font-weight: 500; color: #9A8F85; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.4rem; transition: color 0.2s; }
        .pv-rc:hover .pv-rc-title { color: #D8CFC6; }
        .pv-rc-read { font-family: 'Bebas Neue', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; color: rgba(230,57,30,0.45); }
      `}</style>

      <div className="pv-root">


        <div className="pv-cover">
          <div className="pv-cover-img" style={{ backgroundImage: `url(${post.coverUrl})` }} />
          <div className="pv-cover-overlay" />
          <div className="pv-cover-content">
            <div className="pv-cover-meta">
              <span className="pv-cat">{post.category}</span>
              <span className="pv-readtime">{post.readTime} lectura</span>
            </div>
            <h1 className="pv-cover-title">{post.title}</h1>
          </div>
        </div>

        <div className="pv-body">


          <div className="pv-author-strip">
            <div className="pv-author-av">{post.author.name[0]}</div>
            <div>
              <p className="pv-author-name">{post.author.name}</p>
              <p className="pv-author-date">{post.date}</p>
            </div>
            <div className="pv-sep" />
            <span className="pv-date-pill">{post.readTime} de lectura</span>
          </div>


          <article className="pv-article">
            {post.content.map((block, i) => {
              if (block.type === 'lead')   return <p key={i} className="pv-lead">{block.text}</p>;
              if (block.type === 'h2')    return <h2 key={i} className="pv-h2">{block.text}</h2>;
              if (block.type === 'p')     return <p key={i} className="pv-p">{block.text}</p>;
              if (block.type === 'quote') return <blockquote key={i} className="pv-quote"><p>{block.text}</p></blockquote>;
              return null;
            })}
          </article>


          <div className="pv-reactions">
            {reactions.map((r, i) => (
              <button
                key={i}
                className={`pv-react-btn${reacted.has(i) ? ' active' : ''}`}
                onClick={() => handleReact(i)}
              >
                <span className="pv-react-emoji">{r.emoji}</span>
                <span className="pv-react-label">{r.label}</span>
                <span className="pv-react-count">{r.count}</span>
              </button>
            ))}
          </div>


          <div className="pv-author-card">
            <div className="pv-ac-av">{post.author.name[0]}</div>
            <div>
              <p className="pv-ac-name">{post.author.name}</p>
              <p className="pv-ac-role">{post.author.role}</p>
              <p className="pv-ac-bio">{post.author.bio}</p>
              <div className="pv-ac-stats">
                <div>
                  <p className="pv-ac-stat-val">{post.author.posts}</p>
                  <p className="pv-ac-stat-label">Artículos</p>
                </div>
                <div>
                  <p className="pv-ac-stat-val">{post.author.joined}</p>
                  <p className="pv-ac-stat-label">Miembro</p>
                </div>
              </div>
            </div>
          </div>


          <section>
            <p className="pv-comments-title">
              Comentarios
              <span className="pv-comments-count">{commentList.length}</span>
            </p>

            <form className="pv-comment-form" onSubmit={handleComment}>
              <textarea
                className="pv-comment-textarea"
                placeholder="Comparte tu opinión sobre este artículo..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows={3}
              />
              <button type="submit" className="pv-comment-submit">Comentar</button>
            </form>

            {commentList.map(c => (
              <div key={c.id} className="pv-comment">
                <div className="pv-comment-av">{c.avatar}</div>
                <div className="pv-comment-body">
                  <div className="pv-comment-meta">
                    <span className="pv-comment-author">{c.author}</span>
                    <span className="pv-comment-date">{c.date}</span>
                  </div>
                  <p className="pv-comment-text">{c.text}</p>
                  <button
                    className={`pv-comment-like${likedComments.has(c.id) ? ' liked' : ''}`}
                    onClick={() => handleLikeComment(c.id)}
                  >
                    ♥ {c.likes}
                  </button>
                </div>
              </div>
            ))}
          </section>


          <div className="pv-related">
            <div className="pv-related-head">
              <span className="pv-related-title">También te puede interesar</span>
              <div className="pv-related-line" />
            </div>
            <div className="pv-related-grid">
              {related.map(r => (
                <Link to={`/post/${r.id}`} key={r.id} className="pv-rc">
                  <div className="pv-rc-img-wrap">
                    <img src={r.imageUrl} alt={r.title} className="pv-rc-img" />
                    <span className="pv-rc-cat">{r.category}</span>
                  </div>
                  <div className="pv-rc-body">
                    <p className="pv-rc-title">{r.title}</p>
                    <p className="pv-rc-read">{r.readTime} lectura</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}