import { Briefcase } from 'lucide-react';
import { experiences } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

const TYPE_STYLE: Record<string, string> = {
  Internship: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Freelance: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-gray-50 dark:bg-gray-950"
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-12">
          <p className="text-cyber-500 font-mono text-sm mb-2">// section-04</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Experience
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
            Professional and freelance experience applying software engineering in real-world contexts.
          </p>
        </div>

        <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative mb-10 last:mb-0 transition-all duration-500 delay-${i * 100}`}
            >
              {/* Dot */}
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyber-500 border-2 border-gray-50 dark:border-gray-950 shadow-md shadow-cyber-500/30" />

              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-cyber-500/40 transition-colors">
                {exp.image ? (
                  <div className="mb-5 overflow-hidden rounded-[1.75rem] bg-gray-100 dark:bg-gray-900">
                    <img src={exp.image} alt={`${exp.title} screenshot`} loading="lazy" className="w-full h-52 sm:h-64 object-cover rounded-[1.75rem]" />
                  </div>
                ) : (
                  <div className="mb-5 overflow-hidden rounded-[1.75rem] bg-gray-100 dark:bg-gray-900">
                    <img src="/images/placeholder.svg" alt="Image placeholder" loading="lazy" className="w-full h-52 sm:h-64 object-cover rounded-[1.75rem]" />
                  </div>
                )}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-mono border rounded-full px-2.5 py-1 ${TYPE_STYLE[exp.type] ?? TYPE_STYLE.Internship}`}>
                      {exp.type}
                    </span>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-1">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-4">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-cyber-500 mt-1.5 shrink-0 text-xs">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
