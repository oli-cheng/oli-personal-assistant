import { Github, Linkedin, Globe, Mail, MapPin, Briefcase } from "lucide-react";
import opaGreeting from "@/assets/opa-greeting.png";

const links = [
  { icon: Globe, label: "olicheng.com", href: "https://olicheng.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/oli-cheng" },
  { icon: Github, label: "GitHub", href: "https://github.com/oli-cheng" },
  { icon: Mail, label: "Contact", href: "mailto:oli@olicheng.com" },
];

const ProfileSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-72 border-l border-border bg-card/50 p-6 gap-6 overflow-y-auto">
      {/* Opa Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-2xl overflow-hidden glow-green-box border-2 border-primary/30">
          <img
            src={opaGreeting}
            alt="Opa AI Assistant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-base font-bold text-foreground glow-green">Opa</h2>
          <p className="text-xs text-muted-foreground">Oli Cheng's AI Assistant</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* About Oli */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">About Oli</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-foreground">
            <Briefcase size={14} className="text-primary flex-shrink-0" />
            <span>Product Designer & Engineer</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground">
            <MapPin size={14} className="text-primary flex-shrink-0" />
            <span>University of Waterloo</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          CS & Cognitive Science grad specializing in AI-driven product design, 
          human-centered UX, and full-stack engineering.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Links */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Connect</h3>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-md hover:bg-muted/50"
          >
            <link.icon size={14} className="flex-shrink-0" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Experience highlights */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Experience</h3>
        {["Unyte Health", "Aterica", "SmartHalo", "ShipDojo"].map((company) => (
          <div key={company} className="text-xs text-foreground py-1 px-2 rounded-md bg-muted/30 border border-border/50">
            {company}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
