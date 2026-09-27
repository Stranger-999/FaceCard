import React from 'react';
import { History, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';
import { FaceCardLogo } from './FaceCardLogo';

interface HeaderProps {
  onNewScan: () => void;
  onToggleHistory: () => void;
  onPurgeSession?: () => void;
  hasResult: boolean;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNewScan,
  onToggleHistory,
  onPurgeSession,
  hasResult,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Creative Brand Logo */}
        <FaceCardLogo
          size="md"
          showWordmark={true}
          showSubtitle={true}
          badgeText="PASS"
          onClick={onNewScan}
        />

        {/* Center/Actions: Ephemeral Privacy Assurance & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zero Cloud Storage Badge */}
          <div
            id="privacy-cloud-badge"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-medium"
            title="Photos are processed purely in ephemeral RAM and never saved to cloud storage, disk, or remote database."
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Cloud Storage • Ephemeral</span>
          </div>

          {hasResult && onPurgeSession && (
            <button
              id="purge-session-btn"
              onClick={onPurgeSession}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 transition-colors"
              title="Immediately purge all photos and session data from memory"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Purge Photo</span>
            </button>
          )}

          {hasResult && (
            <button
              id="new-scan-btn"
              onClick={onNewScan}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-200 hover:text-white bg-slate-900 border border-white/10 hover:border-white/20 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">New Photo</span>
            </button>
          )}

          <button
            id="history-toggle-btn"
            onClick={onToggleHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-200 hover:text-white bg-slate-900 border border-white/10 hover:border-white/20 transition-colors"
            title="View temporary session history (erased when tab closes)"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Session</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-purple-500/30 text-purple-200">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
