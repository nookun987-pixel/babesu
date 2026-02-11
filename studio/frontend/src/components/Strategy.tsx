
import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, Share2, ShieldCheck, ChevronRight, Crown, Sparkles, Target, BarChart3, Globe
} from 'lucide-react';

const Strategy: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const chartPoints = [25, 40, 38, 80, 75, 95, 100]; 
  const svgPathData = useMemo(() => {
    const w = 900; 
    const h = 350; 
    const step = w / (chartPoints.length - 1);
    const p = chartPoints.map((v, i) => ({ x: i * step, y: h - (v / 100 * h) - 20 }));
    const d = p.reduce((acc, point, i) => acc + `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`, "");
    const fillD = `${d} L ${w} ${h} L 0 ${h} Z`;
    return { d, fillD, p };
  }, []);

  const STATUS_LIST = [
    { id: 'v_absolute_anchor', name: 'Absolute DNA Anchor v21.0', details: 'QUANTUM LOCK 100% CRYSTALLIZED' },
    { id: 'v_aesthetic_singularity', name: 'Aesthetic Maturity v21.0', details: 'ABSOLUTE PEAK REACHED' },
    { id: 'v_batch_11', name: 'Batch 11.0 Production Hub', details: 'ZENITH MASTER OPTIMAL SYNC' },
    { id: 'identity_singularity', name: 'Absolute Identity Singularity', details: 'MASTER CYCLE FINALIZED' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-16 space-y-20 animate-in fade-in duration-1000 h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
      <header className="space-y-8">
         <div className="flex items-center gap-5">
            <div className="h-2 w-20 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.7)]"></div>
            <span className="text-[12px] font-black uppercase tracking-[0.5em] text-amber-500">Báo Cáo Thẩm Mỹ v21.0</span>
         </div>
         <h2 className="text-7xl font-black text-white tracking-tighter italic uppercase leading-none">Absolute <span className="text-indigo-500 underline decoration-indigo-800 underline-offset-[16px]">Maturity</span></h2>
         <p className="text-slate-500 max-w-3xl text-[16px] font-medium leading-relaxed uppercase tracking-[0.3em] opacity-70 italic">Hệ thống sản xuất hợp nhất Batch 11.0 - Trạng thái trưởng thành Absolute Singularity v21.0 Master.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="bg-indigo-950/10 rounded-[4.5rem] p-16 shadow-[0_60px_150px_rgba(0,0,0,0.9)] border border-indigo-900/20 flex flex-col backdrop-blur-3xl" style={{ minHeight: '600px', width: '100%' }}>
             <div className="flex justify-between items-start mb-20">
                <div>
                  <h3 className="text-[14px] font-black text-slate-500 uppercase tracking-[0.6em] mb-3 italic">Đồng bộ hóa Absolute DNA Mikage</h3>
                  <p className="text-sm text-slate-600 font-medium italic">Độ nhất quán định danh Zenith v21.0 (Absolute Singularity reached).</p>
                </div>
                <div className="text-right">
                  <span className="text-8xl font-black text-amber-500 italic tracking-tighter shadow-amber-500/20">100<span className="text-2xl text-amber-600/50 ml-2">%</span></span>
                  <div className="text-[12px] text-green-500 font-black mt-4 tracking-widest uppercase flex items-center justify-end gap-3"><Sparkles size={16}/> ABSOLUTE ZENITH MASTER</div>
                </div>
             </div>
             
             <div className="w-full bg-black/60 rounded-[3.5rem] border border-white/5 flex items-center justify-center overflow-hidden shadow-inner p-10" style={{ height: '350px', position: 'relative' }}>
               {isMounted ? (
                 <svg width="900" height="350" viewBox="0 0 900 350" style={{ display: 'block', width: '100%' }} preserveAspectRatio="none">
                   <defs>
                     <linearGradient id="chGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" /><stop offset="100%" stopColor="#6366F1" stopOpacity="0" /></linearGradient>
                     <filter id="glow">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                     </filter>
                   </defs>
                   <path d={svgPathData.fillD} fill="url(#chGrad)" />
                   <path d={svgPathData.d} fill="none" stroke="#6366F1" strokeWidth="10" strokeLinecap="round" filter="url(#glow)" />
                   {svgPathData.p.map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="15" fill="#6366F1" className="animate-pulse" opacity="0.3" />
                        <circle cx={pt.x} cy={pt.y} r="8" fill="white" stroke="#6366F1" strokeWidth="5" />
                      </g>
                   ))}
                 </svg>
               ) : (
                 <div className="flex items-center justify-center h-full text-slate-800 font-mono text-[13px] animate-pulse uppercase tracking-[0.8em]">ĐANG ĐỒNG BỘ ABSOLUTE PEAK v21.0...</div>
               )}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
           <div className="bg-indigo-950/10 rounded-[4.5rem] p-14 shadow-[0_60px_150px_rgba(0,0,0,0.9)] border border-indigo-900/20 backdrop-blur-3xl">
              <h3 className="text-[14px] font-black text-slate-500 uppercase mb-14 tracking-[0.5em] flex items-center gap-5 border-b border-indigo-900/20 pb-10 italic"><Crown size={24} className="text-amber-500" /> Hồ Sơ Batch 11.0 + v21.0</h3>
              <div className="space-y-10">
                 {STATUS_LIST.map(asset => (
                   <div key={asset.id} className="flex items-center gap-8 group cursor-pointer p-4 hover:bg-white/5 rounded-[2.5rem] transition-all border border-transparent hover:border-indigo-900/50">
                      <div className="w-20 h-20 rounded-[30px] bg-indigo-950/40 flex items-center justify-center text-indigo-400 shadow-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-6"><ShieldCheck size={28} /></div>
                      <div className="flex-grow">
                         <p className="text-[14px] font-black text-white uppercase italic tracking-tighter">{asset.name}</p>
                         <p className="text-[11px] text-slate-600 font-bold uppercase italic mt-1.5 tracking-widest">{asset.details}</p>
                      </div>
                      <ChevronRight size={24} className="text-slate-800 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
           <button className="w-full py-12 bg-indigo-600 text-white rounded-[4rem] font-black text-[15px] flex items-center justify-center gap-8 shadow-[0_30px_80px_rgba(79,70,229,0.4)] hover:bg-indigo-700 hover:scale-[1.04] active:scale-95 transition-all uppercase italic tracking-[0.4em]">
              <Share2 size={24}/> Chốt Hạ Batch 11.0 Peak
           </button>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
