
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Film, Play, Sparkles, AlertCircle, Download, Upload, Monitor, Settings, Clock, Layers, Plus, Trash2, Fingerprint } from 'lucide-react';

const VeoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('Mikage moving gracefully through a digital rainstorm, azure trails following her motions.');
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [resolution, setResolution] = useState<"720p" | "1080p">("720p");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && referenceImages.length < 3) {
      const reader = new FileReader();
      reader.onload = (event) => setReferenceImages(prev => [...prev, event.target?.result as string]);
      reader.readAsDataURL(file);
    }
  };

  const removeReference = (idx: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage("Kết nối Veo 3.1 Multi-Ref Engine...");

    try {
  setStatusMessage("Generating...");

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      aspectRatio,
      resolution,
      referenceImages
    })
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  const data = await res.json();

  setVideoUrl(data.videoUrl);
  setStatusMessage("Done");
} catch (err) {
  console.error(err);
  setStatusMessage("Failed");
}

  };

  return (
    <div className="py-10 space-y-12 animate-in fade-in duration-700">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 mb-6 italic tracking-tight flex items-center gap-4">
          <Film className="text-indigo-600 w-10 h-10" />
          Veo Multi-Ref Studio
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          Tạo phim nhất quán bằng cách nạp tối đa 3 tài liệu tham chiếu (Ví dụ: 1 ảnh khuôn mặt, 1 ảnh trang phục, 1 ảnh bối cảnh). AI sẽ kết hợp chúng vào một cảnh quay duy nhất.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">
            <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] flex items-center gap-2">
              <Settings className="w-4 h-4" /> Production Config
            </h3>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kịch bản chuyển động</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 min-h-[120px] resize-none"
                placeholder="Ví dụ: Mikage tung đòn kiếm sấm sét..."
              />
            </div>

            {/* REFERENCE DECK */}
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Fingerprint size={12} className="text-indigo-600" /> Reference Deck ({referenceImages.length}/3)
                 </label>
                 {referenceImages.length < 3 && (
                   <button onClick={() => fileInputRef.current?.click()} className="text-indigo-600 hover:text-indigo-400 p-1">
                     <Plus size={18} />
                   </button>
                 )}
               </div>
               <div className="grid grid-cols-3 gap-2">
                 {referenceImages.map((img, i) => (
                   <div key={i} className="aspect-square bg-slate-100 rounded-xl relative group overflow-hidden border border-slate-200 shadow-sm">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => removeReference(i)} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white">
                        <Trash2 size={16} />
                      </button>
                   </div>
                 ))}
                 {referenceImages.length === 0 && (
                   <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="col-span-3 py-6 text-center text-[10px] font-bold text-slate-300 border-2 border-dashed rounded-xl cursor-pointer hover:border-indigo-300 transition-colors"
                   >
                     CHƯA CÓ ẢNH MẪU
                   </div>
                 )}
               </div>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ratio</label>
                <div className="flex gap-1">
                  {["16:9", "9:16"].map(ratio => (
                    <button key={ratio} onClick={() => setAspectRatio(ratio as any)} className={`flex-1 py-3 text-[9px] font-black rounded-xl border ${aspectRatio === ratio ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-500'}`}>{ratio}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Res</label>
                <div className="flex gap-1">
                   {["720p", "1080p"].map(res => (
                    <button key={res} onClick={() => setResolution(res as any)} className={`flex-1 py-3 text-[9px] font-black rounded-xl border ${resolution === res ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-500'}`}>{res}</button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${isGenerating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {isGenerating ? <Clock className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? 'ĐANG KẾT XUẤT...' : 'GENERATE MULTI-REF VIDEO'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-slate-900 rounded-[3.5rem] p-1 shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${isGenerating ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] italic">VEO Output Terminal // MULTI-REFERENCE MODE</h3>
              </div>
              {videoUrl && (
                <a href={videoUrl} download className="bg-white text-slate-900 px-6 py-2.5 rounded-full text-[10px] font-black flex items-center gap-2 hover:bg-slate-200 transition-all shadow-lg">
                  <Download size={14} /> DOWNLOAD MP4
                </a>
              )}
            </div>

            <div className="flex-1 relative flex items-center justify-center bg-black min-h-[500px]">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className={`max-h-[600px] w-full object-contain ${aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}`} />
              ) : isGenerating ? (
                <div className="text-center space-y-8 max-w-sm px-10">
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full animate-spin" />
                    <div className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center"><Monitor className="text-indigo-500 w-8 h-8" /></div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white font-black text-[10px] uppercase tracking-widest">{statusMessage}</p>
                    <div className="bg-white/5 h-1 w-full rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${Math.min(98, (timer / 180) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center space-y-4 p-10">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                  <p className="text-white text-xs font-bold max-w-md">{error}</p>
                </div>
              ) : (
                <div className="text-center opacity-20">
                  <Play className="w-24 h-24 text-white mx-auto mb-6" strokeWidth={1} />
                  <p className="text-white font-black uppercase tracking-widest text-xs">Waiting for sequence trigger</p>
                </div>
              )}
              
              {/* Scanline decoration */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeoStudio;
