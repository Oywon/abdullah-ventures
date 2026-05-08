import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import SEO from "../../../components/SEO";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const clerkAppearance = {
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "w-full w-max-[500px] xl:max-w-[550px] mx-auto shadow-none",
    card: "shadow-none border-0 bg-transparent p-0 sm:p-2 w-full",
    header: "hidden",
    socialButtonsBlockButton:
      "rounded-xl border border-slate-200 bg-white text-slate-900 font-bold uppercase tracking-widest hover:bg-slate-50",
    socialButtonsBlockButtonText: "font-bold uppercase tracking-widest",
    formButtonPrimary:
      "bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-black uppercase italic tracking-[0.2em] shadow-xl shadow-slate-900/20 py-3",
    formFieldLabel: "text-xs font-black text-slate-400 uppercase tracking-widest mb-1 shadow-none",
    formFieldInput:
      "rounded-xl border-slate-200 bg-white text-slate-900 font-bold placeholder:text-slate-300 focus:border-blue-600 focus:ring-blue-600 py-2.5",
    footerAction: "hidden",
    identityPreviewText: "text-slate-500 font-bold",
    formResendCodeLink: "text-blue-600 font-black uppercase tracking-[0.2em]",
    otpCodeFieldInput:
      "rounded-xl border-slate-200 bg-white text-slate-900 font-black focus:border-blue-600 focus:ring-blue-600",
    alertText: "text-sm font-bold",
    dividerRow: "my-6",
    dividerText: "text-xs font-black text-slate-300 uppercase tracking-widest",
  },
};

const SignupFallback = () => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-2">Setup Required</p>
      <p className="text-sm text-slate-700 leading-6">
        Add ` + "`" + `VITE_CLERK_PUBLISHABLE_KEY` + "`" + ` to enable live sign-in. The partner portal stays available in demo mode until Clerk is configured.
      </p>
    </div>
    <Link href="/dashboard"
      className="w-full bg-slate-900 text-white py-5 rounded-xl font-black uppercase italic tracking-widest flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/20"
    >
      Enter Demo Portal
    </Link>
  </div>
);

const Signup = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <SEO title="Partner Registration | Abdullah Ventures" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 items-stretch">
          <section className="relative overflow-hidden rounded-[28px] bg-slate-900 text-white p-8 sm:p-10 lg:p-12 min-h-[260px]">
            <div className="absolute inset-0 opacity-30">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000"
                alt="Logistics background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-slate-900/85 to-slate-900" />

            <div className="relative">
              <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="text-white" size={22} />
                </div>
                <span className="font-black italic text-lg sm:text-xl tracking-tighter uppercase">
                  Abdullah<span className="text-blue-400">Ventures</span>
                </span>
              </Link>

              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-300 mb-3">Join The Network</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tight leading-tight mb-4">
                Partner Signup
              </h1>
              <p className="text-slate-200 max-w-lg text-sm sm:text-base leading-7">
                Create a secure identity to get access to the portal. You will be asked to complete your profile after signing up.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-3 text-[11px] font-black uppercase tracking-[0.18em]">
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3">Submit Requests</div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3">Track Operations</div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white shadow-xl p-6 sm:p-8 lg:p-10 overflow-visible flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-3">Create Identity</p>
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-slate-900 mb-6">
              Get Started
            </h2>

            {hasClerk ? (
              <div className="w-full overflow-visible">
                <ClerkSignUp
                  appearance={clerkAppearance}
                  signInUrl="/login"
                  fallbackRedirectUrl="/onboarding"
                  forceRedirectUrl="/onboarding"
                />
              </div>
            ) : (
              <SignupFallback />
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Already registered?
              </p>
              <Link href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-slate-900"
              >
                Go To Login <ArrowRight size={12} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signup;

