import { Brief, Proposal } from '@/types';

export const mockBriefs: Brief[] = [
  {
    id: 'brief-101',
    title: 'Afrobeats Single Production & Arrangement',
    category: 'Production',
    serviceRequired: 'Music Production',
    budgetMin: 150000,
    budgetMax: 250000,
    currency: '₦',
    deadline: '14 October 2026',
    location: 'Remote',
    remote: true,
    requirements: 'Looking for a seasoned producer to create a high-energy Afrobeats beat with syncopated perc, log drum accents, and live bass tracking for an upcoming artist single release.',
    referenceTracks: [
      'https://spotify.com/track/afrobeats-ref-1',
      'https://spotify.com/track/afrobeats-ref-2',
      'https://youtube.com/watch?v=ref-demo'
    ],
    status: 'In Review',
    clientName: 'Nesta Creative Agency',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    clientCompany: 'Nesta Entertainment',
    createdAt: '2 days ago',
    proposalsCount: 6
  },
  {
    id: 'brief-102',
    title: 'Vocal Stem Mix & Master for 4-Track EP',
    category: 'Mixing',
    serviceRequired: 'Mixing & Mastering',
    budgetMin: 200000,
    budgetMax: 350000,
    currency: '₦',
    deadline: '20 October 2026',
    location: 'Lagos / Remote',
    remote: true,
    requirements: 'We have 4 finished Afro-Pop songs recorded in high resolution. Need pitch correction, vocal cleanup, drum enhancement, and mastering compliant with Apple Digital Masters.',
    referenceTracks: [
      'https://spotify.com/track/pop-mix-ref-1'
    ],
    status: 'Open',
    clientName: 'Ayo Balogun',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: 'Yesterday',
    proposalsCount: 9
  },
  {
    id: 'brief-103',
    title: 'Highlife Guitar Session Recording for Brand Advert',
    category: 'Musicians',
    serviceRequired: 'Session Guitarist',
    budgetMin: 60000,
    budgetMax: 100000,
    currency: '₦',
    deadline: '10 October 2026',
    location: 'Remote',
    remote: true,
    requirements: 'Need upbeat Ghanaian/Nigerian highlife guitar riffs to lay over a 30-second television commercial background score.',
    referenceTracks: [],
    status: 'Assigned',
    clientName: 'Peak Brand Communications',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    createdAt: '4 days ago',
    proposalsCount: 4
  }
];

export const mockProposals: Proposal[] = [
  {
    id: 'prop-1',
    briefId: 'brief-101',
    talentId: 'talent-1',
    talentName: 'Daniel Okafor',
    talentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    talentTitle: 'Music Producer & Arranger',
    price: 220000,
    currency: '₦',
    timelineDays: 14,
    scope: 'Full master beat production, live guitar session tracking, vocal arrangement guidance, and 24-bit WAV stem export.',
    deliverables: [
      'Custom Instrumental Beat (WAV 24/44.1)',
      'Individual Tracked Out Stems (24 tracks)',
      'Live Electric Guitar DI & Amp stems',
      '3 rounds of revisions'
    ],
    revisions: 3,
    terms: '50% initial escrow deposit upon milestone agreement; balance on final delivery approval.',
    message: 'Hello Nesta team, I reviewed your reference tracks and love the direction! I can record live bass and guitar lines in my Lagos studio to give it that authentic groove.',
    createdAt: 'Yesterday at 3:45 PM',
    status: 'Pending'
  },
  {
    id: 'prop-2',
    briefId: 'brief-101',
    talentId: 'talent-3',
    talentName: 'Tobi Martins',
    talentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    talentTitle: 'Session Guitarist & Co-Producer',
    price: 180000,
    currency: '₦',
    timelineDays: 10,
    scope: 'Acoustic & Electric rhythm arrangement, beat construction, and rough vocal mixing.',
    deliverables: [
      'Master Instrumental',
      'WAV Stems',
      '2 revisions'
    ],
    revisions: 2,
    terms: 'Escrow payment processed via MAAS.',
    message: 'I can deliver soulful highlife rhythm lines that will elevate this project immediately.',
    createdAt: 'Yesterday at 5:12 PM',
    status: 'Pending'
  }
];
