import { useState } from 'react';
import { ArrowRight, Briefcase, Globe, Mail, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { submitPartnerApplication } from '../lib/partnerPortalApi';

const initialFormData = {
  firstName: '',
  lastName: '',
  companyName: '',
  tradeRegion: 'Bangladesh',
  email: '',
  sector: 'General Trading',
};

const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitPartnerApplication(formData);
      setSuccess(true);
      setFormData(initialFormData);
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit your partnership request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-row-reverse">
      <SEO title="Partner Registration | Abdullah Ventures" />

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 mb-2">
            Partner Registration
          </h1>
          <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Submit your company details for portal access
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">First Name</label>
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={18} />
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 outline-none focus:border-blue-600 transition-all text-sm font-bold"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-slate-100 py-3 outline-none focus:border-blue-600 transition-all text-sm font-bold"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Company Name</label>
            <div className="relative">
              <Briefcase className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={18} />
              <input
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 outline-none focus:border-blue-600 transition-all text-sm font-bold"
                placeholder="Abdullah Ventures Trading"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Region</label>
              <div className="relative">
                <Globe className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={18} />
                <select
                  name="tradeRegion"
                  value={formData.tradeRegion}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 outline-none focus:border-blue-600 transition-all text-sm font-bold appearance-none"
                >
                  <option>Bangladesh</option>
                  <option>South Korea</option>
                  <option>Middle East</option>
                  <option>India</option>
                  <option>South Africa</option>
                </select>
              </div>
            </div>
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Trade Focus</label>
              <input
                name="sector"
                type="text"
                value={formData.sector}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-slate-100 py-3 outline-none focus:border-blue-600 transition-all text-sm font-bold"
                placeholder="Medical Equipment"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Business Email</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={18} />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 outline-none focus:border-blue-600 transition-all text-sm font-bold"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              Partnership request submitted. Your company record is now saved in the database.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-5 rounded-xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20 mt-8 disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting Request' : 'Submit Request'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-12 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          Already approved? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
        <div className="absolute inset-0 opacity-50 grayscale mix-blend-multiply">
          <img
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=2000"
            alt="Business collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px]"></div>
        <div className="relative h-full flex flex-col justify-center p-20 text-white">
          <ShieldCheck size={64} className="mb-8" />
          <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">
            Simple Portal <br /> Access Request.
          </h2>
          <p className="text-slate-100 text-[10px] font-black uppercase tracking-[0.4em] leading-loose">
            Company Profile And Shipment Tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
