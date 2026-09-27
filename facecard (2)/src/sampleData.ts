import { SamplePortrait, FaceAnalysisResult } from './types';

export const SAMPLE_PORTRAITS: SamplePortrait[] = [
  {
    id: 'sample-1',
    name: 'Sofia',
    title: 'Almond Eyes & Soft Oval Silhouette',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sample-2',
    name: 'Marcus',
    title: 'Angular Jaw & Sculpted Brow Frame',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sample-3',
    name: 'Amara',
    title: 'Expressive Brow Arch & Radiant Harmony',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sample-4',
    name: 'Elena',
    title: 'High Contrast Bone Frame & Tapered Chin',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop'
  }
];

export const FALLBACK_DEMO_RESULT: FaceAnalysisResult = {
  id: 'facecard-demo-001',
  timestamp: Date.now(),
  userImage: SAMPLE_PORTRAITS[0].imageUrl,
  faceShape: {
    name: 'Soft Oval',
    description: 'Evenly proportioned length-to-width ratio with gently curved cheek contours that narrow softly toward a rounded chin.'
  },
  vibe: 'Warm Editorial & Serene',
  features: {
    eyes: {
      description: 'Almond-shaped with a gentle positive canthal tilt and visible eyelid crease spacing.',
      distinctive: 'The outer corners create a natural upward lift, giving the gaze an alert, engaging focal quality.'
    },
    eyebrows: {
      description: 'Naturally dense with a soft, gradual arch that aligns with the lateral orbital rim.',
      distinctive: 'A clean, soft arch frames the upper third without overpowering delicate eye spacing.'
    },
    nose: {
      description: 'Straight dorsal bridge with proportional alar base width aligned with the inner eye corners.',
      distinctive: 'The balanced bridge linearity creates an uninterrupted vertical center line down the midface.'
    },
    lips: {
      description: 'Well-defined vermilion border with balanced upper-to-lower fullness and a sculpted Cupid\'s bow.',
      distinctive: 'The crisp philtrum indentation provides prominent depth and contour to the lower third.'
    },
    jawAndChin: {
      description: 'Softly tapered jaw angle meeting a gently rounded chin with balanced vertical projection.',
      distinctive: 'Smooth mandibular contour transitions gracefully into the neck line without sharp angles.'
    },
    skinAppearance: {
      description: 'Warm golden undertone with a luminous, hydrated surface finish in natural diffuse lighting.',
      distinctive: 'Subtle high-point reflectivity along the zygomatic arch naturally highlights cheekbone structure.'
    }
  },
  facialStructure: 'The upper, middle, and lower horizontal thirds display balanced vertical distribution. The horizontal spacing between the eyes aligns naturally with the width of the nasal base, creating a coherent, fluid visual flow across the central plane.',
  whatStandsOut: [
    'Upturned almond eye corners that provide an immediate lifted focal point',
    'Sculpted Cupid\'s bow contour with balanced vertical lip proportions',
    'Soft oval silhouette creating harmonious curvature from cheek to chin'
  ],
  faceSignature: 'Upturned Almond Eyes · Defined Brow Frame · Soft Oval Balance',
  photoConditions: 'Even ambient lighting with soft front diffusion; camera angle is directly frontal with minimal lens distortion.',
  summary: 'A face characterized by gentle contours, lifted almond eyes, and a balanced oval outline that emphasizes natural warmth and fluid feature transition.',
  celebrityReferences: [
    {
      name: 'Zendaya',
      reason: 'Similar almond eye geometry with an outer corner lift, paired with a soft oval jawline taper and warm undertone balance.'
    },
    {
      name: 'Gemma Chan',
      reason: 'Shares clean brow architecture framing the upper third, along with balanced facial thirds and subtle cheekbone curvature.'
    },
    {
      name: 'Freida Pinto',
      reason: 'Comparable vertical third distribution, defined philtrum contour, and natural warm skin luminosity.'
    }
  ],
  similarCelebrities: [
    {
      name: 'Zendaya',
      reason: 'Similar almond eye geometry with an outer corner lift, paired with a soft oval jawline taper and warm undertone balance.',
      sharedFeatures: 'Similar almond eye geometry with an outer corner lift, paired with a soft oval jawline taper and warm undertone balance.'
    },
    {
      name: 'Gemma Chan',
      reason: 'Shares clean brow architecture framing the upper third, along with balanced facial thirds and subtle cheekbone curvature.',
      sharedFeatures: 'Shares clean brow architecture framing the upper third, along with balanced facial thirds and subtle cheekbone curvature.'
    },
    {
      name: 'Freida Pinto',
      reason: 'Comparable vertical third distribution, defined philtrum contour, and natural warm skin luminosity.',
      sharedFeatures: 'Comparable vertical third distribution, defined philtrum contour, and natural warm skin luminosity.'
    }
  ],
  beautyTips: [
    'Lightly brush and set the natural eyebrow arch upward to preserve eye-to-brow spacing without harsh pencil lines.',
    'A sheer, hydrating moisturizer or dewy skin tint complements your warm undertone without heavy matte powder.',
    'Subtle tinted balm applied along the Cupid\'s bow enhances the naturally sculpted philtrum contour.',
    'Keep hairline flyaways lightly smoothed back with light pomade to leave the upper forehead third unobstructed.'
  ],
  hairstyleGuide: [
    {
      style: 'Soft Layered Face-Framing Waves',
      whyItCouldWork: 'Could work well because gentle curtain layers highlight cheekbone taper without crowding the delicate almond eye area.',
      length: 'Medium to long (collarbone to mid-chest)',
      styling: 'Soft middle or subtle off-center part with outward movement around the midface.'
    },
    {
      style: 'Textured French Bob with Curtain Fringe',
      whyItCouldWork: 'Could work well because ending the perimeter at jaw level balances the vertical thirds and accentuates jawline softness.',
      length: 'Chin to upper collarbone length',
      styling: 'Air-dried with light texturizing cream for airy, natural movement.'
    },
    {
      style: 'Sleek Low Bun with Clean Center Part',
      whyItCouldWork: 'Could work well because drawing hair back completely showcases your balanced facial thirds and lifted eye corners.',
      length: 'Shoulder length or longer tied back',
      styling: 'Clean center parting with lightweight smoothing serum.'
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
    'Position the camera directly at eye level or slightly elevated to maintain proportional thirds and avoid chin distortion.',
    'Utilize soft 45-degree diffused window light to naturally define the cheekbones without harsh nose cast shadows.',
    'Maintain a 1.5 to 2-meter shooting distance using a portrait lens (50mm-85mm equivalent) to prevent wide-angle facial flattening.',
    'Gently turn your head 5-10 degrees away from direct center to introduce dynamic shadow planes along the jawline.'
  ],
  personalizedLookGuide: {
    hair: 'Opt for face-framing curtain layers or an off-center soft part that lets light reach the forehead third.',
    grooming: 'Keep brows brushed upward with clear gel and maintain a hydrated, dewy skin finish.',
    clothing: 'Embrace open collarlines and warm earth tones (camel, cream, terracotta) to harmonize with your warm undertone.',
    accessories: 'Select lightweight, refined wire jewelry and subtle oval or softly rounded frame shapes.',
    photoPresentation: 'Shoot in diffused natural light at eye level with relaxed shoulders and an effortless 3/4 glance.'
  }
};
