
import React from 'react';
import { AppTab } from '../types';
import { LayoutGrid, BookOpen, Library, Wand2, Cpu, Zap, Film, Fingerprint, Clapperboard, Target } from 'lucide-react';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: AppTab.OVERVIEW, label: 'TỔNG QUAN', icon: LayoutGrid },
    { id: AppTab.BIBLE, label: 'BẢN SẮC', icon: BookOpen },
    { id: AppTab.LIBRARY, label: 'THƯ VIỆN', icon: Library },
    { id: AppTab.IMAGE_FORGE, label: 'IMAGE FORGE', icon: Wand2 },
    { id: AppTab.CHARACTER_STUDIO, label: 'CHARACTER STUDIO', icon: Fingerprint },
    { id: AppTab.VEO_STUDIO, label: 'VEO STUDIO', icon: Film },
    { id: AppTab.TRAILER_ARCHITECT, label: 'TRAILER ARCHITECT', icon: Clapperboard },
    { id: AppTab.STRATEGY, label: 'CHIẾN LƯỢC', icon: Target },
    { id: AppTab.ENGINE, label: 'KỸ THUẬT', icon: Cpu },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                Project <span className="text-indigo-600">Mikage</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Master Production Terminal V6.0
              </p>
            </div>
          </div>
          <nav className="hidden xl:flex items-center h-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-[10px] font-black transition-all border-b-2 h-full uppercase tracking-tighter ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full uppercase tracking-wider">
              Optimal Sync
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
