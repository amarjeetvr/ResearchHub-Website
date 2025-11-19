import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen, Lightbulb, Microscope, Code, Briefcase, Tag } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: 'home' | 'about' | 'login' | 'signup' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'client-dashboard' | 'admin-dashboard') => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'research-methods', name: 'Research Methods', icon: Microscope },
    { id: 'innovation', name: 'Innovation & Tech', icon: Lightbulb },
    { id: 'career', name: 'Research Careers', icon: Briefcase },
    { id: 'tools', name: 'Tools & Software', icon: Code },
    { id: 'trends', name: 'Industry Trends', icon: TrendingUp }
  ];

  const featuredBlogs = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Academic Research in 2025',
      summary: 'Explore how artificial intelligence and machine learning are transforming research methodologies, data analysis, and scientific discovery across multiple disciplines.',
      category: 'Innovation & Tech',
      author: 'Dr. Sarah Chen',
      authorRole: 'AI Research Specialist',
      date: 'March 15, 2025',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['AI', 'Machine Learning', 'Research Innovation']
    },
    {
      id: 2,
      title: 'The Complete Guide to Literature Reviews for PhD Researchers',
      summary: 'Master the art of conducting comprehensive literature reviews with proven strategies, tools, and frameworks used by successful doctoral candidates worldwide.',
      category: 'Research Methods',
      author: 'Prof. James Morrison',
      authorRole: 'Academic Research Consultant',
      date: 'March 12, 2025',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['PhD', 'Literature Review', 'Academic Writing']
    },
    {
      id: 3,
      title: 'Building a Successful Career as a Freelance Research Consultant',
      summary: 'Learn how to transition from academia to freelance research consulting, including pricing strategies, client acquisition, and building your professional reputation.',
      category: 'Research Careers',
      author: 'Dr. Maria Rodriguez',
      authorRole: 'Freelance Research Strategist',
      date: 'March 10, 2025',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Freelancing', 'Career Development', 'Consulting']
    },
    {
      id: 4,
      title: 'Top 10 Data Analysis Tools Every Researcher Should Know in 2025',
      summary: 'Discover the most powerful statistical analysis software, visualization tools, and platforms that are essential for modern quantitative and qualitative research.',
      category: 'Tools & Software',
      author: 'Dr. Michael Zhang',
      authorRole: 'Data Science Researcher',
      date: 'March 8, 2025',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Data Analysis', 'Software Tools', 'Statistics']
    },
    {
      id: 5,
      title: 'The Rise of Bioinformatics: Opportunities and Career Paths',
      summary: 'Understand the growing field of bioinformatics, from genomic sequencing to computational biology, and explore lucrative career opportunities in this interdisciplinary domain.',
      category: 'Industry Trends',
      author: 'Dr. Emily Watson',
      authorRole: 'Bioinformatics Specialist',
      date: 'March 5, 2025',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Bioinformatics', 'Genomics', 'Career Trends']
    },
    {
      id: 6,
      title: 'Grant Writing Mastery: How to Secure Funding for Your Research',
      summary: 'Unlock the secrets to writing compelling grant proposals that win funding. Learn from experts who have secured millions in research grants across various disciplines.',
      category: 'Research Methods',
      author: 'Prof. David Kumar',
      authorRole: 'Grant Writing Expert',
      date: 'March 3, 2025',
      readTime: '14 min read',
      image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Grant Writing', 'Research Funding', 'Academic Writing']
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30">
            <Lightbulb size={16} />
            <span>Research Insights & Innovation</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            ResearchHub Blog
          </h1>

          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
            Expert insights, research methodologies, and industry trends from the world's leading research professionals
          </p>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with cutting-edge articles on AI-powered research, academic excellence, deep-tech innovation,
            career development strategies, and the latest tools transforming how scientific discovery happens.
          </p>
        </div>
      </section>

      <section className="py-8 px-6 lg:px-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700 hover:text-blue-600"
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Latest Articles</h2>
              <p className="text-lg text-slate-600">Discover expert insights and practical guidance for researchers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{blog.author}</p>
                        <p className="text-xs text-slate-500">{blog.authorRole}</p>
                      </div>
                    </div>

                    <button className="flex items-center gap-1 text-blue-600 font-semibold hover:gap-2 transition-all">
                      Read
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Want to Contribute?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Share your research expertise with thousands of professionals. Write for ResearchHub and help shape the future of scientific collaboration.
              </p>
              <button
                onClick={() => onNavigate('signup')}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg inline-flex items-center gap-2"
              >
                Become a Contributor
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Write About</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            ResearchHub Blog publishes authoritative, peer-reviewed content on topics that matter to the global research community:
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Research Methodologies</h3>
              <p className="text-slate-600">
                Qualitative and quantitative methods, experimental design, statistical analysis, systematic reviews, and best practices for rigorous research.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Innovation & Technology</h3>
              <p className="text-slate-600">
                AI in research, machine learning applications, bioinformatics breakthroughs, data science tools, and emerging deep-tech trends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Academic & Career Growth</h3>
              <p className="text-slate-600">
                PhD guidance, post-doctoral opportunities, grant writing, publication strategies, career transitions, and freelance consulting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Industry Insights</h3>
              <p className="text-slate-600">
                Market trends, R&D partnerships, startup innovation, scientific entrepreneurship, and the business of research.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
