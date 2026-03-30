import React from 'react';
import { MapPin } from 'lucide-react';

const RegionalHubs = () => {
  const hubs = [
    { country: "South Korea", role: "Tech Sourcing" },
    { country: "Bangladesh", role: "Operations Hub" },
    { country: "Middle East", role: "Energy Sector" },
    { country: "India", role: "Agriculture" },
    { country: "South Africa", role: "Mining Hub" },
    { country: "Malaysia", role: "HQ & Logistics" },
    { country: "Philippines", role: "Trade Route" },
    { country: "Indonesia", role: "Commodities" }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-widest text-slate-900">Regional Hubs</h2>
          <div className="h-0.5 w-12 bg-blue-600 mx-auto mt-2"></div>
          <p className="text-slate-400 text-[9px] sm:text-[10px] mt-4 font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase">3 Continents | 9 Nations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-slate-100 shadow-sm">
          {hubs.map((node, idx) => (
            <div key={idx} className="group p-6 sm:p-8 border border-slate-50 hover:bg-slate-900 hover:text-white transition-all cursor-crosshair relative overflow-hidden">
              <MapPin size={14} className="text-blue-600 mb-3 group-hover:animate-pulse" />
              <h4 className="font-black text-xs uppercase italic relative z-10">{node.country}</h4>
              <p className="text-[9px] uppercase tracking-tighter opacity-50 font-bold relative z-10">{node.role}</p>
              <div className="absolute -right-2 -bottom-2 text-slate-100 group-hover:text-slate-800 transition-colors font-black text-4xl italic select-none">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionalHubs;