import { FaceAnalysisResult } from '../types';

export type StoryAspectRatio = '9:16' | '9:11' | '12:7';

export interface CardExportOptions {
  aspectRatio: StoryAspectRatio;
  includeCelebrities?: boolean;
}

// Fallback rounded rect helper
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

// Helper to load image
async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn('Failed to load user image onto canvas, using placeholder');
      resolve(img);
    };
    img.src = src;
  });
}

function drawFaceCardLogoEmblem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number = 44
) {
  ctx.save();

  // Gradient outer border
  const emblemGrad = ctx.createLinearGradient(x, y, x + size, y + size);
  emblemGrad.addColorStop(0, '#f43f5e');
  emblemGrad.addColorStop(0.5, '#a855f7');
  emblemGrad.addColorStop(1, '#fbbf24');
  ctx.fillStyle = emblemGrad;
  drawRoundedRect(ctx, x, y, size, size, size * 0.28);
  ctx.fill();

  // Dark inner body
  const innerPad = 2;
  ctx.fillStyle = '#030712';
  drawRoundedRect(
    ctx,
    x + innerPad,
    y + innerPad,
    size - innerPad * 2,
    size - innerPad * 2,
    size * 0.24
  );
  ctx.fill();

  // Biometric brackets
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  const bMargin = size * 0.22;
  const bSize = size * 0.16;

  // Top Left bracket
  ctx.beginPath();
  ctx.moveTo(x + bMargin, y + bMargin + bSize + 2);
  ctx.lineTo(x + bMargin, y + bMargin + 2);
  ctx.lineTo(x + bMargin + bSize, y + bMargin + 2);
  ctx.stroke();

  // Top Right bracket
  ctx.beginPath();
  ctx.moveTo(x + size - bMargin, y + bMargin + bSize + 2);
  ctx.lineTo(x + size - bMargin, y + bMargin + 2);
  ctx.lineTo(x + size - bMargin - bSize, y + bMargin + 2);
  ctx.stroke();

  // Bottom Left bracket
  ctx.beginPath();
  ctx.moveTo(x + bMargin, y + size - bMargin - bSize - 2);
  ctx.lineTo(x + bMargin, y + size - bMargin - 2);
  ctx.lineTo(x + bMargin + bSize, y + size - bMargin - 2);
  ctx.stroke();

  // Bottom Right bracket
  ctx.beginPath();
  ctx.moveTo(x + size - bMargin, y + size - bMargin - bSize - 2);
  ctx.lineTo(x + size - bMargin, y + size - bMargin - 2);
  ctx.lineTo(x + size - bMargin - bSize, y + size - bMargin - 2);
  ctx.stroke();

  // Stylized spark dot in center
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = (text || '').split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = ctx.measureText(testLine).width;
    if (width < maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * 9:16 Fullscreen Instagram Story Card (1080 x 1920)
 * Visual Feature Discovery Edition: Zero Ratings, Pure Visual Signature
 */
function renderFaceCardCanvas9x16(
  ctx: CanvasRenderingContext2D,
  result: FaceAnalysisResult,
  userImg: HTMLImageElement,
  w: number,
  h: number
) {
  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#06080e');
  bgGrad.addColorStop(0.35, '#0d1322');
  bgGrad.addColorStop(0.7, '#15102d');
  bgGrad.addColorStop(1, '#070913');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Glows
  const glow1 = ctx.createRadialGradient(300, 300, 10, 300, 300, 600);
  glow1.addColorStop(0, 'rgba(244, 63, 94, 0.25)');
  glow1.addColorStop(1, 'rgba(244, 63, 94, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, w, h);

  const glow2 = ctx.createRadialGradient(800, 1400, 10, 800, 1400, 700);
  glow2.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
  glow2.addColorStop(1, 'rgba(168, 85, 247, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, w, h);

  const margin = 40;
  const cardW = w - margin * 2;
  const contentX = margin + 30;
  const contentW = cardW - 60;

  // Outer boundary border
  ctx.lineWidth = 3;
  const borderGrad = ctx.createLinearGradient(0, 0, w, h);
  borderGrad.addColorStop(0, '#f43f5e');
  borderGrad.addColorStop(0.5, '#a855f7');
  borderGrad.addColorStop(1, '#38bdf8');
  ctx.strokeStyle = borderGrad;
  drawRoundedRect(ctx, margin, margin + 40, cardW, h - margin * 2 - 80, 36);
  ctx.stroke();

  let cursorY = margin + 115;

  // Header Logo Emblem
  drawFaceCardLogoEmblem(ctx, contentX, cursorY - 40, 54);

  const textStartX = contentX + 70;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px "Playfair Display", Georgia, serif';
  ctx.fillText('FACECARD', textStartX, cursorY);

  // Visual Discovery Badge
  const badgeText = 'VISUAL SIGNATURE';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  const badgeW = ctx.measureText(badgeText).width + 36;
  const badgeX = w - margin - 30 - badgeW;
  const badgeY = cursorY - 34;

  const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY);
  badgeGrad.addColorStop(0, 'rgba(244, 63, 94, 0.95)');
  badgeGrad.addColorStop(1, 'rgba(168, 85, 247, 0.95)');
  ctx.fillStyle = badgeGrad;
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, 40, 20);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(`✨ ${badgeText}`, badgeX + badgeW / 2, badgeY + 25);
  ctx.textAlign = 'left';

  cursorY += 28;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('KNOW YOUR FACE  •  BIOMETRIC FEATURE DISCOVERY', textStartX, cursorY);

  // User Portrait
  cursorY += 38;
  const photoW = contentW;
  const photoH = 590;
  const photoX = contentX;
  const photoY = cursorY;

  ctx.save();
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 28);
  ctx.clip();

  if (userImg.width > 0) {
    const aspectImg = userImg.width / userImg.height;
    const aspectBox = photoW / photoH;
    let sx = 0, sy = 0, sw = userImg.width, sh = userImg.height;
    if (aspectImg > aspectBox) {
      sw = userImg.height * aspectBox;
      sx = (userImg.width - sw) / 2;
    } else {
      sh = userImg.width / aspectBox;
      sy = (userImg.height - sh) / 2;
    }
    ctx.drawImage(userImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }

  // Dark bottom overlay for photo
  const grad = ctx.createLinearGradient(photoX, photoY + photoH - 220, photoX, photoY + photoH);
  grad.addColorStop(0, 'rgba(7, 9, 19, 0)');
  grad.addColorStop(1, 'rgba(7, 9, 19, 0.96)');
  ctx.fillStyle = grad;
  ctx.fillRect(photoX, photoY + photoH - 220, photoW, 220);

  // Pills on photo
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundedRect(ctx, photoX + 24, photoY + photoH - 64, 280, 42, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`✨ ${result.vibe}`, photoX + 40, photoY + photoH - 37);

  // Face shape pill
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  const shapeStr = `Shape: ${result.faceShape.name}`;
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  const shapeW = ctx.measureText(shapeStr).width + 36;
  drawRoundedRect(ctx, photoX + photoW - shapeW - 24, photoY + photoH - 64, shapeW, 42, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.fillText(shapeStr, photoX + photoW - shapeW - 6, photoY + photoH - 37);

  ctx.restore();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 28);
  ctx.stroke();

  // Prominent Face Signature Banner
  cursorY = photoY + photoH + 30;
  ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
  drawRoundedRect(ctx, contentX, cursorY, contentW, 105, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✨ YOUR FACE SIGNATURE', contentX + 24, cursorY + 34);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(result.faceSignature, contentX + 24, cursorY + 74);

  // What Stands Out Section (3 Highlights)
  cursorY += 135;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WHAT MAKES THIS FACE DISTINCTIVE', contentX, cursorY);

  cursorY += 16;
  const stands = (result.whatStandsOut || []).slice(0, 3);
  stands.forEach((item, idx) => {
    const itemH = 68;
    const itemY = cursorY + idx * (itemH + 12);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundedRect(ctx, contentX, itemY, contentW, itemH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Number circle
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.beginPath();
    ctx.arc(contentX + 32, itemY + itemH / 2, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}`, contentX + 32, itemY + itemH / 2 + 5);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    const lines = wrapText(ctx, item, contentW - 84);
    lines.slice(0, 2).forEach((l, lIdx) => {
      ctx.fillText(l, contentX + 60, itemY + 28 + lIdx * 22);
    });
  });

  cursorY += stands.length * (68 + 12) + 20;

  // Similar Facial Architecture (Public Figures)
  const celebList = result.celebrityReferences || result.similarCelebrities || [];
  if (celebList.length > 0) {
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🌟 SIMILAR FACIAL ARCHITECTURE', contentX, cursorY);
    cursorY += 14;

    const celebs = celebList.slice(0, 2);
    const celebW = (contentW - 16) / celebs.length;

    celebs.forEach((c, cIdx) => {
      const cx = contentX + cIdx * (celebW + 16);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
      drawRoundedRect(ctx, cx, cursorY, celebW, 90, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(c.name, cx + 18, cursorY + 30);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      const cLines = wrapText(ctx, c.reason || c.sharedFeatures || '', celebW - 36);
      cLines.slice(0, 2).forEach((cl, clIdx) => {
        ctx.fillText(cl, cx + 18, cursorY + 52 + clIdx * 18);
      });
    });
  }

  // Footer
  const footerY = h - margin - 55;
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FACECARD AI  •  DISCOVER WHAT MAKES YOUR FACE VISUALLY YOURS  •  @FACECARD', w / 2, footerY);
  ctx.textAlign = 'left';
}

/**
 * 9:11 Portrait Feed Card (1080 x 1320)
 */
function renderFaceCardCanvas9x11(
  ctx: CanvasRenderingContext2D,
  result: FaceAnalysisResult,
  userImg: HTMLImageElement,
  w: number,
  h: number
) {
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#070913');
  bgGrad.addColorStop(0.5, '#0e1424');
  bgGrad.addColorStop(1, '#080c16');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const margin = 36;
  const contentX = margin + 24;
  const contentW = w - (margin + 24) * 2;

  // Header
  let cursorY = margin + 44;
  drawFaceCardLogoEmblem(ctx, contentX, cursorY, 48);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
  ctx.fillText('FACECARD', contentX + 62, cursorY + 36);

  ctx.fillStyle = '#a855f7';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VISUAL SIGNATURE', contentX + 270, cursorY + 33);

  // Photo
  cursorY += 65;
  const photoW = contentW;
  const photoH = 480;
  const photoX = contentX;
  const photoY = cursorY;

  ctx.save();
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 24);
  ctx.clip();

  if (userImg.width > 0) {
    const aspectImg = userImg.width / userImg.height;
    const aspectBox = photoW / photoH;
    let sx = 0, sy = 0, sw = userImg.width, sh = userImg.height;
    if (aspectImg > aspectBox) {
      sw = userImg.height * aspectBox;
      sx = (userImg.width - sw) / 2;
    } else {
      sh = userImg.width / aspectBox;
      sy = (userImg.height - sh) / 2;
    }
    ctx.drawImage(userImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }

  // Dark overlay
  const grad = ctx.createLinearGradient(photoX, photoY + photoH - 140, photoX, photoY + photoH);
  grad.addColorStop(0, 'rgba(7, 9, 19, 0)');
  grad.addColorStop(1, 'rgba(7, 9, 19, 0.95)');
  ctx.fillStyle = grad;
  ctx.fillRect(photoX, photoY + photoH - 140, photoW, 140);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`✨ ${result.vibe}`, photoX + 24, photoY + photoH - 45);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Shape: ${result.faceShape.name}`, photoX + 24, photoY + photoH - 20);

  ctx.restore();

  // Face Signature Banner
  cursorY = photoY + photoH + 24;
  ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
  drawRoundedRect(ctx, contentX, cursorY, contentW, 90, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✨ YOUR FACE SIGNATURE', contentX + 20, cursorY + 28);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(result.faceSignature, contentX + 20, cursorY + 62);

  // Standout Features
  cursorY += 115;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('DISTINCTIVE CHARACTERISTICS', contentX, cursorY);
  cursorY += 14;

  const stands = (result.whatStandsOut || []).slice(0, 3);
  stands.forEach((s, i) => {
    const sy = cursorY + i * 58;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundedRect(ctx, contentX, sy, contentW, 50, 12);
    ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`0${i + 1}`, contentX + 16, sy + 30);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    const lines = wrapText(ctx, s, contentW - 60);
    ctx.fillText(lines[0] || '', contentX + 48, sy + 30);
  });

  // Footer
  const footerY = h - margin - 20;
  ctx.fillStyle = '#64748b';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FACECARD AI • DISCOVER WHAT MAKES YOUR FACE VISUALLY YOURS', w / 2, footerY);
  ctx.textAlign = 'left';
}

/**
 * 12:7 Landscape Card (1200 x 700)
 */
function renderLandscape(
  ctx: CanvasRenderingContext2D,
  result: FaceAnalysisResult,
  userImg: HTMLImageElement,
  w: number,
  h: number
) {
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#121829');
  bgGrad.addColorStop(1, '#080c14');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Border
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
  drawRoundedRect(ctx, 20, 20, w - 40, h - 40, 28);
  ctx.stroke();

  // Left side: Photo
  const photoW = 380;
  const photoH = 500;
  const photoX = 60;
  const photoY = 100;

  ctx.save();
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 20);
  ctx.clip();
  if (userImg.width > 0) {
    const aspectImg = userImg.width / userImg.height;
    const aspectBox = photoW / photoH;
    let sx = 0, sy = 0, sw = userImg.width, sh = userImg.height;
    if (aspectImg > aspectBox) {
      sw = userImg.height * aspectBox;
      sx = (userImg.width - sw) / 2;
    } else {
      sh = userImg.width / aspectBox;
      sy = (userImg.height - sh) / 2;
    }
    ctx.drawImage(userImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }
  ctx.restore();

  // Right side: Details
  const rightX = 480;
  const rightW = w - rightX - 60;
  let ry = 90;

  drawFaceCardLogoEmblem(ctx, rightX, ry, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px "Playfair Display", Georgia, serif';
  ctx.fillText('FACECARD', rightX + 52, ry + 32);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VISUAL SIGNATURE', rightX + 240, ry + 28);

  ry += 65;
  ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
  drawRoundedRect(ctx, rightX, ry, rightW, 90, 16);
  ctx.fill();

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✨ YOUR FACE SIGNATURE', rightX + 20, ry + 28);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(result.faceSignature, rightX + 20, ry + 60);

  ry += 115;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('WHAT STANDS OUT', rightX, ry);
  ry += 14;

  const stands = (result.whatStandsOut || []).slice(0, 3);
  stands.forEach((s, idx) => {
    const sy = ry + idx * 54;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundedRect(ctx, rightX, sy, rightW, 46, 10);
    ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`•`, rightX + 16, sy + 28);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    const lines = wrapText(ctx, s, rightW - 44);
    ctx.fillText(lines[0] || '', rightX + 32, sy + 28);
  });

  // Footer
  ctx.fillStyle = '#64748b';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('FACECARD AI • DISCOVER WHAT MAKES YOUR FACE VISUALLY YOURS', rightX, h - 50);
}

/**
 * Main export function
 */
export async function renderFaceCardCanvas(
  result: FaceAnalysisResult,
  ratio: StoryAspectRatio = '9:16'
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas 2D context');

  let w = 1080;
  let h = 1920;

  if (ratio === '9:16') {
    w = 1080;
    h = 1920;
  } else if (ratio === '9:11') {
    w = 1080;
    h = 1320;
  } else if (ratio === '12:7') {
    w = 1200;
    h = 700;
  }

  canvas.width = w;
  canvas.height = h;

  const userImg = await loadImage(result.userImage);

  if (ratio === '9:16') {
    renderFaceCardCanvas9x16(ctx, result, userImg, w, h);
  } else if (ratio === '9:11') {
    renderFaceCardCanvas9x11(ctx, result, userImg, w, h);
  } else {
    renderLandscape(ctx, result, userImg, w, h);
  }

  return canvas;
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string) {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
