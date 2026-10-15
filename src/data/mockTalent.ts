import { TalentProfile } from '@/types';

export const mockTalentProfiles: TalentProfile[] = [
  {
    id: 'talent-1',
    name: 'Daniel Okafor',
    title: 'Music Producer & Arranger',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200',
    bio: 'Multi-platinum Afrobeats and R&B producer with over 8 years of studio production experience. Worked with top chart-topping artists across West Africa and London.',
    genres: ['Afrobeats', 'R&B', 'Afro-Fusion', 'Amapiano'],
    skills: ['Music Production', 'Vocal Arrangement', 'Beatmaking', 'Logic Pro X', 'Ableton Live', 'Synthesizers'],
    rating: 4.9,
    reviewsCount: 42,
    completedProjects: 32,
    startingPrice: 150000,
    currency: '₦',
    verified: true,
    available: true,
    responseTime: '< 2 hours',
    languages: ['English', 'Yoruba', 'Pidgin'],
    equipment: ['Neumann U87', 'Universal Audio Apollo x8p', 'Focal Trio6 Be Monitors', 'Fender Stratocaster', 'Dave Smith Prophet Rev2'],
    socialLinks: {
      instagram: 'https://instagram.com/danielokafor_music',
      spotify: 'https://spotify.com',
      twitter: 'https://twitter.com/daniel_beats'
    },
    services: [
      {
        id: 'srv-101',
        talentId: 'talent-1',
        talentName: 'Daniel Okafor',
        talentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Music Producer',
        title: 'Full Afrobeats Master Production',
        description: 'Complete custom beat composition, live instrumental arrangement, sound design, and vocal production ready for final recording.',
        category: 'Production',
        startingPrice: 150000,
        currency: '₦',
        deliveryDays: 5,
        includes: [
          'Custom beat production & melody construction',
          'Live bass & guitar tracking',
          'Vocal arrangement session',
          'HQ WAV Stems (24-bit 44.1kHz)',
          '3 rounds of revisions'
        ],
        revisions: 3,
        audioSampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
        rating: 5.0,
        reviewsCount: 28,
        popular: true
      },
      {
        id: 'srv-102',
        talentId: 'talent-1',
        talentName: 'Daniel Okafor',
        talentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Music Producer',
        title: 'Commercial Track Beat Production',
        description: 'Catchy, radio-ready instrumental production designed specifically for commercial placements, ads, and artist singles.',
        category: 'Production',
        startingPrice: 100000,
        currency: '₦',
        deliveryDays: 3,
        includes: [
          'Full instrumental beat',
          'Tracked out WAV stems',
          'Commercial license rights',
          '2 revisions'
        ],
        revisions: 2,
        rating: 4.8,
        reviewsCount: 14
      }
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'High Life Grooves (Single)',
        role: 'Lead Producer & Arranger',
        genre: 'Afrobeats / Highlife',
        duration: '3:15',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
        description: 'Vibrant Afro-fusion track with live brass horns, syncopated perc patterns, and lush organ synth layers.',
        playsCount: 14200
      },
      {
        id: 'port-2',
        title: 'Midnight in Victoria Island',
        role: 'Producer & Mixing',
        genre: 'R&B / Afro-soul',
        duration: '2:48',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=tropical-house-110058.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
        description: 'Warm analog synthesizers blended with deep basslines and silk vocal harmonies.',
        playsCount: 9800
      }
    ],
    credits: [
      {
        id: 'cred-1',
        songTitle: 'Sunshine & Palm Trees',
        artist: 'Kemi & The Vibe',
        role: 'Main Producer',
        year: '2025',
        labelOrPlatform: 'Universal Music Group Africa'
      },
      {
        id: 'cred-2',
        songTitle: 'Lagos Nights',
        artist: 'Burna Rhythm',
        role: 'Co-Producer',
        year: '2024',
        labelOrPlatform: 'Sony Music Africa'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        clientName: 'Bisi Adeleke',
        clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        clientRole: 'Independent Artist',
        rating: 5,
        comment: 'Daniel delivered an absolute masterpiece for my lead single. The groove is unmatched and his communication throughout the brief was spot-on.',
        date: '12 Sep 2026',
        projectTitle: 'Afrobeats Single Production'
      },
      {
        id: 'rev-2',
        clientName: 'Marafika Studios',
        clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        clientRole: 'A&R Executive',
        rating: 5,
        comment: 'Very professional. Stems were pristine and delivered 2 days ahead of schedule.',
        date: '28 Aug 2026',
        projectTitle: 'EP Track Production'
      }
    ]
  },
  {
    id: 'talent-2',
    name: 'Amaka James',
    title: 'Senior Mixing & Mastering Engineer',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200',
    bio: 'Grammy-credited audio engineer specializing in punchy, radio-ready mixes for Afrobeats, Pop, and Dancehall. 10+ years shaping the sonic signature of top African records.',
    genres: ['Afrobeats', 'Pop', 'Dancehall', 'Hip Hop', 'Gospel'],
    skills: ['Mixing', 'Mastering', 'Vocal Tuning (Celemony Melodyne)', 'Pro Tools HD', 'Analog Outboard Processing', 'Spatial Audio (Dolby Atmos)'],
    rating: 4.8,
    reviewsCount: 38,
    completedProjects: 21,
    startingPrice: 80000,
    currency: '₦',
    verified: true,
    available: true,
    responseTime: '< 1 hour',
    languages: ['English', 'Igbo'],
    equipment: ['SSL AWS 900+ Console', 'Tube-Tech CL 1B Compressor', 'PMC result6 Monitors', 'Prism Sound ADA-8XR'],
    socialLinks: {
      instagram: 'https://instagram.com/amakajames_mix',
      twitter: 'https://twitter.com/amakajames_audio'
    },
    services: [
      {
        id: 'srv-201',
        talentId: 'talent-2',
        talentName: 'Amaka James',
        talentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Mixing Engineer',
        title: 'Professional Single Vocal & Track Mixing',
        description: 'Full stem mixing with analog warmth, vocal pitch correction, dynamic control, spatial positioning, and stereo enhancement.',
        category: 'Mixing',
        startingPrice: 80000,
        currency: '₦',
        deliveryDays: 3,
        includes: [
          'Vocal editing & pitch correction',
          'Instrumental stem balance & EQ',
          'Analog summing processing',
          '2 revisions included',
          'High resolution 24-bit WAV & MP3'
        ],
        revisions: 2,
        audioSampleUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=energetic-hip-hop-18305.mp3',
        rating: 4.9,
        reviewsCount: 22,
        popular: true
      },
      {
        id: 'srv-202',
        talentId: 'talent-2',
        talentName: 'Amaka James',
        talentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Mixing Engineer',
        title: 'Mastering for Streaming Platforms (Spotify/Apple)',
        description: 'Precision mastering optimized for modern streaming loudness standards (LUFS), crisp highs, and deep controlled low end.',
        category: 'Mastering',
        startingPrice: 40000,
        currency: '₦',
        deliveryDays: 2,
        includes: [
          'Stereo master (WAV 24/96)',
          'Apple Digital Masters compliant',
          'Radio edit & Instrumental master option',
          '1 revision'
        ],
        revisions: 1,
        rating: 4.8,
        reviewsCount: 16
      }
    ],
    portfolio: [
      {
        id: 'port-3',
        title: 'Ocean Breeze (Mixed & Mastered)',
        role: 'Mixing & Mastering Engineer',
        genre: 'Afro-Pop',
        duration: '3:05',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=energetic-hip-hop-18305.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
        description: 'Crystal clear vocal separation and thunderous kick-drum low-end response.',
        playsCount: 18400
      }
    ],
    credits: [
      {
        id: 'cred-3',
        songTitle: 'Sweet Rhythm',
        artist: 'Teni Live',
        role: 'Mix Engineer',
        year: '2025',
        labelOrPlatform: 'Native Records'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        clientName: 'Segun Wire',
        clientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
        clientRole: 'Label Producer',
        rating: 5,
        comment: 'Amaka turned our muddiest recording into a gleaming, radio-ready gem. Unbelievable ear for detail!',
        date: '04 Sep 2026',
        projectTitle: 'Single Vocal Mix'
      }
    ]
  },
  {
    id: 'talent-3',
    name: 'Tobi Martins',
    title: 'Session Guitarist & Composer',
    location: 'Accra, Ghana',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
    bio: 'Virtuoso acoustic and electric guitarist specializing in Highlife licks, Afrobeats skanks, Soulful riffs, and Gospel progressions.',
    genres: ['Afrobeats', 'Gospel', 'Highlife', 'Jazz', 'Neo-Soul'],
    skills: ['Electric Guitar', 'Acoustic Guitar', 'Guitar Arrangement', 'Sight Reading', 'Pedalboard FX'],
    rating: 5.0,
    reviewsCount: 25,
    completedProjects: 18,
    startingPrice: 50000,
    currency: '₦',
    verified: true,
    available: true,
    responseTime: '< 3 hours',
    languages: ['English', 'Twi'],
    equipment: ['Suhr Classic S', 'Fender Princeton Reverb 1968', 'Strymon Timeline & BigSky', 'Universal Audio OX Amp Top Box'],
    socialLinks: {
      instagram: 'https://instagram.com/tobimartins_guitars'
    },
    services: [
      {
        id: 'srv-301',
        talentId: 'talent-3',
        talentName: 'Tobi Martins',
        talentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Session Guitarist',
        title: 'Custom Afrobeats & Highlife Guitar Tracking',
        description: 'Recording clean electric or acoustic guitar lines, solos, rhythm skanks, and decorative fills for your song.',
        category: 'Musicians',
        startingPrice: 50000,
        currency: '₦',
        deliveryDays: 2,
        includes: [
          'Multiple rhythm & lead takes',
          'DI clean track + Processed Amp track',
          'Custom groove arrangement',
          '2 revisions'
        ],
        revisions: 2,
        audioSampleUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c268800188.mp3?filename=funky-guitar-loop-105152.mp3',
        rating: 5.0,
        reviewsCount: 18,
        popular: true
      }
    ],
    portfolio: [
      {
        id: 'port-4',
        title: 'Accra Sunset Guitar Session',
        role: 'Lead Guitarist',
        genre: 'Highlife / Afro-jazz',
        duration: '2:15',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c268800188.mp3?filename=funky-guitar-loop-105152.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
        description: 'Intricate fingerpicking accompanied by shimmering chorus effects.',
        playsCount: 7400
      }
    ],
    credits: [
      {
        id: 'cred-4',
        songTitle: 'Golden Hour in Kumasi',
        artist: 'King Promise',
        role: 'Session Guitarist',
        year: '2024',
        labelOrPlatform: 'Legacy Music'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        clientName: 'Nesta Creative Agency',
        clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        clientRole: 'Creative Director',
        rating: 5,
        comment: 'Tobi is a rare musical genius. Took our simple draft and added soul that transformed the whole project.',
        date: '18 Aug 2026',
        projectTitle: 'Commercial Jingle Guitar'
      }
    ]
  },
  {
    id: 'talent-4',
    name: 'Chisom Vance',
    title: 'Songwriter & Topliner',
    location: 'Abuja, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    bio: 'Passionate songwriter and topline vocal composer behind hit pop hooks and viral brand jingles. Known for sticky melodies and memorable storytelling.',
    genres: ['Pop', 'Afrobeats', 'R&B', 'Commercial Jingles'],
    skills: ['Songwriting', 'Melody Composition', 'Lyric Writing', 'Toplining', 'Vocal Demo Recording'],
    rating: 4.9,
    reviewsCount: 31,
    completedProjects: 29,
    startingPrice: 70000,
    currency: '₦',
    verified: true,
    available: true,
    responseTime: '< 4 hours',
    languages: ['English', 'French'],
    equipment: ['Shure SM7B', 'Apogee Duet 3', 'Logic Pro'],
    socialLinks: {
      instagram: 'https://instagram.com/chisomvance_writes'
    },
    services: [
      {
        id: 'srv-401',
        talentId: 'talent-4',
        talentName: 'Chisom Vance',
        talentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Songwriter',
        title: 'Complete Song Lyric & Melody Topline',
        description: 'Writing hit verse-chorus lyrics and recording high quality vocal guide demos for your track.',
        category: 'Songwriting',
        startingPrice: 70000,
        currency: '₦',
        deliveryDays: 4,
        includes: [
          'Complete verse, chorus, bridge lyrics',
          'Vocal guide demo track (WAV)',
          'Melody reference guide',
          '2 revisions'
        ],
        revisions: 2,
        rating: 4.9,
        reviewsCount: 19
      }
    ],
    portfolio: [
      {
        id: 'port-5',
        title: 'Chasing Sunsets Hook',
        role: 'Songwriter & Vocalist',
        genre: 'Afro-Pop',
        duration: '1:50',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
        description: 'Catchy, emotional hook written for an international commercial campaign.',
        playsCount: 11200
      }
    ],
    credits: [],
    reviews: []
  },
  {
    id: 'talent-5',
    name: 'Kofi Mensah',
    title: 'Sound Designer & Film Scorer',
    location: 'Accra, Ghana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    bio: 'Cinematic composer creating evocative film scores, game audio landscapes, trailers, and brand audio identities.',
    genres: ['Cinematic', 'Ambient', 'Orchestral', 'Afro-Futurism'],
    skills: ['Film Scoring', 'Sound Design', 'Foley Recording', 'Orchestration', 'Game Audio (Wwise)'],
    rating: 4.95,
    reviewsCount: 19,
    completedProjects: 15,
    startingPrice: 120000,
    currency: '₦',
    verified: true,
    available: true,
    responseTime: '< 2 hours',
    languages: ['English', 'Ga'],
    equipment: ['Spitfire Audio Symphonic Suite', 'Moog One', 'Genelec 8351B Monitors'],
    socialLinks: {
      website: 'https://kofimensahcomposer.com'
    },
    services: [
      {
        id: 'srv-501',
        talentId: 'talent-5',
        talentName: 'Kofi Mensah',
        talentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        talentTitle: 'Sound Designer',
        title: 'Custom Film Score & Audio Branding',
        description: 'Tailored orchestral synth scoring for trailers, documentaries, podcasts, and video games.',
        category: 'Sound Design',
        startingPrice: 120000,
        currency: '₦',
        deliveryDays: 5,
        includes: [
          'Full original composition',
          'Stem exports',
          'Sync license for video/film',
          '3 revisions'
        ],
        revisions: 3,
        rating: 5.0,
        reviewsCount: 12
      }
    ],
    portfolio: [
      {
        id: 'port-6',
        title: 'Sahara Awakening (Score)',
        role: 'Composer',
        genre: 'Cinematic Orchestral',
        duration: '4:10',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=tropical-house-110058.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
        description: 'Deep orchestral soundscapes blended with traditional African percussion.',
        playsCount: 15900
      }
    ],
    credits: [],
    reviews: []
  }
];
