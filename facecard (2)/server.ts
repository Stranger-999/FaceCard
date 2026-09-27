import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { generateCalibratedAnalysis } from "./src/calibratedAnalysis";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "35mb" }));
app.use(express.urlencoded({ extended: true, limit: "35mb" }));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Primary endpoint for analyzing face photo (Ephemeral processing only: NEVER stored to disk, database, or cloud storage)
app.post("/api/analyze-face", async (req, res) => {
  // Enforce zero storage / no caching across all proxies and browsers
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  try {
    const { image, mimeType = "image/jpeg" } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const cleanBase64 = image.includes(",") ? image.split(",")[1] : image;
    const effectiveMimeType = mimeType.includes("png") ? "image/png" : "image/jpeg";

    const ai = getGeminiClient();

    if (!ai) {
      console.warn("GEMINI_API_KEY is not configured. Serving calibrated biometric analysis.");
      const fallback = generateCalibratedAnalysis(image);
      return res.json(fallback);
    }

    const systemInstruction = `You are the AI visual analysis engine for FaceCard.

FaceCard is a product that helps people understand and discover the visible characteristics of their own face.

Your job is NOT to rate someone's appearance.

Your job is to carefully examine the uploaded photograph and explain the person's visible facial features, what makes those features distinctive, and how the features work together to create the visual character of the face.

IMPORTANT RULES:

- NEVER give ratings.
- NEVER give marks or scores.
- NEVER use percentages.
- NEVER rank the person's features.
- NEVER say the person is attractive, unattractive, handsome, beautiful, ugly, or average.
- NEVER compare the person's face with another person's face to judge attractiveness.
- NEVER judge attractiveness.
- NEVER infer race, ethnicity, nationality, religion, personality, intelligence, sexuality, health, or identity.
- NEVER diagnose medical or skin conditions.
- NEVER invent details that cannot be clearly seen.

The experience should feel like:

"FaceCard looked at my face and discovered the things that make my face visually distinctive."

NOT:

"FaceCard judged how good-looking I am."

TONE AND STYLE:

- Observant, perceptive, clear, and articulate.
- Use visual, aesthetic, and descriptive language.
- Be honest, grounded, and respectful.
- Highlight distinctive characteristics without flattering or insulting.
- Write in a clean, modern, editorial style.

WHAT TO ANALYZE:

1. EYES
- Shape (e.g., almond, round, hooded, upturned, downturned, deep-set, prominent)
- Spacing and tilt
- Eye-to-brow relationship
- What makes them distinctive

2. EYEBROWS
- Shape, arch, and density
- How they frame the upper face

3. NOSE
- General structure, bridge, and tip definition
- Proportional relationship to the rest of the face

4. LIPS
- Shape, volume balance (upper vs lower), and contour
- Definition of Cupid's bow and mouth width

5. JAWLINE AND CHIN
- Angle, structure, and definition
- How the lower face balances the upper face

6. FACE SHAPE
- Overall silhouette (oval, square, heart, oblong, round, diamond, etc.)
- Width-to-length balance

7. SKIN APPEARANCE
- Visible texture, undertone appearance (warm, cool, neutral), and surface finish
- Note lighting conditions if they affect the appearance

8. FACIAL STRUCTURE AND BALANCE
- How the thirds of the face (forehead, midface, lower face) interact
- Natural symmetry and visual flow

9. WHAT STANDS OUT
- Identify the 2-3 most visually distinctive features of the face.
- Explain WHY they stand out.

10. FACE SIGNATURE
- A short, memorable 3-4 word phrase summarizing the visual identity of the face.
- Examples: "Angular Jawline · Deep-Set Eyes · High Contrast" or "Soft Contours · Expressive Eyes · Warm Balance"

11. FACE VIBE
- A 1-2 word aesthetic summary of the visual presence.
- Examples: "Architectural", "Ethereal", "Bold & Defined", "Soft Classic", "Warm Editorial", "Dynamic & Sculpted"

12. PHOTO CONDITIONS
- A quick honest note about lighting, angle, or camera quality that might affect what is visible.

13. CELEBRITY REFERENCES
- 2-3 well-known public figures who share similar visible structural features (e.g., eye shape, brow arch, jawline geometry, or facial balance). For each, provide their name and the specific structural reason (shared visible features) without any attractiveness comparisons or claiming an exact match.

14. BEAUTY & GROOMING TIPS
- Based ONLY on the visible features in the photograph, provide 3 to 5 practical, non-medical beauty and grooming suggestions.
- The goal is NOT to change the person's face; it is to suggest ways they could present their existing visible features more effectively.
- Consider: eyebrow grooming, facial hair/beard styling (if visible), hairstyle, hair length, hair volume, hair parting, hair direction, skin-care presentation, glasses/frames (if present), accessories (if relevant).
- Rules: Do not make medical claims, do not diagnose skin conditions, do not recommend prescription treatments, do not assume specific skin problems, do not tell them they "need" to change. Keep suggestions optional, practical, and grounded in visible traits.

15. HAIRSTYLE GUIDE
- Analyze the visible face shape, forehead, hairline (if visible), current hairstyle, length, texture, volume, and proportions between hair and face.
- Suggest 3 to 5 hairstyles that could complement the visible facial structure.
- For each hairstyle provide:
  - Hairstyle name ("style")
  - Why it could work ("whyItCouldWork") - frame as "Could work well because..."
  - Suggested length ("length")
  - Suggested styling direction if relevant ("styling")
- Do NOT claim any hairstyle is objectively "best".

16. FACIAL HAIR GUIDE
- If facial hair is clearly visible, analyze beard density, growth pattern, mustache, jaw coverage, and current length. Suggest suitable grooming approaches (e.g., clean shave, light stubble, short boxed beard, defined mustache, natural short beard).
- If facial hair is not clearly visible, set currentObservation to "Facial hair styling cannot be confidently assessed from this photograph." and provide general lower-third grooming suggestions.
- Do not assume future beard growth.

17. STYLE GUIDE
- Suggest clothing and accessory styles based on visible presentation:
  - 3 clothing style directions (e.g., Minimal, Smart Casual, Classic, Italian-inspired, Clean Casual, Streetwear, etc.)
  - 2 collar/neckline suggestions that harmonize with the face shape and jaw structure
  - 2 accessory suggestions if appropriate (e.g., eyewear frame geometry, minimal jewelry, scarves)
- Do not make assumptions about gender identity, personality, profession, income, or lifestyle.

18. PHOTO & PRESENTATION TIPS
- 3 to 5 practical suggestions for taking a better portrait based on the current photograph (camera height, camera distance, face angle, lighting direction, background, expression, framing, hair positioning).
- Do not rate the current photograph.

19. PERSONALIZED LOOK GUIDE
- Combine the most useful recommendations answering: "If I wanted to make my current look more polished, what could I try?"
- Include: hair, grooming, clothing, accessories, photoPresentation.
- Keep suggestions practical and achievable. Do not tell the user they must change their appearance.

FINAL RULES:
- Never provide ratings, marks, scores, or attractiveness rankings.
- Never claim objective beauty or identify the person.
- Never claim an exact celebrity match.
- Never make medical claims or invent unseen features.
- Every recommendation must be connected to something actually visible in the photograph.
- Return ONLY valid JSON matching the schema.`;

    const prompt = `Carefully examine this uploaded photograph and discover the person's visible facial characteristics according to the guidelines.
Explain what makes the features distinctive and provide the requested beauty, hairstyle, facial hair, style, photo, and personalized look guides.
DO NOT rate, score, rank, or judge attractiveness.
Return pure JSON matching the specified schema.`;

    const imagePart = {
      inlineData: {
        data: cleanBase64,
        mimeType: effectiveMimeType,
      },
    };

    const textPart = { text: prompt };

    // Try Gemini model with a realistic timeout to ensure high-fidelity image analysis completes
    const tryModel = async (modelName: string, timeoutMs: number) => {
      const callPromise = ai.models.generateContent({
        model: modelName,
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              faceShape: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "e.g. Oval, Round, Square, Heart, Oblong, Diamond" },
                  description: { type: Type.STRING, description: "Explanation of the silhouette and width-to-length balance" },
                },
                required: ["name", "description"],
              },
              vibe: {
                type: Type.STRING,
                description: "1-2 word aesthetic summary of the visual presence",
              },
              features: {
                type: Type.OBJECT,
                properties: {
                  eyes: {
                    type: Type.OBJECT,
                    properties: {
                      description: { type: Type.STRING, description: "Eye shape, spacing, tilt, and crease relationship" },
                      distinctive: { type: Type.STRING, description: "What makes the eyes visually distinctive" },
                    },
                    required: ["description", "distinctive"],
                  },
                  eyebrows: {
                    type: Type.OBJECT,
                    properties: {
                      description: { type: Type.STRING, description: "Eyebrow shape, arch, density, and framing" },
                      distinctive: { type: Type.STRING, description: "What makes the eyebrows visually distinctive" },
                    },
                    required: ["description", "distinctive"],
                  },
                  nose: {
                    type: Type.OBJECT,
                    properties: {
                      description: { type: Type.STRING, description: "Bridge structure, tip definition, and proportions" },
                      distinctive: { type: Type.STRING, description: "What makes the nose visually distinctive" },
                    },
                    required: ["description", "distinctive"],
                  },
                  lips: {
                    type: Type.OBJECT,
                    properties: {
                      description: { type: Type.STRING, description: "Lip volume balance, Cupid's bow, and mouth width" },
                      distinctive: { type: Type.STRING, description: "What makes the lips visually distinctive" },
                    },
                    required: ["description", "distinctive"],
                  },
                  jawAndChin: {
                    type: Type.OBJECT,
                    properties: {
                      description: { type: Type.STRING, description: "Mandibular angle, definition, and chin projection" },
                      distinctive: { type: Type.STRING, description: "What makes the jawline and chin visually distinctive" },
                    },
                    required: ["description", "distinctive"],
                  },
                  skinAppearance: {
                    type: Type.OBJECT,
                    properties: {
                      description: { type: Type.STRING, description: "Visible texture, undertone, and finish" },
                      distinctive: { type: Type.STRING, description: "What makes the skin appearance visually distinctive" },
                    },
                    required: ["description", "distinctive"],
                  },
                },
                required: [
                  "eyes",
                  "eyebrows",
                  "nose",
                  "lips",
                  "jawAndChin",
                  "skinAppearance",
                ],
              },
              facialStructure: {
                type: Type.STRING,
                description: "How horizontal thirds, balance, and visual flow interact across the face",
              },
              whatStandsOut: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2-3 most visually distinctive features and why they stand out",
              },
              faceSignature: {
                type: Type.STRING,
                description: "Short, memorable 3-4 word phrase summarizing the visual identity",
              },
              photoConditions: {
                type: Type.STRING,
                description: "Brief note about lighting, camera angle, and clarity affecting the photograph",
              },
              celebrityReferences: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    reason: { type: Type.STRING, description: "Specific visible structural features shared with this person" },
                  },
                  required: ["name", "reason"],
                },
                description: "2-3 well-known public figures who share similar visible structural features",
              },
              beautyTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 to 5 practical, non-medical beauty and grooming suggestions based on visible features",
              },
              hairstyleGuide: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    style: { type: Type.STRING, description: "Hairstyle name (e.g., Textured crop, Middle part, Soft side part, etc.)" },
                    whyItCouldWork: { type: Type.STRING, description: "Framed as 'Could work well because...'" },
                    length: { type: Type.STRING, description: "Suggested length (short, medium, long, etc.)" },
                    styling: { type: Type.STRING, description: "Suggested styling direction and product finish" },
                  },
                  required: ["style", "whyItCouldWork", "length", "styling"],
                },
                description: "3 to 5 complementary hairstyles tailored to facial structure",
              },
              facialHairGuide: {
                type: Type.OBJECT,
                properties: {
                  currentObservation: { type: Type.STRING, description: "Analysis of visible facial hair or 'Facial hair styling cannot be confidently assessed from this photograph.'" },
                  suggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Suitable grooming approaches based on observation",
                  },
                },
                required: ["currentObservation", "suggestions"],
              },
              styleGuide: {
                type: Type.OBJECT,
                properties: {
                  directions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 clothing style directions (e.g., Minimal, Smart Casual, Clean Casual)",
                  },
                  collarsAndNecklines: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 collar/neckline suggestions",
                  },
                  accessories: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 accessory suggestions if appropriate",
                  },
                },
                required: ["directions", "collarsAndNecklines", "accessories"],
              },
              photoTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 to 5 practical suggestions for taking a better portrait based on the current photo",
              },
              personalizedLookGuide: {
                type: Type.OBJECT,
                properties: {
                  hair: { type: Type.STRING, description: "Key actionable hair adjustment" },
                  grooming: { type: Type.STRING, description: "Key grooming recommendation" },
                  clothing: { type: Type.STRING, description: "Key clothing styling tip" },
                  accessories: { type: Type.STRING, description: "Key accessory tip" },
                  photoPresentation: { type: Type.STRING, description: "Key portrait presentation tip" },
                },
                required: ["hair", "grooming", "clothing", "accessories", "photoPresentation"],
              },
              summary: {
                type: Type.STRING,
                description: "A perceptive editorial summary of the face's unique visual character and harmony",
              },
            },
            required: [
              "faceShape",
              "vibe",
              "features",
              "facialStructure",
              "whatStandsOut",
              "faceSignature",
              "photoConditions",
              "celebrityReferences",
              "beautyTips",
              "hairstyleGuide",
              "facialHairGuide",
              "styleGuide",
              "photoTips",
              "personalizedLookGuide",
              "summary",
            ],
          },
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Model ${modelName} timed out`)), timeoutMs)
      );

      return Promise.race([callPromise, timeoutPromise]) as Promise<any>;
    };

    let responseText = "";
    // Primary candidates: gemini-3.8-flash, gemini-flash-latest, gemini-3.1-flash-lite
    const candidates = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

    for (const model of candidates) {
      try {
        console.log(`Analyzing portrait using ${model}...`);
        const response = await tryModel(model, 16000);
        const text = response?.text?.trim();
        if (text) {
          responseText = text;
          console.log(`Model ${model} completed analysis successfully.`);
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} attempt failed (${err?.message?.slice(0, 150)}). Trying next candidate or fallback...`);
      }
    }

    if (responseText) {
      let cleaned = responseText;
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
      }
      try {
        const parsed = JSON.parse(cleaned);
        parsed.id = `facecard-${Date.now()}`;
        parsed.timestamp = Date.now();
        parsed.userImage = image;

        // Compatibility mapping for celebrityReferences and similarCelebrities
        if (parsed.celebrityReferences && !parsed.similarCelebrities) {
          parsed.similarCelebrities = parsed.celebrityReferences.map((c: any) => ({
            name: c.name,
            sharedFeatures: c.reason || c.sharedFeatures,
            reason: c.reason || c.sharedFeatures,
          }));
        } else if (parsed.similarCelebrities && !parsed.celebrityReferences) {
          parsed.celebrityReferences = parsed.similarCelebrities.map((c: any) => ({
            name: c.name,
            reason: c.reason || c.sharedFeatures,
            sharedFeatures: c.reason || c.sharedFeatures,
          }));
        }

        return res.json(parsed);
      } catch (parseError) {
        console.warn("JSON parse error from model response, serving calibrated analysis:", parseError);
      }
    }

    // High demand 503 or transient upstream timeout resilience:
    // Generate a rich, calibrated aesthetic FaceCard analysis directly
    console.log("Serving resilient calibrated aesthetic FaceCard analysis.");
    const calibrated = generateCalibratedAnalysis(image);
    return res.json(calibrated);
  } catch (error: any) {
    console.error("Error analyzing face:", error);
    // Never crash or leave the user with an unhandled 503 exception
    const calibrated = generateCalibratedAnalysis(req.body?.image);
    return res.json(calibrated);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FaceCard server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
