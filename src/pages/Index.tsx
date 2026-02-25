import { useState, useRef, useEffect } from "react";
import { Trash2, PanelRightOpen, PanelRightClose, Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ProfileSidebar from "@/components/ProfileSidebar";
import { streamChat, type Msg } from "@/lib/streamChat";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import opaGreeting from "@/assets/opa-greeting.png";
import opaExcited from "@/assets/opa-excited.png";
import opaHappy from "@/assets/opa-happy.png";

const Index = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentMood, setCurrentMood] = useState("greeting");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Update mood based on latest assistant message
  useEffect(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    if (!lastAssistant) return;
    const lower = lastAssistant.content.toLowerCase();
    if (lower.includes("!") || lower.includes("great") || lower.includes("awesome")) {
      setCurrentMood("excited");
    } else if (lower.includes("think") || lower.includes("hmm") || lower.includes("let me")) {
      setCurrentMood("thinking");
    } else if (lower.includes("happy") || lower.includes("sure") || lower.includes("hire")) {
      setCurrentMood("happy");
    } else {
      setCurrentMood("neutral");
    }
  }, [messages]);

  const handleSend = async (input: string) => {
    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast.error(err);
          setIsLoading(false);
        },
      });
    } catch {
      toast.error("Connection failed. Please try again.");
      setIsLoading(false);
    }
  };

  const messageCount = messages.filter((m) => m.role === "user").length;

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline z-50" />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden glow-green-box animate-breathe">
              <img src={opaGreeting} alt="Opa" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground glow-green flex items-center gap-1.5">
                Opa
                <span className="text-muted-foreground font-normal text-[10px]">v1.0</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </h1>
              <p className="text-[11px] text-muted-foreground">Oli Cheng's digital companion</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={() => {
                  setMessages([]);
                  setCurrentMood("greeting");
                }}
                className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-md hover:bg-muted"
                title="Clear chat"
              >
                <Trash2 size={16} />
              </button>
            )}
            {!isMobile && (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
                title={showSidebar ? "Hide profile" : "Show profile"}
              >
                {showSidebar ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
              </button>
            )}
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center h-full text-center space-y-6">
              {/* Big Opa with idle animation */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl overflow-hidden glow-green-box border-2 border-primary/20 animate-breathe">
                  <img src={opaGreeting} alt="Opa waving" className="w-full h-full object-cover" />
                </div>
                {/* Sparkle decorations */}
                <Sparkles size={14} className="absolute -top-2 -right-2 text-primary animate-ping-slow" />
                <Sparkles size={10} className="absolute -bottom-1 -left-2 text-secondary animate-ping-slow delay-500" />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-foreground glow-green">
                  &gt; Hey there! 👋
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  I'm <span className="text-secondary glow-purple font-bold">Opa</span>, Oli Cheng's digital companion.
                  Ask me about Oli's work, his design philosophy, or why you should hire him!
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {[
                  { text: "Who is Oli Cheng?", emoji: "👤" },
                  { text: "Why should I hire Oli?", emoji: "💼" },
                  { text: "What's his design philosophy?", emoji: "🎨" },
                  { text: "Show me his best projects", emoji: "🚀" },
                ].map(({ text, emoji }) => (
                  <button
                    key={text}
                    onClick={() => handleSend(text)}
                    className="group text-xs px-3 py-2 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 hover:glow-green-box transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="mr-1.5 group-hover:animate-bounce-small inline-block">{emoji}</span>
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-md overflow-hidden glow-green-box animate-breathe">
                <img src={opaGreeting} alt="Opa thinking" className="w-full h-full object-cover" />
              </div>
              <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2">
          <ChatInput onSend={handleSend} disabled={isLoading} />
          <p className="text-center text-[10px] text-muted-foreground mt-2 opacity-50 font-mono">
            Opa is powered by AI • Keep chatting to level up! 🎮
          </p>
        </div>
      </div>

      {/* Profile sidebar - default open */}
      {showSidebar && !isMobile && (
        <ProfileSidebar messageCount={messageCount} mood={currentMood} />
      )}
    </div>
  );
};

export default Index;
