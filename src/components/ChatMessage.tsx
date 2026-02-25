import ReactMarkdown from "react-markdown";
import { User } from "lucide-react";
import opaHappy from "@/assets/opa-happy.png";
import opaThinking from "@/assets/opa-thinking.png";
import opaExcited from "@/assets/opa-excited.png";
import opaNeutral from "@/assets/opa-neutral.png";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

// Pick an emotional state based on content keywords
function getOpaAvatar(content: string): string {
  const lower = content.toLowerCase();
  if (lower.includes("!") || lower.includes("great") || lower.includes("awesome") || lower.includes("amazing") || lower.includes("love")) {
    return opaExcited;
  }
  if (lower.includes("think") || lower.includes("consider") || lower.includes("hmm") || lower.includes("well") || lower.includes("let me")) {
    return opaThinking;
  }
  if (lower.includes("happy") || lower.includes("glad") || lower.includes("sure") || lower.includes("yes") || lower.includes("of course") || lower.includes("hire")) {
    return opaHappy;
  }
  return opaNeutral;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAssistant = role === "assistant";
  const avatar = isAssistant ? getOpaAvatar(content) : null;

  return (
    <div className={`flex gap-3 animate-fade-in ${isAssistant ? "" : "flex-row-reverse"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center overflow-hidden ${
          isAssistant
            ? "glow-green-box"
            : "bg-secondary/20 text-secondary glow-purple-box"
        }`}
      >
        {isAssistant ? (
          <img src={avatar!} alt="Opa" className="w-full h-full object-cover" />
        ) : (
          <User size={16} />
        )}
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
