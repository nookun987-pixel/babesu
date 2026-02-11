
import React, { useState } from 'react';
import { 
  Film, 
  Clapperboard, 
  Music, 
  Camera, 
  Layers, 
  Zap, 
  Ghost, 
  Volume2, 
  Download,
  Plus,
  Trash2,
  PlayCircle,
  Sparkles,
  ShieldAlert,
  Sword,
  Bomb,
  Eye,
  Flame,
  Globe,
  Skull,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Target,
  MessageSquare,
  TrendingUp,
  Database,
  Cloud,
  Box,
  Activity,
  Loader2,
  Cpu
} from 'lucide-react';

const STORY_BEATS_LIBRARY = [
  {
    id: 'hook',
    type: 'Story',
    label: 'Khởi đầu Hư vô',
    prompt: 'A single blinking cursor on a black screen, transitioning into a fast stream of cyan digital code, "Beautiful Shadow" aesthetic, 8k.',
    sub: 'Màn hình đen với con trỏ nhấp nháy, mã code xanh chạy dọc như dòng chảy dữ liệu.',
    sound: 'Low frequency hum, server starting up sound.',
    camera: 'Static macro shot.',
    icon: <Eye size={14} />
  },
  {
    id: 'identity',
    type: 'Story',
    label: 'Hé lộ Azure Guardian',
    prompt: 'Extreme close-up of Mikage Gozen opening her eyes, glowing azure iris with scan lines, flawless ceramic skin, reflection of Neo-Kyoto in her eyes.',
    sub: 'Mikage mở mắt, đôi mắt xanh Azure phát sáng rực rỡ, phản chiếu cả thành phố Neo-Kyoto.',
    sound: 'Electronic chime, heart-beat synth pulse.',
    camera: 'Extreme close-up, shallow depth of field.',
    icon: <Ghost size={14} />
  },
  {
    id: 'world_build',
    type: 'Story',
    label: 'Thế giới Neo-Kyoto',
    prompt: 'Wide shot of Mikage standing on a skyscraper rooftop, red digital lanterns in the rain, Neo-Kyoto 2077 architecture, glass-encased temples.',
    sub: 'Mikage đứng trên đỉnh tòa nhà chọc trời, thành phố chìm trong mưa và ánh đèn lồng kỹ thuật số.',
    sound: 'Ambient rain, distant sirens, wind howling.',
    camera: 'Wide panoramic shot, slow zoom out.',
    icon: <Globe size={14} className="text-blue-400" />
  },
  {
    id: 'villain_shattered_past',
    type: 'Villain',
    label: 'Ký ức Bi kịch (Master)',
    prompt: 'Ultra-high fidelity cinematic flashback: A young child silhouette stands isolated in a vast field of razor-sharp obsidian glass shards under a blood-red moon. Each shard reflects a different burning memory of a fallen neon city. Towering corporate monolithic starships descend through thick, swirling crimson smoke, casting immense, oppressive shadows. Cinematic shallow depth of field, weeping ember particles, hyper-realistic textures, 8k resolution, IMAX scale.',
    sub: 'Hồi ức bi kịch tối thượng: Đứa trẻ đứng cô độc giữa cánh đồng kính đen vỡ vụn dưới ánh trăng máu. Mỗi mảnh gương phản chiếu một ký ức rực lửa về thành phố đã mất.',
    sound: 'Haunting solo cello melody in a minor key, layered with the rhythmic crackle of digital fire and distant starship booms.',
    camera: 'Extreme macro shot of a single tear hitting a digital mirror shard, transitioning to a wide overhead crane shot.',
    icon: <Skull size={14} className="text-red-400" />
  },
  {
    id: 'zenith_vfx_burst',
    type: 'Action',
    label: 'Xung kích Zenith',
    prompt: 'Zenith Overload: A violent radial explosion of pure azure plasma energy, physically shattering the digital sky into thousands of refractive, glowing glass-like fragments. Concentric gravity shockwaves tearing the fabric of reality, intense volumetric light shafts piercing through dense black smoke. Extreme cinematic bloom, high-density particle debris, 8k.',
    sub: 'Vụ nổ năng lượng Zenith Azure cực đại, xé toạc bầu trời kỹ thuật số thành hàng ngàn mảnh kính phản chiếu.',
    sound: 'Deafening energy discharge followed by a high-fidelity crystalline shattering sound effect and a deep sub-bass rumble.',
    camera: 'Low angle looking up, camera shake (handheld intensity), fast digital jitter effect.',
    icon: <Activity size={14} className="text-[#00f2ff]" />
  },
  {
    id: 'crimson_bleed',
    type: 'Villain',
    label: 'Data Bleed (Lỗi)',
    prompt: 'Void Corruption: The villain silhouette experiences violent frame-glitching, leaving trails of incandescent crimson data sparks and pixelated artifacts. The surrounding architecture physically tears and bleeds raw red light, reality melting into biomechanical industrial horror. High-energy glitch aesthetic, erratic lightning, 8k.',
    sub: 'Sự tha hóa của Hư vô: Kẻ phản diện chớp tắt dữ dội, để lại vệt tia lửa dữ liệu đỏ rực. Kiến trúc bị xé toạc và chảy máu ánh sáng đỏ.',
    sound: 'Dissonant stuttering digital glitch, heavy rhythmic industrial pounding, screeching data streams.',
    camera: 'Dynamic tracking shot with high motion blur and erratic focal shifts.',
    icon: <Zap size={14} className="text-red-600" />
  },
  {
    id: 'combat_clash',
    type: 'Action',
    label: 'Đối đầu trực diện',
    prompt: "Mikage's Azure Katana clashing with a Crimson energy blade, bright white sparks illuminating the dark street, rain drops evaporating on impact, intense motion blur.",
    sub: 'Lưỡi kiếm xanh và đỏ va chạm nảy lửa, tia sáng trắng lóe lên xé toạc màn đêm.',
    sound: 'High-pitched metal clash, energy discharge crackle.',
    camera: 'Dynamic mid-shot, fast camera shake.',
    icon: <Sword size={14} className="text-orange-500" />
  },
  {
    id: 'climax',
    type: 'Climax',
    label: 'Nện Trọng lực Cực đại',
    prompt: 'Mikage slamming a massive gravity axe into the ground, concentric shockwaves shattering the reality, pixels breaking, epic scale.',
    sub: 'Cú nện trọng lực cực mạnh làm vỡ vụn thực tại, dữ liệu tan biến xung quanh.',
    sound: 'Heavy bass drop, explosive shockwave, thunderous impact.',
    camera: 'Low angle, shaking handheld camera effect.',
    icon: <Flame size={14} className="text-purple-500" />
  },
  {
    id: 'resolution',
    type: 'Story',
    label: 'Sự tan biến bí ẩn',
    prompt: 'Mikage walking into the void, body dissolving into azure particles and glitch artifacts, final title card "PROJECT MIKAGE".',
    sub: 'Mikage tan biến vào hư không, cơ thể hóa thành các hạt dữ liệu xanh.',
    sound: 'Sudden silence, fading digital echo.',
    camera: 'Long shot, fading to black.',
    icon: <Layers size={14} />
  }
];

const TrailerArchitect: React.FC = () => {
  const [scenes, setScenes] = useState([STORY_BEATS_LIBRARY[0], STORY_BEATS_LIBRARY[1], STORY_BEATS_LIBRARY[3]]);
  const [trailerTitle, setTrailerTitle] = useState("THE AZURE SPIRIT");
  const [tone, setTone] = useState("Cinematic/Epic");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  const addScene = (beat: any) => {
    if (scenes.length < 8) {
      setScenes([...scenes, beat]);
    }
  };

  const removeScene = (index: number) => {
    setScenes(scenes.filter((_, i) => i !== index));
  };

  const moveScene = (index: number, direction: 'up' | 'down') => {
    const newScenes = [...scenes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < scenes.length) {
      [newScenes[index], newScenes[targetIndex]] = [newScenes[targetIndex], newScenes[index]];
      setScenes(newScenes);
    }
  };

  const handleAiSuggest = async () => {
    if (isSuggesting) return;
    setIsSuggesting(true);
    try {
      const context = scenes.map(s => s.label);
      const lastPrompt = scenes[scenes.length - 1]?.prompt || "";
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          userMessage: `Based on the following trailer context: ${context.join(', ')} and last prompt: "${lastPrompt}", suggest 3 creative next beat ideas for the trailer. Return as JSON array with format [{label: "...", prompt: "..."}]`
        })
      });

      if (!response.ok) {
        throw new Error('AI suggestion failed');
      }

      const data = await response.json();
      // Try to parse the response as JSON, or provide default suggestions
      try {
        const suggestions = JSON.parse(data.response);
        setAiSuggestions(Array.isArray(suggestions) ? suggestions : []);
      } catch {
        setAiSuggestions([]);
      }
    } catch (err) {
      console.error("AI Suggestion failed", err);
    } finally {
      setIsSuggesting(false);
    }
  };

  const exportScript = () => {
    const scriptText = scenes.map((s, i) => 
      `SCENE ${i + 1} [${s.type}]:\n- Prompt: ${s.prompt}\n- VietSub: ${s.sub}\n- Sound: ${s.sound}\n- Camera: ${s.camera}\n`
    ).join('\n---\n\n');
    const blob = new Blob([scriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mikage_trailer_script.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 font-sans selection:bg-[#00F0FF] selection:text-black rounded-[3rem] mt-10 shadow-2xl border border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT PANEL */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-[#00F0FF]/10 rounded-2xl border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Clapperboard className="text-[#00F0FF]" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter">Script <span className="text-[#00F0FF]">Architect</span></h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Zenith Core Master V2.7</p>
            </div>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 space-y-4 shadow-inner">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Tên Trailer</label>
              <input 
                type="text" 
                value={trailerTitle} 
                onChange={(e) => setTrailerTitle(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm font-bold text-[#00F0FF] outline-none focus:border-[#00F0FF]/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Âm hưởng (Tone)</label>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none text-slate-300"
              >
                <option>Cinematic/Epic</option>
                <option>Dark/Industrial (Phản diện)</option>
                <option>High-Octane Action</option>
                <option>Emotional/Melancholic</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
               <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                 <TrendingUp size={14} className="text-[#00F0FF]" /> Thư viện Phân cảnh
               </h3>
               <button 
                onClick={handleAiSuggest}
                disabled={isSuggesting}
                className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-[0_0_10px_rgba(99,102,241,0.2)]"
               >
                 {isSuggesting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                 Gợi ý AI
               </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {/* AI SUGGESTIONS SECTION */}
              {aiSuggestions.length > 0 && (
                <div className="mb-4 space-y-2">
                  <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest ml-2">Phân cảnh AI đề xuất</p>
                  {aiSuggestions.map((beat, idx) => (
                    <button 
                      key={`ai-${idx}`}
                      onClick={() => { addScene(beat); setAiSuggestions(prev => prev.filter((_, i) => i !== idx)); }}
                      className="group flex flex-col text-left p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 hover:border-indigo-400 transition-all w-full shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-black uppercase text-indigo-400 flex items-center gap-1">
                          <Cpu size={12} /> AI DRAFT
                        </span>
                        <Plus size={12} className="text-indigo-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-200">{beat.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {STORY_BEATS_LIBRARY.map((beat, idx) => (
                <button 
                  key={idx}
                  onClick={() => addScene(beat)}
                  disabled={scenes.length >= 8}
                  className={`group flex flex-col text-left p-4 rounded-2xl border transition-all disabled:opacity-30
                    ${beat.type === 'Villain' ? 'bg-red-950/20 border-red-500/20 hover:border-red-500/50' : 
                      beat.type === 'Action' ? 'bg-orange-950/20 border-orange-500/20 hover:border-orange-500/50' : 
                      'bg-slate-900/60 border-white/5 hover:border-[#00F0FF]/30'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1
                      ${beat.type === 'Villain' ? 'bg-red-500/20 text-red-400' : 
                        beat.type === 'Action' ? 'bg-orange-500/20 text-orange-400' : 
                        'bg-[#00F0FF]/10 text-[#00F0FF]'}`}>
                      {beat.icon} {beat.type}
                    </span>
                    <Plus size={12} className="text-slate-600 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">{beat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: STORYBOARD */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-end px-2">
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest">Trailer Storyboard</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">Chuỗi kịch tính ({scenes.length}/8 Slots)</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setScenes([])} className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                <RotateCcw size={14} /> Reset
              </button>
              <button onClick={exportScript} className="flex items-center gap-2 px-6 py-2.5 bg-[#00F0FF] text-black rounded-full text-[10px] font-black uppercase shadow-lg shadow-[#00F0FF]/20 hover:scale-105 transition-all">
                <Download size={14} /> Export Script
              </button>
            </div>
          </div>

          <div className="flex-1 bg-slate-900/20 rounded-[3rem] border border-white/5 p-8 space-y-6 overflow-y-auto max-h-[800px] custom-scrollbar shadow-inner">
            {scenes.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-4">
                <Film size={60} strokeWidth={1} className="opacity-10" />
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30">Timeline đang trống. Hãy thêm phân cảnh!</p>
              </div>
            )}
            
            {scenes.map((scene, idx) => (
              <div 
                key={idx} 
                className={`group relative border rounded-[2.5rem] p-8 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all animate-in slide-in-from-right-4 duration-500
                  ${scene.type === 'Villain' ? 'bg-red-950/10 border-red-500/20 hover:border-red-500/40' : 
                    scene.type === 'Action' ? 'bg-orange-950/10 border-orange-500/20 hover:border-orange-500/40' : 
                    'bg-slate-950 border-white/10 hover:border-[#00F0FF]/20'}`}
              >
                <div className={`absolute -left-3 top-8 w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-lg z-10
                  ${scene.type === 'Villain' ? 'bg-red-500 text-white shadow-red-500/20' : 
                    scene.type === 'Action' ? 'bg-orange-500 text-white shadow-orange-500/20' : 
                    'bg-[#00F0FF] text-black shadow-[#00F0FF]/20'}`}>
                  {idx + 1}
                </div>
                <div className="absolute right-8 top-8 flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveScene(idx, 'up')} disabled={idx === 0} className="text-slate-700 hover:text-[#00F0FF] disabled:opacity-10 transition-colors"><ChevronUp size={16} /></button>
                    <button onClick={() => moveScene(idx, 'down')} disabled={idx === scenes.length - 1} className="text-slate-700 hover:text-[#00F0FF] disabled:opacity-10 transition-colors"><ChevronDown size={16} /></button>
                  </div>
                  <button onClick={() => removeScene(idx)} className="text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${scene.type === 'Villain' ? 'text-red-400' : scene.type === 'Action' ? 'text-orange-400' : 'text-[#00F0FF]'}`}><Sparkles size={12} /> Visual Prompt (AI)</div>
                      <p className="text-sm font-medium text-slate-300 italic leading-relaxed">{scene.prompt}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-inner">
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2"><Layers size={12} /> Phụ đề (VietSub)</div>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">{scene.sub}</p>
                    </div>
                  </div>
                  <div className="md:col-span-5 space-y-6 border-l border-white/5 pl-0 md:pl-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3"><Volume2 size={16} className="text-slate-500" /><div><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Âm thanh</p><p className="text-[11px] font-bold text-slate-300 tracking-tight">{scene.sound}</p></div></div>
                      <div className="flex items-center gap-3"><Camera size={16} className="text-slate-500" /><div><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Góc máy</p><p className="text-[11px] font-bold text-slate-300 tracking-tight">{scene.camera}</p></div></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {scenes.length > 0 && scenes.length < 8 && (
              <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] h-24 flex items-center justify-center text-slate-700 uppercase text-[10px] font-black tracking-[0.5em] animate-pulse">
                Tiếp tục xây dựng kịch tính...
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00F0FF; }
      `}</style>
    </div>
  );
};

export default TrailerArchitect;
