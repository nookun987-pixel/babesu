
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell
} from 'recharts';
import { COLORS } from '../constants';

const consistencyData = [
  { name: 'Slot 1', value: 88 },
  { name: 'Slot 2', value: 92 },
  { name: 'Slot 3', value: 95 },
  { name: 'Slot 4', value: 91 },
  { name: 'Slot 5', value: 94 },
  { name: 'Slot 6', value: 98 },
];

const paletteData = [
  { name: 'Void', value: 40, color: '#050505' },
  { name: 'Azure', value: 30, color: '#00F0FF' },
  { name: 'Ceramic', value: 20, color: '#e2e8f0' },
  { name: 'Danger', value: 10, color: '#ef4444' },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-12 py-10 animate-in fade-in duration-500">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 mb-6 italic tracking-tight">
          Báo cáo Tổng quan Chiến lược
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          Chào mừng đội ngũ sản xuất đến với trung tâm điều hành <strong>Project Mikage</strong>. 
          Phần này cung cấp cái nhìn vĩ mô về dự án, nơi chúng ta chuyển hóa những dòng mã React thô sơ thành một trải nghiệm "Cổng không gian" (Portal). 
          Tại đây, bồ sẽ tìm thấy các chỉ số cốt lõi về tiến độ, sự phân bổ nguồn lực và tầm nhìn điều hành.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Trạng thái Sprint
          </h3>
          <div className="space-y-8">
            {[
              { label: 'Hoàn thiện State Core', value: 100 },
              { label: 'Thư viện Asset V3.0', value: 85 },
              { label: 'Hệ thống Motion Engine', value: 60 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2.5 items-end">
                  <span className="text-sm font-extrabold text-slate-700">{item.label}</span>
                  <span className="text-sm font-black text-indigo-600 italic">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                Độ nhất quán nhận dạng (Character Sync)
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-bold">
                Phân tích sự đồng bộ khuôn mặt Mikage qua 6 phân cảnh mẫu.
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-indigo-600 italic">92%</span>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter mt-1">
                +4.2% Above Baseline
              </p>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consistencyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.indigo} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={COLORS.indigo} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <YAxis 
                  hide 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={COLORS.indigo} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
