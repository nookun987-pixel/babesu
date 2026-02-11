import React, { useState } from 'react';
import Overview from '@/components/Overview';
import Bible from '@/components/Bible';
import Library from '@/components/Library';
import ImageForge from '@/components/ImageForge';
import VeoStudio from '@/components/VeoStudio';
import CharacterStudio from '@/components/CharacterStudio';
import TrailerArchitect from '@/components/TrailerArchitect';
import Strategy from '@/components/Strategy';
import Engine from '@/components/Engine';
import ChatBot from '@/components/ChatBot';
import { AppTab } from '@/types';
import { 
  LayoutDashboard, 
  Box, 
  Video, 
  Layers, 
  Zap as ZapIcon, 
  Target, 
  Settings,
  Database,
  Crown,
  User,
  ShieldCheck
} from 'lucide-react';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHARACTER_STUDIO);

  const tabs = [
    { id: AppTab.OVERVIEW, label: 'OVERVIEW', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: AppTab.CHARACTER_STUDIO, label: 'STUDIO v21.0', icon: <Box className="w-4 h-4" /> },
    { id: AppTab.IMAGE_FORGE, label: 'MATRIX FORGE', icon: <Layers className="w-4 h-4" /> },
    { id: AppTab.LIBRARY, label: 'PROMPT LIBRARY', icon: <ZapIcon className="w-4 h-4" /> },
    { id: AppTab.STRATEGY, label: 'STRATEGY', icon: <Target className="w-4 h-4" /> },
    { id: AppTab.VEO_STUDIO, label: 'VEO STUDIO', icon: <Video className="w-4 h-4" /> },
    { id: AppTab.TRAILER_ARCHITECT, label: 'TRAILER ARCH', icon: <Database className="w-4 h-4" /> },
    { id: AppTab.ENGINE, label: 'TECH ENGINE', icon: <Settings className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.OVERVIEW: return <Overview />;
      case AppTab.BIBLE: return <Bible />;
      case AppTab.LIBRARY: return <Library />;
      case AppTab.IMAGE_FORGE: return <ImageForge />;
      case AppTab.VEO_STUDIO: return <VeoStudio />;
      case AppTab.CHARACTER_STUDIO: return <CharacterStudio />;
      case AppTab.TRAILER_ARCHITECT: return <TrailerArchitect />;
      case AppTab.STRATEGY: return <Strategy />;
      case AppTab.ENGINE: return <Engine />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#010204] text-slate-300 font-sans selection:bg-[#FACC15] selection:text-black">
      {/* ZENITH MASTER NAVIGATION v21.0 (ABSOLUTE SINGULARITY) */}
      <nav className="bg-black/90 border-b border-indigo-900/30 px-8 py-5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-2xl shadow-[0_15px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-950 via-indigo-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] ring-1 ring-white/10 transition-transform hover:rotate-3 duration-500 cursor-pointer group">
            <Crown className="text-white w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase leading-none italic">
              Mikage <span className="text-indigo-400">Zenith</span>
            </h1>
            <p className="text-[10px] text-indigo-500/60 font-black uppercase tracking-[0.4em] mt-1.5 italic">Absolute Batch 11.0 // v21.0 Peak</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-3xl border border-white/5 shadow-inner backdrop-blur-3xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all flex items-center gap-2.5 uppercase tracking-widest ${
                activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-[0_0_25px_rgba(79,70,229,0.5)] ring-1 ring-white/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className={activeTab === tab.id ? 'text-white' : 'text-slate-600'}>
                {tab.icon}
              </div>
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.3em] leading-none italic">Singularity Core v21.0</p>
            <p className="text-[11px] font-black text-amber-500 flex items-center gap-2 justify-end uppercase mt-1.5 italic">
              <ShieldCheck className="w-4 h-4" /> PRODUCTION LOCKED
            </p>
          </div>
          <div className="h-12 w-[1px] bg-indigo-900/30"></div>
          <div className="w-12 h-12 rounded-full bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
             <User size={20} />
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto p-4 md:p-12">
        <div className="animate-in fade-in zoom-in-95 duration-1000">
          {renderContent()}
        </div>
      </main>

      <footer className="py-20 border-t border-indigo-900/20 mt-20 bg-black/50 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-8">
           <div className="flex items-center gap-6 px-12 py-5 bg-indigo-950/20 rounded-full border border-indigo-500/20 shadow-2xl transition-all hover:scale-105 group">
              <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.5em]">Absolute Zenith Singularity</span>
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping group-hover:bg-indigo-400"></div>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none">PEAK_PRODUCTION_v21.0</span>
           </div>
           <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[1em] italic">Omni-DNA Singularity & Aesthetic Perfection</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Home;
