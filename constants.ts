import { SiteContent } from './types';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDF3FnrxPYa6Hj_0lIT59FP9CSCIk7aS0w",
  authDomain: "mati-foundation-2d67e.firebaseapp.com",
  projectId: "mati-foundation-2d67e",
  storageBucket: "mati-foundation-2d67e.firebasestorage.app",
  messagingSenderId: "769000463528",
  appId: "1:769000463528:web:efbfbb32b885aa7071369d",
  measurementId: "G-EHP18C5S41"
};

export const CLOUDINARY_CLOUD_NAME = "dycbotqpw"; 
export const CLOUDINARY_UPLOAD_PRESET = "mati_unsigned"; 

export const DEFAULT_CONTENT: SiteContent = {
  theme: {
    primaryColor: "#0d9488" // Default Teal-600
  },
  hero: {
    headline: "Restoring Hope, Building Futures",
    subheadline: "Mati Foundation is an independent, community-driven humanitarian organization in Kilifi, Kenya, dedicated to providing dignity, education, and opportunity to vulnerable children.",
    heroImage: "https://picsum.photos/1920/1080",
  },
  homePage: {
    stats: [
      { id: "st1", value: 150, suffix: "+", label: "Children Educated" },
      { id: "st2", value: 500, suffix: "+", label: "Meals Served Weekly" },
      { id: "st3", value: 30, suffix: "", label: "Families Empowered" }
    ],
    aboutPreviewTitle: "Our Story",
    aboutPreviewHeadline: "A Legacy of Compassion",
    programsTitle: "Our Core Programs",
    programsSubtitle: "Holistic interventions designed to break the cycle of poverty."
  },
  about: {
    mission: "To uplift vulnerable children and communities by providing access to education, basic needs, and opportunities that promote dignity, resilience, and long-term transformation.",
    vision: "A future where every child has access to education, care, and opportunity regardless of background or circumstance.",
    founderStory: "Mati Foundation was founded by Matilda Kashindo out of a deep commitment to protecting children’s dignity and expanding access to education and care within underserved communities. Through years of grassroots involvement, she recognized that meaningful and lasting change begins with education, stable care, and community participation.",
    values: ["Compassion", "Integrity", "Transparency", "Community", "Sustainability"],
    homePreviewImage1: "https://picsum.photos/400/500?random=20",
    homePreviewImage2: "https://picsum.photos/400/500?random=21",
  },
  getInvolved: {
    introTitle: "Get Involved",
    introText: "Whether you donate funds, supplies, or your time, you are making a tangible difference.",
    financialText: "100% of your donation goes directly to the children's welfare. We maintain strict transparency and provide receipts for all contributions.",
    suppliesText: "We are always in need of dry foods, sanitary towels, clothes (ages 4-16), and scholastic materials.",
    volunteerText: "Are you a teacher, medic, or mentor? We welcome volunteers to spend time with the children."
  },
  contact: {
    address: "P.O. Box 123, Kilifi, Kenya",
    email: "jomimatilda@gmail.com",
    phone: "+254 700 000 000",
    whatsapp: "+254 712 146179",
    bankDetails: "Diamond Trust Bank, Acc: 0200471001 (Matilda John Kashindo), Branch: Kilifi",
    mpesa: "Paybill: 123456, Acc: Donation",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "",
      linkedin: ""
    }
  },
  programs: [
    {
      id: "p1",
      title: "Child Welfare & Care",
      description: "Providing food, clothing, safe environments, and emotional support to vulnerable children while ensuring dignity and stability.",
      image: "https://picsum.photos/800/600?random=1",
      stats: "Holistic Care",
    },
    {
      id: "p2",
      title: "Education Support",
      description: "Assisting with school fees, learning materials, uniforms, and educational continuity to help children access consistent learning opportunities.",
      image: "https://picsum.photos/800/600?random=2",
      stats: "School Access",
    },
    {
      id: "p3",
      title: "Health & Wellbeing",
      description: "Promoting child nutrition, health awareness, and basic wellbeing support as a foundation for growth and learning.",
      image: "https://picsum.photos/800/600?random=3",
      stats: "Nutrition Support",
    },
    {
      id: "p4",
      title: "Community Empowerment",
      description: "Strengthening families and communities through grassroots initiatives, local participation, and sustainable support systems.",
      image: "https://picsum.photos/800/600?random=4",
      stats: "Local Impact",
    }
  ],
  stories: [
    {
      id: "s1",
      title: "Education as a Pathway",
      author: "Matilda Kashindo",
      date: "2023-10-15",
      excerpt: "Witnessing the transformative power of education for Joyce, who secured a spot at a national school through consistent support.",
      content: "Joyce came to us three years ago...",
      image: "https://picsum.photos/800/400?random=5",
      category: "Success Story",
    },
    {
      id: "s2",
      title: "Community Learning Initiatives",
      author: "Admin",
      date: "2023-11-01",
      excerpt: "Building resources that allow the entire community to access books and learning materials.",
      content: "Education is the key...",
      image: "https://picsum.photos/800/400?random=6",
      category: "Education",
    }
  ],
  children: [
    {
      id: "c1",
      name: "Brian",
      age: 8,
      dream: "Pilot",
      bio: "Brian loves mathematics and playing football. He dreams of flying planes one day.",
      image: "https://picsum.photos/400/500?random=7",
      needsSponsorship: true,
    },
    {
      id: "c2",
      name: "Sarah",
      age: 12,
      dream: "Doctor",
      bio: "Sarah is top of her class in science. She wants to help sick people in her village.",
      image: "https://picsum.photos/400/500?random=8",
      needsSponsorship: true,
    },
    {
      id: "c3",
      name: "Kevin",
      age: 6,
      dream: "Teacher",
      bio: "Kevin is full of energy and loves story time.",
      image: "https://picsum.photos/400/500?random=9",
      needsSponsorship: true,
    }
  ],
  gallery: [
    {
      id: "g1",
      url: "https://picsum.photos/800/800?random=10",
      publicId: "demo/10",
      type: "image",
      category: "General",
      createdAt: "2023-01-01T00:00:00.000Z"
    },
    {
      id: "g2",
      url: "https://picsum.photos/800/800?random=11",
      publicId: "demo/11",
      type: "image",
      category: "Education",
      createdAt: "2023-01-02T00:00:00.000Z"
    },
    {
      id: "g3",
      url: "https://picsum.photos/800/800?random=12",
      publicId: "demo/12",
      type: "image",
      category: "Community",
      createdAt: "2023-01-03T00:00:00.000Z"
    },
    {
      id: "g4",
      url: "https://picsum.photos/800/800?random=13",
      publicId: "demo/13",
      type: "image",
      category: "Welfare",
      createdAt: "2023-01-04T00:00:00.000Z"
    },
    {
      id: "g5",
      url: "https://picsum.photos/800/800?random=14",
      publicId: "demo/14",
      type: "image",
      category: "General",
      createdAt: "2023-01-05T00:00:00.000Z"
    },
    {
      id: "g6",
      url: "https://picsum.photos/800/800?random=15",
      publicId: "demo/15",
      type: "image",
      category: "Education",
      createdAt: "2023-01-06T00:00:00.000Z"
    }
  ]
};