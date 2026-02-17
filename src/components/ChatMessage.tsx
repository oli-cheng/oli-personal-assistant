import ReactMarkdown from "react-markdown";
import { Terminal, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAssistant = role === "assistant";

  return (
    <div className={`flex gap-3 animate-fade-in ${isAssistant ? "" : "flex-row-reverse"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
          isAssistant
            ? "bg-primary/20 text-primary glow-green-box"
            : "bg-secondary/20 text-secondary glow-purple-box"
        }`}
      >
        {isAssistant ? <Terminal size={16} /> : <User size={16} />}
      </div>
      <div
        className={`flex-1 max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
          isAssistant
            ? "bg-card text-card-foreground border border-border"
            : "bg-secondary/10 text-foreground border border-secondary/20"
        }`}
      >
        {isAssistant ? (
          <div className="prose prose-invert prose-sm max-w-none prose-code:text-primary prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-headings:text-foreground prose-a:text-secondary prose-strong:text-foreground">
            <ReactMarkdown>{content || "▌"}</ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
