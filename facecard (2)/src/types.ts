export interface FeatureDetail {
  description: string;
  distinctive: string;
}

export interface CelebrityReference {
  name: string;
  reason?: string;
  // Optional alias for backward compatibility
  sharedFeatures?: string;
}

export interface HairstyleSuggestion {
  style: string;
  whyItCouldWork: string;
  length: string;
  styling: string;
}

export interface FacialHairGuide {
  currentObservation: string;
  suggestions: string[];
}

export interface StyleGuide {
  directions: string[];
  collarsAndNecklines: string[];
  accessories: string[];
}

export interface PersonalizedLookGuide {
  hair: string;
  grooming: string;
  clothing: string;
  accessories: string;
  photoPresentation: string;
}

export interface FaceAnalysisResult {
  id: string;
  timestamp: number;
  userImage: string;
  faceShape: {
    name: string;
    description: string;
  };
  vibe: string;
  features: {
    eyes: FeatureDetail;
    eyebrows: FeatureDetail;
    nose: FeatureDetail;
    lips: FeatureDetail;
    jawAndChin: FeatureDetail;
    skinAppearance: FeatureDetail;
  };
  facialStructure: string;
  whatStandsOut: string[];
  faceSignature: string;
  photoConditions: string;
  celebrityReferences: CelebrityReference[];
  // Alias for backward compatibility in canvas exporter / drawer
  similarCelebrities?: CelebrityReference[];
  beautyTips: string[];
  hairstyleGuide: HairstyleSuggestion[];
  facialHairGuide: FacialHairGuide;
  styleGuide: StyleGuide;
  photoTips: string[];
  personalizedLookGuide: PersonalizedLookGuide;
  summary: string;
}

export interface SamplePortrait {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
}
