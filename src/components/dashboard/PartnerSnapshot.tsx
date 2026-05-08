const detailItems = [
  { key: 'region', label: 'Trade Region' },
  { key: 'tier', label: 'Partner Tier' },
  { key: 'accessLevel', label: 'Portal Access' },
  { key: 'nextReview', label: 'Next Review' },
];

const PartnerSnapshot = ({ partner, application, alerts }) => (
  <div className="grid xl:grid-cols-[1.4fr_0.9fr] gap-6 mb-8 sm:mb-12">
    <section className="bg-slate-950 text-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-blue-900">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-400 mb-3">
            Partner Profile
          </p>
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
            {partner.companyName}
          </h2>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-[0.18em] font-bold">
            {partner.contactName} • {partner.email}
          </p>
        </div>

        <div className="inline-flex items-center w-fit gap-2 bg-blue-600/15 border border-blue-500/30 px-4 py-2 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-100">
            {partner.onboardingStage}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {detailItems.map(({ key, label }) => (
          <div key={key} className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-2">{label}</p>
            <p className="text-sm sm:text-base font-black uppercase tracking-[0.14em] text-slate-100">
              {partner[key]}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white rounded-[28px] p-6 sm:p-8 shadow-lg border border-slate-200">
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-4">
        Application Desk
      </p>
      <div className="space-y-4">
        <div>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black mb-2">Current Status</p>
          <p className="text-2xl font-black italic uppercase tracking-tight text-slate-900">{application.status}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm font-bold uppercase">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <p className="text-[10px] tracking-[0.3em] text-slate-400 font-black mb-2">Reference</p>
            <p className="text-slate-900">{application.reference}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <p className="text-[10px] tracking-[0.3em] text-slate-400 font-black mb-2">Submitted</p>
            <p className="text-slate-900">{application.submittedAt}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-blue-700 font-black mb-2">Latest Alert</p>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
            {alerts[0]?.title || 'No active alerts'}
          </p>
          <p className="text-xs text-slate-500 mt-2 leading-6">{alerts[0]?.description || 'Operations are clear.'}</p>
        </div>
      </div>
    </section>
  </div>
);

export default PartnerSnapshot;
