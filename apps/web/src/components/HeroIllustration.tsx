export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center p-8">
      {/* Background glow for the illustration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl relative z-10"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connections (Lines) */}
        <g stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_60s_linear_infinite] origin-center">
          <path d="M120 150 L200 100 L280 150 L280 250 L200 300 L120 250 Z" />
          <path d="M200 100 L200 200" />
          <path d="M120 150 L200 200" />
          <path d="M280 150 L200 200" />
          <path d="M120 250 L200 200" />
          <path d="M280 250 L200 200" />
          <path d="M200 300 L200 200" />
        </g>

        {/* Nodes (Circles) */}
        <g className="origin-center">
          {/* Central Node */}
          <circle cx="200" cy="200" r="24" fill="url(#node-glow)" />
          <circle cx="200" cy="200" r="8" fill="#e0e7ff" />

          {/* Outer Nodes */}
          <circle cx="200" cy="100" r="16" fill="url(#node-glow)" className="animate-pulse" />
          <circle cx="200" cy="100" r="4" fill="#e0e7ff" />

          <circle cx="280" cy="150" r="12" fill="url(#node-glow)" />
          <circle cx="280" cy="150" r="3" fill="#e0e7ff" />

          <circle cx="280" cy="250" r="18" fill="url(#node-glow)" className="animate-bounce" style={{ animationDuration: '3s' }} />
          <circle cx="280" cy="250" r="5" fill="#e0e7ff" />

          <circle cx="200" cy="300" r="14" fill="url(#node-glow)" />
          <circle cx="200" cy="300" r="4" fill="#e0e7ff" />

          <circle cx="120" cy="250" r="12" fill="url(#node-glow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="120" cy="250" r="3" fill="#e0e7ff" />

          <circle cx="120" cy="150" r="16" fill="url(#node-glow)" />
          <circle cx="120" cy="150" r="4" fill="#e0e7ff" />
        </g>
        
        {/* Floating Data Packets */}
        <g className="animate-[float_6s_ease-in-out_infinite_1s]">
          <circle cx="160" cy="125" r="3" fill="#fb7185" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <circle cx="240" cy="275" r="3" fill="#34d399" className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <circle cx="240" cy="175" r="3" fill="#60a5fa" className="animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </g>
      </svg>
    </div>
  );
}
