import { Sparkles, Activity, Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-24 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0B2E] border border-purple-500/30 text-purple-300 text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Sparkles size={16} /> The TxStory Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
          Decoding the Blockchain <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            One Story at a Time
          </span>
        </h1>
        <p className="text-xl text-purple-200/70 max-w-2xl mx-auto leading-relaxed">
          TxStory translates complex on-chain hexadecimal data into simple, human-readable narratives. 
          Built for transparency, designed for humans.
        </p>
      </section>

      {/* How It Works - Mockup Grid */}
      <section className="space-y-12 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-purple-300/70">From raw data to actionable insights in milliseconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-[#110822]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_10px_40px_0_rgba(88,28,135,0.2)] flex flex-col items-center text-center group hover:border-purple-500/40 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-[#1D1238] border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Activity className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Data Extraction</h3>
            <p className="text-purple-200/60 leading-relaxed">
              You paste a transaction hash. We securely query the respective blockchain node to retrieve the raw, complex hexadecimal data.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#110822]/80 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-8 shadow-[0_10px_40px_0_rgba(88,28,135,0.2)] flex flex-col items-center text-center group hover:border-indigo-500/40 transition-colors relative">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-[#1D1238] border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.3)] relative z-10">
              <Zap className="text-indigo-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">2. AI Processing</h3>
            <p className="text-purple-200/60 leading-relaxed relative z-10">
              Our custom AI Analysis Engine categorizes assets, identifies senders and receivers, and processes large token integers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#110822]/80 backdrop-blur-xl border border-fuchsia-500/20 rounded-3xl p-8 shadow-[0_10px_40px_0_rgba(88,28,135,0.2)] flex flex-col items-center text-center group hover:border-fuchsia-500/40 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-[#1D1238] border border-fuchsia-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(217,70,239,0.3)]">
              <Layers className="text-fuchsia-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Human Output</h3>
            <p className="text-purple-200/60 leading-relaxed">
              You receive a beautifully formatted, conversational summary of exactly what happened in the transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Networks Mockup */}
      <section className="bg-[#110822]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-12 shadow-[0_10px_40px_0_rgba(88,28,135,0.4)] relative overflow-hidden text-center z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <ShieldCheck className="mx-auto text-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" size={48} />
        <h2 className="text-3xl font-bold text-white mb-4">Multi-Chain Native</h2>
        <p className="text-purple-200/70 max-w-2xl mx-auto mb-12">
          TxStory is built to index and summarize transactions across the most popular EVM networks simultaneously. Paste a hash from any of these networks, and our engine automatically routes it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="px-8 py-4 bg-[#1D1238] border border-purple-500/30 rounded-2xl text-xl font-bold text-purple-200 shadow-inner">
            Ethereum (ETH)
          </div>
          <div className="px-8 py-4 bg-[#1D1238] border border-blue-500/30 rounded-2xl text-xl font-bold text-blue-200 shadow-inner">
            Base
          </div>
          <div className="px-8 py-4 bg-[#1D1238] border border-amber-500/30 rounded-2xl text-xl font-bold text-amber-200 shadow-inner">
            BNB Smart Chain
          </div>
        </div>
      </section>

      <div className="text-center pb-8 relative z-10">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full transition-all duration-300 font-bold shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]"
        >
          Try a Transaction <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
