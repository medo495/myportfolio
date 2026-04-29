import { Shield, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyber-500" />
            <span className="font-mono text-sm text-gray-400">
              <span className="text-cyber-500">&gt;</span> {personalInfo.name} · {new Date().getFullYear()}
            </span>
          </div>

          

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyber-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyber-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-600 hover:text-cyber-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
