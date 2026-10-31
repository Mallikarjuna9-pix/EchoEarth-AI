import React, { useState } from "react";
import {
  Clock,
  DollarSign,
  Wrench,
  Package,
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ReuseIdea } from "../types";

interface InventionCardProps {
  idea: ReuseIdea;
  index: number;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onAskAboutIdea?: (ideaTitle: string) => void;
}

export const InventionCard: React.FC<InventionCardProps> = ({
  idea,
  index,
  isCompleted = false,
  onToggleComplete,
  onAskAboutIdea,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const totalSteps = idea.steps.length;
  const progressPercent = totalSteps > 0
    ? Math.round((completedSteps.length / totalSteps) * 100)
    : 0;

  function toggleStep(stepIdx: number) {
    let next: number[];
    if (completedSteps.includes(stepIdx)) {
      next = completedSteps.filter((s) => s !== stepIdx);
    } else {
      next = [...completedSteps, stepIdx];
      // If all steps now completed, trigger confetti!
      if (next.length === totalSteps) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
        if (onToggleComplete && !isCompleted) {
          onToggleComplete();
        }
      }
    }
    setCompletedSteps(next);
  }

  function handleCompleteBadgeClick() {
    if (onToggleComplete) {
      if (!isCompleted) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
        // Also check all steps
        setCompletedSteps(idea.steps.map((_, i) => i));
      }
      onToggleComplete();
    }
  }

  const difficultyColors = {
    Easy: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-700 bg-amber-50 border-amber-200",
    Hard: "text-rose-700 bg-rose-50 border-rose-200",
  }[idea.difficulty] || "text-stone-700 bg-stone-100 border-stone-200";

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
        isCompleted
          ? "bg-emerald-50/30 border-emerald-300 shadow-sm"
          : "bg-white border-stone-200 shadow-xs hover:shadow-md"
      }`}
    >
      {/* Card Header */}
      <div className="p-6 sm:p-7 border-b border-stone-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              0{index + 1}
            </span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {idea.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-0.5 rounded-md font-semibold border ${difficultyColors}`}>
              {idea.difficulty}
            </span>
            <span className="text-stone-400" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-stone-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {idea.time}
            </span>
            <span className="text-stone-400" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold font-mono">
              <DollarSign className="w-3.5 h-3.5" />
              {idea.estimatedCostUSD}
            </span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-2">
          {idea.title}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          {idea.description}
        </p>

        {/* Quick Impact metrics bar */}
        <div className="mt-4 pt-4 border-t border-stone-100/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-stone-600">
              <span className="text-stone-400">Diverts:</span>
              <span className="font-semibold text-emerald-700 font-mono">
                ~{idea.estimatedGramsSaved}g waste
              </span>
            </div>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5 text-stone-600">
              <span className="text-stone-400">Saves vs New:</span>
              <span className="font-semibold text-amber-700 font-mono">
                ~${idea.estimatedDollarsSaved}
              </span>
            </div>
          </div>

          <button
            onClick={handleCompleteBadgeClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              isCompleted
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-stone-700"
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5" />
                <span>Mark as Built</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Materials & Tools checklist */}
      <div className="p-6 sm:p-7 bg-stone-50/60 border-b border-stone-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Materials */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-stone-800 mb-2">
              <Package className="w-3.5 h-3.5 text-emerald-700" />
              <span>Materials Needed</span>
            </div>
            <ul className="space-y-1 text-stone-600">
              {idea.materials.map((m, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">›</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-stone-800 mb-2">
              <Wrench className="w-3.5 h-3.5 text-stone-700" />
              <span>Common Tools</span>
            </div>
            <ul className="space-y-1 text-stone-600">
              {idea.tools.map((t, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">›</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Instructions */}
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Step-by-Step Build Guide
            </span>
            <span className="text-xs text-stone-500 font-mono">
              ({completedSteps.length}/{totalSteps} completed)
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-400 hover:text-stone-600 p-1 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Step progress bar */}
        <div className="w-full bg-stone-100 rounded-full h-1.5 mb-4 overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isExpanded && (
          <div className="space-y-2.5">
            {idea.steps.map((step, sIdx) => {
              const isStepDone = completedSteps.includes(sIdx);
              return (
                <div
                  key={sIdx}
                  onClick={() => toggleStep(sIdx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${
                    isStepDone
                      ? "bg-emerald-50/50 border-emerald-200 text-stone-500 line-through"
                      : "bg-white border-stone-200 hover:border-emerald-300 text-stone-800"
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 text-emerald-600 focus:outline-hidden"
                  >
                    {isStepDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300" />
                    )}
                  </button>
                  <div className="flex-1">
                    <span className="font-semibold mr-1.5 text-stone-900">
                      Step {sIdx + 1}:
                    </span>
                    <span>{step}</span>
                  </div>
                </div>
              );
            })}

            {/* Pro Tips */}
            {idea.proTips && idea.proTips.length > 0 && (
              <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-stone-700 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-900 block mb-0.5">
                    Craftsman Tip:
                  </span>
                  <span>{idea.proTips.join(" ")}</span>
                </div>
              </div>
            )}

            {/* Environmental Impact Note */}
            <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-600">
              <span className="font-semibold text-stone-800 mr-1.5">Impact:</span>
              <span>{idea.impact}</span>
            </div>

            {/* Ask AI Advisor about this idea */}
            {onAskAboutIdea && (
              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => onAskAboutIdea(idea.title)}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Advisor about crafting this</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
