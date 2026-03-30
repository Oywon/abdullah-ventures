const defaultStats = [
  { label: 'Trade Vol.', value: '$2.4M USD' },
  { label: 'Cargo Units', value: '18 Units' },
  { label: 'Global Nodes', value: '09 Nations' },
];

const StatsCards = ({ stats = defaultStats }) => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 text-slate-900 font-black italic">
    {stats.map(({ label, value }) => (
      <div key={label} className="bg-white p-5 sm:p-8 rounded-xl shadow border-l-8 border-blue-600">
        <h4 className="text-slate-400 text-[9px] uppercase tracking-widest mb-2 font-black italic tracking-widest">
          {label}
        </h4>
        <div className="text-2xl sm:text-3xl tracking-tighter">{value}</div>
      </div>
    ))}
  </div>
);

export default StatsCards;
