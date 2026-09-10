import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchForm } from './components/SearchForm';
import { TransactionView } from './components/TransactionView';
import { HeroIllustration } from './components/HeroIllustration';
import { AboutPage } from './components/AboutPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-[#070114] text-slate-50 flex flex-col font-sans selection:bg-purple-500/30 relative overflow-hidden">
          
          {/* Global Background Glow (Portal Effect) */}
          <div className="fixed inset-0 z-0 pointer-events-none flex items-start justify-center">
            <div className="absolute top-0 inset-x-0 h-[30rem] bg-gradient-to-b from-purple-900/10 to-transparent opacity-60" />
            <div className="absolute top-[-10rem] w-[50rem] h-[30rem] bg-purple-600/20 rounded-[100%] blur-[120px]" />
            <div className="absolute top-20 w-[30rem] h-[20rem] bg-indigo-500/15 rounded-[100%] blur-[100px]" />
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-center py-8 px-4 sm:px-6 md:px-8">
            <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-2 mb-4 border-b border-purple-900/30">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:text-purple-300 transition-colors">TxStory</span>
              </Link>
              <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-slate-400">
                <a href="https://groq.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://console.groq.com/powered-by-groq-dark.svg"
                    alt="Powered by Groq for fast inference."
                    className="h-5"
                  />
                </a>
                <Link to="/about" className="hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(216,180,254,0.5)] transition-all cursor-pointer">
                  Platform Details
                </Link>
              </div>
            </header>
            
            <main className="w-full max-w-7xl flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={
                  <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 pt-8 pb-20">
                    <div className="flex-1 space-y-8 text-center lg:text-left z-20">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0B2E] border border-purple-500/30 text-purple-300 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        TxStory Engine v2.0
                      </div>
                      
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md">
                        Every transaction <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">has a story.</span>
                      </h1>
                      
                      <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Paste any transaction hash from <strong className="text-purple-200">Ethereum</strong>, <strong className="text-purple-200">Base</strong>, or <strong className="text-purple-200">BSC</strong>. Our engine instantly analyzes the on-chain data and translates complex technical jargon into a simple, human-readable summary.
                      </p>
                      
                      <div className="pt-4">
                        <SearchForm />
                      </div>
                    </div>
                    
                    <div className="flex-1 w-full max-w-xl lg:max-w-none relative z-10 pointer-events-none hidden md:block">
                      <HeroIllustration />
                    </div>
                  </div>
                } />
                <Route path="/tx/:hash" element={<TransactionView />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
