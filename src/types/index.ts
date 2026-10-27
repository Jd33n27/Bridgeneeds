export type UserRole = 'client' | 'talent' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  title?: string;
  company?: string;
  bio?: string;
  location?: string;
  verified?: boolean;
}

export type VerificationType = 
  | 'identity'           // ID & Legal identity verified
  | 'audio_quality'      // Studio standards & audio output quality verified
  | 'industry_credits';  // Verified releases with major labels/indie distribution

export interface VerificationBadgeInfo {
  type: VerificationType;
  title: string;
  description: string;
  verifiedDate: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'production' | 'mixing' | 'mastering' | 'songwriting' | 'vocal' | 'instrumental' | 'scoring';
  audioUrl?: string; // audio sample URL or mock audio synth stream
  coverImage: string;
  duration: string;
  description: string;
  roles: string[];
  genre: string;
  isFeatured?: boolean;
}

export interface ServicePackage {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  deliveryDays: number;
  revisions: number | 'Unlimited';
  deliverables: string[];
  description: string;
}

export interface Service {
  id: string;
  talentId: string;
  talentName: string;
  talentAvatar: string;
  talentRole: string;
  talentLocation: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  outcome: string;
  startingPrice: number;
  deliveryDays: number;
  revisionsPolicy: string;
  clientRequirements: string[];
  packages: ServicePackage[];
  tags: string[];
  genres: string[];
  coverImage: string;
  rating: number;
  reviewCount: number;
  featuredWork: PortfolioItem[];
}

export interface Review {
  id: string;
  talentId: string;
  authorName: string;
  authorAvatar: string;
  authorCompany?: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface TalentProfile {
  id: string;
  name: string;
  stageName?: string;
  avatarUrl: string;
  bannerUrl: string;
  primaryRole: string;
  secondaryRoles: string[];
  location: string;
  isRemoteAvailable: boolean;
  biography: string;
  yearsExperience: number;
  genres: string[];
  instruments: string[];
  skills: string[];
  startingRate: number; // rate per hour or minimum project
  rateType: 'hourly' | 'project';
  availability: 'Immediate' | 'Within 1 week' | 'Booked until next month' | 'Selective';
  rating: number;
  reviewCount: number;
  verifications: VerificationBadgeInfo[];
  portfolio: PortfolioItem[];
  services: Service[];
  reviews: Review[];
  featuredTrack?: PortfolioItem;
  socialLinks?: {
    spotify?: string;
    soundCloud?: string;
    instagram?: string;
    website?: string;
  };
}

export type BriefStatus = 'draft' | 'open' | 'reviewing' | 'awarded' | 'closed';

export interface Brief {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  title: string;
  projectType: 'Single Track' | 'EP / Album' | 'Commercial Sync' | 'Film / Game Score' | 'Live Performance' | 'Custom Request';
  serviceNeeded: string;
  genres: string[];
  styleReferences: string;
  deliverables: string[];
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  collaborationFormat: 'Remote' | 'In-Studio' | 'Hybrid';
  locationRequirement?: string;
  additionalNotes: string;
  status: BriefStatus;
  createdAt: string;
  proposalsCount: number;
}

export type ProposalStatus = 'pending' | 'accepted' | 'declined' | 'withdrawn';

export interface Proposal {
  id: string;
  briefId: string;
  talentId: string;
  talentName: string;
  talentAvatar: string;
  talentRole: string;
  talentRating: number;
  coverLetter: string;
  priceQuote: number;
  estimatedDays: number;
  proposedMilestones: {
    title: string;
    amount: number;
    description: string;
  }[];
  attachments?: string[];
  status: ProposalStatus;
  submittedAt: string;
}

export type MilestoneStatus = 'pending' | 'in_progress' | 'submitted' | 'approved' | 'paid';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  deliverablesSubmitted?: string[];
}

export type ProjectStatus = 'setup' | 'in_progress' | 'in_review' | 'revision_requested' | 'completed' | 'cancelled';

export interface ProjectFile {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
  version: string;
}

export interface Project {
  id: string;
  briefId?: string;
  serviceId?: string;
  title: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  talentId: string;
  talentName: string;
  talentAvatar: string;
  talentRole: string;
  agreedScope: string;
  totalBudget: number;
  escrowStatus: 'Funded & Held Safe' | 'Partially Released' | 'Fully Released';
  status: ProjectStatus;
  startDate: string;
  targetCompletionDate: string;
  milestones: Milestone[];
  deliverablesRequired: string[];
  files: ProjectFile[];
  revisionPolicy: string;
  revisionsUsed: number;
  revisionsAllowed: number;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'client' | 'talent';
  text: string;
  attachments?: { name: string; url: string; size: string }[];
  timestamp: string;
  isSimulated?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  type: 'brief' | 'proposal' | 'project' | 'payment' | 'system';
}

export interface TalentFilterState {
  searchQuery: string;
  serviceCategory: string;
  genre: string;
  instrument: string;
  location: string;
  remoteOnly: boolean;
  minBudget: number;
  maxBudget: number;
  availability: string;
  verifiedOnly: boolean;
}


export type CategoryType = 
  | 'Production'
  | 'Mixing'
  | 'Mastering'
  | 'Songwriting'
  | 'Vocals'
  | 'Musicians'
  | 'Music Direction'
  | 'Sound Design'
  | string;

export interface CategoryCardData {
  id: string;
  name?: string;
  title?: string;
  categoryName?: string;
  description: string;
  image?: string;
  iconName?: string;
  talentCount?: number;
  count?: number;
  startingFrom?: number;
}

export interface ProjectTimelineStep {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  date?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  talentId?: string;
  talentName?: string;
  talentAvatar?: string;
  description: string;
  deliveryTimeDays?: number;
  revisions?: number | string;
  includes?: string[];
  startingPrice?: number;
  currency?: string;
  rating?: number;
  reviewsCount?: number;
  popular?: boolean;
}
