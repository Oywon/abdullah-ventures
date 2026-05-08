const ActivityTimeline = ({ activities, alerts }) => (
  <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
    <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-4">Operations Feed</p>
      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-blue-600 mt-1"></span>
              <span className="w-px flex-1 bg-slate-200 mt-2"></span>
            </div>
            <div className="pb-2">
              <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{activity.title}</p>
              <p className="text-xs text-slate-500 mt-2 leading-6">{activity.description}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mt-3">{activity.at}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-slate-950 text-white rounded-[28px] shadow-2xl border border-blue-900 p-6 sm:p-8">
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-400 mb-6">Priority Queue</p>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white">{alert.title}</p>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">{alert.priority}</span>
            </div>
            <p className="text-xs text-slate-400 leading-6">{alert.description}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ActivityTimeline;
