"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm an AI chatbot. Ask me anything — coding help, writing, explanations, or just chat. 🤖" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConv, setCurrentConv] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!r.ok) throw new Error("API error");
      const data = await r.json();
      setMessages([...newMessages, { role: "assistant", content: data.content }]);
      setConversations((c) => [...c, { user: userMsg.content, assistant: data.content, ts: Date.now() }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't respond. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([{ role: "assistant", content: "Conversation cleared. What would you like to talk about?" }]);
  };

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>🤖 AI Chatbot</h1>
        <button onClick={clear} style={{ background: "#334155", color: "#94a3b8", border: "1px solid #475569", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}>Clear chat</button>
      </header>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, background: "#1e293b", borderRadius: 12, marginBottom: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.role === "user" ? "#6366f1" : "#10b981", display: "grid", placeItems: "center", flexShrink: 0, fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
              {m.role === "user" ? "U" : "AI"}
            </div>
            <div style={{ background: m.role === "user" ? "#6366f1" : "#334155", color: "#fff", padding: "10px 14px", borderRadius: 12, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", color: "#94a3b8", fontStyle: "italic" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#10b981", display: "grid", placeItems: "center", fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>AI</div>
            <span>typing...</span>
          </div>
        )}
      </div>

      <form onSubmit={send} style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{ flex: 1, padding: "12px 16px", background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155", borderRadius: 8, fontFamily: "inherit", fontSize: "1rem", outline: "none" }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} style={{ background: loading ? "#475569" : "#6366f1", color: "#fff", border: "none", padding: "0 24px", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", fontWeight: 600 }}>
          Send
        </button>
      </form>

      {conversations.length > 0 && (
        <footer style={{ marginTop: 16, fontSize: "0.75rem", color: "#64748b", textAlign: "center" }}>
          {conversations.length} exchange(s) this session
        </footer>
      )}
    </main>
  );
}
