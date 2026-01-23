export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroDescription: string;
  whatIsService: {
    title: string;
    content: string[];
  };
  subServices: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  experts: {
    id: string;
    name: string;
    role: string;
    rating: number;
    hourlyRate: number;
    avatar: string;
    skills: string[];
  }[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'ai-development',
    name: 'AI Development',
    slug: 'ai-development',
    description: 'Build intelligent solutions with cutting-edge AI technology',
    heroDescription: 'Transform your business with custom AI solutions, machine learning models, and intelligent automation systems built by expert developers.',
    whatIsService: {
      title: 'What is AI Development?',
      content: [
        'AI Development involves creating intelligent systems that can learn, reason, and make decisions like humans. Our expert developers build custom machine learning models, neural networks, and AI-powered applications.',
        'From natural language processing to computer vision, we help businesses leverage artificial intelligence to automate processes, gain insights from data, and create innovative user experiences.'
      ]
    },
    subServices: [
      { id: '1', title: 'Machine Learning Models', description: 'Custom ML algorithms for your specific needs', icon: '🤖' },
      { id: '2', title: 'Natural Language Processing', description: 'Text analysis and language understanding', icon: '💬' },
      { id: '3', title: 'Computer Vision', description: 'Image and video analysis solutions', icon: '👁️' },
      { id: '4', title: 'AI Chatbots', description: 'Intelligent conversational interfaces', icon: '🤖' },
      { id: '5', title: 'Predictive Analytics', description: 'Forecast trends and behaviors', icon: '📊' },
      { id: '6', title: 'AI Integration', description: 'Integrate AI into existing systems', icon: '🔗' }
    ],
    experts: [
      { id: '1', name: 'Dr. Sarah Chen', role: 'AI Research Scientist', rating: 4.9, hourlyRate: 85, avatar: '/api/placeholder/64/64', skills: ['TensorFlow', 'PyTorch', 'Python'] },
      { id: '2', name: 'Michael Rodriguez', role: 'ML Engineer', rating: 4.8, hourlyRate: 75, avatar: '/api/placeholder/64/64', skills: ['Scikit-learn', 'Keras', 'AWS'] },
      { id: '3', name: 'Dr. James Wilson', role: 'Deep Learning Expert', rating: 4.9, hourlyRate: 90, avatar: '/api/placeholder/64/64', skills: ['Neural Networks', 'Computer Vision', 'NLP'] }
    ]
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    slug: 'data-analysis',
    description: 'Transform raw data into actionable business insights',
    heroDescription: 'Unlock the power of your data with comprehensive analysis, visualization, and reporting solutions from certified data analysts.',
    whatIsService: {
      title: 'What is Data Analysis?',
      content: [
        'Data Analysis is the process of examining, cleaning, transforming, and modeling data to discover useful information and support decision-making. Our analysts help you understand patterns, trends, and insights hidden in your data.',
        'We provide comprehensive data solutions including statistical analysis, data visualization, predictive modeling, and business intelligence reporting to help you make data-driven decisions.'
      ]
    },
    subServices: [
      { id: '1', title: 'Statistical Analysis', description: 'Advanced statistical modeling and testing', icon: '📈' },
      { id: '2', title: 'Data Visualization', description: 'Interactive charts and dashboards', icon: '📊' },
      { id: '3', title: 'Business Intelligence', description: 'Strategic insights and reporting', icon: '💼' },
      { id: '4', title: 'Predictive Modeling', description: 'Forecast future trends and outcomes', icon: '🔮' },
      { id: '5', title: 'Data Mining', description: 'Extract patterns from large datasets', icon: '⛏️' },
      { id: '6', title: 'Market Research', description: 'Consumer behavior and market analysis', icon: '🎯' }
    ],
    experts: [
      { id: '1', name: 'Emma Thompson', role: 'Senior Data Analyst', rating: 4.8, hourlyRate: 65, avatar: '/api/placeholder/64/64', skills: ['Python', 'R', 'Tableau'] },
      { id: '2', name: 'David Park', role: 'Business Intelligence Specialist', rating: 4.9, hourlyRate: 70, avatar: '/api/placeholder/64/64', skills: ['SQL', 'Power BI', 'Excel'] },
      { id: '3', name: 'Lisa Garcia', role: 'Data Scientist', rating: 4.7, hourlyRate: 80, avatar: '/api/placeholder/64/64', skills: ['Machine Learning', 'Statistics', 'Pandas'] }
    ]
  },
  {
    id: 'clinical-research',
    name: 'Clinical Research',
    slug: 'clinical-research',
    description: 'Professional clinical research and medical study support',
    heroDescription: 'Advance medical knowledge with expert clinical research services, from study design to regulatory compliance and data analysis.',
    whatIsService: {
      title: 'What is Clinical Research?',
      content: [
        'Clinical Research involves systematic investigation of medical treatments, devices, and procedures to improve patient care and advance medical knowledge. Our experts provide comprehensive support throughout the research process.',
        'We offer services including protocol development, regulatory submissions, data management, statistical analysis, and medical writing to ensure your research meets the highest scientific and regulatory standards.'
      ]
    },
    subServices: [
      { id: '1', title: 'Protocol Development', description: 'Design robust clinical study protocols', icon: '📋' },
      { id: '2', title: 'Regulatory Affairs', description: 'FDA and regulatory compliance support', icon: '⚖️' },
      { id: '3', title: 'Data Management', description: 'Clinical data collection and validation', icon: '💾' },
      { id: '4', title: 'Biostatistics', description: 'Statistical analysis for clinical trials', icon: '📊' },
      { id: '5', title: 'Medical Writing', description: 'Scientific publications and reports', icon: '✍️' },
      { id: '6', title: 'Quality Assurance', description: 'GCP compliance and monitoring', icon: '✅' }
    ],
    experts: [
      { id: '1', name: 'Dr. Robert Kim', role: 'Clinical Research Director', rating: 4.9, hourlyRate: 95, avatar: '/api/placeholder/64/64', skills: ['GCP', 'FDA Regulations', 'Protocol Design'] },
      { id: '2', name: 'Dr. Maria Santos', role: 'Biostatistician', rating: 4.8, hourlyRate: 85, avatar: '/api/placeholder/64/64', skills: ['SAS', 'R', 'Clinical Statistics'] },
      { id: '3', name: 'Jennifer Lee', role: 'Regulatory Affairs Specialist', rating: 4.7, hourlyRate: 75, avatar: '/api/placeholder/64/64', skills: ['FDA Submissions', 'ICH Guidelines', 'Regulatory Strategy'] }
    ]
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    slug: 'supply-chain',
    description: 'Optimize your supply chain operations and logistics',
    heroDescription: 'Streamline your supply chain with expert consulting, optimization strategies, and technology solutions for maximum efficiency.',
    whatIsService: {
      title: 'What is Supply Chain Management?',
      content: [
        'Supply Chain Management involves coordinating and optimizing the flow of goods, services, and information from suppliers to customers. Our experts help businesses improve efficiency, reduce costs, and enhance customer satisfaction.',
        'We provide comprehensive solutions including demand forecasting, inventory optimization, logistics planning, supplier management, and technology implementation to create resilient and efficient supply chains.'
      ]
    },
    subServices: [
      { id: '1', title: 'Logistics Optimization', description: 'Streamline transportation and distribution', icon: '🚛' },
      { id: '2', title: 'Inventory Management', description: 'Optimize stock levels and reduce costs', icon: '📦' },
      { id: '3', title: 'Supplier Management', description: 'Build strong supplier relationships', icon: '🤝' },
      { id: '4', title: 'Demand Forecasting', description: 'Predict customer demand accurately', icon: '📈' },
      { id: '5', title: 'Warehouse Management', description: 'Efficient storage and fulfillment', icon: '🏭' },
      { id: '6', title: 'Risk Management', description: 'Identify and mitigate supply risks', icon: '⚠️' }
    ],
    experts: [
      { id: '1', name: 'Mark Johnson', role: 'Supply Chain Director', rating: 4.8, hourlyRate: 80, avatar: '/api/placeholder/64/64', skills: ['SAP', 'Logistics', 'Lean Six Sigma'] },
      { id: '2', name: 'Anna Petrov', role: 'Logistics Consultant', rating: 4.9, hourlyRate: 70, avatar: '/api/placeholder/64/64', skills: ['Transportation', 'WMS', 'Process Optimization'] },
      { id: '3', name: 'Carlos Martinez', role: 'Procurement Specialist', rating: 4.7, hourlyRate: 65, avatar: '/api/placeholder/64/64', skills: ['Supplier Relations', 'Contract Negotiation', 'Cost Analysis'] }
    ]
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'Create powerful mobile applications for iOS and Android',
    heroDescription: 'Build engaging mobile apps that users love with our expert developers specializing in native and cross-platform solutions.',
    whatIsService: {
      title: 'What is Mobile App Development?',
      content: [
        'Mobile App Development involves creating software applications specifically designed for mobile devices like smartphones and tablets. Our developers build native iOS and Android apps as well as cross-platform solutions.',
        'We provide end-to-end mobile development services including UI/UX design, backend integration, testing, deployment, and ongoing maintenance to ensure your app succeeds in the competitive mobile marketplace.'
      ]
    },
    subServices: [
      { id: '1', title: 'iOS Development', description: 'Native iPhone and iPad applications', icon: '📱' },
      { id: '2', title: 'Android Development', description: 'Native Android mobile apps', icon: '🤖' },
      { id: '3', title: 'Cross-Platform Apps', description: 'React Native and Flutter development', icon: '🔄' },
      { id: '4', title: 'UI/UX Design', description: 'Beautiful and intuitive app interfaces', icon: '🎨' },
      { id: '5', title: 'App Store Optimization', description: 'Improve app visibility and downloads', icon: '🚀' },
      { id: '6', title: 'App Maintenance', description: 'Updates, bug fixes, and support', icon: '🔧' }
    ],
    experts: [
      { id: '1', name: 'Alex Chen', role: 'Senior iOS Developer', rating: 4.9, hourlyRate: 75, avatar: '/api/placeholder/64/64', skills: ['Swift', 'SwiftUI', 'iOS SDK'] },
      { id: '2', name: 'Priya Sharma', role: 'Android Developer', rating: 4.8, hourlyRate: 70, avatar: '/api/placeholder/64/64', skills: ['Kotlin', 'Java', 'Android Studio'] },
      { id: '3', name: 'Tom Wilson', role: 'React Native Developer', rating: 4.7, hourlyRate: 65, avatar: '/api/placeholder/64/64', skills: ['React Native', 'JavaScript', 'Redux'] }
    ]
  },
  {
    id: 'content-writing',
    name: 'Content Writing',
    slug: 'content-writing',
    description: 'Professional content creation for all your marketing needs',
    heroDescription: 'Engage your audience with compelling content created by professional writers who understand your brand and industry.',
    whatIsService: {
      title: 'What is Content Writing?',
      content: [
        'Content Writing involves creating valuable, relevant, and engaging written material for various platforms and purposes. Our writers craft content that resonates with your target audience and drives business results.',
        'We provide comprehensive content services including blog posts, website copy, social media content, email campaigns, product descriptions, and technical documentation tailored to your brand voice and marketing goals.'
      ]
    },
    subServices: [
      { id: '1', title: 'Blog Writing', description: 'Engaging blog posts and articles', icon: '📝' },
      { id: '2', title: 'Website Copy', description: 'Compelling website content and pages', icon: '🌐' },
      { id: '3', title: 'SEO Content', description: 'Search engine optimized articles', icon: '🔍' },
      { id: '4', title: 'Social Media Content', description: 'Posts and captions for social platforms', icon: '📱' },
      { id: '5', title: 'Email Marketing', description: 'Newsletter and email campaign content', icon: '📧' },
      { id: '6', title: 'Technical Writing', description: 'Documentation and user guides', icon: '📚' }
    ],
    experts: [
      { id: '1', name: 'Sarah Mitchell', role: 'Senior Content Writer', rating: 4.9, hourlyRate: 45, avatar: '/api/placeholder/64/64', skills: ['SEO Writing', 'Blog Content', 'Copywriting'] },
      { id: '2', name: 'James Cooper', role: 'Technical Writer', rating: 4.8, hourlyRate: 55, avatar: '/api/placeholder/64/64', skills: ['Technical Documentation', 'API Docs', 'User Guides'] },
      { id: '3', name: 'Emily Davis', role: 'Marketing Copywriter', rating: 4.7, hourlyRate: 50, avatar: '/api/placeholder/64/64', skills: ['Marketing Copy', 'Email Campaigns', 'Social Media'] }
    ]
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    slug: 'video-editing',
    description: 'Professional video editing and post-production services',
    heroDescription: 'Transform your raw footage into polished, engaging videos with our expert editors using industry-standard tools and techniques.',
    whatIsService: {
      title: 'What is Video Editing?',
      content: [
        'Video Editing is the process of manipulating and rearranging video footage to create a cohesive, engaging final product. Our editors use professional software and techniques to enhance your content.',
        'We provide comprehensive video services including cutting and trimming, color correction, audio enhancement, motion graphics, visual effects, and final delivery in various formats for different platforms and purposes.'
      ]
    },
    subServices: [
      { id: '1', title: 'Video Cutting & Trimming', description: 'Professional video assembly and pacing', icon: '✂️' },
      { id: '2', title: 'Color Correction', description: 'Color grading and visual enhancement', icon: '🎨' },
      { id: '3', title: 'Motion Graphics', description: 'Animated titles and visual effects', icon: '🎬' },
      { id: '4', title: 'Audio Enhancement', description: 'Sound mixing and audio cleanup', icon: '🎵' },
      { id: '5', title: 'YouTube Editing', description: 'Optimized editing for YouTube content', icon: '📺' },
      { id: '6', title: 'Corporate Videos', description: 'Professional business video production', icon: '💼' }
    ],
    experts: [
      { id: '1', name: 'Mike Rodriguez', role: 'Senior Video Editor', rating: 4.9, hourlyRate: 60, avatar: '/api/placeholder/64/64', skills: ['Adobe Premiere', 'After Effects', 'DaVinci Resolve'] },
      { id: '2', name: 'Jessica Kim', role: 'Motion Graphics Artist', rating: 4.8, hourlyRate: 65, avatar: '/api/placeholder/64/64', skills: ['After Effects', 'Cinema 4D', 'Motion Graphics'] },
      { id: '3', name: 'Ryan Thompson', role: 'YouTube Editor', rating: 4.7, hourlyRate: 45, avatar: '/api/placeholder/64/64', skills: ['YouTube Optimization', 'Premiere Pro', 'Thumbnail Design'] }
    ]
  },
  {
    id: 'social-media-marketing',
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    description: 'Grow your brand presence across all social platforms',
    heroDescription: 'Build a strong social media presence and engage your audience with strategic marketing campaigns designed to drive growth and conversions.',
    whatIsService: {
      title: 'What is Social Media Marketing?',
      content: [
        'Social Media Marketing involves creating and sharing content on social media platforms to achieve marketing and branding goals. Our experts help you build brand awareness, engage customers, and drive sales.',
        'We provide comprehensive social media services including strategy development, content creation, community management, paid advertising, analytics, and reputation management across all major platforms.'
      ]
    },
    subServices: [
      { id: '1', title: 'Social Media Strategy', description: 'Comprehensive platform strategies', icon: '📋' },
      { id: '2', title: 'Content Creation', description: 'Engaging posts and visual content', icon: '📸' },
      { id: '3', title: 'Community Management', description: 'Audience engagement and interaction', icon: '👥' },
      { id: '4', title: 'Paid Advertising', description: 'Targeted social media ad campaigns', icon: '🎯' },
      { id: '5', title: 'Analytics & Reporting', description: 'Performance tracking and insights', icon: '📊' },
      { id: '6', title: 'Influencer Marketing', description: 'Collaborate with social influencers', icon: '⭐' }
    ],
    experts: [
      { id: '1', name: 'Amanda Foster', role: 'Social Media Strategist', rating: 4.9, hourlyRate: 55, avatar: '/api/placeholder/64/64', skills: ['Facebook Ads', 'Instagram Marketing', 'Content Strategy'] },
      { id: '2', name: 'Daniel Lee', role: 'Social Media Manager', rating: 4.8, hourlyRate: 50, avatar: '/api/placeholder/64/64', skills: ['Community Management', 'Social Analytics', 'Brand Management'] },
      { id: '3', name: 'Sophie Brown', role: 'Content Creator', rating: 4.7, hourlyRate: 45, avatar: '/api/placeholder/64/64', skills: ['Graphic Design', 'Video Content', 'Photography'] }
    ]
  },
  {
    id: 'virtual-assistant',
    name: 'Virtual Assistant',
    slug: 'virtual-assistant',
    description: 'Professional virtual assistance for business and personal tasks',
    heroDescription: 'Get reliable support for your daily tasks with experienced virtual assistants who help you focus on what matters most.',
    whatIsService: {
      title: 'What is Virtual Assistant Service?',
      content: [
        'Virtual Assistant services provide remote administrative, technical, or creative assistance to businesses and entrepreneurs. Our VAs help you manage tasks efficiently while you focus on core business activities.',
        'We offer comprehensive support including administrative tasks, customer service, data entry, research, scheduling, email management, and specialized services tailored to your specific business needs.'
      ]
    },
    subServices: [
      { id: '1', title: 'Administrative Support', description: 'Email, scheduling, and office tasks', icon: '📋' },
      { id: '2', title: 'Customer Service', description: 'Chat support and customer inquiries', icon: '🎧' },
      { id: '3', title: 'Data Entry', description: 'Accurate data processing and entry', icon: '⌨️' },
      { id: '4', title: 'Research Tasks', description: 'Market research and data collection', icon: '🔍' },
      { id: '5', title: 'Lead Generation', description: 'Prospect research and outreach', icon: '🎯' },
      { id: '6', title: 'Project Management', description: 'Task coordination and follow-up', icon: '📊' }
    ],
    experts: [
      { id: '1', name: 'Maria Gonzalez', role: 'Executive Virtual Assistant', rating: 4.9, hourlyRate: 25, avatar: '/api/placeholder/64/64', skills: ['Administrative Support', 'Project Management', 'Customer Service'] },
      { id: '2', name: 'John Smith', role: 'Research Assistant', rating: 4.8, hourlyRate: 20, avatar: '/api/placeholder/64/64', skills: ['Market Research', 'Data Analysis', 'Lead Generation'] },
      { id: '3', name: 'Lisa Wang', role: 'Customer Support VA', rating: 4.7, hourlyRate: 22, avatar: '/api/placeholder/64/64', skills: ['Live Chat', 'Email Support', 'CRM Management'] }
    ]
  },
  {
    id: 'translation-services',
    name: 'Translation Services',
    slug: 'translation-services',
    description: 'Professional translation and localization services',
    heroDescription: 'Break language barriers with accurate, culturally-aware translations from certified linguists and native speakers.',
    whatIsService: {
      title: 'What are Translation Services?',
      content: [
        'Translation Services involve converting written or spoken content from one language to another while maintaining accuracy, context, and cultural nuances. Our certified translators ensure your message resonates globally.',
        'We provide comprehensive language services including document translation, website localization, interpretation, proofreading, and cultural adaptation for businesses expanding into international markets.'
      ]
    },
    subServices: [
      { id: '1', title: 'Document Translation', description: 'Legal, medical, and business documents', icon: '📄' },
      { id: '2', title: 'Website Localization', description: 'Multilingual website adaptation', icon: '🌐' },
      { id: '3', title: 'Certified Translation', description: 'Official document certification', icon: '✅' },
      { id: '4', title: 'Live Interpretation', description: 'Real-time spoken translation', icon: '🎤' },
      { id: '5', title: 'Subtitling', description: 'Video and audio content subtitles', icon: '📺' },
      { id: '6', title: 'Proofreading', description: 'Quality assurance and editing', icon: '🔍' }
    ],
    experts: [
      { id: '1', name: 'Dr. Elena Petrov', role: 'Certified Translator', rating: 4.9, hourlyRate: 40, avatar: '/api/placeholder/64/64', skills: ['Spanish-English', 'Legal Translation', 'Medical Translation'] },
      { id: '2', name: 'Hiroshi Tanaka', role: 'Japanese Translator', rating: 4.8, hourlyRate: 45, avatar: '/api/placeholder/64/64', skills: ['Japanese-English', 'Technical Translation', 'Localization'] },
      { id: '3', name: 'Marie Dubois', role: 'French Linguist', rating: 4.7, hourlyRate: 35, avatar: '/api/placeholder/64/64', skills: ['French-English', 'Literary Translation', 'Cultural Adaptation'] }
    ]
  },
  {
    id: 'voice-over',
    name: 'Voice Over',
    slug: 'voice-over',
    description: 'Professional voice over services for all media types',
    heroDescription: 'Bring your content to life with professional voice over artists who deliver clear, engaging narration for any project.',
    whatIsService: {
      title: 'What is Voice Over Service?',
      content: [
        'Voice Over services provide professional vocal recordings for various media including commercials, explainer videos, audiobooks, e-learning courses, and more. Our artists deliver high-quality audio that engages your audience.',
        'We offer comprehensive voice services including script reading, character voices, multilingual narration, audio editing, and custom voice solutions tailored to your brand and project requirements.'
      ]
    },
    subServices: [
      { id: '1', title: 'Commercial Voice Over', description: 'TV and radio advertisement narration', icon: '📻' },
      { id: '2', title: 'Explainer Videos', description: 'Clear narration for educational content', icon: '🎥' },
      { id: '3', title: 'Audiobook Narration', description: 'Professional book reading services', icon: '📚' },
      { id: '4', title: 'E-Learning Voice Over', description: 'Educational course narration', icon: '🎓' },
      { id: '5', title: 'Character Voices', description: 'Animated character voice acting', icon: '🎭' },
      { id: '6', title: 'IVR & Phone Systems', description: 'Professional phone system recordings', icon: '📞' }
    ],
    experts: [
      { id: '1', name: 'Robert Sterling', role: 'Professional Voice Actor', rating: 4.9, hourlyRate: 80, avatar: '/api/placeholder/64/64', skills: ['Commercial VO', 'Narration', 'Character Voices'] },
      { id: '2', name: 'Victoria Adams', role: 'Audiobook Narrator', rating: 4.8, hourlyRate: 70, avatar: '/api/placeholder/64/64', skills: ['Audiobook Narration', 'E-Learning', 'Documentary VO'] },
      { id: '3', name: 'Marcus Johnson', role: 'Commercial Voice Artist', rating: 4.7, hourlyRate: 65, avatar: '/api/placeholder/64/64', skills: ['Radio Commercials', 'TV Ads', 'Corporate Narration'] }
    ]
  },
  {
    id: 'design-services',
    name: 'Design Services',
    slug: 'design-services',
    description: 'Creative design solutions for all your visual needs',
    heroDescription: 'Create stunning visual experiences with our talented designers who specialize in branding, web design, and creative solutions.',
    whatIsService: {
      title: 'What are Design Services?',
      content: [
        'Design Services encompass all aspects of visual communication and creative problem-solving. Our designers create compelling visuals that communicate your brand message and engage your target audience effectively.',
        'We provide comprehensive design solutions including logo design, branding, web design, print materials, packaging, illustrations, and digital graphics tailored to your business needs and aesthetic preferences.'
      ]
    },
    subServices: [
      { id: '1', title: 'Logo Design', description: 'Memorable brand identity creation', icon: '🎨' },
      { id: '2', title: 'Web Design', description: 'Beautiful and functional websites', icon: '💻' },
      { id: '3', title: 'Brand Identity', description: 'Complete branding packages', icon: '🏷️' },
      { id: '4', title: 'Print Design', description: 'Brochures, flyers, and marketing materials', icon: '📄' },
      { id: '5', title: 'UI/UX Design', description: 'User interface and experience design', icon: '📱' },
      { id: '6', title: 'Illustration', description: 'Custom illustrations and graphics', icon: '✏️' }
    ],
    experts: [
      { id: '1', name: 'Isabella Martinez', role: 'Senior Graphic Designer', rating: 4.9, hourlyRate: 55, avatar: '/api/placeholder/64/64', skills: ['Adobe Creative Suite', 'Brand Design', 'Print Design'] },
      { id: '2', name: 'Chris Anderson', role: 'UI/UX Designer', rating: 4.8, hourlyRate: 65, avatar: '/api/placeholder/64/64', skills: ['Figma', 'User Research', 'Prototyping'] },
      { id: '3', name: 'Sophia Chen', role: 'Brand Designer', rating: 4.7, hourlyRate: 60, avatar: '/api/placeholder/64/64', skills: ['Logo Design', 'Brand Strategy', 'Visual Identity'] }
    ]
  }
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};