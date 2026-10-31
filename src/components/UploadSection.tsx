import React, { useState, useRef, DragEvent } from "react";
import { UploadCloud, Camera, Trash2, ArrowRight, Loader2, Image as ImageIcon } from "lucide-react";
import { SAMPLE_WASTE_ITEMS } from "../data/sampleItems";
import { DEMO_WASTE_PHOTOS } from "../data/demoImages";
import { SampleItem } from "../types";
import { CameraCapture } from "./CameraCapture";
import { optimizeImageForAnalysis } from "../utils/imageOptimizer";

interface UploadSectionProps {
  onAnalyze: (imageSrc: string, mimeType: string) => void;
  isLoading: boolean;
  selectedPreview: string | null;
  onClearPreview: () => void;
  onSelectSample: (sample: SampleItem) => void;
  skillLevel: string;
  onSkillLevelChange: (level: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onAnalyze,
  isLoading,
  selectedPreview,
  onClearPreview,
  onSelectSample,
  skillLevel,
  onSkillLevelChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Loading animation step messages
  const [loadingStep, setLoadingStep] = useState(0);

  React.useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, [isLoading]);

  const stepMessages = [
    "Identifying polymer & composite materials...",
    "Assessing visible condition & structural integrity...",
    "Evaluating non-toxic safety boundaries...",
    "Engineering three practical upcycling blueprints...",
  ];

  async function handleFile(file: File) {
    setErrorMessage("");
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("File exceeds 20 MB limit. Please choose a smaller photo.");
      return;
    }

    try {
      // Optimize & scale down client-side for blazing fast upload & AI processing
      const optimized = await optimizeImageForAnalysis(file);
      onAnalyze(optimized.dataUrl, optimized.mimeType);
    } catch (e: any) {
      // Fallback to basic file reader
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) onAnalyze(result, file.type);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  return (
    <section className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-8 transition-all">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-100 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>Step 01</span>
              <span aria-hidden="true">·</span>
              <span>Input Object</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-0.5">
              Show us what you plan to discard
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Upload a clear photograph of a single bottle, box, container, textile, or utensil.
            </p>
          </div>

          {/* Skill Level Selection */}
          <div className="flex items-center gap-2 self-start sm:self-center bg-stone-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => onSkillLevelChange("Beginner (No power tools)")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                skillLevel.includes("Beginner")
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Beginner Friendly
            </button>
            <button
              onClick={() => onSkillLevelChange("Intermediate")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                !skillLevel.includes("Beginner")
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              All DIY Tools
            </button>
          </div>
        </div>

        {/* Upload Dropzone / Preview */}
        {!selectedPreview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center relative group ${
              isDragging
                ? "border-emerald-500 bg-emerald-50/50 scale-[1.005]"
                : "border-stone-300 hover:border-emerald-600/70 hover:bg-stone-50/70 bg-stone-50/40"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>

            <p className="text-base font-semibold text-stone-900">
              Drag & drop your waste item photo here
            </p>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              or click to browse your files (JPG, PNG, WebP up to 15MB)
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onSelectSample(SAMPLE_WASTE_ITEMS[0])}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-xs"
              >
                <span>⚡ Instant Demo: Plastic Bottle</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSample(SAMPLE_WASTE_ITEMS[1])}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium transition-all"
              >
                <span>📦 Cardboard Box</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSample(SAMPLE_WASTE_ITEMS[3])}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium transition-all"
              >
                <span>🥫 Soda Can</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium transition-colors shadow-xs"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span>Take Photo</span>
              </button>
            </div>
          </div>
        ) : (
          /* Preview state */
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50 p-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-full sm:w-48 h-48 rounded-xl overflow-hidden bg-stone-200 shadow-inner shrink-0">
                <img
                  src={selectedPreview}
                  alt="Waste item preview"
                  className="w-full h-full object-cover"
                />
                {!isLoading && (
                  <button
                    onClick={onClearPreview}
                    title="Remove item"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                {isLoading ? (
                  <div className="space-y-3 py-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 font-semibold text-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>EchoEarth AI Analysis in progress...</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 font-mono transition-opacity duration-300">
                      {stepMessages[loadingStep]}
                    </p>
                    {/* Animated Progress Bar */}
                    <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden max-w-md">
                      <div className="bg-emerald-600 h-full w-2/3 animate-pulse rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-base font-semibold text-stone-900">
                      Photo Ready for Analysis
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 max-w-md">
                      Item loaded. Click below to inspect polymer composition and generate upcycling blueprints.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <button
                        onClick={() => onAnalyze(selectedPreview, "image/jpeg")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-950/20"
                      >
                        <span>Analyze & Generate Inventions</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={onClearPreview}
                        className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-medium transition-colors"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Preset Sample Gallery */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Or test with common discarded items:
            </span>
            <span className="text-xs text-stone-400">1-click demo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {SAMPLE_WASTE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectSample(item)}
                disabled={isLoading}
                className="group text-left p-2 rounded-xl border border-stone-200 hover:border-emerald-500/80 hover:bg-emerald-50/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="text-[11px] font-medium text-stone-900 line-clamp-1 group-hover:text-emerald-700">
                  {item.name}
                </div>
                <div className="text-[10px] text-stone-500">{item.materialGuess}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Webcam modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={async (imgData) => {
          try {
            const opt = await optimizeImageForAnalysis(imgData);
            onAnalyze(opt.dataUrl, opt.mimeType);
          } catch {
            onAnalyze(imgData, "image/jpeg");
          }
        }}
      />
    </section>
  );
};
