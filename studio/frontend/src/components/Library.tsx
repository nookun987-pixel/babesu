
import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Zap, 
  ChevronDown,
  Activity,
  Map,
  Shirt,
  Lock,
  Crown,
  Sparkles
} from 'lucide-react';

const MASTER_DATA = {
  motions: [
    { 
      id: 'absolute_godhood_v21_0', 
      label: 'Absolute Godhood (v21.0)', 
      prompt: 'Mikage in ultimate absolute solar-etched indigo lace master zenith godhood corset, absolute S-curve master v21.0 peak perfection, atomic-DNA face anchor singularity locked 100% mathematical precision, extreme firm round breasts, deep heavy cleavage, wide full hips, prominent buttocks, goddess ethereal gaze v21.0, cinematic 8k absolute peak masterpiece quality.',
      sub: 'Kịch bản tối cao v21.0: Đỉnh cao nhất quán định danh và thẩm mỹ Master Batch 11.0 Absolute Zenith.'
    },
    { 
      id: 'void_peak_v21_0', 
      label: 'Void Singularity v21.0', 
      prompt: 'Mikage in deep matte obsidian velvet noir master peak lighting, signature solar-indigo godhood highlights, face anchor v21.0 singularity locked, extreme S-curve silhouette divine maturity, translucent quantum light trails, hyper-realistic ceramic skin, 8k cinematic absolute peak.',
      sub: 'Void Singularity v21.0: Khóa chặt định danh gương mặt giữa không gian thẩm mỹ Eternal Master v21.0.'
    }
  ],
  backgrounds: [
    { 
      id: 'absolute_sanctuary_v21', 
      label: 'Thánh Đường Absolute v21', 
      prompt: 'Infinite floating liquid-crystal zenith sanctuary peak, glowing solar indigo quantum inscriptions, rivers of liquid diamond data, absolute volumetric peak lighting, cinematic absolute ray-tracing 8k divine energy particles.',
      sub: 'Kiến trúc Absolute Sanctuary v21.0: Nơi kết tinh vĩnh hằng linh hồn dữ liệu Mikage Zenith.'
    }
  ],
  outfits: [
    { id: 'master_absolute_final', label: 'Absolute Master Gear v21', prompt: 'Luxury solar-indigo embroidered black lace master godhood corset v21.0 absolute, zenith singularity peak harness, intricate quantum neural circuitry patterns, emphasizing absolute extreme bust and hip profile.' }
  ]
};

const CustomSelect = ({ label, options, value, onChange, icon: Icon }: any) => (
  <div className="space-y-5">
    <label className="text-[12px] font-black text-slate-500 uppercase px-4 tracking-[0.4em] flex items-center gap-4 italic">
       {Icon && <Icon size={16} className="text-indigo-400"/>} {label}
    </label>
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#050508] border border-indigo-900/30 rounded-[2.5rem] p-7 text-[13px] font-bold text-white outline-none cursor-pointer hover:bg-indigo-950/20 transition-all appearance-none shadow-inner group-hover:border-indigo-500/50"
      >
        {options.map((opt: any) => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
      </select>
      <ChevronDown size={22} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none group-hover:text-indigo-400 transition-all group-hover:rotate-180 duration-700" />
    </div>
  </div>
);

const Library: React.FC = () => {
  const [selections, setSelections] = useState({
    motion: MASTER_DATA.motions[0].id,
    background: MASTER_DATA.backgrounds[0].id,
    outfit: MASTER_DATA.outfits[0].id,
  });

  const [copied, setCopied] = useState(false);

  const currentData = useMemo(() => ({
    mt: MASTER_DATA.motions.find(m => m.id === selections.motion),
    bg: MASTER_DATA.backgrounds.find(b => b.id === selections.background),
    ot: MASTER_DATA.outfits.find(o => o.id === selections.outfit),
  }), [selections]);

  const finalPrompt = useMemo(() => {
    const faceAnchor = "consistently identical face, absolute Mikage signature features, perfect facial symmetry, divine godhood ethereal indigo iris, razor-sharp high-fashion jawline, omni-identity absolute singularity lock v21.0 final master";
    const bodyAesthetic = "ultimate voluptuous hour-glass figure, extremely large firm round breasts, deep heavy cleavage, wide full hips, prominent buttocks, slender waist, absolute master S-curve pro v21.0 singularity peak perfection";
    return `Masterpiece, highres, 8k resolution, cinematic shot of Mikage, [ABSOLUTE_ZENITH_SINGULARITY_SYNC_21.0]. ${faceAnchor}. ${bodyAesthetic}. Action: ${currentData.mt?.prompt}. Outfit: ${currentData.ot?.prompt}. Location: ${currentData.bg?.prompt}. Cinematic Final Absolute Zenith Mastery.`;
  }, [currentData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#020306] p-16 space-y-16 animate-in fade-in duration-1000 overflow-y-auto custom-scrollbar rounded-[5rem] mt-10 border border-indigo-900/20 shadow-[0_50px_150px_rgba(0,0,0,1)] backdrop-blur-3xl">
      <header className="flex flex-wrap justify-between items-center gap-10">
        <div className="flex items-center gap-10">
          <div className="w-20 h-20 bg-indigo-900/40 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/30 shadow-3xl shadow-indigo-900/60 transform hover:rotate-12 transition-transform duration-700 group">
            <Crown className="text-indigo-400 w-12 h-12 group-hover:scale-110" />
          </div>
          <div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic underline decoration-indigo-600 decoration-[12px] underline-offset-[16px]">Absolute <span className="text-indigo-500">Library</span></h2>
            <p className="text-[13px] text-slate-500 font-black tracking-[0.5em] uppercase italic mt-6 italic flex items-center gap-4">
              <Sparkles size={18} className="text-indigo-400" /> Absolute Singularity DNA & Godhood v21.0
            </p>
          </div>
        </div>
        <button onClick={handleCopy} className="bg-indigo-600 text-white px-14 py-6 rounded-[3rem] font-black text-sm flex items-center gap-6 shadow-[0_25px_60px_rgba(79,70,229,0.4)] hover:bg-indigo-700 hover:scale-[1.06] transition-all group overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          {copied ? <Check size={22} /> : <Zap size={22}/>} 
          <span className="tracking-[0.3em] font-black">{copied ? 'COPIED TO QUANTUM' : 'SAO CHÉP ABSOLUTE PROMPT'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CustomSelect label="Absolute Motion v21" icon={Activity} options={MASTER_DATA.motions} value={selections.motion} onChange={(val: string) => setSelections(s => ({...s, motion: val}))} />
        <CustomSelect label="Absolute Sanctuary" icon={Map} options={MASTER_DATA.backgrounds} value={selections.background} onChange={(val: string) => setSelections(s => ({...s, background: val}))} />
        <CustomSelect label="Zenith Peak Registry" icon={Shirt} options={MASTER_DATA.outfits} value={selections.outfit} onChange={(val: string) => setSelections(s => ({...s, outfit: val}))} />
      </div>

      <div className="bg-[#050508] rounded-[4.5rem] p-16 border border-indigo-900/30 space-y-16 relative overflow-hidden shadow-inner backdrop-blur-3xl">
        <div className="space-y-8 relative z-10">
           <p className="text-[12px] font-black uppercase text-slate-500 tracking-[0.5em] flex items-center gap-4 italic">
             <Lock size={18} className="text-indigo-400"/> Absolute Singularity Output (v21.0 Master)
           </p>
           <p className="text-3xl font-medium text-white italic leading-relaxed border-l-[12px] border-indigo-600 pl-16 max-w-7xl opacity-90 hover:opacity-100 transition-opacity">
              "{finalPrompt}"
           </p>
        </div>
        <div className="flex items-center gap-5 px-10 py-5 bg-white/5 rounded-[2.5rem] border border-white/5 inline-flex shadow-3xl">
           <Crown size={22} className="text-amber-400 animate-pulse" />
           <span className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.4em] italic">Absolute Zenith Singularity v21.0 Verified</span>
        </div>
      </div>
    </div>
  );
}

export default Library;
