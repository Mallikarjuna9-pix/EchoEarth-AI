import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { UploadSection } from "./components/UploadSection";
import { AnalysisHeader } from "./components/AnalysisHeader";
import { InventionCard } from "./components/InventionCard";
import { ImpactSummary } from "./components/ImpactSummary";
import { AdvisorChat } from "./components/AdvisorChat";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { RecyclingHub } from "./components/RecyclingHub";
import { PRESET_DEMO_RESULT, SAMPLE_PRESET_MAP } from "./data/sampleItems";
import { AnalysisResult, SavedScan, SampleItem } from "./types";
import { RefreshCw, Sparkles, AlertCircle, BookOpen } from "lucide-react";
import { optimizeImageForAnalysis } from "./utils/imageOptimizer";
import confetti from "canvas-confetti";

export default function App() {
  const [activeView, setActiveView] = useState<"scan" | "recycling">("scan");
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [skillLevel, setSkillLevel] = useState<string>("Beginner (No power tools)");

  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [advisorIdeaContext, setAdvisorIdeaContext] = useState<string | undefined>(undefined);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Completed projects state
  const [completedIdeas, setCompletedIdeas] = useState<Record<string, boolean>>({});

  // Saved history in localStorage
  const [savedScans, setSavedScans] = useState<SavedScan[]>(() => {
    try {
      const stored = localStorage.getItem("echoearth-saved-scans-v1");
      if (stored) return JSON.parse(stored);
      // Pre-seed with one interesting demo scan so the history drawer is immediately rich
      return [
        {
          id: "demo-bottle-1",
          date: new Date().toLocaleDateString(),
          timestamp: Date.now(),
          objectName: PRESET_DEMO_RESULT.object,
          material: PRESET_DEMO_RESULT.material,
          thumbnail:
            "https://images.unsplash.com/photo-1574974671999-24b7dfba0d53?auto=format&fit=crop&w=300&q=80",
          result: PRESET_DEMO_RESULT,
          completedIdeas: ["Self-Watering Sub-Irrigation Seed Pot"],
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("echoearth-saved-scans-v1", JSON.stringify(savedScans));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [savedScans]);

  // Main Analyze Function
  async function handleAnalyze(imageSrc: string, mimeType: string) {
    setIsLoading(true);
    setError(null);
    setSelectedPreview(imageSrc);

    try {
      let payloadImage = imageSrc;
      let payloadMime = mimeType || "image/jpeg";

      // Optimize and convert to guaranteed clean JPEG base64 via canvas
      try {
        const optimized = await optimizeImageForAnalysis(imageSrc);
        if (optimized.dataUrl) {
          payloadImage = optimized.dataUrl;
          payloadMime = "image/jpeg";
        }
      } catch (optErr) {
        console.warn("Client optimization fallback:", optErr);
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: payloadImage,
          mimeType: payloadMime,
          focusCategory: selectedCategory !== "all" ? selectedCategory : undefined,
          skillLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis request failed.");
      }

      setAnalysisResult(data);

      // Save to history
      const newScan: SavedScan = {
        id: "scan-" + Date.now(),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        objectName: data.object,
        material: data.material,
        thumbnail: imageSrc.length < 200000 ? imageSrc : "",
        result: data,
        completedIdeas: [],
      };

      setSavedScans((prev) => [newScan, ...prev.filter((s) => s.objectName !== data.object)].slice(0, 20));

      // Scroll smoothly down to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error("Analysis failure:", err);
      setError(
        err.message || "Failed to analyze image with EchoEarth AI. Please check your network or try another photo."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Fast Instant Sample Selection (0ms latency for preset items)
  function handleSelectSample(sample: SampleItem) {
    setSelectedPreview(sample.imageUrl);
    setError(null);

    // If pre-cached demo result exists, load it immediately for blazing speed!
    if (SAMPLE_PRESET_MAP[sample.id]) {
      const instantResult = SAMPLE_PRESET_MAP[sample.id];
      setAnalysisResult(instantResult);

      // Also record in history
      const newScan: SavedScan = {
        id: "preset-" + sample.id + "-" + Date.now(),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        objectName: instantResult.object,
        material: instantResult.material,
        thumbnail: sample.imageUrl,
        result: instantResult,
        completedIdeas: [],
      };
      setSavedScans((prev) => [newScan, ...prev.filter((s) => s.objectName !== instantResult.object)].slice(0, 20));

      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      handleAnalyze(sample.imageUrl, "image/jpeg");
    }
  }

  function handleClearPreview() {
    setSelectedPreview(null);
    setAnalysisResult(null);
    setError(null);
  }

  function handleSelectHistoryScan(scan: SavedScan) {
    setActiveView("scan");
    setAnalysisResult(scan.result);
    setSelectedPreview(scan.thumbnail || null);
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleDeleteScan(id: string) {
    setSavedScans((prev) => prev.filter((s) => s.id !== id));
  }

  function handleClearAllScans() {
    setSavedScans([]);
  }

  function toggleIdeaCompleted(ideaTitle: string) {
    const nextState = !completedIdeas[ideaTitle];
    if (nextState) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
    setCompletedIdeas((prev) => ({
      ...prev,
      [ideaTitle]: nextState,
    }));
  }

  function handleOpenAdvisorForIdea(ideaTitle?: string) {
    setAdvisorIdeaContext(ideaTitle);
    setIsAdvisorOpen(true);
  }

  function handlePrint() {
    window.print();
  }

  // Filter ideas if a category filter is active and ideas are returned
  const displayedIdeas = analysisResult
    ? selectedCategory === "all"
      ? analysisResult.ideas
      : [
          ...analysisResult.ideas.filter(
            (i) => i.category.toLowerCase().includes(selectedCategory.toLowerCase())
          ),
          ...analysisResult.ideas.filter(
            (i) => !i.category.toLowerCase().includes(selectedCategory.toLowerCase())
          ),
        ]
    : [];

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <div className="no-print">
        <Navbar
          savedScans={savedScans}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onReset={handleClearPreview}
          hasResult={!!analysisResult}
          onPrint={handlePrint}
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>

      <main className="flex-1 pb-24">
        {activeView === "recycling" ? (
          /* "All Recycling Things" Knowledge Hub */
          <RecyclingHub />
        ) : (
          /* AI Upcycle Studio */
          <>
            {/* Hero Section */}
            <div className="no-print">
              <Hero
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />

              {/* Quick banner leading to Recycling Hub */}
              <div className="text-center mt-2 mb-4">
                <button
                  onClick={() => setActiveView("recycling")}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-700 transition-colors font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Looking for municipal bin rules & #1–#7 resin codes? Explore the Recycling Hub →</span>
                </button>
              </div>
            </div>

            {/* Input & Upload Zone */}
            <div className="no-print mb-12">
              <UploadSection
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                selectedPreview={selectedPreview}
                onClearPreview={handleClearPreview}
                onSelectSample={handleSelectSample}
                skillLevel={skillLevel}
                onSkillLevelChange={setSkillLevel}
              />
            </div>

            {/* Error Notification */}
            {error && (
              <div className="max-w-4xl mx-auto px-4 mb-8 no-print">
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={() => {
                      setAnalysisResult(PRESET_DEMO_RESULT);
                      setError(null);
                    }}
                    className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 font-semibold rounded-lg transition-colors shrink-0"
                  >
                    Load Interactive Demo Result
                  </button>
                </div>
              </div>
            )}

            {/* Results Workspace */}
            {analysisResult && (
              <section id="results-section" className="max-w-5xl mx-auto px-4 space-y-8 animate-in fade-in duration-300">
                {/* Step 02: Material Forensics & Safety */}
                <AnalysisHeader
                  result={analysisResult}
                  previewUrl={selectedPreview}
                  onOpenAdvisor={() => handleOpenAdvisorForIdea()}
                  onPrint={handlePrint}
                />

                {/* Step 03: Three Custom Inventions */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                        <span>Step 03</span>
                        <span aria-hidden="true">·</span>
                        <span>Actionable Inventions</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-900 mt-0.5">
                        Three Custom Reuse Blueprints
                      </h3>
                    </div>

                    <div className="text-xs text-stone-500">
                      Step-by-step interactive instructions with craft tools
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {displayedIdeas.map((idea, index) => (
                      <InventionCard
                        key={index}
                        idea={idea}
                        index={index}
                        isCompleted={!!completedIdeas[idea.title]}
                        onToggleComplete={() => toggleIdeaCompleted(idea.title)}
                        onAskAboutIdea={(title) => handleOpenAdvisorForIdea(title)}
                      />
                    ))}
                  </div>
                </div>

                {/* Step 04: Environmental & Financial Impact (With Social Media Sharing) */}
                <ImpactSummary result={analysisResult} />

                {/* Bottom New Scan Banner */}
                <div className="p-6 bg-white rounded-3xl border border-stone-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-xs">
                  <div className="text-left">
                    <h4 className="font-bold text-stone-900 font-display">
                      Have another item to repurpose?
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Try cardboard boxes, egg cartons, old clothing, tins, or jars.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedPreview && (
                      <button
                        onClick={() => handleAnalyze(selectedPreview, "image/jpeg")}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Regenerate with Gemini AI</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        handleClearPreview();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Scan Another Item</span>
                    </button>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Floating Ask Advisor Button always available */}
      {!isAdvisorOpen && (
        <button
          onClick={() => handleOpenAdvisorForIdea()}
          className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-2xl shadow-xl shadow-emerald-950/30 transition-all no-print hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>Ask EchoAdvisor</span>
        </button>
      )}

      {/* Advisor Chat Drawer/Modal */}
      <AdvisorChat
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        result={analysisResult || PRESET_DEMO_RESULT}
        selectedIdeaTitle={advisorIdeaContext}
      />

      {/* Saved History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedScans={savedScans}
        onSelectScan={handleSelectHistoryScan}
        onDeleteScan={handleDeleteScan}
        onClearAll={handleClearAllScans}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-8 border-t border-stone-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-stone-200">EchoEarth AI</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-300">© 2026 EchoEarth AI. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <button
              onClick={() => {
                setActiveView("recycling");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              #1–#7 Resin Decoder
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveView("scan");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              AI Upcycle Studio
            </button>
          </div>

          <div className="text-[11px] text-stone-500 text-center sm:text-right">
            Always verify local safety, non-toxicity, and municipal recycling rules.
          </div>
        </div>
      </footer>
    </div>
  );
}
