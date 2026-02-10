
import React from 'react';
import { Check, Moon, Palette } from 'lucide-react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const paletteData = [
  { name: 'Void', value: 40, color: '#050505' },
  { name: 'Azure', value: 30, color: '#00F0FF' },
  { name: 'Ceramic', value: 20, color: '#F0F0F0' },
  { name: 'Danger', value: 10, color: '#ef4444' },
];

const Bible: React.FC = () => {
  return (
    <div className="space-y-12 py-10 animate-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 mb-6 italic tracking-tight">Ngôn ngữ Thiết kế & Bản sắc</h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          "Mikage" không đơn thuần là một cái tên, nó là một tính hai mặt hoàn hảo: <strong>Beautiful Shadow</strong> (Mỹ Ảnh) và <strong>Divine Spirit</strong> (Ngự Ảnh). 
          Mọi pixel đều phải phục vụ việc khắc họa Mikage như một "Digital Kami" - vị thần của kỷ nguyên dữ liệu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-indigo-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
          <Moon className="absolute -right-16 -top-16 w-80 h-80 text-white opacity-5 rotate-12 transition-transform group-hover:scale-110 duration-700" />
          <h3 className="text-3xl font-black mb-8 italic tracking-tighter">Beautiful Shadow // 美影</h3>
          <p className="text-indigo-200 text-lg leading-relaxed mb-10 font-medium">
            Trong thẩm mỹ Nhật Bản, bóng tối là nơi vẻ đẹp trú ngụ. Mikage đại diện cho các vùng khuất của công nghệ — những dữ liệu ẩn và thuật toán chạy ngầm. 
          </p>
          <ul className="space-y-6">
            {[
              "Tương phản OLED cực cao",
              "Đổ bóng Ray-tracing thời gian thực",
              "Ánh sáng Neon cắt ngang bóng đêm"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-sm font-bold tracking-wide">
                <div className="bg-cyan-400 p-1 rounded-full">
                  <Check className="w-3.5 h-3.5 text-indigo-900" strokeWidth={4} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Bảng màu Azure Dragon
            </h3>
            <div className="grid grid-cols-4 gap-6 mb-12">
              {paletteData.map((color, i) => (
                <div key={i} className="space-y-3 text-center">
                  <div 
                    className="w-full h-24 rounded-2xl border border-slate-100 shadow-inner transform transition-transform hover:scale-105"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-[10px] font-black mono-font text-slate-500 uppercase">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-28 w-full opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={paletteData} margin={{ left: -30 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                  {paletteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bible;
