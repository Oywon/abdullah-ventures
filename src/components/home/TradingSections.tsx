import React from 'react';
import { 
  HardHat, 
  Leaf, 
  Droplets, 
  Wheat, 
  Stethoscope, 
  Construction, 
  Globe, 
  FileCheck, 
  Truck 
} from 'lucide-react';

const TradingSections = () => {
  const commodities = [
    {
      title: "Mines & Coals",
      desc: "Sourcing high-quality mining materials and industrial coal for energy and manufacturing sectors.",
      icon: <HardHat className="text-blue-600" size={32} />
    },
    {
      title: "Fertilizers",
      desc: "Global supply chain management for various agricultural fertilizers to support crop growth.",
      icon: <Leaf className="text-blue-600" size={32} />
    },
    {
      title: "Oil & Gas",
      desc: "Brokering crude oil, refined petroleum products, and natural gas transactions globally.",
      icon: <Droplets className="text-blue-600" size={32} />
    },
    {
      title: "Grains",
      desc: "Large-scale international trade of staple food grains (Rice, Wheat, Corn), ensuring food security.",
      icon: <Wheat className="text-blue-600" size={32} />
    },
    {
      title: "Medical Equipment",
      desc: "Facilitating trade of essential hospital supplies, advanced diagnostics, and surgical equipment.",
      icon: <Stethoscope className="text-blue-600" size={32} />
    },
    {
      title: "Bitumin",
      desc: "Supplying bitumin and asphalt products for road construction with reliable global sourcing.",
      icon: <Construction className="text-blue-600" size={32} />
    }
  ];

  const advantages = [
    {
      title: "Trusted Global Network",
      desc: "Leveraging deep connections with reliable suppliers and buyers worldwide for optimal transactions.",
      icon: <Globe className="text-white" size={24} />
    },
    {
      title: "Transparent Brokerage",
      desc: "Clear, honest communication and documentation at every stage of the trade cycle.",
      icon: <FileCheck className="text-white" size={24} />
    },
    {
      title: "Fast Sourcing & Logistics",
      desc: "Efficient coordination of movement, inspection, and delivery, minimizing lead times and risk.",
      icon: <Truck className="text-white" size={24} />
    }
  ];

  return (
    <div className="bg-white">
      {/* --- What We Deal In Section --- */}
      <section id="services" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-slate-900">What We Deal In</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {commodities.map((item, idx) => (
            <div key={idx} className="group p-6 sm:p-8 border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 border-t-4 border-t-blue-600">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-3 uppercase italic text-slate-800">{item.title}</h3>
              <p className="text-slate-600 text-xs font-bold uppercase tracking-tight leading-relaxed italic">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section id="why-choose-us" className="py-14 sm:py-20 lg:py-24 bg-slate-900 text-white px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter">Why Choose Us</h2>
            <p className="text-blue-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mt-2">The Abdullah Ventures Advantage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {advantages.map((adv, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-blue-600 flex items-center justify-center rounded-2xl mx-auto mb-6 rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-blue-600/20">
                  {adv.icon}
                </div>
                <h4 className="text-lg font-black uppercase italic mb-4 tracking-tight">{adv.title}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase leading-loose tracking-widest italic">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TradingSections;