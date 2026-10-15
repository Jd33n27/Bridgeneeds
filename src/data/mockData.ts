import { TalentProfile, Service, Brief, Project, Message, Notification, Review } from '../types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    talentId: 'talent-1',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    authorCompany: 'AURA Records UK',
    rating: 5,
    date: '2026-09-14',
    projectTitle: 'Modern Indie Rock Album Mix & Master',
    comment: 'Elena delivered immaculate depth and punch on our lead single. Her vocal staging brought out nuances we didn\'t hear in the raw multitracks.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    talentId: 'talent-1',
    authorName: 'Sora Takahashi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    authorCompany: 'Tokyo Drift Collective',
    rating: 5,
    date: '2026-08-28',
    projectTitle: 'Analog Synth Pop Stem Mixing',
    comment: 'Superb turnaround and crystal-clear communication throughout the revision process. 10/10 recommend for high-end pop mixes.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    talentId: 'talent-2',
    authorName: 'Chloe Bennett',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    authorCompany: 'Film Score Interactive',
    rating: 5,
    date: '2026-09-20',
    projectTitle: 'Cinematic Orchestral Trailer Composition',
    comment: 'Julian’s arrangement elevated our indie game teaser to triple-A cinema standards. The live brass recordings were stunning.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-4',
    talentId: 'talent-3',
    authorName: 'Devon Hayes',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    authorCompany: 'Universal Sync Group',
    rating: 5,
    date: '2026-09-02',
    projectTitle: 'Neo-Soul Vocal Topline & Hooks',
    comment: 'Amara has an unbelievable tone and phrasing. She turned around 3 distinct vocal harmonies within 48 hours!',
    verifiedPurchase: true,
  },
];

export const MOCK_TALENT: TalentProfile[] = [
  {
    id: 'talent-1',
    name: 'Elena Rostova',
    stageName: 'Rostova Audio',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Mixing & Mastering Engineer',
    secondaryRoles: ['Music Producer', 'Analog Mastering Specialist'],
    location: 'London, UK',
    isRemoteAvailable: true,
    biography: 'Grammy-nominated mixing engineer with 12+ years crafting chart-topping records across Indie Pop, Electronic, and Alternative Rock. Specializing in SSL 9000 K hybrid analog/digital workflow.',
    yearsExperience: 12,
    genres: ['Indie Rock', 'Synth Pop', 'Alternative', 'Electronic', 'R&B'],
    instruments: ['SSL Console', 'Neve Preamps', 'Pro Tools Ultimate', 'Logic Pro'],
    skills: ['Stem Mixing', 'Mastering for Vinyl & Streaming', 'Vocal Tuning (Celemony Melodyne)', 'Dolby Atmos Spatial Audio'],
    startingRate: 450,
    rateType: 'project',
    availability: 'Immediate',
    rating: 4.98,
    reviewCount: 48,
    verifications: [
      {
        type: 'identity',
        title: 'Identity Verified',
        description: 'Government ID and legal background verified by Bridgeneeds Trust & Safety.',
        verifiedDate: '2024-01-15'
      },
      {
        type: 'audio_quality',
        title: 'Studio Quality Certified',
        description: 'Acoustic calibration and hardware chain audited for professional broadcast standards.',
        verifiedDate: '2024-03-10'
      },
      {
        type: 'industry_credits',
        title: 'Major Credits Verified',
        description: 'Verified production/mixing credits on Spotify & Apple Music major label releases.',
        verifiedDate: '2024-05-22'
      }
    ],
    portfolio: [
      {
        id: 'port-101',
        title: 'Velvet Midnight (Stem Mix)',
        category: 'mixing',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
        coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        duration: '3:42',
        description: 'Full 48-stem hybrid analog mix with tube warmth saturation and detailed vocal space.',
        roles: ['Mixing Engineer', 'Mastering Engineer'],
        genre: 'Synth Pop',
        isFeatured: true
      },
      {
        id: 'port-102',
        title: 'Northern Lights Horizon',
        category: 'mastering',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
        duration: '4:15',
        description: 'Precision digital mastering optimized for Spotify & Apple Music loudness targets (-14 LUFS).',
        roles: ['Mastering Engineer'],
        genre: 'Electronic',
        isFeatured: false
      }
    ],
    services: [],
    reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[1]],
    socialLinks: {
      spotify: 'https://spotify.com',
      instagram: 'https://instagram.com',
      website: 'https://rostovaaudio.com'
    }
  },
  {
    id: 'talent-2',
    name: 'Julian Vance',
    stageName: 'Vance Scoring',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Film & Game Music Composer',
    secondaryRoles: ['Orchestrator', 'Multi-instrumentalist'],
    location: 'Los Angeles, USA',
    isRemoteAvailable: true,
    biography: 'Classical composition graduate from USC Thornton. Composed soundtracks for award-winning indie titles, HBO documentaries, and global commercial campaigns.',
    yearsExperience: 9,
    genres: ['Cinematic Orchestral', 'Ambient', 'Hybrid Electronic', 'Modern Classical', 'Game Audio'],
    instruments: ['Grand Piano', 'Cello', 'Modular Synthesizer', 'Spitfire Orchestral Libraries'],
    skills: ['Orchestral Arrangement', 'Interactive Game Audio (Wwise)', 'MIDI Mockups', 'Custom Live String Recording'],
    startingRate: 600,
    rateType: 'project',
    availability: 'Within 1 week',
    rating: 4.95,
    reviewCount: 34,
    verifications: [
      {
        type: 'identity',
        title: 'Identity Verified',
        description: 'Verified creator identity and business record.',
        verifiedDate: '2024-02-01'
      },
      {
        type: 'industry_credits',
        title: 'Major Credits Verified',
        description: 'Screen credit verified on IMDB for feature film and video game titles.',
        verifiedDate: '2024-06-14'
      }
    ],
    portfolio: [
      {
        id: 'port-201',
        title: 'Echoes of Eldoria (Main Theme)',
        category: 'scoring',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73b22.mp3?filename=ambient-piano-10781.mp3',
        coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
        duration: '2:58',
        description: 'Hybrid orchestral composition featuring live cello solos and analog synth textures.',
        roles: ['Composer', 'Arranger'],
        genre: 'Cinematic Orchestral',
        isFeatured: true
      }
    ],
    services: [],
    reviews: [MOCK_REVIEWS[2]],
    socialLinks: {
      website: 'https://julianvance.com'
    }
  },
  {
    id: 'talent-3',
    name: 'Amara Okafor',
    stageName: 'Amara Voice',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Lead Vocalist & Songwriter',
    secondaryRoles: ['Vocal Arranger', 'Session Singer'],
    location: 'Berlin, Germany',
    isRemoteAvailable: true,
    biography: 'Smooth, soulful 4-octave vocal range. Worked with top electronic producers across Europe. Providing lead vocals, stacked harmonies, and lyrical hooks.',
    yearsExperience: 8,
    genres: ['R&B', 'Neo-Soul', 'House', 'Afrobeats', 'Pop'],
    instruments: ['Neumann U87', 'Universal Audio Apollo x4', 'Melodyne Pro'],
    skills: ['Lead Vocal Recording', 'Harmonies & Ad-libs', 'Topline Songwriting', 'Vocal Editing & Pitch Correction'],
    startingRate: 350,
    rateType: 'project',
    availability: 'Immediate',
    rating: 5.0,
    reviewCount: 62,
    verifications: [
      {
        type: 'identity',
        title: 'Identity Verified',
        description: 'Identity confirmed by Bridgeneeds.',
        verifiedDate: '2023-11-20'
      },
      {
        type: 'audio_quality',
        title: 'Studio Quality Certified',
        description: 'Treated vocal booth and Neumann U87 signal chain verified.',
        verifiedDate: '2024-01-08'
      }
    ],
    portfolio: [
      {
        id: 'port-301',
        title: 'Solar Eclipse Topline Track',
        category: 'vocal',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_b2f90d18cf.mp3?filename=soft-soul-gospel-18233.mp3',
        coverImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80',
        duration: '3:10',
        description: 'Dry + Processed vocal stems for house & afrobeat productions.',
        roles: ['Songwriter', 'Vocalist'],
        genre: 'R&B',
        isFeatured: true
      }
    ],
    services: [],
    reviews: [MOCK_REVIEWS[3]]
  },
  {
    id: 'talent-4',
    name: 'David Kincaid',
    stageName: 'Kincaid Guitars',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Session Guitarist & Producer',
    secondaryRoles: ['Acoustic & Electric Guitarist', 'Bass Player'],
    location: 'Nashville, USA',
    isRemoteAvailable: true,
    biography: 'Nashville studio session guitarist with 15+ years of live performance and studio tracking experience. Fender, Gibson, and vintage acoustic guitar tracking.',
    yearsExperience: 15,
    genres: ['Country', 'Pop Rock', 'Indie Folk', 'Funk', 'Blues'],
    instruments: ['Fender Stratocaster 1965', 'Gibson Les Paul Custom', 'Martin D-28 Acoustic', 'Kemper Profiler'],
    skills: ['Acoustic Rhythm Tracking', 'Electric Guitar Solos', 'Ambient Guitar Pads', 'Bass Guitar Tracking'],
    startingRate: 250,
    rateType: 'project',
    availability: 'Immediate',
    rating: 4.96,
    reviewCount: 41,
    verifications: [
      {
        type: 'identity',
        title: 'Identity Verified',
        description: 'Identity confirmed by Bridgeneeds.',
        verifiedDate: '2024-03-01'
      }
    ],
    portfolio: [],
    services: [],
    reviews: []
  },
  {
    id: 'talent-5',
    name: 'Liam Sterling',
    stageName: 'Sterling Beats',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Music Producer & Beatmaker',
    secondaryRoles: ['Sound Designer', 'Arranger'],
    location: 'Toronto, Canada',
    isRemoteAvailable: true,
    biography: 'Chart-focused producer with placements on billboard hit tracks. High energy Hip-Hop, Pop, and Trap instrumentals custom-made for recording artists.',
    yearsExperience: 7,
    genres: ['Hip-Hop', 'Trap', 'Pop', 'Melodic Drill'],
    instruments: ['Ableton Push 3', 'Universal Audio Arrow', 'Dave Smith Prophet Rev2'],
    skills: ['Beat Production', 'Vocal Production', 'Custom Sound Design', 'Arrangement'],
    startingRate: 500,
    rateType: 'project',
    availability: 'Within 1 week',
    rating: 4.92,
    reviewCount: 29,
    verifications: [
      {
        type: 'identity',
        title: 'Identity Verified',
        description: 'Identity confirmed by Bridgeneeds.',
        verifiedDate: '2024-04-12'
      },
      {
        type: 'industry_credits',
        title: 'Major Credits Verified',
        description: 'Gold-certified production credit verified.',
        verifiedDate: '2024-07-02'
      }
    ],
    portfolio: [],
    services: [],
    reviews: []
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 'srv-1',
    talentId: 'talent-1',
    talentName: 'Elena Rostova',
    talentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    talentRole: 'Mixing & Mastering Engineer',
    talentLocation: 'London, UK',
    title: 'Professional Stem Mixing & Mastering for Single Release',
    category: 'Mixing & Mastering',
    shortDescription: 'Transform raw multitrack recordings into a radio-ready, streaming-optimized master track with depth, punch, and analog warmth.',
    fullDescription: 'I will mix and master your track using my SSL 9000 K hybrid analog/digital setup. Every single instrument, vocal layer, and synth element will be individually cleaned, dynamic-shaped, frequency-sculpted, and placed in a 3D stereo field.',
    outcome: 'Commercial studio quality WAV (24-bit/96kHz) and MP3 (320kbps) ready for Spotify, Apple Music, Tidal, and vinyl pressing.',
    startingPrice: 450,
    deliveryDays: 4,
    revisionsPolicy: '2 rounds of minor adjustments included. Additional revisions charged at standard hourly rate.',
    clientRequirements: [
      'Export multitracks as WAV files (24-bit / 44.1kHz or higher) with no clipping.',
      'Provide a reference track link (Spotify or YouTube) for desired sonic style.',
      'Specify tempo (BPM) and key of the song.'
    ],
    packages: [
      {
        id: 'pkg-1-basic',
        name: 'Basic',
        price: 450,
        deliveryDays: 4,
        revisions: 2,
        deliverables: ['Full Mix (Up to 32 Stems)', 'Streaming Master WAV & MP3', 'Instrumental Version'],
        description: 'Ideal for indie singles with up to 32 audio stems.'
      },
      {
        id: 'pkg-1-standard',
        name: 'Standard',
        price: 650,
        deliveryDays: 5,
        revisions: 3,
        deliverables: ['Full Mix (Up to 64 Stems)', 'Vocal Tuning & Timing Alignment', 'Master WAV & MP3', 'Instrumental & TV Track Mixes', 'Stem Exports for Live/Sync'],
        description: 'Complete mix for complex pop/rock productions with detailed vocal tuning.'
      },
      {
        id: 'pkg-1-premium',
        name: 'Premium',
        price: 950,
        deliveryDays: 7,
        revisions: 'Unlimited',
        deliverables: ['Unlimited Stems Mix', 'Melodyne Vocal Tuning & Time Align', 'Atmos Spatial Audio Mix', 'High-Res Master + Vinyl Master', 'All Stems & Session File Access'],
        description: 'Enterprise production tier with Dolby Atmos & Vinyl mastering included.'
      }
    ],
    tags: ['Mixing', 'Mastering', 'Analog SSL', 'Pop', 'Rock', 'Indie'],
    genres: ['Indie Rock', 'Synth Pop', 'Alternative', 'R&B'],
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewCount: 48,
    featuredWork: [MOCK_TALENT[0].portfolio[0]]
  },
  {
    id: 'srv-2',
    talentId: 'talent-2',
    talentName: 'Julian Vance',
    talentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    talentRole: 'Film & Game Music Composer',
    talentLocation: 'Los Angeles, USA',
    title: 'Custom Cinematic Orchestral Score for Film, Teasers & Games',
    category: 'Film & Game Scoring',
    shortDescription: 'Original dramatic soundtrack and orchestral arrangements crafted specifically for your visual media project or game trailer.',
    fullDescription: 'Elevate your visual storytelling with a custom soundtrack composed using premium Spitfire & Orchestral Tools libraries along with live recorded solos. Fully synced to picture.',
    outcome: 'Sync-licensed broadcast WAV master tracks, stems, and MIDI session data.',
    startingPrice: 600,
    deliveryDays: 7,
    revisionsPolicy: '3 structural composition revisions included.',
    clientRequirements: [
      'Video cut with timecode overlay or game design document.',
      'Temp score track or emotional moodboard references.',
      'Exact duration and sync markers needed.'
    ],
    packages: [
      {
        id: 'pkg-2-basic',
        name: 'Basic',
        price: 600,
        deliveryDays: 5,
        revisions: 2,
        deliverables: ['Up to 60 seconds score', 'Stereo Master WAV', 'Full Sync to Video'],
        description: 'Perfect for short teaser trailers, commercial ads, or game menu themes.'
      },
      {
        id: 'pkg-2-standard',
        name: 'Standard',
        price: 1200,
        deliveryDays: 8,
        revisions: 3,
        deliverables: ['Up to 3 Minutes Score', 'Live Cello/Violin Solo Recording', 'Stem Exports (Brass, Strings, Perc, Synths)'],
        description: 'Complete theme composition for short films or main game levels.'
      },
      {
        id: 'pkg-2-premium',
        name: 'Premium',
        price: 2500,
        deliveryDays: 14,
        revisions: 'Unlimited',
        deliverables: ['Full Feature Short Score (Up to 8 Mins)', 'Full Live String Quartet Recording', 'Wwise Interactive Layers', 'Commercial License Rights'],
        description: 'Complete orchestral score with live acoustic ensemble.'
      }
    ],
    tags: ['Scoring', 'Cinematic', 'Orchestra', 'Game Audio', 'Trailer'],
    genres: ['Cinematic Orchestral', 'Ambient', 'Modern Classical'],
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviewCount: 34,
    featuredWork: [MOCK_TALENT[1].portfolio[0]]
  },
  {
    id: 'srv-3',
    talentId: 'talent-3',
    talentName: 'Amara Okafor',
    talentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    talentRole: 'Lead Vocalist & Songwriter',
    talentLocation: 'Berlin, Germany',
    title: 'Lead Vocals, Harmonies & Topline Writing for Pop & EDM',
    category: 'Vocal Performance & Songwriting',
    shortDescription: 'Professional lead vocal performance and catchy songwriting toplines delivered as clean, dry 24-bit WAV stems.',
    fullDescription: 'I will write and record original vocal toplines (melody + lyrics) or perform your pre-written vocals with soul, passion, and flawless intonation.',
    outcome: 'High definition 24-bit tuned and raw vocal stems (Lead, Harmonies, Ad-libs, Double tracks).',
    startingPrice: 350,
    deliveryDays: 3,
    revisionsPolicy: '2 melody or phrasing revisions included.',
    clientRequirements: [
      'Instrumental backing track in WAV format.',
      'Key and BPM info.',
      'Lyrical theme or pre-written lyrics if applicable.'
    ],
    packages: [
      {
        id: 'pkg-3-basic',
        name: 'Basic',
        price: 350,
        deliveryDays: 3,
        revisions: 2,
        deliverables: ['Lead Vocal Line (Verse + Chorus)', 'Tuned & Dry WAV Stems'],
        description: 'Lead vocals for single song section or hook feature.'
      },
      {
        id: 'pkg-3-standard',
        name: 'Standard',
        price: 550,
        deliveryDays: 4,
        revisions: 3,
        deliverables: ['Full Song Lead Vocals', 'Harmonies & Stacks', 'Ad-lib Track', 'Tuned Stems + FX Mix Pass'],
        description: 'Complete vocal arrangement for full pop or house track.'
      }
    ],
    tags: ['Vocals', 'Songwriting', 'Topline', 'Pop', 'House', 'R&B'],
    genres: ['R&B', 'Neo-Soul', 'House', 'Pop'],
    coverImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 62,
    featuredWork: [MOCK_TALENT[2].portfolio[0]]
  }
];

// Link services back into talent profiles
MOCK_TALENT[0].services = [MOCK_SERVICES[0]];
MOCK_TALENT[1].services = [MOCK_SERVICES[1]];
MOCK_TALENT[2].services = [MOCK_SERVICES[2]];

export const MOCK_BRIEFS: Brief[] = [
  {
    id: 'brief-101',
    clientId: 'client-1',
    clientName: 'Sora Takahashi',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    clientCompany: 'Tokyo Drift Collective',
    title: 'Mixing & Vocal Tuning for 4-Track Synth Pop EP',
    projectType: 'EP / Album',
    serviceNeeded: 'Mixing & Mastering',
    genres: ['Synth Pop', 'Indie Electronic'],
    styleReferences: 'Chvrches, The 1975, LANY',
    deliverables: ['24-bit 96kHz Stem Mixes', 'Streaming Masters', 'Instrumental Versions'],
    budgetMin: 1500,
    budgetMax: 2500,
    deadline: '2026-11-15',
    collaborationFormat: 'Remote',
    additionalNotes: 'All multitracks tracked cleanly in Logic Pro. Vocal tuning needed for lead vocalist.',
    status: 'open',
    createdAt: '2026-09-28',
    proposalsCount: 4
  },
  {
    id: 'brief-102',
    clientId: 'client-2',
    clientName: 'Sarah Jenkins',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    clientCompany: 'Aether Games Studio',
    title: 'Main Theme & Battle Music for Fantasy RPG Trailer',
    projectType: 'Film / Game Score',
    serviceNeeded: 'Film & Game Scoring',
    genres: ['Cinematic Orchestral', 'Hybrid Electronic'],
    styleReferences: 'Elder Scrolls, Witcher 3, Hans Zimmer Orchestral Synths',
    deliverables: ['3-minute main theme', 'Interactive stem layers for Wwise', 'Short teaser edit'],
    budgetMin: 2000,
    budgetMax: 4000,
    deadline: '2026-10-30',
    collaborationFormat: 'Remote',
    additionalNotes: 'Live solo instrument recording is highly preferred.',
    status: 'reviewing',
    createdAt: '2026-09-25',
    proposalsCount: 7
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-501',
    briefId: 'brief-101',
    title: 'Velvet Horizon Single - Mix & Master',
    clientId: 'client-1',
    clientName: 'Sora Takahashi',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    talentId: 'talent-1',
    talentName: 'Elena Rostova',
    talentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    talentRole: 'Mixing & Mastering Engineer',
    agreedScope: 'Full hybrid analog stem mixing of 42 audio multitracks + Melodyne vocal tuning + streaming master (WAV 24-bit/96kHz) + instrumental mix.',
    totalBudget: 650,
    escrowStatus: 'Funded & Held Safe',
    status: 'in_review',
    startDate: '2026-09-29',
    targetCompletionDate: '2026-10-06',
    milestones: [
      {
        id: 'm-1',
        title: 'Initial Mix Draft Submission',
        description: 'First mix pass with vocal tuning applied.',
        amount: 325,
        dueDate: '2026-10-02',
        status: 'approved',
        deliverablesSubmitted: ['Velvet_Horizon_Mix_v1.wav']
      },
      {
        id: 'm-2',
        title: 'Final Revision & Master Deliverables',
        description: 'Incorporating client feedback + final master exports.',
        amount: 325,
        dueDate: '2026-10-06',
        status: 'submitted',
        deliverablesSubmitted: ['Velvet_Horizon_Final_Master_24-96.wav', 'Velvet_Horizon_Instrumental.wav']
      }
    ],
    deliverablesRequired: [
      'Velvet_Horizon_Master_24bit.wav',
      'Velvet_Horizon_Instrumental_24bit.wav',
      'Stem_Exports_Archive.zip'
    ],
    files: [
      {
        id: 'file-1',
        fileName: 'Velvet_Horizon_Multitracks_42Stems.zip',
        fileSize: '1.4 GB',
        uploadedBy: 'Sora Takahashi (Client)',
        uploadedAt: '2026-09-29 10:15',
        fileUrl: '#',
        version: 'v1.0'
      },
      {
        id: 'file-2',
        fileName: 'Velvet_Horizon_Final_Master_24-96.wav',
        fileSize: '84 MB',
        uploadedBy: 'Elena Rostova (Talent)',
        uploadedAt: '2026-10-03 11:30',
        fileUrl: '#',
        version: 'v2.0'
      }
    ],
    revisionPolicy: 'Up to 3 revision passes included in scope.',
    revisionsUsed: 1,
    revisionsAllowed: 3
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    projectId: 'proj-501',
    senderId: 'client-1',
    senderName: 'Sora Takahashi',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    senderRole: 'client',
    text: 'Hi Elena! Just uploaded the final multitracks zip. Excited to hear your mix pass!',
    timestamp: '2026-09-29 10:20',
    isSimulated: true
  },
  {
    id: 'msg-2',
    projectId: 'proj-501',
    senderId: 'talent-1',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    senderRole: 'talent',
    text: 'Got the stems! Drums and synths sound fantastic. I will run the lead vocals through Melodyne and send over Mix Pass v1 by Friday.',
    timestamp: '2026-09-29 11:05',
    isSimulated: true
  },
  {
    id: 'msg-3',
    projectId: 'proj-501',
    senderId: 'talent-1',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    senderRole: 'talent',
    text: 'Hey Sora! I just uploaded the updated Final Master (v2.0) with the requested bass adjustment (+1.5dB at 60Hz). Let me know what you think!',
    attachments: [
      { name: 'Velvet_Horizon_Final_Master_24-96.wav', url: '#', size: '84 MB' }
    ],
    timestamp: '2026-10-03 11:32',
    isSimulated: true
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-client-1',
    title: 'Deliverables Submitted',
    message: 'Elena Rostova submitted final master files for Velvet Horizon Single.',
    timestamp: '15 mins ago',
    read: false,
    link: '/projects/proj-501',
    type: 'project'
  },
  {
    id: 'notif-2',
    userId: 'user-client-1',
    title: 'New Proposal Received',
    message: 'Julian Vance submitted a proposal for Fantasy RPG Trailer.',
    timestamp: '2 hours ago',
    read: true,
    link: '/dashboard/client',
    type: 'proposal'
  }
];
