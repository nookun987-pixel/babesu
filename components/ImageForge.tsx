
import React, { useState, useReducer, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { AspectRatio } from '../types';
import { 
  Sparkles, Loader2, Upload, X, 
  Crown, Sword, Car, Aperture, Box, Disc, Skull, Ghost, 
  Zap, User, Cpu, Activity, Plane, Heart, ShieldCheck, Shield, Headphones
} from 'lucide-react';

const DATABASE = {
  SUBJECTS: [
    { id: 'empress', label: 'Nữ Hoàng (THE EMPRESS)', faction: 'FEMALE', icon: <Crown size={14}/>, dna: 'Regal, oriental goddess, ultimate voluptuous hour-glass figure, seductive S-curve v16.2' },
    { id: 'male_ronin', label: 'Lãng Khách Nam (MALE)', faction: 'MALE', icon: <User size={14}/>, dna: 'Lean muscular build, sharp masculine jawline, tech-samurai aesthetic, broad shoulders' },
    { id: 'cyber_assassin', label: 'Sát Thủ Hacker', faction: 'FEMALE', icon: <Cpu size={14}/>, dna: 'Tech-focused, masked, seductive techwear revealing curves, intense red neon peripherals' },
    { id: 'phantom', label: 'Bóng Ma', faction: 'FEMALE', icon: <Ghost size={14}/>, dna: 'Silent Assassin, Stealth Suit focus on silhouette, lethal seductive proportions' },
  ],
  WEAPONS: [
    { id: 'none', label: 'Tay không', dna: 'empty hands, expressive body language focus' },
    { id: 'dual_katana', label: 'Cặp Katana Hồng', dna: 'wielding two glowing pink energy katana blades, digital sparks' },
    { id: 'moonlight', label: 'Kiếm Thần Moonlight', dna: 'equipped with glowing crystalline moonlight energy sword, stardust' },
    { id: 'hacker_pads', label: 'Bàn phím Holo', dna: 'interacting with complex red floating holographic keyboards' },
  ],
  VEHICLES: [
    { id: 'none', label: 'Đi bộ', dna: 'standing pose' },
    { id: 'luxury_drive', label: 'Siêu Xe (Drive Pro)', dna: 'inside luxury car cockpit, red leather interior, high-tech dashboard' },
    { id: 'cyber_bike', label: 'Mô Tô 7367', dna: 'riding futuristic electric motorbike, neon wiring, high-speed' },
    { id: 'stealth_jet', label: 'Phi Thuyền Orbit', dna: 'piloting an orbital stealth jet, matte black hull' },
  ],
  WORLDS: [
    { id: 'neon_rain', label: 'Mưa Neon (Street)', dna: 'cyberpunk streets, heavy rain, colorful neon reflections on wet surfaces' },
    { id: 'hacker_room', label: 'Phòng Hacker (Red)', dna: 'dark hacker sanctuary, glowing red holographic monitors, intense data mood' },
    { id: 'luxury_interior', label: 'Nội thất Drive', dna: 'inside luxury car cockpit, red premium leather, glowing red dashboard displays' },
    { id: 'studio_noir', label: 'Studio Noir Max', dna: 'professional dark photography studio, extreme rim lighting focus on figure' },
  ]
};

const forgeInitialState = {
  subject: DATABASE.SUBJECTS[0],
  weapon: DATABASE.WEAPONS[0],
  vehicle: DATABASE.VEHICLES[0],
  world: DATABASE.WORLDS[0],
  prompt: '',
  isRendering: false,
  resultUrl: null,
  progress: 0,
  refImage: null,
  history: []
};

function forgeReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_SUBJECT': return { ...state, subject: action.payload };
    case 'SET_WEAPON': return { ...state, weapon: action.payload };
    case 'SET_VEHICLE': return { ...state, vehicle: action.payload };
    case 'SET_WORLD': return { ...state, world: action.payload };
    case 'SET_PROMPT': return { ...state, prompt: action.payload };
    case 'SET_REF': return { ...state, refImage: action.payload };
    case 'START_RENDER': return { ...state, isRendering: true, progress: 0 };
    case 'UPDATE_PROGRESS': return { ...state, progress: action.payload };
    case 'FINISH_RENDER': return { 
      ...state, isRendering: false, resultUrl: action.payload, progress: 100,
      history: action.payload ? [{url: action.payload, id: Date.now()}, ...state.history] : state.history
    };
    case 'LOAD_HISTORY': return { ...state, resultUrl: action.payload };
    default: return state;
  }
}

const ImageForge: React.FC = () => {
  const [state, dispatch] = useReducer(forgeReducer, forgeInitialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aspectRatio] = useState<AspectRatio>("16:9");

  useEffect(() => {
    const { subject, weapon, vehicle, world } = state;
    // Tham số hình thể Mastery v16.2
    const bodyAesthetic = subject.faction === 'MALE'
      ? "lean muscular athletic build, defined abs, sharp masculine facial features, broad shoulders, masculine aesthetic"
      : "ultimate voluptuous hour-glass figure, extremely large firm round breasts, deep cleavage, wide full hips, prominent buttocks, slender waist";
    
    const interaction = vehicle.id !== 'none' ? `${vehicle.dna}` : `Cinematic pose, equipped with ${weapon.dna}`;
    const p = `Masterpiece, highres, [MIKAGE_IDENTITY_SYNC] Mikage ${subject.dna}. ${bodyAesthetic}. Action: ${interaction}. Location: ${world.dna}. Style: Cinematic, raytracing, intricate technical details, 8k.`;
    dispatch({ type: 'SET_PROMPT', payload: p });
  }, [state.subject, state.weapon, state.vehicle, state.world]);

  const handleRender = async () => {
    if (state.isRendering) return;
    dispatch({ type: 'START_RENDER' });
    try {
      let prog = 0;
      const progressTimer = setInterval(() => {
        prog = Math.min(95, prog + 3);
        dispatch({ type: 'UPDATE_PROGRESS', payload: prog });
      }, 500);
      const result = await geminiService.generateImage(state.prompt, aspectRatio, state.refImage ? [state.refImage] : []);
      clearInterval(progressTimer);
      dispatch({ type: 'FINISH_RENDER', payload: result });
    } catch (err: any) {
      dispatch({ type: 'FINISH_RENDER', payload: null });
      alert(err.message || "Lỗi nạp ma trận.");
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl bg-[#08080a]">
      <div className="w-full lg:w-[450px] flex flex-col border-r border-white/5 shadow-2xl z-20 transition-colors duration-700 h-full overflow-hidden bg-[#0d0d12]">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h2 className="text-xl font-black text-indigo-500 tracking-tighter uppercase italic underline decoration-indigo-500/20 underline-offset-4">Lò Rèn Ma Trận</h2>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em]">Zenith Sync v16.2</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
             <Zap size={14} className="text-indigo-500"/>
             <span className="text-[9px] font-black text-indigo-500 uppercase">BATCH 7.2 SYNC</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <section>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block underline decoration-indigo-500/30 underline-offset-4 italic">Chọn Thực Thể (v16.2)</label>
            <div className="grid grid-cols-2 gap-3">
              {DATABASE.SUBJECTS.map((sub: any) => (
                <button key={sub.id} onClick={() => dispatch({ type: 'SET_SUBJECT', payload: sub })}
                  className={`p-4 rounded-xl border text-left transition-all h-24 flex flex-col justify-between
                  ${state.subject.id === sub.id ? 'bg-indigo-900/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white/5 border-transparent opacity-40 hover:opacity-100'}`}>
                  <div className="mb-2 text-indigo-500">{sub.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-tighter leading-tight">{sub.label}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
             <label className="text-[10px] font-black text-gray-400 uppercase mb-4 block underline decoration-indigo-500/30 underline-offset-4 flex items-center gap-2 italic">
                <Shield size={14}/> Trạng thái Hình thể (v16.2)
             </label>
             <div className="w-full bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 text-xs font-black text-indigo-500 text-center uppercase tracking-widest">
                {state.subject.faction === 'MALE' ? 'MUSCULAR DNA LOCKED' : 'S-CURVE v16.2 MASTERED'}
             </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
             <section className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase italic">Arsenal</label>
                <select value={state.weapon.id} onChange={(e) => dispatch({ type: 'SET_WEAPON', payload: DATABASE.WEAPONS.find(w => w.id === e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-[10px] font-bold text-white focus:border-indigo-500 outline-none cursor-pointer">
                  {DATABASE.WEAPONS.map(w => <option key={w.id} value={w.id}>{w.label}</option>)}
                </select>
             </section>
             <section className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase italic">Garage</label>
                <select value={state.vehicle.id} onChange={(e) => dispatch({ type: 'SET_VEHICLE', payload: DATABASE.VEHICLES.find(v => v.id === e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-[10px] font-bold text-white focus:border-indigo-500 outline-none cursor-pointer">
                  {DATABASE.VEHICLES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
                </select>
             </section>
          </div>

          <section>
             <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block italic">Khóa DNA</label>
             <div onClick={() => fileInputRef.current?.click()} className={`h-16 w-full rounded-xl border border-dashed flex items-center justify-center cursor-pointer transition-all gap-3
               ${state.refImage ? 'border-indigo-500/50 bg-indigo-900/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                {state.refImage ? (
                  <div className="flex items-center gap-4 px-4 w-full">
                    <img src={state.refImage} className="w-10 h-10 rounded object-cover border border-white/10" alt="Reference DNA" />
                    <span className="text-[9px] font-black text-white italic tracking-widest uppercase">DNA LOCKED</span>
                    <button onClick={(e) => {e.stopPropagation(); dispatch({type:'SET_REF', payload:null})}} className="ml-auto hover:text-red-500 text-slate-500"><X size={14}/></button>
                  </div>
                ) : <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[9px] opacity-40 italic"><Upload size={14}/> Tải lên khuôn mặt</div>}
             </div>
             <input type="file" hidden ref={fileInputRef} onChange={(e) => {
                if(e.target.files?.[0]) {
                  const r = new FileReader();
                  r.onload = (ev) => dispatch({ type: 'SET_REF', payload: ev.target?.result });
                  r.readAsDataURL(e.target.files[0]);
                }
             }}/>
          </section>
        </div>

        <div className="p-8 border-t border-white/5 bg-black/40">
          <button onClick={handleRender} disabled={state.isRendering}
            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 uppercase font-black text-xs tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl
            ${state.isRendering ? 'bg-zinc-800 text-slate-500 cursor-wait' : 'bg-indigo-600 text-white shadow-indigo-900/20'}`}>
            {state.isRendering ? <Loader2 size={16} className="animate-spin"/> : <Sparkles size={16}/>}
            <span>{state.isRendering ? `KẾT TINH... ${state.progress}%` : 'TẠO MẪU MIKAGE'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center p-12 overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br blur-[180px] transition-colors duration-1000 from-indigo-600 via-black to-slate-900"></div>
        <div className={`relative transition-all duration-1000 shadow-2xl border bg-black overflow-hidden group z-10 flex flex-col items-center justify-center
          ${state.resultUrl ? 'w-auto h-full max-h-[85vh] aspect-auto rounded-xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'w-[540px] h-[640px] rounded-[40px] border-dashed border-white/5'}`}>
          {state.resultUrl ? <img src={state.resultUrl} className="w-full h-full object-contain animate-in zoom-in duration-500" alt="Output Result" /> : (
            <div className="text-center space-y-6 opacity-20">
               <Aperture size={100} className="mx-auto animate-spin-slow text-indigo-900" />
               <p className="text-sm font-black uppercase tracking-[0.5em] italic text-white">Viewport Standby</p>
            </div>
          )}
        </div>
        {state.history.length > 0 && (
          <div className="absolute bottom-8 flex gap-4 p-5 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5 z-20 overflow-x-auto max-w-3xl scrollbar-hide shadow-2xl shadow-black/80">
             {state.history.map((h: any) => (
               <div key={h.id} onClick={() => dispatch({type: 'LOAD_HISTORY', payload: h.url})} className={`relative cursor-pointer w-16 h-16 rounded-2xl overflow-hidden border-2 flex-shrink-0 border-indigo-900 hover:border-indigo-400 transition-all hover:scale-111`}>
                   <img src={h.url} className="w-full h-full object-cover" alt="History Record" />
               </div>
             ))}
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100, 100, 100, 0.2); border-radius: 10px; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ImageForge;
