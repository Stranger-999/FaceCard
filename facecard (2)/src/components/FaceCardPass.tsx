import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Download,
  Share2,
  Check,
  ShieldCheck,
  Crown,
  Instagram,
  Compass,
  Users
} from 'lucide-react';
import { FaceAnalysisResult } from '../types';
import { StoryCardModal } from './StoryCardModal';
import { FaceCardLogo } from './FaceCardLogo';
import {
  renderFaceCardCanvas,
  downloadCanvasAsPng,
  StoryAspectRatio
} from '../utils/cardExporter';

interface FaceCardPassProps {
  result: FaceAnalysisResult;
  onRetake: () => void;
}

export const FaceCardPass: React.FC<FaceCardPassProps> = ({ result, onRetake }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [activeModalRatio, setActiveModalRatio] = useState<StoryAspectRatio>('9:16');
  const [downloadSuccess9x16, setDownloadSuccess9x16] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopySummary = () => {
    const text = `✨ FACECARD VISUAL DISCOVERY\n` +
      `Face Signature: ${result.faceSignature}\n` +
      `Vibe: ${result.vibe}\n` +
      `Face Shape: ${result.faceShape.name} (${result.faceShape.description})\n\n` +
      `What Stands Out:\n` +
      (result.whatStandsOut || []).map((s, i) => `${i + 1}. ${s}`).join('\n') +
      `\n\nDiscover what makes your face visually yours at FaceCard!`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Direct 1-click download for 9:16 Instagram story card
  const handleQuickDownload9x16 = async () => {
    setIsDownloading(true);
    try {
      const canvas = await renderFaceCardCanvas(result, '9:16');
      downloadCanvasAsPng(canvas, `FaceCard-VisualDiscovery-9x16.png`);
      setDownloadSuccess9x16(true);
      setTimeout(() => setDownloadSuccess9x16(false), 3000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const openStoryModal = (ratio: StoryAspectRatio = '9:16') => {
    setActiveModalRatio(ratio);
    setIsStoryModalOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      {/* Top Bar with Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Discovery Complete</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Your Official FaceCard Pass
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Discovering the visible traits, contours, and characteristics that make your face uniquely yours.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            id="share-card-btn"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-white/20 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Share Discovery</span>
              </>
            )}
          </button>

          {/* Quick 1-Click 9:16 Insta Story Download */}
          <button
            id="download-9-16-story-btn"
            onClick={handleQuickDownload9x16}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-lg shadow-rose-500/25 transition-all"
            title="Download 9:16 Instagram Story Card"
          >
            {downloadSuccess9x16 ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Story Saved!</span>
              </>
            ) : (
              <>
                <Instagram className="w-3.5 h-3.5" />
                <span>{isDownloading ? 'Exporting...' : 'Insta Story (9:16)'}</span>
              </>
            )}
          </button>

          {/* Format options modal trigger */}
          <button
            id="open-story-modal-btn"
            onClick={() => openStoryModal('9:16')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 transition-colors"
            title="Choose aspect ratio (9:16, 9:11, Landscape)"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>More Formats</span>
          </button>

          {/* Jump to Style & Grooming Guide */}
          <button
            id="jump-to-guide-btn"
            onClick={() => {
              const el = document.getElementById('grooming-style-guide-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-colors"
            title="Jump to Hair, Grooming, and Style Guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Look & Style Guide</span>
          </button>
        </div>
      </div>

      {/* The Official FaceCard Physical Pass */}
      <div
        ref={cardRef}
        id="official-facecard-pass"
        className="relative rounded-3xl p-1 bg-gradient-to-tr from-rose-500/40 via-purple-500/30 to-sky-400/40 shadow-2xl shadow-rose-500/10 transition-all"
      >
        <div className="relative rounded-[22px] bg-slate-950/95 backdrop-blur-xl border border-white/10 p-6 sm:p-8 overflow-hidden holo-sheen">
          {/* Top Row: Brand & Signature Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FaceCardLogo
                size="md"
                showWordmark={true}
                badgeText="DISCOVERY PASS"
              />
              <div className="hidden sm:block pl-3 border-l border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-mono tracking-wider">
                    #{result.id.toUpperCase().slice(0, 14)}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] text-emerald-400 font-medium block">
                  Ephemeral Memory • Zero Cloud Storage
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Face Signature Verified</span>
              </span>
            </div>
          </div>

          {/* Main Pass Body: Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Portrait & Archetype */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 group">
                <img
                  src={result.userImage}
                  alt="Analyzed portrait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

                {/* Corner aesthetic badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/15">
                  VERIFIED SCAN
                </div>

                {/* Vibe & Shape over photo */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                  <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-white/15 text-xs font-semibold text-rose-300 truncate">
                    ✨ {result.vibe}
                  </div>
                  <div className="px-2.5 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-sky-300 truncate">
                    📐 {result.faceShape.name} Shape
                  </div>
                </div>
              </div>

              {/* Photo conditions reassurance */}
              {result.photoConditions && (
                <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-400 w-full max-w-[280px]">
                  <span className="font-semibold text-slate-300 block mb-0.5">Photo Assessment:</span>
                  {result.photoConditions}
                </div>
              )}
            </div>

            {/* Right Column: Perceptive Summary, Standouts & Face Signature */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Perceptive Summary */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-900/50 border border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    Visual Perception
                  </span>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                {/* WHAT STANDS OUT (The 2-3 most distinctive characteristics) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      <span>What Makes This Face Distinctive</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Top Visual Anchors
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {(result.whatStandsOut || []).map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-rose-400/30 transition-all flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-300 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROMINENT FACE SIGNATURE BANNER */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/15 via-purple-500/15 to-amber-500/15 border border-rose-500/30 shadow-lg relative overflow-hidden">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-300 mb-1.5">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>Your Face Signature</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white tracking-wide font-display">
                    {result.faceSignature}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    The defining visual constellation that gives your facial silhouette its distinct character.
                  </p>
                </div>
              </div>

              {/* Bottom Details (Face shape & symmetry note) */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span className="text-slate-300">
                    Structure: <strong className="text-white">{result.faceShape.name}</strong> — {result.faceShape.description}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Client-Side Privacy</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIMILAR FACIAL ARCHITECTURE (Celebrity Comparisons for Structural Traits) */}
          {((result.celebrityReferences && result.celebrityReferences.length > 0) ||
            (result.similarCelebrities && result.similarCelebrities.length > 0)) && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                      Similar Facial Architecture
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Public figures who share similar visible structural features (e.g., eye shape, brow arch, or jawline geometry):
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-3">
                {(result.celebrityReferences || result.similarCelebrities || []).map((celeb, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/25 hover:border-purple-400/40 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">🌟</span>
                      <strong className="text-sm font-bold text-white">
                        {celeb.name}
                      </strong>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {celeb.reason || celeb.sharedFeatures}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dedicated Instagram Story Download Banner (9:16) */}
      <div
        id="insta-story-download-banner"
        className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900 border border-pink-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 shrink-0">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                Instagram Story Card Ready (9:16 Ratio)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                1080 × 1920px Fullscreen
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 max-w-lg">
              Formatted in fullscreen <strong>9:16 ratio</strong> with safe margins for Instagram Stories, Reels, and TikTok — showing your Face Signature and visual highlights.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            id="banner-download-9-16-btn"
            onClick={handleQuickDownload9x16}
            disabled={isDownloading}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-500/20 transition-all disabled:opacity-50"
          >
            {downloadSuccess9x16 ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved 9:16 PNG!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Exporting...' : 'Download 9:16 Story'}</span>
              </>
            )}
          </button>

          <button
            id="banner-preview-modal-btn"
            onClick={() => openStoryModal('9:16')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 text-xs font-medium transition-colors"
          >
            Preview & Formats
          </button>
        </div>
      </div>

      {/* Interactive Story Card Export Modal */}
      <StoryCardModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        result={result}
        initialRatio={activeModalRatio}
      />
    </div>
  );
};
