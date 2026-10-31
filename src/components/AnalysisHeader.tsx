import React from "react";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Download,
  MessageSquare,
  HelpCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import { AnalysisResult } from "../types";
import { downloadReportFile } from "../utils/reportGenerator";

interface AnalysisHeaderProps {
  result: AnalysisResult;
  previewUrl: string | null;
  onOpenAdvisor: () => void;
  onPrint: () => void;
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({
  result,
  previewUrl,
  onOpenAdvisor,
  onPrint,
}) => {
  const confidenceColor =
    result.confidence === "High"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : result.confidence === "Medium"
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-stone-700 bg-stone-100 border-stone-200";

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Step 02</span>
            <span aria-hidden="true">·</span>
            <span>Material Forensics & Integrity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display mt-1">
            {result.object}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
            <span className="font-medium text-stone-700">{result.material}</span>
            <span aria-hidden="true">·</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${confidenceColor}`}>
              <ShieldCheck className="w-3 h-3" />
              {result.confidence} Confidence
            </span>
          </div>
        </div>

        {/* Blueprint Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => downloadReportFile(result)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>Export Blueprint</span>
          </button>

          <button
            onClick={onOpenAdvisor}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ask EchoAdvisor</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visual preview & Forensics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Photo Preview & Condition */}
        {previewUrl && (
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner relative">
              <img
                src={previewUrl}
                alt={result.object}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 text-xs">
              <span className="font-semibold text-stone-800 block mb-1">
                Visible Structural Condition:
              </span>
              <p className="text-stone-600 leading-relaxed">{result.condition}</p>
            </div>
          </div>
        )}

        {/* Insights & Safety Warnings */}
        <div className={previewUrl ? "lg:col-span-8 space-y-4" : "lg:col-span-12 space-y-4"}>
          {/* Reuse Potential Box */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Upcycling Potential & Durability</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {result.reusePotential}
            </p>
          </div>

          {/* Safety Protocols */}
          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Important Safety & Handling Protocols</span>
            </div>
            <ul className="space-y-1.5">
              {result.safetyNotes.map((note, idx) => (
                <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsible Disposal Alternative */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-stone-800 block">
                Responsible Disposal (If Not Reusing):
              </span>
              <p className="text-stone-600 mt-0.5">{result.disposalAdvice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
