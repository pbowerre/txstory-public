import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAnalyzedTransaction } from '../lib/api';
import { MovementCard } from './MovementCard';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Fuel, Sparkles } from 'lucide-react';

export function TransactionView() {
  const { hash } = useParams<{ hash: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['transaction', hash],
    queryFn: () => getAnalyzedTransaction(hash!),
    enabled: !!hash && /^0x[a-fA-F0-9]{64}$/.test(hash),
    retry: false,
  });

  if (!hash || !/^0x[a-fA-F0-9]{64}$/.test(hash)) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-400">Invalid Hash</h2>
        <p className="text-slate-400 mt-2">The provided transaction hash is invalid.</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-6 text-indigo-400 hover:text-indigo-300">
          <ArrowLeft size={16} /> Back to Search
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="h-32 bg-slate-800/50 rounded-3xl animate-pulse backdrop-blur-md border border-white/5" />
        <div className="space-y-4">
          <div className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
          <div className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-12 bg-red-950/20 rounded-3xl border border-red-900/50 backdrop-blur-md">
        <XCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-red-400">Transaction Not Found</h2>
        <p className="text-slate-300 mt-2">{(error as Error).message}</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-8 text-indigo-400 hover:text-indigo-300 transition-colors bg-white/5 px-6 py-3 rounded-full hover:bg-white/10">
          <ArrowLeft size={16} /> Try another hash
        </Link>
      </div>
    );
  }

  if (!data) return null;

  const { transaction, movements, story } = data;
  const isSuccess = transaction.status === 'success';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> <span className="font-medium">New Search</span>
        </Link>
      </div>

      {/* Transaction Header Card */}
      <div className="relative overflow-hidden bg-[#110822]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_0_rgba(88,28,135,0.4)]">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium uppercase tracking-wider">Success</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  <XCircle size={16} />
                  <span className="text-sm font-medium uppercase tracking-wider">Reverted</span>
                </div>
              )}
              <span className="text-purple-300/80 text-sm font-mono truncate max-w-[200px] sm:max-w-md">
                Block {transaction.blockNumber.toString()}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white break-all font-mono leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#1D1238]/50 border border-purple-500/10 rounded-xl p-4 shadow-inner">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-purple-400/80 mb-1">Sender</span>
                <span className="font-mono text-sm text-purple-100 break-all">{transaction.from}</span>
              </div>
              <div className="bg-[#1D1238]/50 border border-purple-500/10 rounded-xl p-4 shadow-inner">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-purple-400/80 mb-1">Receiver</span>
                <span className="font-mono text-sm text-purple-100 break-all">{transaction.to}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-6 md:gap-3 text-sm text-purple-300">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-400 drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]" />
              <span>{new Date(Number(transaction.timestamp) * 1000).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel size={16} className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]" />
              <span>{transaction.gasUsed.toString()} gas</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Story / Movements */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-gradient-to-b from-indigo-400 to-fuchsia-500 rounded-full inline-block shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            The Story
          </h2>
        </div>
        
        {story && (
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950/40 to-slate-900/40 backdrop-blur-2xl border border-indigo-500/20 rounded-3xl p-8 shadow-[0_0_40px_0_rgba(79,70,229,0.1)] group transition-all duration-500 hover:border-indigo-400/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-inner">
                  <Sparkles size={20} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300 tracking-wide uppercase">Analysis Engine</h3>
              </div>
              <p className="text-slate-100 leading-relaxed text-xl font-medium tracking-tight">
                {story}
              </p>
            </div>
          </div>
        )}

        {movements.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center backdrop-blur-sm">
            <p className="text-slate-400 text-lg">No asset movements detected in this transaction.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
            {movements.map((movement, idx) => (
              <MovementCard key={`${movement.type}-${idx}`} movement={movement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
