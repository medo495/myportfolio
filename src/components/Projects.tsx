import { useState } from 'react';
import { Shield, Code2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

type FilterType = 'All' | 'Cybersecurity' | 'Development';

const COLOR_MAP: Record<string, string> = {
  teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const ICON_MAP: Record<string, React.ElementType> = {
  Cybersecurity: Shield,
  Development: Code2,
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const Icon = ICON_MAP[project.category] ?? Code2;
  const colorClass = COLOR_MAP[project.color] ?? COLOR_MAP.teal;

  return (
    <div className="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-500/5">
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-mono border rounded-full px-2.5 py-1 ${colorClass}`}>
          <Icon className="w-3 h-3" />
          {project.category}
        </span>
      </div>

      <div className="mb-4 overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900">
        {project.image ? (
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="w-full h-40 object-cover rounded-3xl" />
        ) : (
          <img src="/images/placeholder.svg" alt="Image placeholder" loading="lazy" className="w-full h-40 object-cover rounded-3xl" />
        )}
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base group-hover:text-cyber-400 transition-colors">
        {project.title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Outcomes */}
      <div className="mb-4 space-y-1.5">
        {project.outcomes.map((o) => (
          <div key={o} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyber-500 mt-0.5 shrink-0" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{o}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover accent line */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyber-600 to-cyber-400 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState<FilterType>('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-10">
          <p className="text-cyber-500 font-mono text-sm mb-2">// section-03</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Key Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
            Selected work spanning Blue Team security operations and full-stack software development.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {(['All', 'Cybersecurity', 'Development'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                filter === f
                  ? 'bg-cyber-500 text-gray-950'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-cyber-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-cyber-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View all projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
