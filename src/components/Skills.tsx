import { Code2, Shield, Search, Wrench } from 'lucide-react';
import { skills } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

interface SkillItem { name: string; level: number }

function SkillBar({ name, level, delay = 0 }: SkillItem & { delay?: number }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs text-cyber-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyber-700 to-cyber-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function SkillGroup({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: SkillItem[];
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyber-500/40 transition-colors">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-cyber-500/10">
          <Icon className="w-4 h-4 text-cyber-500" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((s, i) => (
          <SkillBar key={s.name} {...s} delay={i * 60} />
        ))}
      </div>
    </div>
  );
}

const TOOL_BADGES = [
  'Wireshark', 'Burp Suite', 'OWASP ZAP', 'Splunk',
  'Autopsy', 'FTK Imager', 'Kali Linux', 'Parrot OS',
  'Git', 'GitHub', 'VirtualBox', 'Figma',
  'MySQL', 'Linux', 'WordPress', 'React Native',
];

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-gray-50 dark:bg-gray-950"
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-12">
          <p className="text-cyber-500 font-mono text-sm mb-2">// section-02</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
            A hybrid toolkit covering software development, cybersecurity operations, and digital forensics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <SkillGroup title="Programming & Development" icon={Code2} items={skills.development} />
          <SkillGroup title="Cybersecurity" icon={Shield} items={skills.cybersecurity} />
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <SkillGroup title="Digital Forensics" icon={Search} items={skills.forensics} />
          <SkillGroup title="Systems & Tools" icon={Wrench} items={skills.tools} />
        </div>

        {/* Badge cloud */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOL_BADGES.map((t) => (
              <span
                key={t}
                className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-cyber-500/50 hover:text-cyber-500 dark:hover:text-cyber-400 rounded-md px-3 py-1.5 transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
