import React from "react";
import { Sparkles, Sprout, Home, Scissors, Bird, Wrench } from "lucide-react";

interface HeroProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: "all", label: "All Projects", icon: Sparkles },
    { id: "Gardening & Plants", label: "Gardening & Plants", icon: Sprout },
    { id: "Home & Desk Organization", label: "Home Organization", icon: Home },
    { id: "Kids & Crafts", label: "Kids & Crafts", icon: Scissors },
    { id: "Pet Care & Birds", label: "Wildlife & Pets", icon: Bird },
    { id: "Workshop & Utility", label: "Workshop & Utility", icon: Wrench },
  ];

  return (
    <section className="pt-12 pb-8 text-center px-4 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-3">
        <span>Waste Has a Future. AI Finds It.</span>
        <span aria-hidden="true">·</span>
        <span>ECHOEARTH AI</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display leading-[1.15]">
        See the waste. Discover the worth. <br />
        <span className="text-emerald-700 underline decoration-emerald-200 decoration-wavy decoration-2">
          Create the future.
        </span>
      </h1>

      <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
        Upload a photo of any discarded bottle, cardboard box, worn textile, glass jar, or can.
        EchoEarth identifies the material, evaluates condition and structural safety, and generates three tailored upcycling blueprints.
      </p>

      {/* Category Preference Selector */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-xs font-medium text-stone-500 mb-2">
          Focus your invention recommendations:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl border border-stone-300/80 max-w-3xl">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-stone-900 shadow-sm font-semibold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-stone-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
