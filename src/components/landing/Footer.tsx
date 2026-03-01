export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2">
          <img
            src="/Verdikt_Logo.png"
            alt="Verdikt AI Logo"
            className="h-6 w-auto object-contain"
          />
          <span className="text-sm font-medium text-white">
            Verdikt <span className="text-violet-400">AI</span>
          </span>
        </div>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Verdikt AI. Powered by Claude, GPT-4
          &amp; Gemini.
        </p>
      </div>
    </footer>
  );
}
