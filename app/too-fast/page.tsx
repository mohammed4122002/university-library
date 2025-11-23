import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#04060d] px-6 py-16 text-light-100">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(244,114,182,0.25),_transparent_55%)]" />
      </div>

      <div className="pointer-events-none absolute -left-10 top-16 h-64 w-64 rounded-full bg-gradient-to-br from-primary-500/40 to-purple-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-gradient-to-tl from-amber-400/30 to-rose-500/40 blur-[140px]" />

      <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-between px-10 opacity-30">
        {[...Array(5)].map((_, index) => (
          <span
            key={`beam-${index}`}
            className="h-24 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
          />
        ))}
      </div>

      <section className="relative z-10 flex max-w-3xl flex-col items-center gap-8 rounded-[32px] border border-white/10 bg-white/5 p-12 text-center shadow-[0_35px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
        <span className="rounded-full border border-white/20 bg-white/10 px-5 py-1 text-xs uppercase tracking-[0.4em] text-light-200">
          Speed limit reached
        </span>
        <h1 className="font-bebas-neue text-5xl leading-none tracking-wide text-light-100 md:text-7xl">
          Whoa, Slow Down There, Speedy!
        </h1>
        <p className="text-lg text-light-300 md:text-xl">
          Looks like you’ve been a little too eager. We’ve put a temporary pause
          on your excitement. 🚦 Chill for a bit, sip something nice, and try
          again shortly.
        </p>

        <div className="grid w-full gap-4 text-left text-sm text-light-400 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-light-300">
              Cooling-off timer
            </p>
            <p className="mt-2 text-2xl font-semibold text-light-100">
              A few minutes
            </p>
            <p className="mt-1 text-light-400">
              Take a quick breather while we reset things on our end.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.2em] text-light-300">
              Need priority access?
            </p>
            <p className="mt-2 text-2xl font-semibold text-light-100">
              We can help
            </p>
            <p className="mt-1 text-light-400">
              Reach out to support if this keeps popping up for you.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3 text-base font-semibold text-dark-100 shadow-[0_20px_45px_rgba(56,189,248,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
          >
            Back to safety
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <button
            type="button"
            className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-light-200 transition duration-300 hover:border-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            Contact support
          </button>
        </div>
      </section>
    </main>
  );
};

export default Page;
