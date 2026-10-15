import { ServiceItem, CategoryCardData } from '@/types';
import { mockTalentProfiles } from './mockTalent';

export const mockServices: ServiceItem[] = mockTalentProfiles.flatMap(
  (talent) => talent.services
);

export const mockCategories: CategoryCardData[] = [
  {
    id: 'cat-1',
    name: 'Production',
    description: 'Afrobeats beats, full track arrangements, co-production & sound design.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    talentCount: 140,
    startingFrom: 100000
  },
  {
    id: 'cat-2',
    name: 'Songwriting',
    description: 'Catchy topline melodies, lyrics, commercial jingles & songwriting.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    talentCount: 95,
    startingFrom: 50000
  },
  {
    id: 'cat-3',
    name: 'Mixing',
    description: 'Stem balancing, vocal pitch correction, analog summing & spatial polish.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    talentCount: 82,
    startingFrom: 60000
  },
  {
    id: 'cat-4',
    name: 'Mastering',
    description: 'Loudness optimization for Spotify, Apple Music & radio transmission.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800',
    talentCount: 64,
    startingFrom: 35000
  },
  {
    id: 'cat-5',
    name: 'Vocals',
    description: 'Lead vocalists, background singers, choir arrangements & vocal tuning.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    talentCount: 110,
    startingFrom: 45000
  },
  {
    id: 'cat-6',
    name: 'Musicians',
    description: 'Session guitarists, bassists, keyboardists, horn sections & drummers.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    talentCount: 125,
    startingFrom: 40000
  },
  {
    id: 'cat-7',
    name: 'Music Direction',
    description: 'Live show arrangements, concert band direction & setlist production.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    talentCount: 48,
    startingFrom: 150000
  },
  {
    id: 'cat-8',
    name: 'Sound Design',
    description: 'Film scores, game audio, podcast intros & brand audio identities.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    talentCount: 56,
    startingFrom: 80000
  }
];
