import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

/**
 * POST /api/ml/skillgap
 *
 * Body:   { completed_courses: string[], target_role: string }
 * Returns: { gaps: string[], completion_pct: number, next_steps: string[], tip: string }
 *
 * Analyses what skills the learner still needs to reach their target role.
 */

interface SkillGapRequest {
  completed_courses: string[];
  target_role: string;
}

interface SkillGapResponse {
  gaps: string[];          // skills / topics still missing
  completion_pct: number;  // 0–100 estimated readiness
  next_steps: string[];    // ordered action items
  tip: string;             // one motivational / strategic tip
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SkillGapRequest;

    if (!body.target_role || typeof body.target_role !== "string") {
      return NextResponse.json(
        { error: "Request body must include a non-empty `target_role` string." },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.completed_courses)) {
      return NextResponse.json(
        { error: "`completed_courses` must be an array." },
        { status: 400 }
      );
    }

    const courseList =
      body.completed_courses.length > 0
        ? body.completed_courses.map((c) => `- ${c}`).join("\n")
        : "None yet";

    const prompt = `
You are a career and skills advisor for the SkillSphere learning platform.

A learner wants to become a "${body.target_role}".

Courses they have already completed:
${courseList}

Perform a skill-gap analysis and return ONLY valid JSON (no markdown fences) in exactly this shape:
{
  "gaps": ["<skill or topic 1>", "<skill or topic 2>", ...],
  "completion_pct": <integer 0-100 estimating how ready they are>,
  "next_steps": ["<actionable step 1>", "<actionable step 2>", "<actionable step 3>"],
  "tip": "<one motivational or strategic tip to help them reach their goal faster>"
}

Be specific and realistic. Limit gaps to the 5 most critical ones.
`.trim();

    const result = await callGemini<SkillGapResponse>(prompt);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
