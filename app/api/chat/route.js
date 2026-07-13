import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    const apiKey = process.env.ZAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ZAI_API_KEY not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.z.ai/api/paas/v4/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "glm-4.5-flash",
        messages,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `Z.AI API error: ${response.status}` }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "I have nothing to say.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
