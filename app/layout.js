export const metadata = {
  title: "AI Chatbot",
  description: "AI chatbot UI with streaming responses — built with Next.js and z-ai-web-dev-sdk.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0f172a", color: "#f1f5f9", fontFamily: "system-ui" }}>{children}</body>
    </html>
  );
}
