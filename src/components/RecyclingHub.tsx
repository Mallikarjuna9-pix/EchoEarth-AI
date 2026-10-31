import React, { useState } from "react";
import {
  Search,
  Recycle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Filter,
  Package,
  Layers,
  HelpCircle,
} from "lucide-react";
import {
  RESIN_CODES,
  MATERIAL_GUIDES,
  RECYCLING_DIRECTORY_ITEMS,
  ResinCodeInfo,
} from "../data/recyclingDirectory";

interface RecyclingHubProps {
  onSelectSampleForAnalysis?: (itemName: string) => void;
}

export const RecyclingHub: React.FC<RecyclingHubProps> = ({
  onSelectSampleForAnalysis,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeResin, setActiveResin] = useState<ResinCodeInfo | null>(RESIN_CODES[0]);
  const [activeTab, setActiveTab] = useState<"lookup" | "resincodes" | "guides">("lookup");

  const categories = [
    "All",
    "Plastics",
    "Paper & Cardboard",
    "Glass",
    "Metals",
    "Textiles",
    "Electronics & Hazardous",
    "Organics",
  ];

  // Filter items
  const filteredItems = RECYCLING_DIRECTORY_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.preparation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.upcycleIdea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
          <Recycle className="w-4 h-4 text-emerald-600" />
          <span>Circular Materials Reference</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
          Everything You Need to Know About Recycling
        </h2>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
          Search items to check if they belong in curbside bins, learn the #1–#7 plastic resin codes, and avoid contamination.
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 inline-flex p-1 bg-stone-200/80 rounded-xl border border-stone-300/80 text-xs font-medium">
          <button
            onClick={() => setActiveTab("lookup")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "lookup"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            "Can I Recycle This?" Search
          </button>
          <button
            onClick={() => setActiveTab("resincodes")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "resincodes"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            #1–#7 Resin Codes
          </button>
          <button
            onClick={() => setActiveTab("guides")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "guides"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Material Rules (Do's & Don'ts)
          </button>
        </div>
      </div>

      {/* Tab 1: Search & "Can I Recycle This?" Tool */}
      {activeTab === "lookup" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs">
            <div className="relative mb-4">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any waste item (e.g., pizza box, plastic bottle, batteries, egg carton)..."
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.length === 0 ? (
              <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-stone-200 p-6">
                <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-stone-800">
                  No matching items found
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try searching a generic material term like "bottle", "box", "can", "glass", or "plastic".
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:border-emerald-500/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 font-display">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold shrink-0 border ${
                          item.curbside
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.disposalMethod.includes("Specialized")
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {item.disposalMethod}
                      </span>
                    </div>

                    <div className="space-y-2 mt-3 text-xs text-stone-600">
                      <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60">
                        <span className="font-semibold text-stone-800 block mb-0.5 text-[11px]">
                          How to Prepare:
                        </span>
                        <p className="leading-relaxed">{item.preparation}</p>
                      </div>

                      <div className="p-2.5 bg-emerald-50/40 rounded-xl border border-emerald-100 text-emerald-950">
                        <span className="font-semibold text-emerald-900 block mb-0.5 text-[11px]">
                          Second-Life Upcycle Idea:
                        </span>
                        <p className="leading-relaxed">{item.upcycleIdea}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Resin Codes #1–#7 */}
      {activeTab === "resincodes" && (
        <div className="space-y-6">
          {/* Grid of 7 Resin Codes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {RESIN_CODES.map((resin) => {
              const isSelected = activeResin?.code === resin.code;
              return (
                <button
                  key={resin.code}
                  onClick={() => setActiveResin(resin)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                      : "bg-white border-stone-200 hover:border-emerald-500/60 text-stone-800"
                  }`}
                >
                  <div className="text-2xl font-bold font-mono">{resin.symbol}</div>
                  <div className="text-xs font-extrabold mt-1">#{resin.code}</div>
                  <div className="text-[10px] truncate opacity-80">{resin.name}</div>
                </button>
              );
            })}
          </div>

          {/* Active Resin Detailed Dossier */}
          {activeResin && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl font-bold">
                    {activeResin.symbol}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 font-display">
                      Resin #{activeResin.code}: {activeResin.name}
                    </h3>
                    <p className="text-xs text-stone-500">{activeResin.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                    {activeResin.curbsideAccepted}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-stone-800 block mb-1 text-xs">
                      Common Everyday Products:
                    </span>
                    <ul className="space-y-1 text-stone-600">
                      {activeResin.commonProducts.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">›</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-800 block mb-1 text-xs">
                      Recycled Into:
                    </span>
                    <ul className="space-y-1 text-stone-600">
                      {activeResin.recycledInto.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-stone-400 font-bold">›</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-950">
                    <span className="font-semibold text-emerald-900 block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      EchoEarth Upcycling Advice:
                    </span>
                    <p className="text-stone-700 leading-relaxed">
                      {activeResin.upcyclingTips}
                    </p>
                  </div>

                  <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200/70 text-rose-950">
                    <span className="font-semibold text-rose-900 block mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      Health & Chemical Safety:
                    </span>
                    <p className="text-stone-700 leading-relaxed">
                      {activeResin.safetyWarning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Material Guides & Do's / Don'ts */}
      {activeTab === "guides" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MATERIAL_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4"
            >
              <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
                <h3 className="font-bold text-base text-stone-900 font-display">
                  {guide.name}
                </h3>
                <span className="text-[11px] text-stone-400 font-mono">
                  {guide.lifespanInLandfill}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {guide.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <span className="font-semibold text-emerald-900 block mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Always Do:
                  </span>
                  <ul className="space-y-1 text-stone-700 text-[11px]">
                    {guide.dos.map((d, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                  <span className="font-semibold text-rose-900 block mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Never Do:
                  </span>
                  <ul className="space-y-1 text-stone-700 text-[11px]">
                    {guide.donts.map((d, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-rose-600 font-bold">✗</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* The 5 Golden Rules Callout */}
      <div className="p-6 sm:p-8 bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>The Five Universal Rules of Circular Recycling</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <span className="font-bold text-emerald-300 block mb-1">01. Clean & Dry</span>
            <p className="text-stone-400 text-[11px]">Rinse out food liquids. Wet or oily paper ruins whole batches.</p>
          </div>
          <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <span className="font-bold text-emerald-300 block mb-1">02. No Wishcycling</span>
            <p className="text-stone-400 text-[11px]">If unsure, don't throw it in blue bin—upcycle it or look it up.</p>
          </div>
          <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <span className="font-bold text-emerald-300 block mb-1">03. Keep Caps On</span>
            <p className="text-stone-400 text-[11px]">Screw plastic bottle caps back on so optical machines don't drop them.</p>
          </div>
          <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <span className="font-bold text-emerald-300 block mb-1">04. Keep Loose</span>
            <p className="text-stone-400 text-[11px]">Never put recyclables inside tied plastic bags. Keep loose in bin.</p>
          </div>
          <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <span className="font-bold text-rose-300 block mb-1">05. No Batteries</span>
            <p className="text-stone-400 text-[11px]">Lithium batteries cause fires in trucks. Take to hardware drop-offs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
