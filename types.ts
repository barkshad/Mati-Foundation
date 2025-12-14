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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  bankDetails: string;
  mpesa: string;
}

export interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  type: 'image' | 'video';
  category: 'Education' | 'Community' | 'Welfare' | 'General';
  createdAt: string;
}

export interface SiteContent {
  hero: {
    headline: string;
    subheadline: string;
    heroImage: string;
  };
  about: {
    mission: string;
    vision: string;
    founderStory: string;
    values: string[];
  };
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
}

export interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  updateContent: (section: keyof SiteContent, data: any) => Promise<void>;
  updateProgram: (program: Program) => Promise<void>;
  addProgram: (program: Program) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
}