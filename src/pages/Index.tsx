import { useState, useRef, useEffect } from "react";
import { Terminal, Trash2 } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { streamChat, type Msg } from "@/lib/streamChat";
import { toast } from "sonner";

const Index = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline z-50" />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-green-box">
              <Terminal size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground glow-green">
                OPA <span className="text-muted-foreground font-normal text-xs">v1.0</span>
              </h1>
              <p className="text-xs text-muted-foreground">Oli's Personal Assistant</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-md hover:bg-muted"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
          )}
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center glow-green-box">
                <Terminal size={32} className="text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-foreground glow-green">
                  &gt; Hello, Oli.
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  I'm <span className="text-secondary glow-purple">OPA</span>, your personal AI assistant.
                  Ask me anything — code, ideas, research, or just vibes.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {[
                  "Help me brainstorm a project idea",
                  "Explain async/await simply",
                  "Write me a Python script",
                  "What's trending in AI?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-xs px-3 py-2 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 hover:glow-green-box transition-all"
                  >
                    {prompt}
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
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center glow-green-box">
                <Terminal size={16} className="text-primary" />
              </div>
              <div className="bg-card border border-border rounded-lg px-4 py-3">
                <span className="text-primary animate-blink">▌</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2">
          <ChatInput onSend={handleSend} disabled={isLoading} />
          <p className="text-center text-[10px] text-muted-foreground mt-2 opacity-60">
            OPA is powered by AI. Responses may not always be accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
