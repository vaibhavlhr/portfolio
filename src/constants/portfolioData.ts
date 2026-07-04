export interface PersonalInfo {
  name: string;
  firstName: string;
  title: string;
  roles: string[];
  tagline: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  resumeUrl: string;
  yearsOfExperience: number;
  githubContributions: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface AboutInfo {
  bio: string;
  objective: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface SkillItem {
  name: string;
  proficiency: number;
  category: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  github: string;
  live: string;
  timeline: string;
  featured: boolean;
  category: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  institution: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

export const personalInfo: PersonalInfo = {
  name: 'Vaibhav Gorana',
  firstName: 'Vaibhav',
  title: 'MERN Stack Developer',
  roles: [
    'MERN Developer',
    'Full Stack Developer',
    'React Developer',
    'Problem Solver',
  ],
  tagline: 'Building user-focused web applications with the MERN stack — from idea to deployment.',
  email: 'vaibhavlohar6424@gmail.com',
  phone: '+91 7597202667',
  location: 'Rajasthan, India',
  profileImage: '/img.jpeg',
  resumeUrl: '/resume.pdf',
  yearsOfExperience: 1,
  githubContributions: 342,
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/vaibhav-gorana', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/Vaibhav7878', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/vaibhav_gorana', icon: 'twitter' },
  { name: 'Email', url: 'mailto:vaibhavlohar6424@gmail.com', icon: 'email' },
];

export const stats: Stat[] = [
  { label: 'Years Experience', value: 1, suffix: '+' },
  { label: 'Projects Completed', value: 5, suffix: '+' },
  { label: 'Technologies Mastered', value: 14, suffix: '' },
  { label: 'GitHub Contributions', value: 342, suffix: '+' },
];

export const about: AboutInfo = {
  bio: `Detail-oriented Computer Science and Engineering graduate with a strong foundation in full-stack web development, data structures, and algorithms. Proficient across the MERN stack (MongoDB, Express.js, React.js, Node.js) with hands-on experience building and shipping functional, user-focused web applications. Strong understanding of relational and NoSQL database design, RESTful API architecture, and modern UI development.`,
  objective: `Seeking a Full Stack Developer role where I can leverage my MERN stack expertise, database design skills, and collaborative mindset to build impactful web applications and grow as an engineer.`,
  achievements: [
    'Consistently delivered sprint tasks ahead of deadlines at ANWIMAC Technologies',
    'Improved backend service reliability across two client-facing modules using MERN stack',
    'Built and shipped full-stack Library Management and Blogging platforms end-to-end',
    'Completed intensive web development traineeships at two technology companies',
  ],
};

export const education: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'AITS, Rajasthan Technical University',
    location: 'Rajasthan, India',
    duration: 'Sep 2022 — May 2026',
    highlights: [
      'Core coursework: Data Structures & Algorithms, DBMS, Computer Networks',
      'Focus on full-stack web development and software engineering',
    ],
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary Education',
    institution: 'St. Teresa Vidya Deep Sr. Sec. School',
    location: 'Udaipur, India',
    duration: 'July 2019 — July 2022',
    highlights: [],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Hidden Mind Solutions',
    role: 'Web Development Trainee',
    type: 'Traineeship',
    duration: 'Dec 2025 — Jan 2026',
    location: 'India',
    description: 'Built and debugged front-end and back-end features for live web applications in a production-style environment.',
    responsibilities: [
      'Built and debugged front-end and back-end features using HTML, CSS, JavaScript, and Node.js',
      'Collaborated with a cross-functional team on design, development, and maintenance of web applications',
      'Participated in code reviews and iterative feature delivery',
      'Worked with modern web development tooling and version control workflows',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Git', 'GitHub'],
    achievements: [
      'Applied core web fundamentals in a production-style team environment',
    ],
  },
  {
    id: 'exp-2',
    company: 'ANWIMAC Technologies Pvt. Ltd.',
    role: 'Web Development Trainee',
    type: 'Traineeship',
    duration: 'Jun 2025 — Nov 2025',
    location: 'India',
    description: 'Contributed to production-grade MERN stack web development projects with a cross-functional engineering team.',
    responsibilities: [
      'Contributed to production-grade web projects using MERN Stack',
      'Improved backend service reliability across two client-facing modules',
      'Collaborated on feature development, code review, and testing',
      'Worked with modern tooling and version control for team-based development',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'GitHub'],
    achievements: [
      'Consistently delivered tasks ahead of sprint deadlines',
      'Improved backend reliability across client-facing modules',
    ],
  },
];

export const skillsList: SkillItem[] = [
  { name: 'HTML', proficiency: 95, category: 'frontend', icon: 'html' },
  { name: 'CSS', proficiency: 90, category: 'frontend', icon: 'css' },
  { name: 'JavaScript', proficiency: 92, category: 'languages', icon: 'javascript' },
  { name: 'TypeScript', proficiency: 85, category: 'languages', icon: 'typescript' },
  { name: 'React', proficiency: 90, category: 'frontend', icon: 'react' },
  { name: 'Next.js', proficiency: 80, category: 'frontend', icon: 'nextjs' },
  { name: 'Node.js', proficiency: 86, category: 'backend', icon: 'nodejs' },
  { name: 'Express', proficiency: 84, category: 'backend', icon: 'express' },
  { name: 'MongoDB', proficiency: 82, category: 'database', icon: 'mongodb' },
  { name: 'MySQL', proficiency: 80, category: 'database', icon: 'mysql' },
  { name: 'Tailwind', proficiency: 90, category: 'frontend', icon: 'tailwind' },
  { name: 'Git', proficiency: 88, category: 'tools', icon: 'git' },
  { name: 'GitHub', proficiency: 90, category: 'tools', icon: 'github' },
  { name: 'Docker', proficiency: 75, category: 'tools', icon: 'docker' },
];

export const projects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Library Management System',
    description: 'Full-stack library management platform for book cataloging, user registration, and borrowing workflows.',
    longDescription: 'Designed and developed a full-stack library management platform to streamline book cataloging, user registration, and borrowing workflows for library staff and members. Implemented issue/return tracking and real-time availability monitoring, reducing manual record-keeping and improving operational accuracy.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    technologies: ['React.js', 'Node.js', 'Express.js', 'SQL Server', 'Tailwind CSS'],
    features: [
      'Book cataloging and user registration',
      'Issue/return tracking system',
      'Real-time availability monitoring',
      'SQL Server backend with efficient query performance',
      'Reliable data persistence architecture',
    ],
    github: 'https://github.com/vaibhav-gorana/library-management-system',
    live: 'https://library-mgmt-vaibhav.vercel.app',
    timeline: 'Academic Project',
    featured: true,
    category: 'fullstack',
  },
  {
    id: 'proj-2',
    title: 'Blogging Platform',
    description: 'Responsive full-stack blogging website with secure authentication and RESTful API integration.',
    longDescription: 'Developed a responsive, full-stack blogging website with secure user authentication, enabling users to create, edit, and publish posts. Designed and integrated a RESTful API connecting the React front-end to a Node.js/Express back-end and MongoDB database for content storage and retrieval.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Secure user authentication',
      'Create, edit, and publish blog posts',
      'RESTful API with MongoDB backend',
      'Mobile-responsive UI with Tailwind CSS',
      'Cross-device consistent experience',
    ],
    github: 'https://github.com/vaibhav-gorana/blogging-platform',
    live: 'https://blog-platform-vaibhav.vercel.app',
    timeline: 'Academic Project',
    featured: true,
    category: 'fullstack',
  },
  {
    id: 'proj-3',
    title: '3D Portfolio Concept',
    description: 'An immersive 3D/WebGL developer portfolio with custom physics, lighting, and performance-optimized shaders.',
    longDescription: 'Created a next-generation developer portfolio demonstrating high-fidelity web animation, custom 3D mesh rendering, React Three Fiber scenes, and interactive GLSL-like shaders. Built using Next.js 16, Tailwind CSS v4, Drei, GSAP, and Framer Motion for cinematic layouts.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'React Three Fiber', 'Three.js', 'GSAP', 'Framer Motion'],
    features: [
      'Custom Three.js particle canvas',
      'Smooth scroll using Lenis',
      'Magnetic cursor interaction',
      '3D rotating skill carousel and cards',
      'Fully responsive 3D viewport rendering',
    ],
    github: 'https://github.com/vaibhav-gorana',
    live: 'https://vaibhav-gorana.vercel.app',
    timeline: 'Personal Project',
    featured: true,
    category: '3d',
  }
];

export const certifications: CertificationItem[] = [
  {
    id: 'cert-1',
    name: 'Internship Completion Certificate — Full Stack Web Development',
    institution: 'ANWIMAC Technologies Pvt. Ltd.',
    issueDate: 'Nov 2025',
    credentialId: 'IT Department / ANW-FS-98',
    credentialUrl: 'https://linkedin.com/in/Vaibhav7878',
    icon: 'certificate',
  },
  {
    id: 'cert-2',
    name: 'Full Stack Trainee Certification',
    institution: 'Hidden Mind Solutions',
    issueDate: 'Jan 2026',
    credentialId: 'HMS-WEB-104',
    credentialUrl: 'https://linkedin.com/in/Vaibhav7878',
    icon: 'certificate',
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Vikram Singh',
    role: 'Senior Project Manager',
    company: 'ANWIMAC Technologies',
    content: 'Vaibhav showed exceptional speed and dedication during his traineeship. He consistently delivered MERN-stack sprint tasks ahead of schedule and greatly improved backend reliability on our core client modules.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Amit Patel',
    role: 'Lead Architect',
    company: 'Hidden Mind Solutions',
    content: 'A quick learner who adapted to our team-based version control workflows and feature delivery immediately. His grasp of React and REST API design is very impressive for an engineering student.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
  }
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const seo = {
  title: `${personalInfo.name} | Premium 3D Developer Portfolio`,
  description: personalInfo.tagline,
  keywords: 'Vaibhav Gorana, MERN Stack, Full Stack Developer, React, Node.js, MongoDB, Software Engineer, Rajasthan, 3D Web Design',
  author: personalInfo.name,
  url: 'https://vaibhav-gorana.vercel.app',
  image: '/og-image.png',
};
