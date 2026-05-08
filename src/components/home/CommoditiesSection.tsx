import { Droplets, Globe, HardHat, Pill, Ship, Wheat } from 'lucide-react';

const commodities = [
  {
    title: 'Mines & Coals',
    desc: 'Sourcing high-quality coal and industrial minerals for global energy markets.',
    icon: HardHat,
  },
  {
    title: 'Oil & Gas',
    desc: 'Reliable brokering of refined petroleum and natural gas products.',
    icon: Droplets,
  },
  {
    title: 'Medical Equipment',
    desc: 'Supplying essential surgical and diagnostic equipment to healthcare networks.',
    icon: Pill,
  },
  {
    title: 'Grains & Fertilizers',
    desc: 'Bulk trade of fertilizers and staple food grains for agricultural security.',
    icon: Wheat,
  },
  {
    title: 'Global Logistics',
    desc: 'Smart coordination of shipping and cargo inspections across the network.',
    icon: Ship,
  },
  {
    title: 'Digital Sourcing',
    desc: 'Advanced data-driven verification of global suppliers and buyers.',
    icon: Globe,
  },
];

const CommoditiesSection = () => (
  <section className="py-24 px-10 max-w-7xl mx-auto text-slate-800">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-black uppercase italic tracking-tighter">Strategic Commodities</h2>
      <div className="h-1 w-20 bg-blue-600 mx-auto mt-4"></div>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {commodities.map(({ title, desc, icon: Icon }) => (
        <div
          key={title}
          className="p-8 border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all border-t-4 border-t-blue-600"
        >
          <div className="text-blue-600 mb-4">
            <Icon size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 uppercase italic">{title}</h3>
          <p className="text-slate-600 text-sm italic">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CommoditiesSection;
