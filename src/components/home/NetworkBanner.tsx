// src/components/home/NetworkBanner.js
import React from 'react';
import { Globe } from 'lucide-react';

const countries = [
  { name: "South Korea", info: "Tech & Medical Sourcing", flag: "🇰🇷" },
  { name: "Bangladesh", info: "Operations & Logistics", flag: "🇧🇩" },
  { name: "Malaysia", info: "Regional HQ (Bangsar)", flag: "🇲🇾" },
  { name: "Philippines", info: "Key Trade Node", flag: "🇵🇭" },
  { name: "Middle East", info: "Energy & Oil Partnerships", flag: "🇦🇪" },
];

const NetworkBanner = () => {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-12">
          <Globe className="mx-auto text-blue-600 mb-4" size={32} />
          <h2 className="text-3xl font-black uppercase italic text-slate-900">Our Global Infrastructure</h2>
          <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase mt-2">Connecting 3 Continents</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {countries.map((c, i) => (
            <div key={i} className="bg-white p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <span className="text-2xl mb-2 block">{c.flag}</span>
              <h4 className="font-black text-sm uppercase italic group-hover:text-blue-600 transition">{c.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-tight mt-1">{c.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkBanner;