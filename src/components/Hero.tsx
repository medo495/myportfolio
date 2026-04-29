import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const TYPING_LINES = [
  '> Initializing portfolio...',
  '> Loading profile: Ait El Hadj',
  '> Status: Available for internships',
  '> Specialization: Cybersecurity + Software Dev',
  '> Role targets: Blue Team | SWE Intern',
  '> Location: Taroudant, Morocco',
  '> System ready. Welcome.',
];

function TerminalIntro() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= TYPING_LINES.length) {
      setDone(true);
      return;
    }
    const line = TYPING_LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  const partial = currentLine < TYPING_LINES.length
    ? TYPING_LINES[currentLine].slice(0, currentChar)
    : '';

  return (
    <div className="font-mono text-xs sm:text-sm bg-gray-950/80 border border-cyber-800/50 rounded-xl p-4 sm:p-5 text-left max-w-lg w-full shadow-2xl shadow-cyber-900/20">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-gray-500 text-xs">terminal — bash</span>
      </div>
      <div className="space-y-1">
        {lines.map((l, i) => (
          <div key={i} className={`${l.startsWith('>') ? 'text-cyber-400' : 'text-gray-400'}`}>
            {l}
          </div>
        ))}
        {!done && (
          <div className="text-cyber-400">
            {partial}
            <span className="animate-blink text-cyber-300">█</span>
          </div>
        )}
        {done && (
          <div className="text-cyber-400 flex items-center gap-1">
            <span className="text-gray-500">$</span>
            <span className="animate-blink text-cyber-300">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950 dark:bg-gray-950"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 184, 166, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <div className="mx-auto mb-8 h-28 w-28 rounded-full border-2 border-cyber-500/30 bg-gray-900/80 shadow-[0_25px_80px_rgba(20,184,166,0.15)] overflow-hidden lg:mx-0">
            <img
              src="/images/profile.jpeg"
              alt="Profile placeholder"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-cyber-500/10 border border-cyber-500/30 rounded-full px-3 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse" />
            <span className="text-cyber-400 text-xs font-mono font-medium">Available for Internships</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
            Hi, I'm <span className="text-cyber-400">{personalInfo.name}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-2 font-medium">
            {personalInfo.title}
          </p>
          <p className="text-cyber-500 font-mono text-sm mb-6">
            # {personalInfo.tagline}
          </p>

          <p className="text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 text-sm sm:text-base">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-cyber-500 hover:bg-cyber-400 text-gray-950 font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-700 hover:border-cyber-500 text-gray-300 hover:text-cyber-400 font-medium px-5 py-2.5 rounded-lg transition-all text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-700 hover:border-cyber-500 text-gray-300 hover:text-cyber-400 font-medium px-5 py-2.5 rounded-lg transition-all text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right: terminal */}
        <div className="flex-1 flex justify-center lg:justify-end animate-slide-up">
          <TerminalIntro />
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-cyber-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
