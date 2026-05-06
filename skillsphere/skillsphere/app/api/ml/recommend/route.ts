import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

/**
 * POST /api/ml/recommend
 *
 * Body:   { interests: string[] }
 * Returns: Array of { emoji, name, category, duration, difficulty }
 *
 * Generates personalised course recommendations based on the user's interests.
 */

interface RecommendRequest {
  interests: string[];
}

interface Course {
  emoji: string;
  name: string;
  category: string;
  duration: string;   // e.g. "6 weeks"
  difficulty: string; // "Beginner" | "Intermediate" | "Advanced"
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RecommendRequest;

    if (!Array.isArray(body.interests) || body.interests.length === 0) {
      return NextResponse.json(
        { error: "Request body must include a non-empty `interests` array." },
        { status: 400 }
      );
    }

    const interestList = body.interests.map((i) => `- ${i}`).join("\n");

    const prompt = `
You are a personalised learning advisor for the SkillSphere platform.

A learner is interested in the following topics:
${interestList}

Generate exactly 5 course recommendations tailored to those interests.

Return ONLY valid JSON (no markdown fences) — a JSON array with exactly 5 objects, each in this shape:
[
  {
    "emoji": "<single relevant emoji>",
    "name": "<concise course title>",
    "category": "<broad category, e.g. 'Data Science', 'Web Development'>",
    "duration": "<e.g. '4 weeks', '10 hours'>",
    "difficulty": "<one of: Beginner | Intermediate | Advanced>"
  }
]
`.trim();

    const result = await callGemini<Course[]>(prompt);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
