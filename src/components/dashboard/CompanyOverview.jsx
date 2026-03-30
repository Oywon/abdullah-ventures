const CompanyOverview = ({ company }) => (
  <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8 mb-8 sm:mb-12">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-3">Company Profile</p>
        <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900">
          {company.companyName}
        </h2>
        <p className="text-slate-500 mt-3 text-sm font-bold uppercase tracking-[0.16em]">
          {company.contactName} • {company.email}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="rounded-2xl bg-slate-100 border border-slate-200 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-2">Region</p>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{company.region}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 border border-blue-100 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-black mb-2">Status</p>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{company.status}</p>
        </div>
      </div>
    </div>
  </section>
);

export default CompanyOverview;
