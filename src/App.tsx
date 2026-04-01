import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative p-4 selection:bg-red-200">
      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className={`absolute top-4 right-4 p-4 rounded-full transition-all duration-300 z-10
          ${isFullscreen 
            ? 'bg-transparent text-gray-300 hover:text-gray-600 hover:bg-gray-100' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 shadow-sm'
          }`}
        title={isFullscreen ? "Keluar Fullscreen" : "Tampilkan Fullscreen"}
      >
        {isFullscreen ? <Minimize size={28} /> : <Maximize size={28} />}
      </button>

      {/* Sign Content */}
      <div className="flex flex-col items-center justify-center space-y-10 md:space-y-16 max-w-5xl w-full">
        
        {/* SVG No Smoking Sign */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] drop-shadow-xl">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smoke */}
            <path d="M 75 42 Q 80 25 70 15 Q 60 5 75 -5" stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 85 42 Q 95 30 85 20" stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Cigarette Body */}
            <rect x="20" y="42" width="65" height="16" fill="#f3f4f6" stroke="#111827" strokeWidth="2" rx="1" />
            
            {/* Cigarette Filter */}
            <rect x="20" y="42" width="22" height="16" fill="#d97706" stroke="#111827" strokeWidth="2" rx="1" />
            <line x1="27" y1="42" x2="27" y2="58" stroke="#111827" strokeWidth="1" opacity="0.4" />
            <line x1="34" y1="42" x2="34" y2="58" stroke="#111827" strokeWidth="1" opacity="0.4" />
            
            {/* Cherry/Ash */}
            <path d="M 85 42 L 89 44 L 87 50 L 89 56 L 85 58 Z" fill="#ef4444" stroke="#111827" strokeWidth="2" strokeLinejoin="round" />

            {/* Prohibition Circle & Line */}
            <circle cx="50" cy="50" r="42" stroke="#dc2626" strokeWidth="12" fill="none" />
            <line x1="20.3" y1="20.3" x2="79.7" y2="79.7" stroke="#dc2626" strokeWidth="12" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 tracking-tighter uppercase leading-none">
            Dilarang<br/>Merokok
          </h1>
          <div className="w-32 md:w-48 h-1.5 md:h-2 bg-gray-900 mx-auto rounded-full"></div>
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-widest">
            No Smoking
          </p>
        </div>
      </div>
    </div>
  );
}
