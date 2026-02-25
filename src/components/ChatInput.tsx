import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const EMOJI_LIST = [
  "😊", "😂", "🤔", "👍", "🎉", "🔥", "💡", "✨",
  "😎", "🤖", "💪", "🙌", "❤️", "👀", "🚀", "⚡",
  "🎯", "💻", "🧠", "📊", "🏆", "🌟", "👋", "🤝",
];

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const insertEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setEmojiOpen(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="border border-border bg-card rounded-lg p-2 flex items-end gap-2 glow-green-box">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Opa anything..."
        disabled={disabled}
        rows={1}
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-sm font-mono py-2 px-2 max-h-[200px]"
      />
      <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Smile size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-64 p-2 bg-card border-border"
        >
          <div className="grid grid-cols-8 gap-1">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                onClick={() => insertEmoji(emoji)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted/50 text-base transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 w-9 h-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default ChatInput;
