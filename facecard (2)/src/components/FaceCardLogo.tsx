import React from 'react';
import { ScanFace } from 'lucide-react';

export interface FaceCardLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showSubtitle?: boolean;
  badgeText?: string;
  className?: string;
  onClick?: () => void;
}

export const FaceCardLogo: React.FC<FaceCardLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showSubtitle = false,
  badgeText = 'PASS',
  className = '',
  onClick,
}) => {
  // Dimension configurations
  const dimensions = {
    sm: {
      card: 'w-8 h-8 rounded-lg',
      icon: 'w-4 h-4',
      title: 'text-base',
      sub: 'text-[9px]',
      badge: 'text-[9px] px-1 py-0.2',
    },
    md: {
      card: 'w-10 h-10 rounded-xl',
      icon: 'w-5 h-5',
      title: 'text-xl',
      sub: 'text-[11px]',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    lg: {
      card: 'w-13 h-13 rounded-2xl',
      icon: 'w-6 h-6',
      title: 'text-2xl',
      sub: 'text-xs',
      badge: 'text-xs px-2 py-0.5',
    },
    xl: {
      card: 'w-16 h-16 rounded-2xl',
      icon: 'w-8 h-8',
      title: 'text-3xl',
      sub: 'text-sm',
      badge: 'text-xs px-2.5 py-1',
    },
  };

  const dim = dimensions[size];

  return (
    <div
      id="facecard-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Creative FaceCard Emblem: Sleek VIP Card + Centered Biometric Face Scan */}
      <div
        className={`relative ${dim.card} p-[2px] bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-400 shadow-lg shadow-rose-500/25 ${
          onClick ? 'group-hover:scale-105 group-hover:shadow-rose-500/40' : ''
        } transition-all duration-300`}
      >
        {/* Inner Card Surface */}
        <div className="w-full h-full bg-slate-950 rounded-[inherit] relative overflow-hidden flex items-center justify-center">
          {/* Holographic Angle Foil Line */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />

          {/* Biometric Face Scan Icon */}
          <ScanFace
            className={`${dim.icon} text-rose-400 ${
              onClick ? 'group-hover:text-pink-300' : ''
            } transition-colors drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]`}
          />
        </div>
      </div>

      {/* Wordmark & Optional Subtitle */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${dim.title} font-display text-white flex items-center`}
            >
              Face
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent ml-0.5">
                Card
              </span>
            </span>

            {badgeText && (
              <span
                className={`font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 border border-rose-500/30 ${dim.badge}`}
              >
                {badgeText}
              </span>
            )}
          </div>

          {showSubtitle && (
            <p className={`text-slate-400 font-normal ${dim.sub}`}>
              Biometric Aesthetic Certification
            </p>
          )}
        </div>
      )}
    </div>
  );
};
