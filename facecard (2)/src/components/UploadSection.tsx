import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  CheckCircle2,
  X,
  FlipHorizontal,
  Lightbulb,
  Image as ImageIcon,
  AlertCircle,
  ShieldCheck,
  Lock,
  Smartphone,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { SAMPLE_PORTRAITS } from '../sampleData';
import { FaceCardLogo } from './FaceCardLogo';

interface UploadSectionProps {
  onAnalyze: (imageDataUrl: string) => void;
  isLoading: boolean;
  loadingStep: string;
  errorMessage: string | null;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onAnalyze,
  isLoading,
  loadingStep,
  errorMessage,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [countdown, setCountdown] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera stream cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping video track:', e);
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setActiveStream(null);
    setIsCameraActive(false);
    setIsCameraStarting(false);
    setCountdown(null);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Handle immediate attachment when video element mounts
  const handleVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node && activeStream) {
        node.srcObject = activeStream;
        node.onloadedmetadata = () => {
          node.play().catch((err) => console.warn('Autoplay caught:', err));
        };
        node.play().catch(() => {});
      }
    },
    [activeStream]
  );

  // Sync stream to video if state changes
  useEffect(() => {
    if (isCameraActive && activeStream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = activeStream;
      video.onloadedmetadata = () => {
        video.play().catch((err) => console.warn('Video play caught:', err));
      };
      video.play().catch(() => {});
    }
  }, [isCameraActive, activeStream]);

  // Start camera stream with multi-tiered fallback
  const startCamera = async (mode: 'user' | 'environment' = facingMode) => {
    setCameraError(null);
    setIsCameraStarting(true);

    // Stop existing stream first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setActiveStream(null);

    // Check environment support
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsCameraStarting(false);
      setIsCameraActive(false);
      setCameraError(
        'Live webcam streaming is unavailable in this browser context. Please use the Device Camera button or upload a photo.'
      );
      return;
    }

    try {
      let stream: MediaStream | null = null;

      // Tier 1: Ideal selfie resolution & specified facingMode
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (firstErr: any) {
        console.warn('Ideal HD constraints failed, trying basic facingMode...', firstErr);
        // Tier 2: Basic facingMode
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: mode },
            audio: false,
          });
        } catch (secondErr: any) {
          console.warn('FacingMode failed, trying generic video stream...', secondErr);
          // Tier 3: Any available video stream
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }
      }

      if (!stream) {
        throw new Error('No video stream returned');
      }

      streamRef.current = stream;
      setActiveStream(stream);
      setIsCameraActive(true);
      setIsCameraStarting(false);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setIsCameraStarting(false);
      setIsCameraActive(false);

      let msg = 'Unable to access your camera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera permission was blocked. Please grant camera permission in your browser URL bar or use the Device Camera button below.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No camera device found on this system. You can take a photo with your phone or upload an image.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = 'Camera is currently in use by another application. Please close other camera tabs and try again.';
      } else if (err.name === 'OverconstrainedError') {
        msg = 'Camera resolution constraint not supported on this device.';
      }
      setCameraError(msg);
    }
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture frame from video
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if front-facing camera for natural mirror orientation
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setPreviewUrl(dataUrl);
    stopCamera();
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          capturePhoto();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Process file upload
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) handleFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleSelectSample = async (sample: typeof SAMPLE_PORTRAITS[0]) => {
    try {
      // Fetch image and convert to base64
      const res = await fetch(sample.imageUrl);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      setPreviewUrl(sample.imageUrl);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Headline */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <FaceCardLogo size="lg" showWordmark={false} />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Biometric Visual Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-display">
          Discover Your <span className="bg-gradient-to-r from-rose-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">Face Signature</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-4">
          Upload a portrait or selfie to explore what makes your facial features distinctive — discovering your{' '}
          <span className="text-slate-200 font-medium">eyes, brow frame, nose, lips, and facial geometry</span>{' '}
          without arbitrary ratings or numbers.
        </p>

        {/* Zero Cloud Storage & Ephemeral Privacy Notice */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/25 text-xs text-slate-300 backdrop-blur-sm shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-emerald-300 font-semibold">Zero Cloud Storage:</strong> Photos are held in temporary session RAM only and never stored in the cloud.
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Analysis Failed</p>
            <p className="text-red-300 text-xs mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Upload Box */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Shimmer line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

        {isCameraActive ? (
          /* Live Camera View */
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-inner">
              <video
                ref={handleVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Facial alignment guide overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-48 h-64 border-2 border-dashed border-rose-400/50 rounded-full opacity-60" />
                <div className="absolute top-4 text-center text-xs text-rose-200 bg-slate-950/70 px-3 py-1 rounded-full backdrop-blur-sm border border-rose-500/20">
                  Center face in oval & smile
                </div>
              </div>

              {/* Countdown overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-xs">
                  <span className="text-7xl font-extrabold text-white animate-ping">
                    {countdown}
                  </span>
                </div>
              )}

              {/* Camera Controls inside overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2.5 px-3">
                <button
                  id="camera-flip-btn"
                  type="button"
                  onClick={toggleCameraFacing}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md border border-white/20 transition-all"
                  title="Switch Camera (Front / Back)"
                >
                  <FlipHorizontal className="w-5 h-5" />
                </button>

                <button
                  id="camera-snap-btn"
                  type="button"
                  onClick={capturePhoto}
                  disabled={countdown !== null}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center gap-2 transform active:scale-95 transition-all disabled:opacity-60"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Now</span>
                </button>

                <button
                  id="camera-timer-btn"
                  type="button"
                  onClick={startCountdown}
                  disabled={countdown !== null}
                  className="px-3 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs backdrop-blur-md border border-white/20 transition-all disabled:opacity-60"
                  title="3-Second Timer"
                >
                  <span>3s Timer</span>
                </button>

                <button
                  id="camera-close-btn"
                  type="button"
                  onClick={stopCamera}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md border border-white/20 transition-all"
                  title="Close Camera"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : previewUrl ? (
          /* Preview Selected Photo */
          <div className="flex flex-col items-center">
            <div className="relative group max-w-sm w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 mb-6">
              <img
                src={previewUrl}
                alt="Face portrait preview"
                className="w-full h-full object-cover"
              />

              {!isLoading && (
                <button
                  id="clear-preview-btn"
                  onClick={() => setPreviewUrl(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/80 hover:bg-rose-600 text-white border border-white/20 transition-colors"
                  title="Choose another photo"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Scanning overlay effect when loading */}
              {isLoading && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-rose-500/30 border-t-rose-400 animate-spin mb-4" />
                  <div className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Analyzing FaceCard</span>
                  </div>
                  <p className="text-white font-medium text-sm animate-pulse">
                    {loadingStep || 'Evaluating facial harmony...'}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 max-w-xs">
                    Measuring eyes, nose, lips, smile symmetry, and aesthetic vibe
                  </p>
                </div>
              )}
            </div>

            {!isLoading && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  id="change-photo-btn"
                  onClick={() => setPreviewUrl(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-sm font-medium transition-colors"
                >
                  Change Photo
                </button>
                <button
                  id="analyze-photo-btn"
                  onClick={() => onAnalyze(previewUrl)}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 hover:from-rose-400 hover:to-purple-500 text-white text-sm font-bold shadow-xl shadow-rose-500/25 flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze My FaceCard</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Dropzone & Camera Launcher */
          <div>
            <div
              id="photo-dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-rose-400 bg-rose-500/10 scale-[0.99]'
                  : 'border-white/15 hover:border-rose-400/50 hover:bg-white/[0.02]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              {/* Native device / phone camera direct capture */}
              <input
                ref={nativeCameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/10">
                <Upload className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Drop your selfie or portrait here
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-4">
                Supports JPG, PNG, WEBP, paste (Ctrl+V), or camera
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold border border-white/10 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  <span>Browse Files</span>
                </button>

                <button
                  id="open-camera-btn"
                  type="button"
                  disabled={isCameraStarting}
                  onClick={(e) => {
                    e.stopPropagation();
                    startCamera();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-rose-500/20 flex items-center gap-1.5 transition-all disabled:opacity-60"
                >
                  {isCameraStarting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Starting Cam...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5" />
                      <span>Use Camera</span>
                    </>
                  )}
                </button>
              </div>

              {cameraError && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{cameraError}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => nativeCameraInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Device Cam</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1 border border-white/10 transition-colors"
                      title="Retry"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retry</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Photo tips */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Natural Light:</strong> Soft front lighting highlights iris clarity and bone structure.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Frontal Angle:</strong> Straight gaze allows accurate measurement of facial thirds & fifths.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Authentic Smile:</strong> Relaxed cheeks provide the best read on your unique vibe.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample Portraits for Instant 1-Click Testing */}
      {!previewUrl && !isCameraActive && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
              <span>Or Try With A Demo Portrait</span>
            </h4>
            <span className="text-[11px] text-slate-500">1-click instant test</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_PORTRAITS.map((sample) => (
              <button
                key={sample.id}
                id={`sample-portrait-${sample.id}`}
                onClick={() => handleSelectSample(sample)}
                className="group flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-rose-400/40 text-left transition-all overflow-hidden"
              >
                <img
                  src={sample.imageUrl}
                  alt={sample.name}
                  className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate group-hover:text-rose-300 transition-colors">
                    {sample.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {sample.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
