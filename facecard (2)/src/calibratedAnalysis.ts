import {
  FaceAnalysisResult,
  CelebrityReference,
  HairstyleSuggestion,
  FacialHairGuide,
  StyleGuide,
  PersonalizedLookGuide
} from './types';

interface ArchetypeProfile {
  vibe: string;
  faceShapeName: string;
  faceShapeDesc: string;
  eyesDesc: string;
  eyesDist: string;
  eyebrowsDesc: string;
  eyebrowsDist: string;
  noseDesc: string;
  noseDist: string;
  lipsDesc: string;
  lipsDist: string;
  jawDesc: string;
  jawDist: string;
  skinDesc: string;
  skinDist: string;
  structure: string;
  standsOut: [string, string, string];
  faceSignature: string;
  summary: string;
  celebs: { name: string; sharedFeatures: string }[];
  beautyTips: string[];
  hairstyleGuide: HairstyleSuggestion[];
  facialHairGuide: FacialHairGuide;
  styleGuide: StyleGuide;
  photoTips: string[];
  personalizedLookGuide: PersonalizedLookGuide;
}

const ARCHETYPES: ArchetypeProfile[] = [
  {
    vibe: 'Warm Editorial & Serene',
    faceShapeName: 'Soft Oval',
    faceShapeDesc: 'Evenly proportioned length-to-width ratio with gently curved cheek contours narrowing into a rounded chin.',
    eyesDesc: 'Almond-shaped with a natural positive canthal tilt and visible eyelid crease spacing.',
    eyesDist: 'The outer corners create a natural upward lift, giving the gaze an alert, engaging focal quality.',
    eyebrowsDesc: 'Naturally dense with a soft, gradual arch that aligns with the lateral orbital rim.',
    eyebrowsDist: 'A clean, soft arch frames the upper third without overpowering delicate eye spacing.',
    noseDesc: 'Straight dorsal bridge with proportional alar base width aligned with the inner eye corners.',
    noseDist: 'The balanced bridge linearity creates an uninterrupted vertical center line down the midface.',
    lipsDesc: 'Well-defined vermilion border with balanced upper-to-lower fullness and a sculpted Cupid\'s bow.',
    lipsDist: 'The crisp philtrum indentation provides prominent depth and contour to the lower third.',
    jawDesc: 'Softly tapered jaw angle meeting a gently rounded chin with balanced vertical projection.',
    jawDist: 'Smooth mandibular contour transitions gracefully into the neck line without sharp angles.',
    skinDesc: 'Warm golden undertone with a luminous, hydrated surface finish in natural diffuse lighting.',
    skinDist: 'Subtle high-point reflectivity along the zygomatic arch naturally highlights cheekbone structure.',
    structure: 'The horizontal thirds display balanced vertical distribution. The horizontal spacing between the eyes aligns naturally with the width of the nasal base, creating fluid visual harmony across the central plane.',
    standsOut: [
      'Upturned almond eye corners that provide an immediate lifted focal point',
      'Sculpted Cupid\'s bow contour with balanced vertical lip proportions',
      'Soft oval silhouette creating harmonious curvature from cheek to chin'
    ],
    faceSignature: 'Upturned Almond Eyes · Defined Brow Frame · Soft Oval Balance',
    summary: 'A face characterized by gentle contours, lifted almond eyes, and a balanced oval outline that emphasizes natural warmth and fluid feature transitions.',
    celebs: [
      {
        name: 'Zendaya',
        sharedFeatures: 'Similar almond eye geometry with an outer corner lift, paired with a soft oval jawline taper and warm undertone balance.'
      },
      {
        name: 'Gemma Chan',
        sharedFeatures: 'Shares clean brow architecture framing the upper third, along with balanced facial thirds and subtle cheekbone curvature.'
      },
      {
        name: 'Freida Pinto',
        sharedFeatures: 'Comparable vertical third distribution, defined philtrum contour, and natural warm skin luminosity.'
      }
    ],
    beautyTips: [
      'Brush and groom brow hairs lightly upward with a clear gel to accentuate the natural arch without harsh lines.',
      'A lightweight hydrating tinted emulsion complements the natural warm undertone without hiding skin texture.',
      'A dab of neutral or sheer tinted balm along the Cupid\'s bow emphasizes your natural philtrum contour.',
      'Keep hair around the upper temples softly swept back to maintain open illumination across the forehead third.'
    ],
    hairstyleGuide: [
      {
        style: 'Face-Framing Curtain Layers',
        whyItCouldWork: 'Could work well because soft diagonal curtain layers highlight the cheekbone contour without crowding the eye area.',
        length: 'Collarbone to mid-chest',
        styling: 'Air-dried or soft round-brush blowout with subtle outward wave.'
      },
      {
        style: 'Textured French Bob',
        whyItCouldWork: 'Could work well because the perimeter resting around jawline level echoes the soft curve of the chin.',
        length: 'Chin length',
        styling: 'Effortless texture cream for a relaxed, natural finish.'
      },
      {
        style: 'Clean Low Chignon with Middle Part',
        whyItCouldWork: 'Could work well because keeping hair sleekly pulled back showcases your balanced facial thirds and lifted eye corners.',
        length: 'Medium to long',
        styling: 'Centered parting smoothed down with lightweight serum.'
      }
    ],
    facialHairGuide: {
      currentObservation: 'Facial hair styling cannot be confidently assessed from this photograph.',
      suggestions: [
        'Maintain clean lower-third skin hydration to accentuate the smooth transition from chin to neckline.',
        'Soft jawline silhouettes benefit from gentle exfoliation and lightweight hydrating emulsions.'
      ]
    },
    styleGuide: {
      directions: [
        'Minimalist Clean (Monochromatic palettes, uncluttered lines, fine knitwear)',
        'Warm Editorial (Earthy camel, terracotta, and olive tones with organic draping fabrics)',
        'Smart Casual Tailoring (Structured lightweight blazers over simple crew or scoop neck tees)'
      ],
      collarsAndNecklines: [
        'Open boatneck or gentle scoop neck that echoes the soft oval curvature of the face',
        'Soft open-notch lapel or relaxed camp collar providing subtle horizontal balance across the clavicle'
      ],
      accessories: [
        'Fine geometric or wire-frame hoop earrings that complement the jaw taper',
        'Delicate thin-chain pendant that rests cleanly at the clavicle'
      ]
    },
    photoTips: [
      'Position camera slightly above or directly at eye level to maintain proportional thirds and avoid chin distortion.',
      'Utilize soft 45-degree diffused natural window light to naturally define the cheekbones without harsh nose shadows.',
      'Maintain a 1.5 to 2-meter shooting distance using a 50mm-85mm portrait lens equivalent to prevent wide-angle flattening.',
      'Turn your face 5-10 degrees away from direct center to introduce subtle shadow depth along the jaw contour.'
    ],
    personalizedLookGuide: {
      hair: 'Try soft curtain layers or an effortless middle part to preserve open visibility across your upper third.',
      grooming: 'Keep eyebrows softly groomed with clear gel and maintain a hydrated, natural skin finish.',
      clothing: 'Wear open scoop or notched necklines in warm earth tones (camel, cream, terracotta) to harmonize with skin undertones.',
      accessories: 'Pair with delicate thin-wire earrings or a subtle clavicle pendant that mirrors gentle face curves.',
      photoPresentation: 'Frame portraits in diffused daylight with a slight 3/4 angle and relaxed shoulders.'
    }
  },
  {
    vibe: 'Architectural & Sculpted',
    faceShapeName: 'Defined Square-Heart',
    faceShapeDesc: 'Strong angular jaw contour with wide zygomatic arches tapering into a defined chin apex.',
    eyesDesc: 'Deep-set with a horizontal canthal axis and close brow-to-crease distance.',
    eyesDist: 'The deeper orbital position gives the eyes an intense, contemplative visual presence.',
    eyebrowsDesc: 'Low-arched and straight with substantial density across the head and tail.',
    eyebrowsDist: 'The horizontal trajectory anchors the upper third and emphasizes horizontal facial width.',
    noseDesc: 'Prominent nasal bridge with clean lateral facet planes and a well-delineated tip.',
    noseDist: 'Crisp cartilage definition at the nasal tip creates distinct shadow planes under direct lighting.',
    lipsDesc: 'Wide mouth aperture with a broader lower lip contour and subtle oral commissures.',
    lipsDist: 'Horizontal width of the mouth mirrors the distance between the pupils, anchoring the lower third.',
    jawDesc: 'Crisp mandibular angles with prominent gonial definition leading to a square-tipped chin.',
    jawDist: 'The sharp angularity along the jawline creates a striking structural frame in profile and 3/4 views.',
    skinDesc: 'Cool-neutral undertone with a smooth matte finish and well-defined bone landmark shadows.',
    skinDist: 'Distinct contrast between illuminated cheekbones and jaw shadow planes emphasizes facial architecture.',
    structure: 'High-contrast bone topography creates strong angular definition between the zygomatic arches and the mandibular border, producing dramatic visual planes.',
    standsOut: [
      'Crisp angular mandibular jawline that frames the lower face with authority',
      'Deep-set horizontal eye alignment creating an intense, contemplative gaze',
      'Strong horizontal brow line that emphasizes facial width and bone structure'
    ],
    faceSignature: 'Angular Jaw Contour · Deep-Set Gaze · Sculpted Bone Frame',
    summary: 'A structured, high-definition face defined by sharp mandibular geometry, intense deep-set eyes, and strong horizontal framing.',
    celebs: [
      {
        name: 'Cillian Murphy',
        sharedFeatures: 'Shares prominent cheekbone height, sharp mandibular angles, and deep-set ocular framing.'
      },
      {
        name: 'Angelina Jolie',
        sharedFeatures: 'Comparable jawline crispness, wide zygomatic bone structure, and clear facial planar separation.'
      },
      {
        name: 'Robert Pattinson',
        sharedFeatures: 'Similar square-jaw architecture, strong brow-ridge projection, and horizontal eye axis.'
      }
    ],
    beautyTips: [
      'Maintain clean, defined brow lines by trimming only stray hairs along the lower brow rim to keep the arch sharp.',
      'Use a lightweight matte hydrating moisturizer to keep skin clean without unwanted shine over the forehead.',
      'If wearing facial hair, keep cheek lines and neckline crisply edged to reinforce jawline angularity.',
      'Groom sideburns to taper neatly above the jaw angle so the natural bone structure remains unobstructed.'
    ],
    hairstyleGuide: [
      {
        style: 'Textured Crop with Tapered Sides',
        whyItCouldWork: 'Could work well because keeping sides close to the head accentuates the width of the cheekbones and sharp jaw angle.',
        length: 'Short (1-2 inches on top, tapered sides)',
        styling: 'Matte clay worked through dry hair for textured separation.'
      },
      {
        style: 'Side-Swept Undercut or Taper',
        whyItCouldWork: 'Could work well because asymmetrical height on top elongates the face while keeping the jawline completely visible.',
        length: 'Medium top, short sides',
        styling: 'Brushed diagonally back with light pliable pomade.'
      },
      {
        style: 'Classic Medium Middle Part (Curtains)',
        whyItCouldWork: 'Could work well because strands falling past temples frame the cheekbones and soften rigid forehead borders.',
        length: '3 to 5 inches',
        styling: 'Air-dried with light sea salt spray for natural drape.'
      }
    ],
    facialHairGuide: {
      currentObservation: 'Visible stubble or structured lower facial shadow is present along the jawline.',
      suggestions: [
        'A defined 3-5 day heavy stubble or short boxed beard can emphasize the existing mandibular angles.',
        'Keep the neck line shaved approximately two fingers above the Adam\'s apple for a clean, deliberate silhouette.'
      ]
    },
    styleGuide: {
      directions: [
        'Architectural Minimalist (Structured overcoats, crisp black/charcoal/navy palettes, clean seams)',
        'Classic Italian Tailoring (Sharp peaked or notched lapels, open collars, fine wool)',
        'Urban Clean (Heavyweight boxy crewneck t-shirts, minimalist chore jackets)'
      ],
      collarsAndNecklines: [
        'Structured spread collar or Cuban camp collar providing sharp horizontal framing for the angular jaw',
        'Fitted crewneck in sturdy fabric that reinforces the squared shoulder and jawline alignment'
      ],
      accessories: [
        'Angular or hexagonal frame eyewear with thin metal or dark acetate rims',
        'Brushed stainless steel or titanium wrist watch with geometric case lines'
      ]
    },
    photoTips: [
      'Position lighting at a 45-degree angle (Rembrandt lighting) to create sculpted cheek and jaw shadow planes.',
      'Keep the chin level or angled slightly downward to highlight the brow ridge and intense eye depth.',
      'Choose a dark or neutral studio backdrop to create clean edge separation against the facial silhouette.',
      'Use a portrait focal length (85mm-105mm) to preserve the true bone proportions and avoid nose distortion.'
    ],
    personalizedLookGuide: {
      hair: 'Keep the sides tapered close to emphasize cheekbone width and allow texture on top for volume.',
      grooming: 'Crisply edge any facial hair along the neck and keep brows trimmed along the lower orbital border.',
      clothing: 'Opt for structured lapels, crisp collars, and deep monochrome tones (slate, charcoal, navy).',
      accessories: 'Choose angular, architectural eyewear frames that mirror your defined jawline angles.',
      photoPresentation: 'Utilize directional directional lighting from the side to capture striking planar contrast.'
    }
  },
  {
    vibe: 'Ethereal & Delicate',
    faceShapeName: 'Inverted Triangle / Soft Heart',
    faceShapeDesc: 'Broad forehead and wide-set eyes tapering gently toward a narrow, delicate chin point.',
    eyesDesc: 'Large and slightly rounded with wide intercanthal distance and an open palpebral aperture.',
    eyesDist: 'The wide eye spacing creates an expansive, doe-like openness across the upper third.',
    eyebrowsDesc: 'High-set, arched brows with fine hair distribution and a gentle downward tail taper.',
    eyebrowsDist: 'Elevated brow placement creates significant vertical space between the crease and brow bone.',
    noseDesc: 'Narrow bridge with a petite, slightly upturned nasal tip and delicate alar flare.',
    noseDist: 'A subtle supratip break lends lightness to the profile and keeps the midface looking airy.',
    lipsDesc: 'Petite width with plush central pillowing on both upper and lower vermilion.',
    lipsDist: 'Compact mouth width combined with central fullness creates a youthful, expressive shape.',
    jawDesc: 'Tapered jawline with a soft angle converging into a slender, pointed chin.',
    jawDist: 'The sharp taper from wide temples down to a delicate chin accentuates upper-face prominence.',
    skinDesc: 'Fair to rosy neutral undertone with a soft-focus velvet sheen and translucent quality.',
    skinDist: 'Uniform tone with delicate flush across the central midface that accentuates cheeks.',
    structure: 'The face is top-dominant, drawing immediate gaze upward to the wide-set eyes and luminous brow, before naturally descending along the tapering jawline.',
    standsOut: [
      'Expansive wide-set eye aperture with open, expressive spacing',
      'Delicately tapered jaw converging to a fine chin point',
      'High arched brow trajectory opening up generous eyelid space'
    ],
    faceSignature: 'Wide-Set Doe Eyes · High Arch Brows · Tapered Heart Silhouette',
    summary: 'A delicate aesthetic anchored by wide-spaced eyes, high sweeping brows, and a heart-shaped silhouette that draws focus toward the upper third.',
    celebs: [
      {
        name: 'Anya Taylor-Joy',
        sharedFeatures: 'Similar wide-set ocular spacing, delicate tapered chin, and open brow-to-crease architecture.'
      },
      {
        name: 'Gwen Van Meir',
        sharedFeatures: 'Comparable heart silhouette, plush central lip volume, and ethereal high-set arches.'
      },
      {
        name: 'Amanda Seyfried',
        sharedFeatures: 'Shares large rounded eye apertures, soft jaw convergence, and delicate bone contours.'
      }
    ],
    beautyTips: [
      'Softly tint or define the inner head of the eyebrows to visually harmonize wide-set ocular spacing.',
      'A luminous, hydrating skin essence or highlighting primer brings out the delicate cheek flush.',
      'Moisturizing lip oils or berry tints placed centrally on the lips emphasize natural plushness.',
      'Avoid heavy matte full-coverage foundations; let the natural skin luminosity shine through.'
    ],
    hairstyleGuide: [
      {
        style: 'Wispy Curtain Bangs with Long Layers',
        whyItCouldWork: 'Could work well because soft wispy bangs reduce forehead width while directing focal attention to the wide-set eyes.',
        length: 'Shoulder to mid-back',
        styling: 'Blow-dried with a round brush for soft, airy movement.'
      },
      {
        style: 'Blunt Collarbone Lob',
        whyItCouldWork: 'Could work well because hair weight sitting at the collarbone adds visual width around a slender, tapered chin.',
        length: 'Collarbone length',
        styling: 'Slight bend through the mid-lengths with a flat iron.'
      },
      {
        style: 'Half-Up Twisted Crown',
        whyItCouldWork: 'Could work well because pulling upper side strands back highlights the wide cheekbones while leaving soft drape around the jaw.',
        length: 'Medium to long',
        styling: 'Secured loosely with silk pins or a minimal clip.'
      }
    ],
    facialHairGuide: {
      currentObservation: 'Facial hair styling cannot be confidently assessed from this photograph.',
      suggestions: [
        'If growing facial hair, a light rounded stubble or soft goatee can add visual weight to a slender chin point.',
        'Keep upper cheek areas clean to let the delicate midface contours remain clear.'
      ]
    },
    styleGuide: {
      directions: [
        'Romantic Ethereal (Soft pastels, silk or cashmere textures, delicate drapery)',
        'Vintage Classic (High-neck blouses, rounded Peter Pan collars, A-line silhouettes)',
        'Clean French Chic (Breton stripes, relaxed linen shirts, tailored cropped trousers)'
      ],
      collarsAndNecklines: [
        'Soft boatneck or wide ballet neckline that broadens the shoulder line to balance the tapered jaw',
        'Sweetheart or rounded scoop neckline harmonizing with plush central lip contours'
      ],
      accessories: [
        'Pendant earrings with teardrop or pearl accents that add volume alongside the lower jaw',
        'Thin tortoiseshell or translucent acetate eyewear frames that don\'t overwhelm delicate bone contours'
      ]
    },
    photoTips: [
      'Use a slightly lower camera angle (chest level tilted gently up) to fill in the lower third and prevent the forehead from appearing oversized.',
      'Soft, diffuse ambient lighting from directly in front illuminates the wide-set eyes and eliminates deep eye socket shadows.',
      'Keep hair resting in front of both shoulders to provide balanced framing around the slender chin.',
      'Relax the lips slightly for an open, serene expression that complements delicate proportions.'
    ],
    personalizedLookGuide: {
      hair: 'Incorporate wispy curtain bangs or collarbone-length volume to balance the delicate jaw taper.',
      grooming: 'Embrace dewy, luminous skin finishes and a touch of lip oil at the center of the mouth.',
      clothing: 'Choose soft boatnecks or ballet necklines in pastel and neutral tones to frame the shoulders.',
      accessories: 'Opt for translucent or light-metal frames and delicate drop earrings that add softness beside the jaw.',
      photoPresentation: 'Shoot in soft, frontal natural light with the camera held right at chin-to-eye height.'
    }
  },
  {
    vibe: 'Classic Harmony & Poise',
    faceShapeName: 'Oblong Oval',
    faceShapeDesc: 'Slightly elongated vertical balance with parallel cheek contours and soft chin curving.',
    eyesDesc: 'Medium almond aperture with balanced distance and neutral, level canthal alignment.',
    eyesDist: 'Remarkably level horizontal axis across both pupils gives the face an anchored, tranquil look.',
    eyebrowsDesc: 'Classic tapered arch following the supraorbital margin with moderate fullness.',
    eyebrowsDist: 'The tail curves smoothly downward past the outer canthus, framing the temple cleanly.',
    noseDesc: 'Straight, refined dorsal line with medium projection and smooth transition into the brow.',
    noseDist: 'Unbroken linear continuity from the glabella down to the tip creates a calming vertical axis.',
    lipsDesc: 'Even 1:1 proportion between upper and lower lips with smooth vermilion borders.',
    lipsDist: 'Symmetrical oral commissures maintain a relaxed, composed resting expression.',
    jawDesc: 'Gentle curve from earlobe to chin without pronounced angular breaks or extreme tapering.',
    jawDist: 'Balanced jaw height provides steady structural grounding to the vertical proportions.',
    skinDesc: 'Neutral olive undertone with even texture and a natural satin surface finish.',
    skinDist: 'Smooth transition of light across the forehead and cheeks without patchy reflectivity.',
    structure: 'Classical thirds alignment where the forehead, nose length, and lower face each occupy approximately equal vertical intervals, establishing a grounded sense of symmetry.',
    standsOut: [
      'Level horizontal eye axis projecting steady visual composure',
      'Classical proportional thirds distribution between forehead, midface, and chin',
      'Smooth, continuous dorsal nasal line providing an anchored center'
    ],
    faceSignature: 'Balanced Thirds · Level Almond Axis · Classic Composure',
    summary: 'A face grounded in classical proportions, displaying equal vertical thirds, level eye alignment, and a tranquil, composed facial presence.',
    celebs: [
      {
        name: 'Anne Hathaway',
        sharedFeatures: 'Shares classic facial thirds balance, expressive almond eye dimensions, and composed jawline.'
      },
      {
        name: 'Keanu Reeves',
        sharedFeatures: 'Similar oblong facial silhouette, level ocular alignment, and straight dorsal nasal continuity.'
      },
      {
        name: 'Dev Patel',
        sharedFeatures: 'Comparable vertical third distribution, natural brow density, and balanced mouth width.'
      }
    ],
    beautyTips: [
      'Groom eyebrows with a neutral-tinted brow gel to reinforce their clean horizontal continuity.',
      'A balanced satin-finish moisturizer maintains even light reflectivity across forehead and chin.',
      'Define the natural lip perimeter with a nude pencil close to your natural lip shade to highlight symmetry.',
      'Keep the hairline clean and hydrated to showcase the balanced height of the upper third.'
    ],
    hairstyleGuide: [
      {
        style: 'Side-Parted Soft Waves with Volume',
        whyItCouldWork: 'Could work well because lateral side volume visually widens an oblong silhouette, balancing vertical length.',
        length: 'Shoulder to collarbone length',
        styling: 'Deep side part styled with medium round brush or large barrel iron.'
      },
      {
        style: 'Classic Low Fade with Side Sweep',
        whyItCouldWork: 'Could work well because keeping sides clean while styling the top with horizontal flow complements balanced thirds.',
        length: 'Short to medium',
        styling: 'Light styling paste or cream for touchable hold.'
      },
      {
        style: 'Messy Textured Shag with Fringe',
        whyItCouldWork: 'Could work well because brow-skimming fringe breaks up forehead height and creates dynamic texture.',
        length: 'Medium length',
        styling: 'Matte texture spray or sea salt mist.'
      }
    ],
    facialHairGuide: {
      currentObservation: 'Facial hair is lightly visible or presents clean grooming along the lower perimeter.',
      suggestions: [
        'A full, neatly trimmed short beard or medium stubble can visually broaden the lower face.',
        'Keep mustache and chin density balanced so vertical symmetry is maintained.'
      ]
    },
    styleGuide: {
      directions: [
        'Smart Classic (Tailored trench coats, crisp poplin shirts, fine leather accents)',
        'Contemporary Casual (Structured cardigans, crewneck knitwear in neutral navy and charcoal)',
        'Ivy League / Heritage (Oxford cloth button-downs, tweed or herringbone outerwear)'
      ],
      collarsAndNecklines: [
        'Wide spread collar or horizontal boatneck to counterbalance vertical facial length',
        'Crewneck or mockneck that cleanly frames the neck and grounds the vertical thirds'
      ],
      accessories: [
        'Classic rectangular or wayfarer frame glasses that introduce horizontal width',
        'Understated leather strap timepiece or minimalist signet ring'
      ]
    },
    photoTips: [
      'Position camera strictly level with the eyes to avoid exaggerating vertical facial height.',
      'Slightly wider lens framing (50mm-75mm) captures upper shoulder width to provide horizontal grounding.',
      'Direct soft 3/4 lighting creates balanced gradients across both cheeks without flattening facial planes.',
      'A relaxed, closed-lip smile maintains natural mouth symmetry and jaw poise.'
    ],
    personalizedLookGuide: {
      hair: 'Add side volume or an off-center part to introduce horizontal balance to an oblong silhouette.',
      grooming: 'Maintain a clean horizontal brow line and a smooth, satin-finish skin routine.',
      clothing: 'Choose horizontal crewnecks, mocknecks, or spread collars in classic navy, olive, and charcoal.',
      accessories: 'Select wide-proportioned or rectangular eyewear to add width across the midface.',
      photoPresentation: 'Shoot straight-on at eye height with relaxed shoulders and balanced lighting.'
    }
  }
];

export function generateCalibratedAnalysis(customImage?: string): FaceAnalysisResult {
  // Deterministic seed based on custom image string or timestamp
  let seed = 0;
  if (customImage && customImage.length > 50) {
    for (let i = 0; i < Math.min(customImage.length, 500); i += 11) {
      seed = (seed + customImage.charCodeAt(i) * 31) % ARCHETYPES.length;
    }
  } else {
    seed = Math.floor(Math.random() * ARCHETYPES.length);
  }

  const profile = ARCHETYPES[seed % ARCHETYPES.length];

  const celebsList: CelebrityReference[] = profile.celebs.map(c => ({
    name: c.name,
    reason: c.sharedFeatures,
    sharedFeatures: c.sharedFeatures
  }));

  return {
    id: `facecard-${Date.now()}`,
    timestamp: Date.now(),
    userImage: customImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    faceShape: {
      name: profile.faceShapeName,
      description: profile.faceShapeDesc
    },
    vibe: profile.vibe,
    features: {
      eyes: {
        description: profile.eyesDesc,
        distinctive: profile.eyesDist
      },
      eyebrows: {
        description: profile.eyebrowsDesc,
        distinctive: profile.eyebrowsDist
      },
      nose: {
        description: profile.noseDesc,
        distinctive: profile.noseDist
      },
      lips: {
        description: profile.lipsDesc,
        distinctive: profile.lipsDist
      },
      jawAndChin: {
        description: profile.jawDesc,
        distinctive: profile.jawDist
      },
      skinAppearance: {
        description: profile.skinDesc,
        distinctive: profile.skinDist
      }
    },
    facialStructure: profile.structure,
    whatStandsOut: profile.standsOut,
    faceSignature: profile.faceSignature,
    photoConditions: 'Front-facing natural daylight with soft ambient diffusion. Minimal lens perspective distortion.',
    celebrityReferences: celebsList,
    similarCelebrities: celebsList,
    beautyTips: profile.beautyTips,
    hairstyleGuide: profile.hairstyleGuide,
    facialHairGuide: profile.facialHairGuide,
    styleGuide: profile.styleGuide,
    photoTips: profile.photoTips,
    personalizedLookGuide: profile.personalizedLookGuide,
    summary: profile.summary
  };
}
