export interface ReuseIdea {
  title: string;
  category: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  materials: string[];
  tools: string[];
  steps: string[];
  proTips?: string[];
  estimatedCostUSD: string;
  impact: string;
  estimatedGramsSaved: number;
  estimatedDollarsSaved: number;
}

export interface EnvironmentalContext {
  estimatedDecompositionYears: string;
  lifecycleNote: string;
  circularTip: string;
}

export interface AnalysisResult {
  object: string;
  material: string;
  confidence: "High" | "Medium" | "Low";
  condition: string;
  reusePotential: string;
  safetyNotes: string[];
  disposalAdvice: string;
  ideas: ReuseIdea[];
  overallTip: string;
  environmentalContext: EnvironmentalContext;
}

export interface SavedScan {
  id: string;
  date: string;
  timestamp: number;
  objectName: string;
  material: string;
  thumbnail: string;
  result: AnalysisResult;
  completedIdeas?: string[];
}

export interface SampleItem {
  id: string;
  name: string;
  category: string;
  materialGuess: string;
  imageUrl: string;
  description: string;
}
