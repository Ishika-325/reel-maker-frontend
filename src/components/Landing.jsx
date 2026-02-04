import React from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Video,
  Music,
  Sparkles,
  Type,
  Layers,
  Share2,
  Plus,
  Search,
  Settings,
  LayoutGrid,
  Zap,
  Scissors
} from 'lucide-react';

/* Sidebar Icon */
const SidebarIcon = ({ icon: Icon, active = false }) => (
  <div
    className={`p-3 cursor-pointer rounded-2xl transition-all duration-300 ${
      active
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
        : 'text-slate-400 hover:bg-white hover:text-indigo-600'
    }`}
  >
    <Icon size={22} />
  </div>
);

/* Tool Button */
const ToolButton = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2 bg-white/80 hover:bg-white border border-white px-5 py-2.5 rounded-2xl shadow-sm transition-all hover:shadow-md group">
    <Icon size={18} className="text-slate-600 group-hover:text-indigo-600" />
    <span className="text-sm font-semibold text-slate-700">{label}</span>
  </button>
);

const Landing = () => {
  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-xl border-b border-white/60 z-50 flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <Video size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            ReelCraft AI
          </span>
        </div>

        {/* Login Button */}
        <Link to="/login" className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition shadow-md">
          Login
        </Link>
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <div className="min-h-screen bg-[#F8FAFF] flex p-4 lg:p-6 pt-20 font-sans antialiased text-slate-900">
        
        {/* Background Decorations */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px] -z-10" />

        {/* ================= SIDEBAR ================= */}
       

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 flex flex-col">
          
          {/* Hero Section */}
          <section className="relative grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            <div className="xl:col-span-8">
              <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[48px] p-6 shadow-xl">
                <div className="aspect-video bg-slate-900 rounded-[32px] relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279')] bg-cover bg-center opacity-60" />
                  <button className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
                    <Play fill="white" size={32} />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ToolButton icon={Type} label="Auto Captions" />
                  <ToolButton icon={Music} label="Sync Music" />
                  <ToolButton icon={Sparkles} label="Magic Transitions" />
                  <ToolButton icon={Scissors} label="Smart Cut" />
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl">
                <Zap className="absolute -top-6 -right-6 text-white/10 w-32 h-32 rotate-12" />
                <h3 className="text-2xl font-bold mb-2">Go Viral with AI</h3>
                <p className="text-indigo-100 text-sm mb-6">
                  AI analyzes trending sounds and auto-edits your reels.
                </p>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl text-sm font-bold">
                  Try Auto-Edit
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-8">
                <h4 className="font-bold text-slate-800 mb-4">
                  Trending Templates
                </h4>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-violet-500" />
                    <div>
                      <p className="text-sm font-bold">Vogue Aesthetic #{i}</p>
                      <p className="text-xs text-slate-400">2.4k creators</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto py-6 px-4 bg-white/30 rounded-[32px] border border-white/50 flex justify-between items-center">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Join 50k+ creators
            </p>
            <Share2 size={16} className="text-slate-600" />
          </footer>

        </main>
      </div>
    </>
  );
};

export default Landing;
