import React from 'react';
import { X, Trash2, Calendar, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { FaceAnalysisResult } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: FaceAnalysisResult[];
  onSelectResult: (result: FaceAnalysisResult) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-slate-950 border-l border-white/10 shadow-2xl p-6 flex flex-col h-full z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Temporary Session Scans</span>
            </h3>
            <p className="text-xs text-slate-400">
              {history.length} {history.length === 1 ? 'scan' : 'scans'} in active tab memory
            </p>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                id="clear-all-history-btn"
                onClick={onClearHistory}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-rose-950/40 text-rose-300 hover:text-white hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
                title="Purge all temporary session photos"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Purge</span>
              </button>
            )}
            <button
              id="close-history-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Close history"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ephemeral Privacy Note */}
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            <strong>Zero Cloud Storage:</strong> Scans live strictly in temporary tab memory and auto-clear when you close this tab.
          </span>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-slate-600" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No Scans Saved Yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Upload a photo or capture a selfie to generate and save your FaceCards here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-rose-400/40 cursor-pointer transition-all"
              >
                <img
                  src={item.userImage}
                  alt="Scanned Face"
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 group-hover:scale-105 transition-transform"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">
                      {item.vibe}
                    </span>
                    <span className="text-[11px] font-semibold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-md">
                      {item.faceShape.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">
                    ✨ {item.faceSignature}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-purple-300 font-semibold">Visual Discovery</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
