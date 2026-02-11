
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Terminal } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hệ thống Mikage AI đã sẵn sàng. Tôi có thể hỗ trợ gì cho bồ trong việc sản xuất?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.chat(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'model', text: `Hệ thống gặp lỗi: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-slate-900 w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-950 p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                <Bot className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white text-sm font-black uppercase tracking-widest italic">Mikage <span className="text-indigo-500">Intelligence</span></h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Pro-Engine Active // Thinking Mode</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-white/10'
                }`}>
                  {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-indigo-400" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                  <Loader2 className="text-indigo-400 w-4 h-4 animate-spin" />
                </div>
                <div className="max-w-[80%] p-4 rounded-2xl bg-white/5 text-slate-400 border border-white/5 rounded-tl-none italic text-[10px] flex items-center gap-2">
                  <Terminal size={12} className="animate-pulse" /> Đang xử lý các vector tư duy...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-slate-950 border-t border-white/5">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hỏi bất cứ điều gì về Mikage..."
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-indigo-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-500 transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-5 rounded-full shadow-2xl border border-white/10 hover:scale-110 hover:bg-slate-800 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageSquare size={24} className="relative z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full animate-pulse border-2 border-slate-900" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
