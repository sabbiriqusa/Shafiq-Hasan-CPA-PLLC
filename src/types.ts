export interface Service {
  id: string;
  category: "individual" | "business" | "quickbooks" | "tax";
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  specialties: string[];
}

export interface TaxProblem {
  id: string;
  title: string;
  description: string;
  stateImpact: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
  date: string;
  commentCount: number;
  readTime: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  time?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatarChar: string;
  serviceTag: string;
}
