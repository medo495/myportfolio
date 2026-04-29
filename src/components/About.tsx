import { MapPin, GraduationCap, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

function LanguageBar({ name, level, percent }: { name: string; level: string; percent: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs text-cyber-400 font-mono">{level}</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyber-600 to-cyber-400 rounded-full transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-12">
          <p className="text-cyber-500 font-mono text-sm mb-2">// section-01</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: bio + location */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-cyber-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{personalInfo.location}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              My dual focus allows me to write secure-by-design software while also understanding the attacker's perspective — giving me a unique edge in both development and defensive security roles. I'm actively looking for internships in Software Engineering and Blue Team / Security Analyst positions.
            </p>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-cyber-500" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Languages</h3>
              </div>
              <div className="space-y-3">
                {personalInfo.languages.map((lang) => (
                  <LanguageBar key={lang.name} {...lang} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-4 h-4 text-cyber-500" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Education</h3>
            </div>

            <div className="relative pl-5 border-l-2 border-gray-200 dark:border-gray-800 space-y-8">
              {personalInfo.education.map((edu, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-cyber-500 border-2 border-gray-900" />
                  <p className="text-xs font-mono text-cyber-400 mb-0.5">{edu.period}</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{edu.degree}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.institution} · {edu.location}</p>
                </div>
              ))}
            </div>

            {/* Strengths */}
            <div className="mt-10 p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {['Operating Systems', 'Computer Networks', 'Cryptography', 'Secure Software Dev', 'Cloud Computing', 'Software Architecture', 'Blue Team', 'Threat Detection'].map((c) => (
                  <span key={c} className="text-xs bg-cyber-500/10 text-cyber-500 dark:text-cyber-400 border border-cyber-500/20 rounded-full px-3 py-1 font-mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
