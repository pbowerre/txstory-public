import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

export function SearchForm() {
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hash.trim()) return;

    // Extract hash from URL if the user pasted a full link
    const match = hash.trim().match(/(0x[a-fA-F0-9]{64})/);
    
    if (!match) {
      setError('Please enter a valid 66-character transaction hash or explorer link');
      return;
    }

    const extractedHash = match[1];

    setError('');
    navigate(`/tx/${extractedHash}`);
  };

  return (
    <div className="w-full max-w-2xl backdrop-blur-xl bg-[#110822]/80 p-2 rounded-[2rem] border border-purple-500/20 shadow-[0_8px_32px_0_rgba(88,28,135,0.4)] transition-all duration-500 hover:shadow-[0_8px_40px_0_rgba(168,85,247,0.3)] focus-within:border-purple-500/60 focus-within:bg-[#150A2A]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="relative group flex items-center">
          <div className="absolute left-6 text-purple-400/50 group-focus-within:text-purple-400 transition-colors pointer-events-none">
            <Search size={22} />
          </div>
          <input
            id="tx-hash"
            type="text"
            value={hash}
            onChange={(e) => {
              setHash(e.target.value);
              if (error) setError('');
            }}
            placeholder="Paste transaction hash or explorer link..."
            className="w-full bg-transparent text-purple-100 placeholder-purple-300/40 rounded-[2rem] pl-16 pr-20 py-5 focus:outline-none transition-all text-lg font-mono"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={!hash.trim()}
            className="absolute right-2 p-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-[#1D1238] disabled:to-[#1D1238] disabled:text-purple-900/50 text-white rounded-2xl transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] disabled:shadow-none border border-white/10 disabled:border-transparent"
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </form>
      {error && (
        <div className="absolute -bottom-8 left-6 text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
