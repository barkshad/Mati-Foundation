export interface Program {
  id: string;
  title: string;
  description: string;
  image: string; // Can be image URL or video URL
  mediaType?: 'image' | 'video';
  stats: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string; // Can be image URL or video URL
  mediaType?: 'image' | 'video';
  category: 'Education' | 'Community' | 'Success Story';
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  dream: string;
  bio: string;
  image: string;
  needsSponsorship: boolean;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  bankDetails: string;
  mpesa: string;
  socials?: SocialLinks;
}

export interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  type: 'image' | 'video';
  category: 'Education' | 'Community' | 'Welfare' | 'General';
  createdAt: string;
}

export interface GetInvolvedContent {
    introTitle: string;
    introText: string;
    financialText: string;
    suppliesText: string;
    volunteerText: string;
}

export interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix: string;
}

export interface HomePageContent {
  stats: StatItem[];
  aboutPreviewTitle: string;
  aboutPreviewHeadline: string;
  programsTitle: string;
  programsSubtitle: string;
}

export interface SiteTheme {
    primaryColor: string; // Hex code
}

export interface SiteContent {
  theme?: SiteTheme;
  hero: {
    headline: string;
    subheadline: string;
    heroImage: string;
  };
  homePage?: HomePageContent;
  about: {
    mission: string;
    vision: string;
    founderStory: string;
    values: string[];
    homePreviewImage1?: string;
    homePreviewImage2?: string;
  };
  getInvolved: GetInvolvedContent;
  contact: ContactInfo;
  programs: Program[];
  stories: Story[];
  children: ChildProfile[];
  gallery: MediaItem[];
}

export interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  changePassword: (newPassword: string) => Promise<void>;
}

export interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  updateContent: (section: keyof SiteContent, data: any) => Promise<void>;
  updateProgram: (program: Program) => Promise<void>;
  addProgram: (program: Program) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
}