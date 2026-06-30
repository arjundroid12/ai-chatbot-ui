/**
 * POST /api/chat
 * Body: { messages: [{role, content}] }
 * Returns: { content: "AI response" }
 *
 * Uses z-ai-web-dev-sdk (server-side only — never expose API keys to client)
 */
import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    // Initialize the SDK (uses ZAI_API_KEY from env or default credentials)
    const zai = await ZAI.create();

    const response = await zai.chat.completions.create({
      messages,
      // Optional: model selection, temperature, etc.
      // temperature: 0.7,
    });

    const content = response.choices?.[0]?.message?.content || "I have nothing to say.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: err.message || "AI request failed" }, { status: 500 });
  }
}
