import React, { useState } from "react";
import {
  Leaf,
  DollarSign,
  Clock,
  Info,
  Sparkles,
  Share2,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { AnalysisResult } from "../types";

interface ImpactSummaryProps {
  result: AnalysisResult;
}

export const ImpactSummary: React.FC<ImpactSummaryProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const totalGrams = result.ideas.reduce((acc, idea) => acc + (idea.estimatedGramsSaved || 0), 0);
  const totalDollars = result.ideas.reduce((acc, idea) => acc + (idea.estimatedDollarsSaved || 0), 0);

  const shareText = `I just diverted ~${totalGrams}g of waste and generated 3 upcycling inventions for an old ${result.object} with EchoEarth AI! ♻️ Check out circular living:`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://echoearth.ai";

  // Twitter / X share intent
  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}&hashtags=CircularEconomy,Upcycling,ZeroWaste,EchoEarth`;

  // LinkedIn share intent
  const linkedinIntent = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `EchoEarth AI - ${result.object} Reuse Blueprint`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyText();
    }
  }

  function handleCopyText() {
    const textToCopy = `${shareText} ${shareUrl}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Step 04</span>
            <span aria-hidden="true">·</span>
            <span>Estimated Circular Impact</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display mt-0.5 text-white">
            Resource Conservation & Life Extension
          </h2>
        </div>
        <div className="text-[11px] text-stone-400 max-w-xs flex items-start gap-1.5 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60">
          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
          <span>
            Model estimates based on virgin manufacturing weights and standard retail prices. Not independently audited carbon credits.
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Diverted Material */}
        <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/60">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
            <Leaf className="w-4 h-4" />
            <span>Waste Diverted (Potential)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            ~{totalGrams}g
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Directly redirected from municipal landfills or incineration.
          </p>
        </div>

        {/* Financial Savings */}
        <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/60">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Avoided Purchase Cost</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            ~${totalDollars}
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Estimated savings vs buying comparable utility products new in retail.
          </p>
        </div>

        {/* Degradation Timeline */}
        <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/60">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
            <Clock className="w-4 h-4" />
            <span>Landfill Persistence</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white truncate">
            {result.environmentalContext.estimatedDecompositionYears}
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Natural degradation timeframe if discarded in traditional landfills.
          </p>
        </div>
      </div>

      {/* Social Media Sharing Section */}
      <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-stone-800/80 to-stone-800/60 rounded-2xl border border-emerald-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Your Sustainability Impact</span>
          </div>
          <p className="text-xs text-stone-300 max-w-md">
            Inspire your community on social media by showcasing how you gave this {result.object} a second life.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Share to Twitter / X */}
          <a
            href={twitterIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-medium border border-stone-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter / X</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          {/* Share to LinkedIn */}
          <a
            href={linkedinIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl text-xs font-medium transition-colors shadow-xs"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
            </svg>
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>

          {/* Native Web Share or Copy */}
          {typeof navigator !== "undefined" && "share" in navigator ? (
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          ) : (
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-medium border border-stone-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy Post Text</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Educational Lifecycle Insight & Circular tip */}
      <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-stone-800/40 p-4 rounded-xl border border-stone-700/40">
          <span className="font-semibold text-emerald-300 block mb-1">
            Embodied Energy & Lifecycle:
          </span>
          <p className="text-stone-300 leading-relaxed">
            {result.environmentalContext.lifecycleNote}
          </p>
        </div>

        <div className="bg-stone-800/40 p-4 rounded-xl border border-stone-700/40">
          <span className="font-semibold text-emerald-300 block mb-1">
            Closing the Circular Loop:
          </span>
          <p className="text-stone-300 leading-relaxed">
            {result.environmentalContext.circularTip}
          </p>
        </div>
      </div>

      {/* Master Circular Tip */}
      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-200">
          <span className="font-bold text-emerald-300 block mb-0.5">
            EchoEarth Master Principle:
          </span>
          {result.overallTip}
        </div>
      </div>
    </div>
  );
};
