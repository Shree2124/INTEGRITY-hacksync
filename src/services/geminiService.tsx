import { GoogleGenAI, Type } from "@google/genai";
import { OfficialRecord, AuditResult, RiskLevel } from '@/types/types';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });

// Helper to remove base64 prefix
const cleanBase64 = (b64: string) => b64.replace(/^data:image\/\w+;base64,/, "");

/**
 * Stage 1: Analyze Document/Image (Document Intelligence)
 */
export const analyzeEvidenceImage = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64(base64Image) } },
          { text: "Analyze this image. If it is a document, extract the project name, contractor, and budget. If it is a photo of infrastructure (road, building, etc.), describe the condition, specifically looking for defects like potholes, cracks, or stalled construction. Be concise." }
        ]
      }
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Analysis failed:", error);
    return "Failed to analyze image.";
  }
};

/**
 * Stage 2 & 3: Audit & Verdict (Agentic Workflow)
 */
export const performAudit = async (
  evidenceDescription: string,
  officialRecord: OfficialRecord
): Promise<AuditResult> => {
  try {
    const prompt = `
      Act as a strict government infrastructure auditor.
      
      OFFICIAL RECORD:
      Project: ${officialRecord.projectName}
      Status: ${officialRecord.status}
      Description: ${officialRecord.description}
      Budget: ₹${officialRecord.budget}
      Contractor: ${officialRecord.contractor}

      FIELD EVIDENCE REPORT:
      "${evidenceDescription}"

      TASK:
      Compare the field evidence against the official record. 
      1. Are there discrepancies? (e.g., Record says 'Completed' but evidence shows construction).
      2. Assess the Risk Level (Low/Medium/High) of corruption or mismanagement.
      3. Provide a reasoning.

      Output JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            discrepancies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER }
          },
          required: ['riskLevel', 'discrepancies', 'reasoning', 'confidenceScore']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from audit model");

    const result = JSON.parse(text) as any;

    return {
      riskLevel: result.riskLevel as RiskLevel,
      discrepancies: result.discrepancies,
      reasoning: result.reasoning,
      confidenceScore: result.confidenceScore
    };

  } catch (error) {
    console.error("Audit failed:", error);
    return {
      riskLevel: RiskLevel.UNKNOWN,
      discrepancies: ["Audit process failed."],
      reasoning: "AI service unavailable.",
      confidenceScore: 0
    };
  }
};

/**
 * Combined Audit Function for API usage
 */
export const auditProject = async (
  governmentProject: any,
  citizenReport: { imageUrl: string; notes: string }
) => {
  try {
    // 1. Fetch and convert image to base64
    const imageRes = await fetch(citizenReport.imageUrl);
    const arrayBuffer = await imageRes.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    // 2. Analyze image
    const evidenceDescription = await analyzeEvidenceImage(base64Image);

    // 3. Perform audit
    const auditResult = await performAudit(evidenceDescription, {
      projectName: governmentProject.project_name,
      status: governmentProject.status,
      description: governmentProject.category, // Using category as description if not present
      budget: governmentProject.budget,
      contractor: governmentProject.contractor
    } as any);

    return {
      risk_level: auditResult.riskLevel,
      discrepancies: auditResult.discrepancies,
      ai_verdict: auditResult.reasoning
    };
  } catch (error) {
    console.error("auditProject failed:", error);
    return {
      risk_level: "Unknown",
      discrepancies: ["AI Audit failed to process."],
      ai_verdict: "The AI service encountered an error while analyzing this report."
    };
  }
};

/**
 * Bonus: Automated Correspondence
 */
export const generateComplaintLetter = async (
  auditResult: AuditResult,
  record: OfficialRecord
): Promise<string> => {
  try {
    const prompt = `
      Write a formal complaint letter to the Municipal Commissioner regarding project "${record.projectName}".
      Based on the following audit findings:
      Risk: ${auditResult.riskLevel}
      Issues: ${auditResult.discrepancies.join(', ')}
      Reasoning: ${auditResult.reasoning}
      
      Keep it professional, concise, and demand an immediate inquiry.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt
    });

    return response.text || "Could not generate letter.";
  } catch (e) {
    return "Error generating correspondence.";
  }
};