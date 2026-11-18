// ─────────────────────────────────────────────────────────────
//  ALL PERSONAL CONTENT LIVES HERE — taken from Nikhil_Deo_Resume.pdf.
//  Edit this file to update anything on the site.
// ─────────────────────────────────────────────────────────────

// Instagram meme pages Nikhil runs
export const memePages = [
  { name: 'Maharashtrians Meme', handle: '@maharashtriansmemeofficial', url: 'https://www.instagram.com/maharashtriansmemeofficial/' },
  { name: 'Meme Paav', handle: '@memepaav', url: 'https://www.instagram.com/memepaav/' },
];

export const profile = {
  firstName: 'Nikhil',
  lastName: 'Deo',
  role: 'Tech Analyst & Full-Stack Developer.',
  bigTitle: ['Full-Stack', 'Developer'], // the huge "< ... />" heading
  tagline: 'Data, Dashboards & Web Development',
  current: { label: 'Currently', line1: 'MCA Student, IMCC', line2: 'Savitribai Phule Pune University', line3: 'Pune, Maharashtra' },
  // Intro: [text, bold?] pairs
  intro: [
    ['I write ', false],
    ['business-focused SQL', true],
    [', build ', false],
    ['real-time dashboards', true],
    [' that turn data into decisions, and ship ', false],
    ['web apps with React and Node.js', true],
    ['.', false],
  ],
  email: 'nikhildeoofficial@gmail.com',
  resumeUrl: '/Nikhil_Deo_Resume.pdf',
  portrait: '/portrait.jpg', // black & white
  portraitColor: '', // optional colour version shown on hover, e.g. '/portrait-color.jpg'
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nikhil-deo-98277b353/' },
    { label: 'Email', url: 'mailto:nikhildeoofficial@gmail.com' },
    { label: 'Resume', url: '/Nikhil_Deo_Resume.pdf' },
    { label: 'Maharashtrians Meme', url: 'https://www.instagram.com/maharashtriansmemeofficial/', ig: true },
    { label: 'Meme Paav', url: 'https://www.instagram.com/memepaav/', ig: true },
    // Add GitHub / Instagram here when you want them shown:
    // { label: 'GitHub', url: 'https://github.com/your-handle' },
  ],
  githubUrl: '', // add yours to show a "View all on GitHub" link
};

// Shown in the About section as a "code object"
export const aboutObject = {
  name: 'Nikhil Deo',
  basedIn: 'Pune, MH',
  studying: 'MCA @ IMCC, SPPU (2026 – 2028)',
  lastRole: 'Business & Tech Analyst Intern @ FireAI',
  languages: ['Python', 'Java', 'C', 'JavaScript'],
  sideQuest: ['@maharashtriansmemeofficial', '@memepaav'],
  followers: '168K+ and 46K+',
  alsoLearning: 'German (Levels 1 & 2, SPPU)',
};

export const aboutText = [
  "I'm Nikhil, a B.Sc. Computer Science graduate (CGPA 8.31) from Pune, now doing my MCA at IMCC, SPPU.",
  "At FireAI I wrote SQL for business insights, built real-time client dashboards, and fine-tuned and tested LLMs. Since 2022 I've also run two Marathi meme pages, Maharashtrians Meme and Meme Paav, working on campaigns with brands like Zee Studios, Saregama and Rapido.",
];

export const techStack = [
  {
    title: 'Languages & Frameworks',
    tagline: 'What I build with.',
    items: ['Python', 'Java', 'C', 'JavaScript', 'React', 'Node.js', 'Express.js', 'XML Feeds'],
  },
  {
    title: 'Databases',
    tagline: 'Where the data lives.',
    items: ['MySQL', 'PostgreSQL', 'ClickHouse SQL', 'MongoDB'],
  },
  {
    title: 'Data, ML & Tools',
    tagline: 'Turning data into answers.',
    items: ['Power BI', 'GitHub', 'Hugging Face', 'Pandas', 'NumPy', 'TensorFlow', 'Matplotlib', 'LLM fine-tuning & testing', 'Data modelling & ETL'],
  },
];

export const certifications = [
  'Python: Machine Learning, Pandas, TensorFlow, Matplotlib, NumPy (Oak Academy)',
  'Foundation Course in German, Levels 1 & 2 (Diploma), Dept. of Foreign Languages, SPPU',
  'FitEins (Goethe-Institut)',
  'Front-end Web Development (AISECT)',
];

// type: 'case-study' shows "Read case study", otherwise "View project"
export const projects = [
  {
    id: 'edubuddy',
    title: 'EduBuddy',
    type: 'project',
    caption: 'An educational platform built with Agile.',
    label: 'Educational platform',
    summary: 'A learning platform, built and deployed in iterations using Agile practices.',
    highlights: [
      'Built and deployed iteratively using Agile development practices.',
      'Folded in user feedback and kept improving features.',
      'Features include note-taking, embedded YouTube videos and login authentication.',
    ],
    stack: ['Agile', 'Authentication', 'YouTube embeds'],
    link: 'https://nikhil-deo-edu-platform.vercel.app/',
  },
  {
    id: 'sentimental-hub',
    title: 'Sentimental Hub',
    type: 'project',
    caption: 'Sentiment analysis for YouTube comments.',
    label: 'Machine learning',
    summary: 'A sentiment analysis platform for YouTube comments.',
    highlights: [
      'Developed a sentiment analysis platform for YouTube comments.',
      'Built the website with Streamlit.',
      'Worked with Hugging Face ML models and MongoDB.',
    ],
    stack: ['Python', 'Streamlit', 'Hugging Face', 'MongoDB'],
    link: 'https://sentiment-tube-nikhil-deo.streamlit.app/',
  },
];

export const workExperience = [
  {
    tag: 'Current',
    period: '2022 – Present',
    title: 'Social Media Manager',
    org: 'Maharashtrians Meme & Meme Paav · Pune, MH',
    detail: 'Two accounts, 168K+ and 46K+ followers. Brand campaigns and content strategy.',
    summary: 'Social Media Manager for two Instagram meme pages, Maharashtrians Meme and Meme Paav, based in Pune.',
    links: [
      { label: 'Maharashtrians Meme', url: 'https://www.instagram.com/maharashtriansmemeofficial/' },
      { label: 'Meme Paav', url: 'https://www.instagram.com/memepaav/' },
    ],
    highlights: [
      'Manage two prominent social media accounts with over 168K and 46K followers.',
      'Planned and ran marketing campaigns with Everest Movies, Everest Spices, Zee Studios, Rapido, Saregama Marathi, Saregama India, inDrive India, Jio Cinema and Lotus 36.',
      'Analyse performance metrics and optimise content strategy for reach and engagement.',
      'Create audience-specific content for the Maharashtrian demographic, increasing engagement and page interactions.',
    ],
    stack: ['Content strategy', 'Campaigns', 'Analytics'],
  },
  {
    tag: 'Internship',
    period: 'June 2025 – Nov 2025',
    title: 'Business & Tech Analyst Intern',
    org: 'FireAI · Remote',
    detail: 'SQL insights, real-time dashboards, LLM fine-tuning and testing, ETL.',
    summary: 'Business & Tech Analyst Intern at FireAI (remote), working with clients across many industries.',
    highlights: [
      'Wrote business-focused SQL queries to generate actionable insights.',
      'Designed and built real-time, decision-oriented dashboards for clients.',
      'Analysed sales, marketing and manufacturing data for pharmaceutical, event management, warehousing, textile and food-industry clients, including Google Ads and Meta Ads performance.',
      "Joined client meetings to explain FireAI's capabilities and gather requirements, then fed client feedback into dashboards and business logic.",
      'Created and maintained KGQ (Knowledge Graph Questions) and KPI datasets for LLM training.',
      'Fine-tuned the LLM and ran black-box and grey-box testing, validating accuracy, execution and business logic.',
      'Did data modelling, data cleaning and ETL.',
    ],
    stack: ['SQL', 'Dashboards', 'LLM fine-tuning', 'Data modelling', 'ETL'],
  },
];

export const education = [
  {
    tag: 'Pursuing',
    period: 'Sept 2026 – June 2028',
    title: 'Master of Computer Applications',
    org: 'Institute of Management and Career Courses',
    board: 'Savitribai Phule Pune University',
    result: 'Currently studying.',
  },
  {
    tag: 'Graduated',
    period: 'Aug 2020 – March 2025',
    title: 'B.Sc. Computer Science',
    org: 'PVG College of Science',
    board: 'Savitribai Phule Pune University',
    result: 'CGPA 8.31 (A+)',
  },
  {
    tag: 'Higher Secondary',
    period: '',
    title: 'H.S.C',
    org: 'Abasaheb Garware College',
    board: 'Maharashtra State Board of Higher Secondary Education',
    result: 'Scored 54.17%',
  },
  {
    tag: 'Secondary',
    period: '',
    title: 'S.S.C',
    org: 'Muktangan English School and Jr. College',
    board: 'Maharashtra State Board of Secondary Education',
    result: 'Scored 90.20%',
  },
];


// Knowledge base for the on-site chat assistant (answers only from the resume)
export const assistantKB = [
  { keys: ['skill', 'stack', 'tech', 'language', 'framework', 'know'], answer: 'Languages: Python, Java, C and JavaScript. Frameworks: React, Node.js, Express.js and XML Feeds. Databases: MySQL, PostgreSQL, ClickHouse SQL and MongoDB. Tools: Power BI, GitHub and Hugging Face.' },
  { keys: ['fireai', 'intern', 'work', 'experience', 'job', 'analyst'], answer: 'Nikhil was a Business & Tech Analyst Intern at FireAI (remote, June to Nov 2025). He wrote business SQL, built real-time client dashboards, analysed Google and Meta Ads, created KGQ/KPI datasets for LLM training, fine-tuned and tested the LLM, and did data modelling and ETL.' },
  { keys: ['project', 'built', 'portfolio', 'edubuddy', 'sentiment'], answer: 'Two main projects: EduBuddy, an educational platform with notes, YouTube embeds and login (nikhil-deo-edu-platform.vercel.app), and Sentimental Hub, sentiment analysis for YouTube comments using Hugging Face, MongoDB and Streamlit (sentiment-tube-nikhil-deo.streamlit.app).' },
  { keys: ['education', 'study', 'college', 'degree', 'mca', 'bsc', 'cgpa', 'university'], answer: 'MCA at the Institute of Management and Career Courses, SPPU (Sept 2026 to June 2028). Before that, a B.Sc. in Computer Science at PVG College of Science, SPPU, with a CGPA of 8.31 (A+). H.S.C at Abasaheb Garware College (54.17%) and S.S.C at Muktangan English School (90.20%).' },
  { keys: ['meme', 'social', 'instagram', 'followers', 'brand', 'campaign', 'maharashtrians', 'paav', 'page'], answer: 'Since 2022 Nikhil has run two Instagram meme pages, Maharashtrians Meme (@maharashtriansmemeofficial) and Meme Paav (@memepaav), with 168K+ and 46K+ followers, doing campaigns with Everest, Zee Studios, Rapido, Saregama, inDrive India, Jio Cinema, Lotus 36 and more.' },
  { keys: ['german', 'deutsch', 'certif', 'course'], answer: 'Certifications: Python for ML (Oak Academy), the German Foundation Course Levels 1 & 2 (SPPU), FitEins (Goethe-Institut) and Front-end Web Development (AISECT).' },
  { keys: ['contact', 'email', 'hire', 'reach', 'linkedin', 'available'], answer: 'Email nikhildeoofficial@gmail.com or message him on LinkedIn. You can also use the contact form on this page.' },
  { keys: ['where', 'location', 'based', 'city', 'pune'], answer: 'Nikhil is based in Pune, Maharashtra.' },
  { keys: ['llm', 'ai', 'machine', 'ml', 'model'], answer: 'At FireAI he fine-tuned an LLM, ran black-box and grey-box tests, and built KGQ/KPI datasets for LLM training. He has also used Hugging Face models (Sentimental Hub) and studied ML with Pandas, NumPy, TensorFlow and Matplotlib.' },
];

export const assistantSuggestions = ['What are his skills?', 'Tell me about FireAI', 'Show his projects', 'Education?', 'How do I contact him?'];
