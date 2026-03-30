const CompliancePanel = ({ documents }) => (
  <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-2">Compliance Vault</p>
        <h3 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">Document Readiness</h3>
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        Synced With Supabase
      </div>
    </div>

    <div className="space-y-4">
      {documents.map((document) => (
        <div
          key={document.id}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-900">{document.name}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">
              Expires {document.expiresOn}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border ${
                document.status === 'Verified'
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : document.status === 'Pending Review'
                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-rose-100 text-rose-700 border-rose-200'
              }`}
            >
              {document.status}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{document.owner}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CompliancePanel;
