import { Brief, Proposal, Project, Message, UserRole, TalentFilterState } from '../types';
import { MOCK_BRIEFS, MOCK_PROJECTS, MOCK_MESSAGES } from '../data/mockData';

const STORAGE_KEYS = {
  BRIEFS: 'bridgeneeds_briefs',
  PROPOSALS: 'bridgeneeds_proposals',
  PROJECTS: 'bridgeneeds_projects',
  MESSAGES: 'bridgeneeds_messages',
  USER_ROLE: 'bridgeneeds_user_role',
  FAVORITES: 'bridgeneeds_favorites',
};

export const getStoredBriefs = (): Brief[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRIEFS);
    return raw ? JSON.parse(raw) : MOCK_BRIEFS;
  } catch (e) {
    return MOCK_BRIEFS;
  }
};

export const saveStoredBriefs = (briefs: Brief[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BRIEFS, JSON.stringify(briefs));
  } catch (e) {
    console.error('Failed to save briefs', e);
  }
};

export const getStoredProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : MOCK_PROJECTS;
  } catch (e) {
    return MOCK_PROJECTS;
  }
};

export const saveStoredProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
};

export const getStoredMessages = (projectId: string): Message[] => {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.MESSAGES}_${projectId}`);
    return raw ? JSON.parse(raw) : MOCK_MESSAGES.filter(m => m.projectId === projectId);
  } catch (e) {
    return MOCK_MESSAGES.filter(m => m.projectId === projectId);
  }
};

export const saveStoredMessages = (projectId: string, messages: Message[]) => {
  try {
    localStorage.setItem(`${STORAGE_KEYS.MESSAGES}_${projectId}`, JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save messages', e);
  }
};

export const getStoredUserRole = (): UserRole => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return (raw as UserRole) || 'client';
  } catch (e) {
    return 'client';
  }
};

export const saveStoredUserRole = (role: UserRole) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (e) {
    console.error('Failed to save user role', e);
  }
};

export const getStoredFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['talent-1'];
  } catch (e) {
    return ['talent-1'];
  }
};

export const saveStoredFavorites = (favorites: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
};
