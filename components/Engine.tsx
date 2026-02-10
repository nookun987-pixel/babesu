
import React from 'react';
import { Cpu, Layers, Ghost, Box, Zap } from 'lucide-react';

const Engine: React.FC = () => {
  return (
    <div className="space-y-12 py-10">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 mb-6 italic tracking-tight">Kiến trúc Mikage Engine</h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          Đây là bản đồ kỹ thuật dành cho các kỹ sư lập trình. Để đạt được hiệu ứng đồ họa như mong muốn, DOM truyền thống là không đủ. Chúng ta cần triển khai mô hình <strong>Sandwich Architecture</strong> kết hợp giữa GPU Render (WebGL) và UI Layer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {[
            { icon: Cpu, label: 'Core Framework', tech: 'React 18/19 Concurrent', color: 'text-blue-500' },
            { icon: Box, label: '3D Visuals', tech: 'React Three Fiber', color: 'text-indigo-500' },
            { icon: Zap, label: 'Shaders', tech: 'Postprocessing Pipeline', color: 'text-amber-500' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <item.icon className={`${item.color} w-6 h-6`} />
                <span className="text-sm font-black uppercase tracking-tight">{item.label}</span>
              </div>
              <p className="text-[11px] text-slate-500 mono-font font-bold">{item.tech}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-10">
            <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.4em] flex items-center gap-3">
              <Layers className="w-5 h-5" />
              Mô hình Sandwich Architecture
            </h3>
            
            <div className="space-y-6">
              <div className="bg-indigo-50 p-8 rounded-3xl border-l-8 border-indigo-600 shadow-inner group">
                <h4 className="font-black text-indigo-900 mb-2 uppercase tracking-tight text-lg">Top Layer: HTML Overlay</h4>
                <p className="text-sm text-indigo-700 font-medium">Chứa Menu, HUD, Buttons và các thông báo UI truyền thống được tối ưu hóa khả năng truy cập.</p>
              </div>
              
              <div className="bg-slate-50 p-14 rounded-3xl border-l-8 border-slate-900 shadow-inner flex items-center justify-center border border-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="grid grid-cols-10 gap-2 h-full">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="h-full border-r border-slate-900"></div>
                    ))}
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <Ghost className="w-16 h-16 text-slate-300 mx-auto mb-6 animate-bounce" />
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-xl">Middle Layer: Mikage Entity</h4>
                  <p className="text-xs text-slate-500 italic font-bold">Nhân vật 3D tương tác & Custom Shader da gốm sứ Ray-traced.</p>
                </div>
              </div>

              <div className="bg-emerald-50 p-8 rounded-3xl border-l-8 border-emerald-600 shadow-inner">
                <h4 className="font-black text-emerald-900 mb-2 uppercase tracking-tight text-lg">Bottom Layer: R3F Canvas</h4>
                <p className="text-sm text-emerald-700 font-medium">Môi trường 3D hoàn chỉnh, Hệ thống Hạt (Particles), Volumetric Fog & Bloom.</p>
              </div>
            </div>
          </div>
          <Layers className="absolute -right-32 -bottom-32 w-[35rem] h-[35rem] text-slate-100 opacity-20 pointer-events-none rotate-12" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};

export default Engine;
