import React, { useState } from 'react';
import {
  Sparkles,
  Scissors,
  Smile,
  Shirt,
  Camera,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2,
  Sliders,
  Glasses,
  SunMedium,
  HeartHandshake
} from 'lucide-react';
import {
  FaceAnalysisResult,
  HairstyleSuggestion,
  FacialHairGuide,
  StyleGuide,
  PersonalizedLookGuide
} from '../types';

interface GroomingAndStyleGuideProps {
  result: FaceAnalysisResult;
}

type GuideTab = 'all' | 'look' | 'hair' | 'grooming' | 'beard' | 'style' | 'photo';

export const GroomingAndStyleGuide: React.FC<GroomingAndStyleGuideProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('all');

  const {
    beautyTips = [],
    hairstyleGuide = [],
    facialHairGuide,
    styleGuide,
    photoTips = [],
    personalizedLookGuide,
    faceShape
  } = result;

  const tabs: { id: GuideTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'all', label: 'All Guides', icon: <Layers className="w-4 h-4" /> },
    { id: 'look', label: 'Polished Look Guide', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'hair', label: 'Hairstyle Guide', icon: <Scissors className="w-4 h-4 text-sky-400" />, count: hairstyleGuide.length },
    { id: 'grooming', label: 'Beauty & Grooming', icon: <Sparkles className="w-4 h-4 text-rose-400" />, count: beautyTips.length },
    { id: 'beard', label: 'Facial Hair', icon: <Smile className="w-4 h-4 text-emerald-400" /> },
    { id: 'style', label: 'Style & Clothing', icon: <Shirt className="w-4 h-4 text-purple-400" /> },
    { id: 'photo', label: 'Photo Presentation', icon: <Camera className="w-4 h-4 text-amber-400" />, count: photoTips.length }
  ];

  return (
    <div id="grooming-style-guide-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Feature Presentation & Style Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
          Personalized Presentation & Style Guide
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Non-medical, practical suggestions designed to complement your visible facial geometry,
          natural proportions, and features without changing who you are.
        </p>
      </div>

      {/* Philosophy Callout Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5 font-medium">
            Objective, Practical Guidance:
          </strong>
          Every suggestion below is optional and tailored strictly to the visible contours of your photograph
          (such as your <span className="text-sky-300 font-semibold">{faceShape.name}</span> structure). The goal is to
          present your existing features harmoniously.
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`guide-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-10">

        {/* 19. PERSONALIZED LOOK GUIDE */}
        {(activeTab === 'all' || activeTab === 'look') && personalizedLookGuide && (
          <div id="personalized-look-guide" className="rounded-3xl p-1 bg-gradient-to-r from-amber-500/30 via-rose-500/20 to-purple-500/30">
            <div className="rounded-[22px] bg-slate-950/95 border border-white/10 p-6 sm:p-7 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Personalized Polished Look Summary
                    </h3>
                    <p className="text-xs text-slate-400">
                      If you wanted to present your current look with maximum polish, here is an integrated snapshot:
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  Quick Action Blueprint
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {/* Hair */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Hair Framing</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {personalizedLookGuide.hair}
                    </p>
                  </div>
                </div>

                {/* Grooming */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Grooming & Skin</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {personalizedLookGuide.grooming}
                    </p>
                  </div>
                </div>

                {/* Clothing */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Clothing & Collar</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {personalizedLookGuide.clothing}
                    </p>
                  </div>
                </div>

                {/* Accessories */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Glasses className="w-3.5 h-3.5" />
                      <span>Accessories & Frames</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {personalizedLookGuide.accessories}
                    </p>
                  </div>
                </div>

                {/* Photo Presentation */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between md:col-span-2">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Camera & Photo Presentation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {personalizedLookGuide.photoPresentation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 15. HAIRSTYLE GUIDE */}
        {(activeTab === 'all' || activeTab === 'hair') && hairstyleGuide && hairstyleGuide.length > 0 && (
          <div id="hairstyle-guide-container" className="rounded-2xl bg-slate-950/80 border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Hairstyle Guide for {faceShape.name} Structure
                  </h3>
                  <p className="text-xs text-slate-400">
                    Styles that could harmoniously complement your forehead height, hairline, and facial proportions:
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-sky-300">
                {hairstyleGuide.length} Recommendations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {hairstyleGuide.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-sky-400/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 border border-sky-500/30 text-sky-300">
                        Option 0{idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.length}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 font-display group-hover:text-sky-300 transition-colors">
                      {item.style}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {item.whyItCouldWork}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs">
                    <div className="flex items-start gap-1.5 text-slate-400">
                      <Sliders className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-300">Styling Direction: </span>
                        <span className="text-slate-300">{item.styling}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 14. BEAUTY & GROOMING TIPS */}
        {(activeTab === 'all' || activeTab === 'grooming') && beautyTips && beautyTips.length > 0 && (
          <div id="beauty-grooming-tips-container" className="rounded-2xl bg-slate-950/80 border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Beauty & Feature Presentation Tips
                  </h3>
                  <p className="text-xs text-slate-400">
                    Practical, non-medical recommendations for presenting your existing eyebrow, skin, and contour features:
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-rose-300">
                {beautyTips.length} Actionable Tips
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              {beautyTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:border-rose-400/30 transition-all flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-300 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 16. FACIAL HAIR GUIDE */}
        {(activeTab === 'all' || activeTab === 'beard') && facialHairGuide && (
          <div id="facial-hair-guide-container" className="rounded-2xl bg-slate-950/80 border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Facial Hair & Lower-Third Grooming Guide
                  </h3>
                  <p className="text-xs text-slate-400">
                    Observation of visible growth patterns and recommendations for jawline definition:
                  </p>
                </div>
              </div>
            </div>

            {/* Current Observation Box */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/20 mb-4 text-xs sm:text-sm text-slate-300">
              <span className="font-bold text-emerald-300 block mb-1">Visible Observation:</span>
              <p>{facialHairGuide.currentObservation}</p>
            </div>

            {/* Suggestions */}
            {facialHairGuide.suggestions && facialHairGuide.suggestions.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Suitable Grooming Approaches
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {facialHairGuide.suggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/40 border border-white/10 flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 17. STYLE & CLOTHING GUIDE */}
        {(activeTab === 'all' || activeTab === 'style') && styleGuide && (
          <div id="clothing-style-guide-container" className="rounded-2xl bg-slate-950/80 border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Shirt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Style, Collar & Accessory Guide
                  </h3>
                  <p className="text-xs text-slate-400">
                    Clothing directions, necklines, and frame shapes that harmonize with your face silhouette:
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              {/* Style Directions */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <Shirt className="w-4 h-4" />
                  <span>Style Directions</span>
                </div>
                <div className="space-y-2">
                  {(styleGuide.directions || []).map((dir, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 text-xs text-slate-200 font-medium">
                      • {dir}
                    </div>
                  ))}
                </div>
              </div>

              {/* Collars & Necklines */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-sky-300">
                  <Sliders className="w-4 h-4" />
                  <span>Collars & Necklines</span>
                </div>
                <div className="space-y-2">
                  {(styleGuide.collarsAndNecklines || []).map((col, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 text-xs text-slate-200 leading-relaxed">
                      {col}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Glasses className="w-4 h-4" />
                  <span>Accessories & Eyewear</span>
                </div>
                <div className="space-y-2">
                  {(styleGuide.accessories || []).map((acc, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 text-xs text-slate-200 leading-relaxed">
                      {acc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 18. PHOTO & PRESENTATION TIPS */}
        {(activeTab === 'all' || activeTab === 'photo') && photoTips && photoTips.length > 0 && (
          <div id="photo-presentation-tips-container" className="rounded-2xl bg-slate-950/80 border border-white/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Portrait & Photo Presentation Tips
                  </h3>
                  <p className="text-xs text-slate-400">
                    Practical suggestions for camera angle, lighting, and framing to capture your facial structure accurately:
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-amber-300">
                {photoTips.length} Photography Tips
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              {photoTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:border-amber-400/30 transition-all flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-300 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
