import React from "react";
import { Recycle, History, BookOpen, Camera, Printer } from "lucide-react";
import { SavedScan } from "../types";

interface NavbarProps {
  savedScans: SavedScan[];
  onOpenHistory: () => void;
  onReset: () => void;
  hasResult: boolean;
  onPrint: () => void;
  activeView: "scan" | "recycling";
  onViewChange: (view: "scan" | "recycling") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedScans,
  onOpenHistory,
  onReset,
  hasResult,
  onPrint,
  activeView,
  onViewChange,
}) => {
  // Calculate total saved metrics across all user scans
  const totalGrams = savedScans.reduce((acc, scan) => {
    const sum = scan.result.ideas.reduce((s, i) => s + (i.estimatedGramsSaved || 0), 0);
    return acc + sum;
  }, 0);

  const totalDollars = savedScans.reduce((acc, scan) => {
    const sum = scan.result.ideas.reduce((s, i) => s + (i.estimatedDollarsSaved || 0), 0);
    return acc + sum;
  }, 0);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600/90 text-white flex items-center justify-center shadow-inner group-hover:bg-emerald-500 transition-colors">
            <Recycle className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display font-bold text-lg tracking-tight text-white">
              EchoEarth <span className="text-emerald-400 font-semibold text-sm">AI</span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Give every waste item a second life
            </p>
          </div>
        </div>

        {/* Center Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-800 rounded-xl border border-stone-700/80 text-xs font-medium">
          <button
            onClick={() => onViewChange("scan")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === "scan"
                ? "bg-emerald-700 text-white shadow-xs font-semibold"
                : "text-stone-300 hover:text-white hover:bg-stone-700/60"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>AI Upcycle Studio</span>
          </button>
          <button
            onClick={() => onViewChange("recycling")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === "recycling"
                ? "bg-emerald-700 text-white shadow-xs font-semibold"
                : "text-stone-300 hover:text-white hover:bg-stone-700/60"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Recycling Hub (#1–#7)</span>
          </button>
        </div>

        {/* Actions & History */}
        <div className="flex items-center gap-2">
          {/* Global Impact counter on desktop */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-stone-400 mr-2 border-r border-stone-800 pr-4">
            <span className="text-stone-500">Diverted:</span>
            <span className="font-semibold text-emerald-400 font-mono">
              {totalGrams > 0 ? `${(totalGrams / 1000).toFixed(2)} kg` : "0 g"}
            </span>
          </div>

          {hasResult && activeView === "scan" && (
            <button
              onClick={onPrint}
              title="Print Blueprint"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700/60"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          )}

          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 hover:text-white rounded-lg transition-colors border border-stone-700"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>History</span>
            {savedScans.length > 0 && (
              <span className="text-[11px] font-mono text-emerald-300 font-bold ml-0.5">
                ({savedScans.length})
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
