import type { AssetMovement } from '@txstory/shared';
import { Coins, CircleDollarSign, Image, Package, ArrowRight } from 'lucide-react';

interface MovementCardProps {
  movement: AssetMovement;
}

export function MovementCard({ movement }: MovementCardProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getIcon = () => {
    switch (movement.type) {
      case 'NATIVE':
        return <Coins className="text-emerald-400" size={24} />;
      case 'ERC20':
        return <CircleDollarSign className="text-blue-400" size={24} />;
      case 'ERC721':
        return <Image className="text-fuchsia-400" size={24} />;
      case 'ERC1155':
        return <Package className="text-amber-400" size={24} />;
    }
  };

  const formatTokenAmount = (amount: bigint, decimals: number = 18) => {
    const amountStr = amount.toString();
    if (amountStr === '0') return '0';
    
    const isNegative = amountStr.startsWith('-');
    const absStr = isNegative ? amountStr.slice(1) : amountStr;
    
    let integerPart = '0';
    let fractionalPart = '';
    
    if (absStr.length <= decimals) {
      fractionalPart = absStr.padStart(decimals, '0');
    } else {
      integerPart = absStr.slice(0, absStr.length - decimals);
      fractionalPart = absStr.slice(absStr.length - decimals);
    }
    
    fractionalPart = fractionalPart.replace(/0+$/, '');
    const formattedInteger = BigInt(integerPart).toLocaleString('en-US');
    
    if (fractionalPart.length > 0) {
      return `${isNegative ? '-' : ''}${formattedInteger}.${fractionalPart}`;
    }
    return `${isNegative ? '-' : ''}${formattedInteger}`;
  };

  const getDetails = () => {
    switch (movement.type) {
      case 'NATIVE':
        return <span className="font-semibold">{formatTokenAmount(movement.amount)} {movement.contractAddress === '0x0000000000000000000000000000000000000000' ? 'ETH' : 'tokens'}</span>;
      case 'ERC20':
        return <span className="font-semibold">{formatTokenAmount(movement.amount)} tokens</span>;
      case 'ERC721':
        return <span className="font-semibold">Token ID: {movement.tokenId.toString()}</span>;
      case 'ERC1155':
        return (
          <span className="font-semibold">
            {formatTokenAmount(movement.amount, 0)} of Token ID: {movement.tokenId.toString()}
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-[#110822]/80 hover:bg-[#150A2A] border border-purple-500/20 rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_4px_20px_0_rgba(88,28,135,0.2)] hover:shadow-[0_4px_30px_0_rgba(168,85,247,0.3)] backdrop-blur-sm overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start gap-4">
        <div className="p-3 bg-[#1D1238] rounded-xl border border-purple-500/30 shrink-0 shadow-inner">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium tracking-wider text-purple-400 uppercase">
              {movement.type} Transfer
            </span>
          </div>
          
          <div className="text-purple-100">
            {getDetails()}
          </div>
          
          <div className="flex items-center gap-3 text-sm mt-1 text-purple-300/70 font-mono">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-purple-500/80 font-sans">From</span>
              <span className="text-purple-300">{formatAddress(movement.from)}</span>
            </div>
            <ArrowRight size={14} className="text-purple-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-purple-500/80 font-sans">To</span>
              <span className="text-purple-300">{formatAddress(movement.to)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
