import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const { ref, inView } = useInView();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-gray-50 dark:bg-gray-950"
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-12">
          <p className="text-cyber-500 font-mono text-sm mb-2">// section-06</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
            Available for internship opportunities in Software Engineering and Cybersecurity. Let's connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyber-500/10">
                  <Mail className="w-5 h-5 text-cyber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium">{personalInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyber-500/10">
                  <MapPin className="w-5 h-5 text-cyber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-cyber-400 hover:border-cyber-500/40 transition-all text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-cyber-400 hover:border-cyber-500/40 transition-all text-sm font-medium"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-gray-950 border border-gray-800 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                status.json
              </div>
              <div className="text-gray-400 space-y-1">
                <div><span className="text-cyber-400">"status"</span>: <span className="text-green-400">"Available"</span>,</div>
                <div><span className="text-cyber-400">"seeking"</span>: [<span className="text-amber-400">"SWE Intern"</span>, <span className="text-amber-400">"Blue Team"</span>],</div>
                <div><span className="text-cyber-400">"location"</span>: <span className="text-blue-400">"Morocco / Remote"</span>,</div>
                <div><span className="text-cyber-400">"open_to_relocation"</span>: <span className="text-purple-400">true</span></div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-cyber-500/20 bg-gradient-to-br from-cyber-500/10 via-transparent to-cyber-500/5 p-8 shadow-[0_25px_80px_rgba(34,211,238,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_30%)] rounded-[2rem] pointer-events-none" />
            <div className="relative flex h-full flex-col justify-between gap-7">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyber-400 mb-4">Contact card</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white mb-4">Email me directly</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                  Prefer a direct message? Use the email below to reach out about internships, cyber security work, or collaboration.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-cyber-500/20 bg-white/90 dark:bg-gray-900/95 p-6 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyber-500/10 text-cyber-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-1">Primary email</p>
                    <p className="break-all text-lg sm:text-xl font-semibold text-gray-950 dark:text-white">{personalInfo.email}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex items-center justify-center rounded-full bg-cyber-500 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyber-400"
                  >
                    Send an email
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center rounded-full border border-cyber-500/30 bg-white dark:bg-gray-950 px-5 py-3 text-sm font-semibold text-cyber-500 transition hover:bg-cyber-500/10"
                  >
                    {copied ? 'Copied!' : 'Copy address'}
                  </button>
                </div>
                {copied && <p className="mt-4 text-sm text-green-500">Email copied to clipboard.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
