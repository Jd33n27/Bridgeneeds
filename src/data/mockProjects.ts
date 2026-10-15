import { Project } from '@/types';

export const mockActiveProject: Project = {
  id: 'proj-501',
  title: 'Afrobeats Single Production',
  clientName: 'Nesta Creative Agency',
  clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  talentId: 'talent-1',
  talentName: 'Daniel Okafor',
  talentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  talentTitle: 'Music Producer',
  category: 'Production',
  totalBudget: 220000,
  currency: '₦',
  currentPhase: 'Production phase',
  daysRemaining: 6,
  status: 'In Progress',
  paymentStatus: 'Escrow Funded',
  timelineSteps: [
    { label: 'Brief submitted', date: '01 Oct', status: 'completed', description: 'Brief created & published to marketplace' },
    { label: 'Proposal accepted', date: '03 Oct', status: 'completed', description: 'Agreement locked & ₦220,000 funded to MAAS Escrow' },
    { label: 'Production', date: '05 Oct', status: 'completed', description: 'Beat construction & live instrument tracking complete' },
    { label: 'Revision', date: '07 Oct', status: 'completed', description: 'Vocal arrangement tweaks applied' },
    { label: 'Final delivery', date: '09 Oct', status: 'completed', description: 'Full WAV stems and 24-bit master uploaded' },
    { label: 'Approved', date: 'Pending', status: 'current', description: 'Awaiting client final sign-off to release escrow payment' }
  ],
  deliverables: [
    {
      id: 'del-1',
      name: 'Afrobeats_Master_Instrumental_v2.wav',
      size: '48.2 MB',
      type: 'audio/wav',
      uploadDate: '09 Oct 2026',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
      version: 'v2.0 (Final)',
      status: 'Approved'
    },
    {
      id: 'del-2',
      name: 'Tracked_Out_Stems_24bit_44k.zip',
      size: '380.5 MB',
      type: 'application/zip',
      uploadDate: '09 Oct 2026',
      url: '#',
      version: 'v1.0',
      status: 'Draft'
    }
  ],
  messages: [
    {
      id: 'msg-1',
      senderName: 'Nesta Creative Agency',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isTalent: false,
      content: 'Hey Daniel! The initial beat draft is sounding incredible. Could we emphasize the log drums slightly more in the 2nd verse?',
      timestamp: '06 Oct, 10:14 AM'
    },
    {
      id: 'msg-2',
      senderName: 'Daniel Okafor',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isTalent: true,
      content: 'Thanks! Absolutely, I tuned the sub frequencies and boosted the log drum transient punch in verse 2. Listen to the updated version below.',
      timestamp: '06 Oct, 02:30 PM',
      audioAttachmentUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
      fileAttachmentName: 'Afrobeats_Master_Instrumental_v2.wav'
    },
    {
      id: 'msg-3',
      senderName: 'Nesta Creative Agency',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isTalent: false,
      content: 'Spot on! This is ready for approval.',
      timestamp: '09 Oct, 11:05 AM'
    }
  ]
};
