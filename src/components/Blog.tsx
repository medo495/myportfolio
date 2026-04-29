import { useEffect, useState } from 'react';
import { BookOpen, Clock, Tag, X, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  slug: string;
}

export default function Blog() {
  const { ref, inView } = useInView();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [articleContent, setArticleContent] = useState<string>('');

  const loadArticle = async (post: BlogPost) => {
    try {
      const response = await fetch(`/articles/${post.slug}.md`);
      const content = await response.text();
      setArticleContent(content);
      setSelectedPost(post);
    } catch (error) {
      console.error('Failed to load article:', error);
      setArticleContent('# Article Not Found\n\nSorry, this article could not be loaded.');
      setSelectedPost(post);
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
    setArticleContent('');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedPost) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost]);

  return (
    <>
      <section
        id="blog"
        ref={ref as React.RefObject<HTMLElement>}
        className="py-24 bg-white dark:bg-gray-900"
      >
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-12">
            <p className="text-cyber-500 font-mono text-sm mb-2">// section-05</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Blog & Write-ups
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
              Technical articles, cybersecurity lab write-ups, and learning notes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => loadArticle(post)}
                className="group flex flex-col p-6 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-cyber-500/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime} read
                  </div>
                  <time className="text-xs text-gray-400 font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>

                <div className="flex items-start gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-cyber-500 mt-0.5 shrink-0" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-cyber-400 transition-colors">
                    {post.title}
                  </h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-mono bg-cyber-500/10 text-cyber-500 dark:text-cyber-400 border border-cyber-500/20 rounded-full px-2 py-0.5"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              More articles coming soon — covering CTF write-ups, SIEM labs, and secure development practices.
            </p>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Open article"
          onClick={closeModal}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={closeModal}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </button>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-mono bg-cyber-500/10 text-cyber-500 dark:text-cyber-400 border border-cyber-500/20 rounded-full px-2 py-0.5"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <time>
                    {new Date(selectedPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedPost.readTime} read
                  </span>
                </div>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    code: ({ children, ...props }) => {
                      const isInline = !props.className; // Simple heuristic: inline code doesn't have className
                      return isInline ? (
                        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-cyber-600 dark:text-cyber-400">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-900 dark:text-gray-100 overflow-x-auto">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-cyber-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {articleContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
