import { 
  TalentProfile, 
  Service, 
  Brief, 
  Proposal, 
  Project, 
  ProjectStatus, 
  TalentFilterState 
} from '../types';
import { MOCK_TALENT, MOCK_SERVICES } from '../data/mockData';
import { 
  getStoredBriefs, 
  saveStoredBriefs, 
  getStoredProjects, 
  saveStoredProjects 
} from './storage';

/**
 * Searches and filters talent profiles based on criteria
 */
export async function searchTalent(filters: Partial<TalentFilterState>): Promise<TalentProfile[]> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 120));

  let results = [...MOCK_TALENT];

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase().trim();
    results = results.filter((t) => 
      t.name.toLowerCase().includes(q) ||
      t.primaryRole.toLowerCase().includes(q) ||
      t.biography.toLowerCase().includes(q) ||
      t.genres.some(g => g.toLowerCase().includes(q)) ||
      t.instruments.some(i => i.toLowerCase().includes(q)) ||
      t.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  if (filters.serviceCategory && filters.serviceCategory !== 'All Categories') {
    const cat = filters.serviceCategory.toLowerCase();
    results = results.filter((t) =>
      t.primaryRole.toLowerCase().includes(cat) ||
      t.skills.some(s => s.toLowerCase().includes(cat)) ||
      t.services.some(s => s.category.toLowerCase().includes(cat))
    );
  }

  if (filters.genre && filters.genre !== 'All Genres') {
    const gen = filters.genre.toLowerCase();
    results = results.filter((t) => t.genres.some((g) => g.toLowerCase() === gen));
  }

  if (filters.instrument && filters.instrument !== 'All Instruments') {
    const inst = filters.instrument.toLowerCase();
    results = results.filter((t) => t.instruments.some((i) => i.toLowerCase().includes(inst)));
  }

  if (filters.remoteOnly) {
    results = results.filter((t) => t.isRemoteAvailable);
  }

  if (filters.location && filters.location !== 'All Locations') {
    const loc = filters.location.toLowerCase();
    results = results.filter((t) => t.location.toLowerCase().includes(loc));
  }

  if (filters.maxBudget && filters.maxBudget > 0) {
    results = results.filter((t) => t.startingRate <= (filters.maxBudget as number));
  }

  if (filters.verifiedOnly) {
    results = results.filter((t) => t.verifications.length > 0);
  }

  if (filters.availability && filters.availability !== 'Any') {
    results = results.filter((t) => t.availability.toLowerCase().includes(filters.availability!.toLowerCase()));
  }

  return results;
}

/**
 * Gets talent profile by ID
 */
export async function getTalentProfile(id: string): Promise<TalentProfile | null> {
  await new Promise((res) => setTimeout(res, 80));
  const talent = MOCK_TALENT.find((t) => t.id === id);
  return talent || null;
}

/**
 * Gets all services or filters by category
 */
export async function getServices(category?: string): Promise<Service[]> {
  await new Promise((res) => setTimeout(res, 80));
  if (!category || category === 'All') return MOCK_SERVICES;
  return MOCK_SERVICES.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
}

/**
 * Gets service detail by ID
 */
export async function getServiceDetail(id: string): Promise<Service | null> {
  await new Promise((res) => setTimeout(res, 80));
  return MOCK_SERVICES.find(s => s.id === id) || null;
}

/**
 * Creates a new project brief and persists it to local storage
 */
export async function createBrief(briefData: Omit<Brief, 'id' | 'createdAt' | 'status' | 'proposalsCount'>): Promise<Brief> {
  await new Promise((res) => setTimeout(res, 200));

  const newBrief: Brief = {
    ...briefData,
    id: `brief-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'open',
    proposalsCount: 0,
  };

  const existingBriefs = getStoredBriefs();
  saveStoredBriefs([newBrief, ...existingBriefs]);

  return newBrief;
}

/**
 * Submits a proposal for a brief
 */
export async function submitProposal(proposalData: Omit<Proposal, 'id' | 'submittedAt' | 'status'>): Promise<Proposal> {
  await new Promise((res) => setTimeout(res, 200));

  const newProposal: Proposal = {
    ...proposalData,
    id: `prop-${Date.now()}`,
    submittedAt: new Date().toISOString().split('T')[0],
    status: 'pending',
  };

  // Update proposals count in brief
  const briefs = getStoredBriefs();
  const targetBrief = briefs.find(b => b.id === proposalData.briefId);
  if (targetBrief) {
    targetBrief.proposalsCount += 1;
    saveStoredBriefs(briefs);
  }

  return newProposal;
}

/**
 * Gets project details by ID
 */
export async function getProject(id: string): Promise<Project | null> {
  await new Promise((res) => setTimeout(res, 80));
  const projects = getStoredProjects();
  return projects.find((p) => p.id === id) || null;
}

/**
 * Updates project status and saves to local storage
 */
export async function updateProjectStatus(id: string, status: ProjectStatus): Promise<Project | null> {
  await new Promise((res) => setTimeout(res, 150));
  const projects = getStoredProjects();
  const target = projects.find((p) => p.id === id);
  if (target) {
    target.status = status;
    saveStoredProjects(projects);
    return target;
  }
  return null;
}
