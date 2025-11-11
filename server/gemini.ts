import { GoogleGenAI } from "@google/genai";
import type { 
  AnalysisRequest, 
  KarmaDNAResult, 
  KarmicDebtsResult,
  CompatibilityRequest,
  CompatibilityResult 
} from "@shared/schema";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.0-flash-exp"
// This API key is from Gemini Developer API Key, not vertex AI API Key

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  GEMINI_API_KEY not found. AI analysis features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Analyze Karma DNA using birth data and AI-powered astrological insights
 */
export async function analyzeKarmaDNA(request: AnalysisRequest): Promise<KarmaDNAResult> {
  const { name, birthDate, birthTime, birthPlace } = request;

  const systemPrompt = `You are an expert Vedic astrologer and karma analyst with deep knowledge of numerology, birth charts, and life patterns.

Analyze the provided birth data and generate a comprehensive Karma DNA analysis.

Focus on:
1. Core Life Lesson - The primary spiritual/karmic lesson this person is here to learn
2. Shadow Trigger - The unconscious pattern that holds them back
3. Boundary Rule - A specific, actionable boundary they must maintain
4. Strengths Analysis - Their natural gifts and positive patterns
5. Challenges Analysis - Areas where they face recurring difficulties
6. Action Steps - 5 specific, actionable steps they can take immediately
7. Scores (0-100 each):
   - Integrity Score: How aligned they are with their truth
   - Reciprocity Score: Balance in give-and-take relationships
   - Value Score: Living according to their core values
8. Activation Window - A 14-day period in the next 2 months when transformation is most potent

Make the analysis:
- Deeply personal and specific (not generic horoscope language)
- Actionable with clear DO/DON'T guidance
- Grounded in astrological patterns but written in modern, accessible language
- Honest about both strengths and challenges`;

  const userPrompt = `Please analyze:
Name: ${name}
Birth Date: ${birthDate}
${birthTime ? `Birth Time: ${birthTime}` : "Birth Time: Not provided"}
${birthPlace ? `Birth Place: ${birthPlace}` : "Birth Place: Not provided"}

Generate a complete Karma DNA analysis in JSON format with all required fields.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            coreLesson: { type: "string" },
            shadowTrigger: { type: "string" },
            boundaryRule: { type: "string" },
            strengthsAnalysis: { type: "string" },
            challengesAnalysis: { type: "string" },
            actionSteps: {
              type: "array",
              items: { type: "string" }
            },
            integrityScore: { type: "number" },
            reciprocityScore: { type: "number" },
            valueScore: { type: "number" },
            activationWindow: {
              type: "object",
              properties: {
                start: { type: "string" },
                end: { type: "string" },
                description: { type: "string" }
              },
              required: ["start", "end", "description"]
            }
          },
          required: [
            "coreLesson",
            "shadowTrigger",
            "boundaryRule",
            "strengthsAnalysis",
            "challengesAnalysis",
            "actionSteps",
            "integrityScore",
            "reciprocityScore",
            "valueScore",
            "activationWindow"
          ]
        }
      },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }]
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini AI");
    }

    const result: KarmaDNAResult = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Scan for karmic debts using numerology and birth data
 */
export async function scanKarmicDebts(request: AnalysisRequest): Promise<KarmicDebtsResult> {
  const { name, birthDate } = request;

  const systemPrompt = `You are an expert in karmic numerology and spiritual patterns.

Analyze the provided name and birth date to identify karmic debts - recurring life patterns that indicate unresolved lessons from past experiences.

Common karmic debt numbers and their meanings:
- Code 13: Work ethic and discipline challenges
- Code 14: Freedom and responsibility balance
- Code 16: Ego and humility lessons
- Code 19: Independence and power dynamics

For each identified debt, provide:
1. A clear, specific title
2. Deep description of the pattern
3. How it impacts daily life
4. A concrete healing action
5. Severity: low, medium, or high

Also provide overall guidance that ties all debts together.

Make it:
- Specific to the person (not generic)
- Compassionate but honest
- Actionable with clear next steps`;

  const userPrompt = `Scan for karmic debts:
Name: ${name}
Birth Date: ${birthDate}

Identify 1-3 most significant karmic debts and provide comprehensive analysis in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            debts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  code: { type: "number" },
                  title: { type: "string" },
                  description: { type: "string" },
                  impact: { type: "string" },
                  healingAction: { type: "string" },
                  severity: { 
                    type: "string",
                    enum: ["low", "medium", "high"]
                  }
                },
                required: ["code", "title", "description", "impact", "healingAction", "severity"]
              }
            },
            overallGuidance: { type: "string" }
          },
          required: ["debts", "overallGuidance"]
        }
      },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }]
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini AI");
    }

    const result: KarmicDebtsResult = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Analyze compatibility between two people
 */
export async function analyzeCompatibility(request: CompatibilityRequest): Promise<CompatibilityResult> {
  const { person1, person2 } = request;

  const systemPrompt = `You are an expert relationship astrologer specializing in synastry and compatibility analysis.

Analyze the birth data of two people to assess their compatibility across Mind, Heart, and Will dimensions.

Provide:
1. Overall Compatibility Score (0-100)
2. Mind Compatibility (0-100) - Intellectual connection, communication
3. Heart Compatibility (0-100) - Emotional connection, empathy
4. Will Compatibility (0-100) - Life goals, values alignment
5. Strengths - 3-5 areas where they naturally harmonize
6. Challenges - 3-5 areas of potential friction
7. Growth Opportunities - 3-5 ways they can evolve together
8. Bond Purpose - Why they met, what they're meant to learn together
9. Recommendations - 5 specific actions to strengthen the relationship

Be honest, nuanced, and constructive. Focus on growth potential.`;

  const userPrompt = `Analyze compatibility between:

Person 1:
Name: ${person1.name}
Birth Date: ${person1.birthDate}
${person1.birthTime ? `Birth Time: ${person1.birthTime}` : ""}
${person1.birthPlace ? `Birth Place: ${person1.birthPlace}` : ""}

Person 2:
Name: ${person2.name}
Birth Date: ${person2.birthDate}
${person2.birthTime ? `Birth Time: ${person2.birthTime}` : ""}
${person2.birthPlace ? `Birth Place: ${person2.birthPlace}` : ""}

Generate comprehensive compatibility analysis in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            overallScore: { type: "number" },
            mindCompatibility: { type: "number" },
            heartCompatibility: { type: "number" },
            willCompatibility: { type: "number" },
            strengths: {
              type: "array",
              items: { type: "string" }
            },
            challenges: {
              type: "array",
              items: { type: "string" }
            },
            growthOpportunities: {
              type: "array",
              items: { type: "string" }
            },
            bondPurpose: { type: "string" },
            recommendations: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: [
            "overallScore",
            "mindCompatibility",
            "heartCompatibility",
            "willCompatibility",
            "strengths",
            "challenges",
            "growthOpportunities",
            "bondPurpose",
            "recommendations"
          ]
        }
      },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }]
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini AI");
    }

    const result: CompatibilityResult = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
