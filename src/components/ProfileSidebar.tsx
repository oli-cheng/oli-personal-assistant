import { Github, Linkedin, Globe, Mail, MapPin, Briefcase, Heart, Zap, Brain } from "lucide-react";
import opaGreeting from "@/assets/opa-greeting.png";
import oliPhoto from "@/assets/oli-photo.jpg";
import { useState, useEffect } from "react";

const links = [
  { icon: Globe, label: "olicheng.com", href: "https://olicheng.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/oli-cheng" },
  { icon: Github, label: "GitHub", href: "https://github.com/oli-cheng" },
  { icon: Mail, label: "Contact", href: "mailto:oli@olicheng.com" },
];

interface ProfileSidebarProps {
  messageCount?: number;
  mood?: string;
}

const ProfileSidebar = ({ messageCount = 0, mood = "greeting" }: ProfileSidebarProps) => {
  const [happiness, setHappiness] = useState(70);
  const [energy, setEnergy] = useState(100);
  const [knowledge, setKnowledge] = useState(50);

  // Stats react to conversation
  useEffect(() => {
    setHappiness(Math.min(100, 70 + messageCount * 5));
    setEnergy(Math.max(20, 100 - messageCount * 8));
    setKnowledge(Math.min(100, 50 + messageCount * 10));
  }, [messageCount]);

  const moodLabel = mood === "excited" ? "🎉 Excited!" : mood === "thinking" ? "🤔 Thinking..." : mood === "happy" ? "😊 Happy" : mood === "greeting" ? "👋 Ready!" : "😐 Chill";

  return (
    <aside className="hidden lg:flex flex-col w-80 border-l border-border bg-card/50 overflow-y-auto">
      {/* Opa Pet Display */}
      <div className="relative flex flex-col items-center gap-2 p-6 pb-4 bg-gradient-to-b from-primary/5 to-transparent">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float-1 top-4 left-8" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-secondary/30 animate-float-2 top-12 right-12" />
          <div className="absolute w-1 h-1 rounded-full bg-primary/20 animate-float-3 bottom-8 left-16" />
        </div>

        <div className="w-28 h-28 rounded-2xl overflow-hidden glow-green-box border-2 border-primary/30 animate-breathe relative">
          <img
            src={opaGreeting}
            alt="Opa AI Assistant"
            className="w-full h-full object-cover"
          />
          {/* Status indicator */}
          <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-primary animate-pulse border border-primary-foreground" />
        </div>

        <div className="text-center">
          <h2 className="text-base font-bold text-foreground glow-green">Opa</h2>
          <p className="text-[10px] text-muted-foreground font-mono">{moodLabel}</p>
        </div>

        {/* Stat Bars */}
        <div className="w-full space-y-1.5 mt-1">
          <StatBar icon={Heart} label="Happiness" value={happiness} color="text-rose-400" barColor="bg-rose-400" />
          <StatBar icon={Zap} label="Energy" value={energy} color="text-amber-400" barColor="bg-amber-400" />
          <StatBar icon={Brain} label="Knowledge" value={knowledge} color="text-secondary" barColor="bg-secondary" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-4" />

      {/* About Oli - with photo */}
      <div className="p-4 space-y-3">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">About Oli</h3>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0">
            <img src={oliPhoto} alt="Oli Cheng" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-foreground">
              <Briefcase size={12} className="text-primary flex-shrink-0" />
              <span>Product Designer & Engineer</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-foreground">
              <MapPin size={12} className="text-primary flex-shrink-0" />
              <span>University of Waterloo</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          CS & Cognitive Science grad specializing in AI-driven product design,
          human-centered UX, and full-stack engineering.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-4" />

      {/* Links */}
      <div className="p-4 space-y-1">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Connect</h3>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50 group"
          >
            <link.icon size={13} className="flex-shrink-0 group-hover:animate-bounce-small" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-4" />

      {/* Experience */}
      <div className="p-4 space-y-1.5">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Experience</h3>
        {["Unyte Health", "Aterica", "SmartHalo", "ShipDojo"].map((company, i) => (
          <div
            key={company}
            className="text-xs text-foreground py-1.5 px-2.5 rounded-md bg-muted/30 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {company}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-border">
        <p className="text-[9px] text-muted-foreground text-center font-mono opacity-50">
          Opa v1.0 • Keep chatting to level up! 🎮
        </p>
      </div>
    </aside>
  );
};

// Mini stat bar component
function StatBar({ icon: Icon, label, value, color, barColor }: {
  icon: typeof Heart;
  label: string;
  value: number;
  color: string;
  barColor: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={11} className={`${color} flex-shrink-0`} />
      <span className="text-[9px] text-muted-foreground w-14 font-mono">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%`, opacity: 0.7 }}
        />
      </div>
      <span className="text-[9px] text-muted-foreground font-mono w-6 text-right">{value}</span>
    </div>
  );
}

export default ProfileSidebar;
