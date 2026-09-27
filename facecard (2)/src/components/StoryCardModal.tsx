import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Smartphone,
  Sparkles,
  Maximize2,
  Layers
} from 'lucide-react';
import { FaceAnalysisResult } from '../types';
import {
  renderFaceCardCanvas,
  downloadCanvasAsPng,
  StoryAspectRatio
} from '../utils/cardExporter';

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: FaceAnalysisResult;
  initialRatio?: StoryAspectRatio;
}

export const StoryCardModal: React.FC<StoryCardModalProps> = ({
  isOpen,
  onClose,
  result,
  initialRatio = '9:16',
}) => {
  const [activeRatio, setActiveRatio] = useState<StoryAspectRatio>(initialRatio);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Re-render preview canvas whenever activeRatio changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    renderFaceCardCanvas(result, activeRatio)
      .then((canvas) => {
        if (!isMounted) return;
        canvasRef.current = canvas;
        const dataUrl = canvas.toDataURL('image/png');
        setPreviewUrl(dataUrl);
      })
      .catch((err) => {
        console.error('Error generating card canvas:', err);
      })
      .finally(() => {
        if (isMounted) setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, activeRatio, result]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const ratioName = activeRatio.replace(':', 'x');
    const filename = `FaceCard-VisualDiscovery-${ratioName}.png`;
    downloadCanvasAsPng(canvasRef.current, filename);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } else {
          // Fallback: copy textual pass summary
          const summary = `✨ FACECARD VISUAL DISCOVERY\nFace Signature: ${result.faceSignature}\nVibe: ${result.vibe}\nShape: ${result.faceShape.name}\nDiscover what makes your face visually yours at FaceCard!`;
          await navigator.clipboard.writeText(summary);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      }, 'image/png');
    } catch (e) {
      console.warn('Clipboard copy not permitted, falling back to download:', e);
      handleDownload();
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    try {
      if (navigator.share && navigator.canShare) {
        canvasRef.current.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `FaceCard-VisualSignature.png`, {
            type: 'image/png',
          });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `FaceCard Visual Signature: ${result.faceSignature}`,
              text: `Discover what makes your face distinctive: ✨ ${result.faceSignature} (${result.vibe})`,
              files: [file],
            });
          } else {
            handleDownload();
          }
        });
      } else {
        handleDownload();
      }
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  return (
    <div
      id="story-download-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl text-white my-auto">
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
            <Smartphone className="w-4 h-4" />
            <span>Instagram Story Export Ready</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Download Your FaceCard Pass
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            High-definition PNG optimized for social media stories and profile highlights.
          </p>
        </div>

        {/* Aspect Ratio Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950/70 border border-white/10 rounded-2xl mb-5">
          <button
            id="ratio-9-16-btn"
            onClick={() => setActiveRatio('9:16')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeRatio === '9:16'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
            <span>9:16 Insta Story</span>
            <span className="hidden sm:inline text-[10px] opacity-75">(1080×1920)</span>
          </button>

          <button
            id="ratio-9-11-btn"
            onClick={() => setActiveRatio('9:11')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeRatio === '9:11'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>9:11 Compact</span>
            <span className="hidden sm:inline text-[10px] opacity-75">(1080×1320)</span>
          </button>

          <button
            id="ratio-12-7-btn"
            onClick={() => setActiveRatio('12:7')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeRatio === '12:7'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-300" />
            <span>Landscape</span>
            <span className="hidden sm:inline text-[10px] opacity-75">(1200×700)</span>
          </button>
        </div>

        {/* Live Card Preview Box */}
        <div className="relative w-full rounded-2xl bg-slate-950 border border-white/10 p-3 sm:p-4 flex items-center justify-center min-h-[280px] max-h-[420px] overflow-hidden mb-5">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-slate-400">
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono">Rendering high-res {activeRatio} card...</span>
            </div>
          ) : previewUrl ? (
            <div className="relative max-h-[380px] flex items-center justify-center">
              <img
                src={previewUrl}
                alt="FaceCard Preview"
                className={`max-h-[380px] w-auto object-contain rounded-xl shadow-2xl border border-white/20 transition-all ${
                  activeRatio === '9:11' ? 'aspect-[9/11]' : activeRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-[12/7]'
                }`}
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-white/10">
                {activeRatio === '9:16' ? '1080 × 1920px • 9:16' : activeRatio === '9:11' ? '1080 × 1320px • 9:11' : '1200 × 700px'}
              </div>
            </div>
          ) : null}
        </div>

        {/* Story Tips */}
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📸</span>
            <span>
              {activeRatio === '9:16' ? (
                <>
                  <strong>Instagram Story Standard:</strong> Fullscreen <strong>9:16 ratio</strong> (1080 × 1920) fills the entire mobile screen for Instagram Stories & Reels!
                </>
              ) : activeRatio === '9:11' ? (
                <>
                  <strong>Compact Story:</strong> Leaves margin space at the top & bottom for stickers, music tags, and question polls.
                </>
              ) : (
                <>
                  <strong>Landscape Format:</strong> Great for desktop wallpapers, social banners, and Twitter/X headers.
                </>
              )}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="download-final-card-btn"
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved to Device!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download {activeRatio} Story Card (PNG)</span>
              </>
            )}
          </button>

          <button
            id="copy-card-clipboard-btn"
            onClick={handleCopyToClipboard}
            disabled={isGenerating}
            className="w-full sm:w-auto py-3 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>Copy Image</span>
              </>
            )}
          </button>

          <button
            id="share-native-btn"
            onClick={handleShare}
            disabled={isGenerating}
            className="w-full sm:w-auto py-3 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4 text-rose-400" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
