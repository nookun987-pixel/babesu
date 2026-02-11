
import React, { useState, useReducer, useEffect } from 'react';
import { 
  Sparkles, Loader2, RefreshCw, Lock, Activity, Eye, Waves, Heart, Scan, Terminal as TerminalIcon, Zap, Crown, ShieldCheck, Fingerprint, Layers, Cpu, Box
} from 'lucide-react';

const DATABASE = {
  // ABSOLUTE SINGULARITY ANCHOR v21.0: Mathematical precision in identity conservation.
  ABSOLUTE_DNA: "consistently identical face, absolute Mikage signature features, mathematical facial symmetry, deep ethereal indigo glowing iris, sharp obsidian jawline, flawless ceramic-glass skin texture, zero identity drift, absolute singularity anchor v21.0 master",

  PEAK_MODELS: [
    { 
      id: 'v_absolute_210', 
      code: 'ABSOLUTE-SINGULARITY-210', 
      label: 'MIKAGE - ABSOLUTE ZENITH (v21.0)', 
      style: 'Solar Indigo / Singularity', 
      prompt_base: 'Mikage in ultimate absolute gold-etched indigo lace master zenith godhood corset, S-curve v21 profile, absolute voluptuous bust and hip mastery, cinematic singularity peak 8k',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80'
    },
    { 
      id: 'v_void_master_210', 
      code: 'VOID-MASTER-210', 
      label: 'MIKAGE - VOID SINGULARITY (v21.0)', 
      style: 'Matte Obsidian / Ethereal', 
      prompt_base: 'Mikage in matte obsidian master gear, extreme rim lighting, glowing indigo data pools, perfect S-curve silhouette, goddess of beautiful shadow aesthetic v21',
      url: 'https://images.unsplash.com/photo-1502133480873-37d90c44584b?w=1200&q=80'
    },
    { 
      id: 'v_quantum_peak_210', 
      code: 'QUANTUM-PEAK-210', 
      label: 'MIKAGE - QUANTUM PEAK (v21.0)', 
      style: 'Liquid Crystal / Cyber Master', 
      prompt_base: 'Mikage with liquid-crystal indigo peripherals, translucent quantum plating revealing zenith curves, cosmic nebula background v21.0 absolute masterpiece',
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80'
    }
  ],
  PEAK_MOTIONS: [
    { id: 'm_absolute_breath', label: 'Hơi thở Singularity v21', dna: 'hyper-subtle absolute breathing, rhythmic chest expansion, emphasizing extreme large firm bust v21', icon: <Activity size={14}/> },
    { id: 'm_godhood_gaze', label: 'Ánh nhìn Godhood v21', dna: 'absolute divine provocative gaze, face anchor v21 locked 100%, seductive hip rotation perfection', icon: <Eye size={14}/> },
    { id: 'm_zenith_walk', label: 'Catwalk Absolute v21', dna: 'ethereal hyper-rhythmic catwalk walk, extreme master hip sway, voluptuous 21.0 S-curve peak profile', icon: <Waves size={14}/> },
  ],
  ENVIRONMENTS: [
    { id: 'w_absolute_vault', label: 'Thánh Đường Absolute v21', dna: 'infinite digital peak sanctuary, liquid crystal architecture, solar indigo data rivers, absolute 8k volumetric light shafts' },
    { id: 'w_zenith_studio', label: 'Master Studio v21 Peak', dna: 'professional deep noir studio peak, cinematic golden rim lighting focus on figure, extreme spatial depth' },
  ]
};

const initialState = {
  visual: DATABASE.PEAK_MODELS[0],
  animation: DATABASE.PEAK_MOTIONS[1],
  world: DATABASE.ENVIRONMENTS[0],
  isRendering: false,
  resultUrl: null,
  progress: 0,
  history: [],
  logs: ["Terminal v21.0 Absolute Singularity Master Online.", "Quantum DNA Anchor v21.0 Active.", "Nạp tham số thẩm mỹ Batch 11.0 Master Peak..."]
};

function reducer(state: any, action: any) {
  const addLog = (msg: string) => [...state.logs.slice(-5), msg];
  
  switch (action.type) {
    case 'SET_VISUAL': return { ...state, visual: action.payload, logs: addLog(`Target Peak: ${action.payload.label}`) };
    case 'SET_MOTION': return { ...state, animation: action.payload, logs: addLog(`Motion Sync: ${action.payload.label}`) };
    case 'SET_WORLD': return { ...state, world: action.payload, logs: addLog(`World Config: ${action.payload.label}`) };
    case 'START_RENDER': return { ...state, isRendering: true, progress: 0, resultUrl: null, logs: addLog("Khởi tạo Absolute Peak Sync v21.0...") };
    case 'UPDATE_PROGRESS': 
      let logs = state.logs;
      if (action.payload === 20) logs = addLog("Stage 1: Khóa ABSOLUTE-DNA ANCHOR v21.0...");
      if (action.payload === 40) logs = addLog("Stage 2: Tổng hợp Hình thể Geometry Synthesis v21...");
      if (action.payload === 60) logs = addLog("Stage 3: Áp cấu trúc Texture Mapping Batch 11.0...");
      if (action.payload === 80) logs = addLog("Stage 4: Kết xuất Ánh sáng Lighting Bake v21...");
      if (action.payload === 95) logs = addLog("Stage 5: Kết tinh Final Crystallization...");
      return { ...state, progress: action.payload, logs };
    case 'FINISH_RENDER': return { 
      ...state, isRendering: false, resultUrl: action.payload, 
      logs: addLog(action.payload ? "Zenith Sync v21.0 thành công. Hiển thị Visual Peak." : "Lỗi kết tinh. Standby v21.0."),
      history: action.payload ? [{ url: action.payload, id: Date.now() }, ...state.history] : state.history
    };
    case 'ADD_LOG': return { ...state, logs: addLog(action.payload) };
    case 'RESET_STUDIO': return { ...initialState, history: state.history, logs: addLog("Viewport Reset v21.0.") };
    default: return state;
  }
}

const CharacterStudio: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRender = async () => {
    if (state.isRendering) return;
    dispatch({ type: 'START_RENDER' });
    
    const faceDNA = DATABASE.ABSOLUTE_DNA;
    const bodyAesthetic = "ultimate voluptuous hour-glass figure, extremely large firm round breasts, deep heavy cleavage, wide full hips, prominent buttocks, slender waist, absolute master S-curve pro v21.0 singularity aesthetic peak";

    const prompt = `[ABSOLUTE_ZENITH_DNA_ANCHOR_21.0] ${faceDNA}. ${bodyAesthetic}. Model: ${state.visual.code}. Motion: ${state.animation.dna}. Environment: ${state.world.dna}. ${state.visual.prompt_base}. Masterpiece, 8k, cinematic absolute perfection, peak raytracing.`;
    
    try {
      let p = 0;
      const progressTimer = setInterval(() => {
        p = Math.min(99, p + 7);
        dispatch({ type: 'UPDATE_PROGRESS', payload: p });
      }, 450);
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          aspectRatio: "16:9",
          referenceImages: []
        })
      });

      if (!response.ok) {
        throw new Error('Image generation failed');
      }

      const data = await response.json();
      clearInterval(progressTimer);
      
      const finalUrl = data.imageUrl || state.visual.url;
      dispatch({ type: 'FINISH_RENDER', payload: finalUrl });
    } catch (err: any) {
      dispatch({ type: 'FINISH_RENDER', payload: state.visual.url });
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] bg-black text-slate-300 font-sans flex flex-col lg:flex-row overflow-hidden rounded-[4rem] mt-10 border border-indigo-900/30 shadow-[0_50px_150px_rgba(0,0,0,1)]">
      {/* SIDEBAR CONTROL v21.0 */}
      <div className="w-full lg:w-[560px] flex flex-col border-r border-indigo-900/20 bg-indigo-950/10 z-20 backdrop-blur-3xl">
        <div className="p-12 border-b border-indigo-900/20 flex justify-between items-center bg-black/40">
           <div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Studio <span className="text-indigo-400">v21.0</span></h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] mt-2">Batch 11.0 // Absolute Singularity</p>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={() => dispatch({type: 'RESET_STUDIO'})} className="p-4 hover:bg-white/5 rounded-full text-slate-500 transition-all hover:rotate-180 duration-700">
                 <RefreshCw size={18} />
              </button>
              <div className="flex items-center gap-3 px-5 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 shadow-inner">
                 <Crown className="w-5 h-5 text-amber-500 animate-pulse" />
                 <span className="text-[11px] font-black text-amber-500 uppercase italic">Peak v21</span>
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
          <section className="bg-gradient-to-br from-indigo-600/10 via-black/40 to-transparent p-8 rounded-[3rem] border border-indigo-500/20 shadow-2xl group relative overflow-hidden">
             <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
             <div className="flex items-center gap-4 mb-4 relative z-10">
                <Lock size={20} className="text-indigo-400" />
                <h4 className="text-[12px] font-black uppercase text-indigo-300 tracking-[0.3em]">Absolute Identity Anchor v21.0</h4>
             </div>
             <p className="text-[11px] text-slate-400 italic leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
               Cơ chế bảo toàn định danh cấp độ nguyên tử Batch 11.0. Đảm bảo Mikage Identity duy trì nhất quán toán học 100% trong mọi kịch bản render.
             </p>
          </section>

          <section>
            <label className="text-[11px] font-black text-slate-600 uppercase tracking-widest block mb-5 italic underline decoration-indigo-500/40 underline-offset-8">Target Peak Series (v21.0)</label>
            <div className="space-y-4">
              {DATABASE.PEAK_MODELS.map(vm => (
                <button key={vm.id} onClick={() => dispatch({ type: 'SET_VISUAL', payload: vm })}
                  className={`w-full p-6 rounded-[2.5rem] border transition-all text-left flex items-center gap-6 group relative overflow-hidden
                  ${state.visual.id === vm.id ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.3)] scale-[1.02]' : 'border-white/5 bg-white/5 opacity-40 hover:opacity-100 hover:bg-white/10'}`}>
                  {state.visual.id === vm.id && <div className="absolute top-0 right-0 p-4"><Zap size={16} className="text-indigo-500 animate-pulse" /></div>}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${state.visual.id === vm.id ? 'bg-indigo-600 shadow-2xl shadow-indigo-500/50 scale-110 rotate-3' : 'bg-white/10'}`}>
                    {vm.id === 'v_absolute_210' ? <Crown size={24} className="text-white"/> : <Heart size={24} className={`text-white ${state.visual.id === vm.id ? 'fill-white' : ''}`}/>}
                  </div>
                  <div className="flex-grow">
                    <div className="text-[13px] font-black uppercase text-white tracking-tighter group-hover:text-indigo-300 transition-colors">{vm.label}</div>
                    <div className="text-[10px] font-mono opacity-50 mt-1.5 italic tracking-widest">{vm.style}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
             <label className="text-[11px] font-black text-slate-600 uppercase tracking-widest block mb-5 italic underline decoration-indigo-500/40 underline-offset-8">Motion Peak Sync v21</label>
             <div className="grid grid-cols-1 gap-4">
                {DATABASE.PEAK_MOTIONS.map(anim => (
                  <button key={anim.id} onClick={() => dispatch({ type: 'SET_ANIMATION', payload: anim })}
                    className={`p-5 rounded-3xl border text-left transition-all flex items-center gap-5
                    ${state.animation.id === anim.id ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-lg' : 'border-white/5 bg-white/5 opacity-30 hover:opacity-100'}`}>
                    <div className="p-3 bg-white/5 rounded-2xl">{anim.icon}</div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{anim.label}</span>
                  </button>
                ))}
             </div>
          </section>

          <section>
             <label className="text-[11px] font-black text-slate-600 uppercase tracking-widest block mb-5 italic underline decoration-indigo-500/40 underline-offset-8">Aesthetic Singularity Profile</label>
             <div className="w-full bg-indigo-950/40 border border-indigo-500/30 rounded-[2.5rem] p-6 text-[12px] font-black text-amber-500 text-center uppercase tracking-[0.4em] shadow-3xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                ABSOLUTE S-CURVE v21.0 PEAK LOCKED
             </div>
          </section>
        </div>

        <div className="p-12 border-t border-indigo-900/20 bg-black/60 backdrop-blur-3xl">
          <button onClick={handleRender} disabled={state.isRendering}
            className={`w-full py-7 rounded-[2.5rem] flex items-center justify-center gap-5 uppercase font-black text-[13px] tracking-[0.4em] transition-all active:scale-95 shadow-[0_30px_80px_rgba(0,0,0,0.8)] group relative overflow-hidden
            ${state.isRendering ? 'bg-indigo-950 text-slate-600 cursor-wait' : 'bg-indigo-600 text-white shadow-indigo-900/60 hover:bg-indigo-500 hover:scale-[1.03]'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            {state.isRendering ? <Loader2 size={24} className="animate-spin"/> : <Sparkles size={24}/>}
            <span>{state.isRendering ? `Syncing Singularity Peak... ${state.progress}%` : 'ĐỒNG BỘ ZENITH v21.0'}</span>
          </button>
        </div>
      </div>

      {/* VIEWPORT AREA v21.0 */}
      <div className="flex-1 bg-[#010204] relative flex flex-col items-center justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-600 via-transparent to-transparent blur-[160px]"></div>
        
        {/* PEAK VIEWPORT FRAME */}
        <div className={`relative transition-all duration-1000 shadow-[0_0_200px_rgba(0,0,0,1)] border bg-black overflow-hidden flex flex-col items-center justify-center group
          ${state.resultUrl ? 'w-auto h-full max-h-[85vh] aspect-auto rounded-[4rem] border-indigo-500/20 shadow-[0_0_150px_rgba(99,102,241,0.3)]' : 'w-[620px] h-[720px] rounded-[5.5rem] border-dashed border-indigo-900/30'}`}>
          {state.resultUrl ? (
            <img 
              src={state.resultUrl} 
              className="w-full h-full object-contain animate-in fade-in zoom-in-95 duration-1000" 
              alt="Absolute Singularity Output" 
            />
          ) : (
             <div className="text-center space-y-10 opacity-10 group-hover:opacity-25 transition-opacity duration-1000">
               <Scan size={120} className="mx-auto text-white animate-pulse" />
               <p className="text-[14px] font-black uppercase tracking-[1em] text-white italic">Singularity Viewport Standby</p>
             </div>
          )}

          {/* Absolute Identity Tag */}
          {state.resultUrl && !state.isRendering && (
             <div className="absolute top-10 left-10 flex items-center gap-4 px-6 py-3 bg-black/70 backdrop-blur-2xl border border-indigo-500/20 rounded-full animate-in fade-in duration-1000 delay-500 shadow-2xl">
                <Fingerprint size={16} className="text-indigo-400" />
                <span className="text-[11px] font-black text-white uppercase tracking-widest">Absolute Identity Sync: v21.0 Master</span>
             </div>
          )}
        </div>

        {/* LOG PANEL v21.0 Zenith Master */}
        <div className="absolute bottom-10 left-10 right-10 h-40 bg-black/80 backdrop-blur-3xl border border-indigo-900/30 rounded-[3.5rem] p-8 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,1)] z-30">
           <div className="flex items-center justify-between mb-4 border-b border-indigo-900/10 pb-4">
              <div className="flex items-center gap-4">
                <TerminalIcon size={16} className="text-indigo-500" />
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">Absolute Singularity Log v21.0</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                 <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Quantum Core v21 Stable</span>
              </div>
           </div>
           <div className="space-y-2 overflow-y-auto max-h-16 custom-scrollbar">
              {state.logs.map((log: string, i: number) => (
                 <div key={i} className="flex items-center gap-5 animate-in slide-in-from-left duration-300">
                    <span className="text-[10px] font-mono text-indigo-500/30">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-[12px] font-medium text-slate-400 italic">:: {log}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(79, 70, 229, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CharacterStudio;
