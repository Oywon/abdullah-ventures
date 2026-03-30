import { SignIn } from '@clerk/react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

const clerkAppearance = {
  elements: {
    card: 'shadow-none border-0 bg-transparent p-0',
    header: 'hidden',
    socialButtonsBlockButton:
      'rounded-xl border border-slate-200 bg-white text-slate-900 font-black uppercase tracking-[0.12em] hover:bg-slate-50',
    socialButtonsBlockButtonText: 'font-black uppercase tracking-[0.12em]',
    formButtonPrimary:
      'bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-black uppercase italic tracking-[0.2em] shadow-xl shadow-slate-900/20',
    formFieldLabel: 'text-[10px] font-black text-slate-400 uppercase tracking-widest',
    formFieldInput:
      'rounded-xl border-slate-200 bg-white text-slate-900 font-bold placeholder:text-slate-300 focus:border-blue-600 focus:ring-blue-600',
    footer: 'hidden',
    identityPreviewText: 'text-slate-500 font-bold',
    formResendCodeLink: 'text-blue-600 font-black uppercase tracking-[0.2em]',
    otpCodeFieldInput:
      'rounded-xl border-slate-200 bg-white text-slate-900 font-black focus:border-blue-600 focus:ring-blue-600',
    alertText: 'text-sm font-bold',
  },
};

const LoginFallback = () => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-2">Setup Required</p>
      <p className="text-sm text-slate-700 leading-6">
        Add `VITE_CLERK_PUBLISHABLE_KEY` to enable live sign-in. The partner portal stays available in demo mode until Clerk is configured.
      </p>
    </div>
    <Link
      to="/dashboard"
      className="w-full bg-slate-900 text-white py-5 rounded-xl font-black uppercase italic tracking-widest flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20"
    >
      Enter Demo Portal
    </Link>
  </div>
);

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <SEO title="Partner Login | Abdullah Ventures" />

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32 py-16">
        <div className="mb-12">
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="font-black italic text-xl tracking-tighter text-slate-900 uppercase">
              Abdullah<span className="text-blue-600">Ventures</span>
            </span>
          </Link>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 mb-2">
            Partner Login
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Access your global trade dashboard
          </p>
        </div>

        {hasClerk ? (
          <div className="rounded-[28px] border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
            <SignIn
              appearance={clerkAppearance}
              path="/login"
              routing="path"
              signUpUrl="/signup"
              fallbackRedirectUrl="/dashboard"
              forceRedirectUrl="/dashboard"
            />
          </div>
        ) : (
          <LoginFallback />
        )}

        <p className="mt-12 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          Not a registered partner? <Link to="/signup" className="text-blue-600 hover:underline">Apply for Access</Link>
        </p>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
            alt="Logistics background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-slate-900"></div>

        <div className="relative h-full flex flex-col justify-end p-20">
          <div className="bg-blue-600 h-1 w-full mb-8"></div>
          <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
            Connecting the <br /> Global Supply Chain.
          </h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-loose max-w-md">
            The digital hub for cross-border commodities trade and joint venture management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
