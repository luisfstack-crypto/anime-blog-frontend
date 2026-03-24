import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import AdminPanel from './pages/AdminPanel';
import PostView from './pages/PostView';
import EmailPreview from './pages/EmailPreview';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        
        <main className="w-full pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/post/:id" element={<PostView />} />
            <Route path="/preview-email" element={<EmailPreview />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;