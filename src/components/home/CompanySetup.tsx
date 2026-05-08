"use client";
// src/components/home/CompanySetup.js
import React from 'react';
import { ShieldCheck, Briefcase, FileText, Users,Globe } from 'lucide-react';

const CompanySetup = () => {
  const steps = [
    { title: "Investor Rights", desc: "Guaranteed legal ownership and profit rights from day one.", icon: <ShieldCheck /> },
    { title: "Legal Formation", desc: "Full licensing and regulatory approvals for new entities.", icon: <FileText /> },
    { title: "Operational Support", desc: "Land identification, factory setup, and infrastructure planning.", icon: <Briefcase /> },
    { title: "HR & Staffing", desc: "Expert recruitment and workforce onboarding management.", icon: <Users /> },
  ];

  return (
    <section id="company-setup" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-none mb-6">
            Market Entry & <br/><span className="text-blue-600">Joint Ventures</span>
          </h2>
          <p className="text-slate-600 italic mb-8 border-l-4 border-blue-600 pl-6">
            We provide a secure, transparent gateway for foreign investors looking to establish operations in Bangladesh and Southeast Asia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-blue-600">{step.icon}</div>
                <h4 className="font-black text-xs uppercase tracking-widest">{step.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-slate-900 p-6 sm:p-10 lg:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10"><Globe size={140} className="sm:w-[200px] sm:h-[200px]"/></div>
            <h3 className="text-xl font-black italic uppercase mb-4 text-blue-400">Bangladesh Setup Model</h3>
            <p className="text-sm font-light leading-relaxed mb-6">Our share-based model ensures foreign investors fast-track their market entry with 100% legal compliance and a trusted local partner.</p>
            <button 
              onClick={() => window.open('https://wa.me/8801999907883?text=Hi, I would like to request a consultation for company setup in Bangladesh.', '_blank')}
              className="bg-blue-600 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Request Consultation
            </button>
        </div>
      </div>
    </section>
  );
};

export default CompanySetup;