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

export const CLOUDINARY_CLOUD_NAME = "demo"; // Replace with real cloud name
export const CLOUDINARY_UPLOAD_PRESET = "mati_uploads"; // Replace with real preset

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    headline: "Restoring Hope, Building Futures",
    subheadline: "Mati Foundation provides shelter, education, and dignity to vulnerable children in Kilifi, Kenya.",
    heroImage: "https://picsum.photos/1920/1080",
  },
  about: {
    mission: "To rescue, rehabilitate, and reintegrate vulnerable children into society through holistic care and education.",
    vision: "A society where every child has the opportunity to grow with dignity and achieve their full potential.",
    founderStory: "Founded by Matilda Kashindo, a dedicated community leader in Kilifi, the Mati Foundation began as a grassroots response to the increasing number of vulnerable children in the coastal region. Witnessing the cycle of poverty and lack of educational access, Matilda opened her heart and doors, creating a safe haven that has since grown into a pillar of hope for the community.",
    values: ["Dignity", "Integrity", "Compassion", "Community", "Empowerment"],
  },
  contact: {
    address: "P.O. Box 123, Kilifi, Kenya",
    email: "info@matifoundation.org",
    phone: "+254 700 000 000",
    bankDetails: "KCB Bank, Kilifi Branch, Acc: 1234567890",
    mpesa: "Paybill: 123456, Acc: Donation",
  },
  programs: [
    {
      id: "p1",
      title: "Education Support",
      description: " providing school fees, uniforms, and learning materials to ensure every child stays in school.",
      image: "https://picsum.photos/800/600?random=1",
      stats: "150+ Students Supported",
    },
    {
      id: "p2",
      title: "Nutrition & Health",
      description: "Daily balanced meals and regular medical checkups to combat malnutrition and disease.",
      image: "https://picsum.photos/800/600?random=2",
      stats: "500+ Meals Weekly",
    },
    {
      id: "p3",
      title: "Shelter & Care",
      description: "A safe, loving home environment for orphans and vulnerable children needing immediate rescue.",
      image: "https://picsum.photos/800/600?random=3",
      stats: "45 Children Housed",
    },
    {
      id: "p4",
      title: "Community Outreach",
      description: "Empowering widows and families with skills training to create sustainable livelihoods.",
      image: "https://picsum.photos/800/600?random=4",
      stats: "30 Families Empowered",
    }
  ],
  stories: [
    {
      id: "s1",
      title: "Joyce's Journey to High School",
      author: "Matilda Kashindo",
      date: "2023-10-15",
      excerpt: "Against all odds, Joyce secured a spot at a national school thanks to the sponsorship program.",
      content: "Joyce came to us three years ago...",
      image: "https://picsum.photos/800/400?random=5",
      category: "Success Story",
    },
    {
      id: "s2",
      title: "New Library Construction Begins",
      author: "Admin",
      date: "2023-11-01",
      excerpt: "Thanks to our generous donors, we are breaking ground on a new learning resource center.",
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