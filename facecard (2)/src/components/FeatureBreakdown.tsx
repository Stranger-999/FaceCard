import React, { useState } from 'react';
import {
  Eye,
  Sparkles,
  Layers,
  Compass,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { FaceAnalysisResult, FeatureDetail } from '../types';

interface FeatureBreakdownProps {
  features: FaceAnalysisResult['features'];
  facialStructure: string;
}

interface FeatureMeta {
  key: keyof FaceAnalysisResult['features'];
  title: string;
  icon: string;
  badge: string;
  accentGradient: string;
}

const FEATURE_METAS: FeatureMeta[] = [
  {
    key: 'eyes',
    title: 'Eyes',
    icon: '👁️',
    badge: 'Upper Third Anchor',
    accentGradient: 'from-sky-500/15 via-blue-500/10 to-transparent'
  },
  {
    key: 'eyebrows',
    title: 'Eyebrows',
    icon: '🤨',
    badge: 'Orbital Frame',
    accentGradient: 'from-indigo-500/15 via-purple-500/10 to-transparent'
  },
  {
    key: 'nose',
    title: 'Nose & Midface',
    icon: '👃',
    badge: 'Vertical Center Axis',
    accentGradient: 'from-amber-500/15 via-orange-500/10 to-transparent'
  },
  {
    key: 'lips',
    title: 'Lips & Contour',
    icon: '👄',
    badge: 'Lower Third Focus',
    accentGradient: 'from-rose-500/15 via-pink-500/10 to-transparent'
  },
  {
    key: 'jawAndChin',
    title: 'Jawline & Chin',
    icon: '📐',
    badge: 'Structural Base',
    accentGradient: 'from-teal-500/15 via-emerald-500/10 to-transparent'
  },
  {
    key: 'skinAppearance',
    title: 'Skin Appearance',
    icon: '✨',
    badge: 'Tone & Surface Finish',
    accentGradient: 'from-purple-500/15 via-pink-500/10 to-transparent'
  }
];

export const FeatureBreakdown: React.FC<FeatureBreakdownProps> = ({
  features,
  facialStructure
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredMetas = activeFilter === 'all'
    ? FEATURE_METAS
    : FEATURE_METAS.filter((m) => m.key === activeFilter);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visible Anatomical Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Facial Feature Characteristics
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Detailed exploration of your visible shapes, contours, and proportion relationships — discovering what makes each feature distinctive without arbitrary ratings.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            All Features
          </button>
          {FEATURE_METAS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveFilter(m.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === m.key
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMetas.map((meta) => {
          const detail: FeatureDetail = features[meta.key];
          if (!detail) return null;

          return (
            <div
              key={meta.key}
              id={`feature-card-${meta.key}`}
              className="relative rounded-2xl bg-slate-950/80 border border-white/10 p-6 sm:p-7 shadow-xl hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Subtle top-corner gradient sheen */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br ${meta.accentGradient} blur-2xl pointer-events-none -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700`}
              />

              <div>
                {/* Header: Icon, Title & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl select-none" role="img" aria-label={meta.title}>
                      {meta.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                        {meta.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400">
                        {meta.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual Characteristic Description */}
                <div className="mb-5">
                  <p className="text-sm text-slate-200 leading-relaxed font-normal">
                    {detail.description}
                  </p>
                </div>
              </div>

              {/* WHAT STANDS OUT Distinctive Callout */}
              <div className="mt-2 rounded-xl bg-slate-900/90 border border-rose-500/25 p-3.5 relative overflow-hidden">
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>What Stands Out</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {detail.distinctive}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Holistic Facial Structure & Balance Banner */}
      {facialStructure && (
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-300">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Facial Structure & Proportions
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {facialStructure}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
