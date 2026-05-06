export type Role = 'user' | 'admin' | 'mentor';

export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  skillScore: number;
  rank: number;
  streak: number;
  interests: string[];
  badges: string[];
  role: Role;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modulesCount: number;
  durationHours: number;
  emoji: string;
}

export interface CourseProgress {
  id: string;
  courseId: string;
  userId: string;
  completedModules: string[];
  progressPercent: number;
  lastAccessed: string;
  course?: Course;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  type: 'blog' | 'project' | 'question' | 'achievement' | 'tip';
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  hasLiked?: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  matchScore?: number;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  description: string;
  icon: string;
}

export interface UserCertificate {
  id: string;
  certificationId: string;
  userId: string;
  status: 'earned' | 'pending' | 'locked';
  issuedAt?: string;
  pdfUrl?: string;
  certification?: Certification;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  xp?: number;
  isRead: boolean;
  createdAt: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  skillScore: number;
  rank: number;
  interests: string[];
}
