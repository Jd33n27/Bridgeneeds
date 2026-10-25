import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project, ProjectStatus, Message } from '../types';
import { getProject, updateProjectStatus } from '../lib/services';
import { ProjectTimeline } from '../components/ui/ProjectTimeline';
import { PortfolioPlayer } from '../components/ui/PortfolioPlayer';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { TextField } from '../components/ui/TextField';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  FileText, 
  Download, 
  Lock, 
  AlertTriangle, 
  UploadCloud, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import './ProjectWorkspacePage.css';

export const ProjectWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useApp();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [revisionNote, setRevisionNote] = useState('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (id) {
      getProject(id).then((res) => {
        if (isMounted && res) {
          setProject(res);
          setMessages([
            {
              id: 'm1',
              projectId: res.id,
              senderId: res.talentId,
              senderName: res.talentName,
              senderAvatar: res.talentAvatar,
              senderRole: 'talent',
              text: 'Initial multitrack session files received. Starting vocal tuning and instrumental arrangement mix balance now!',
              timestamp: 'Oct 03, 10:15 AM',
              isSimulated: true,
            },
            {
              id: 'm2',
              projectId: res.id,
              senderId: res.clientId,
              senderName: res.clientName,
              senderAvatar: res.clientAvatar,
              senderRole: 'client',
              text: 'Awesome! Please make sure the kick drum has punch and sub-bass is clean for club systems.',
              timestamp: 'Oct 03, 11:30 AM',
              isSimulated: true,
            },
            {
              id: 'm3',
              projectId: res.id,
              senderId: res.talentId,
              senderName: res.talentName,
              senderAvatar: res.talentAvatar,
              senderRole: 'talent',
              text: 'Here is Mix Pass v1 with full analog summing and vocal compression applied. Take a listen to the attached audio sample.',
              timestamp: 'Oct 05, 02:45 PM',
              attachments: [{ name: 'highlife_grooves_mix_v1.wav', url: 'https://cdn.sound.gospel/demo.mp3', size: '42 MB' }],
              isSimulated: true,
            },
          ]);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading project workspace..." />;
  }

  if (!project) {
    return (
      <div className="container py-12">
        <ErrorState
          title="Project workspace not found"
          message="The requested workspace could not be retrieved."
        />
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: `msg-${Date.now()}`,
      projectId: project.id,
      senderId: project.clientId,
      senderName: project.clientName,
      senderAvatar: project.clientAvatar,
      senderRole: 'client',
      text: newMessage,
      timestamp: 'Just now (Simulated)',
      isSimulated: true,
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
    showToast('Simulated message sent to workspace thread.', 'info');
  };

  const handleApproveProject = async () => {
    const updated = await updateProjectStatus(project.id, 'completed');
    if (updated) {
      setProject({ ...updated });
      showToast('Simulated Action: Escrow funds released to talent!', 'success');
    }
  };

  const handleRequestRevision = async () => {
    if (!revisionNote.trim()) return;
    const updated = await updateProjectStatus(project.id, 'revision_requested');
    if (updated) {
      setProject({ ...updated });
      setShowRevisionModal(false);
      setRevisionNote('');
      showToast('Simulated Action: Revision request submitted to talent.', 'warning');
    }
  };

  // Convert milestones to timeline steps
  const timelineSteps = project.milestones.map((m) => ({
    id: m.id,
    title: m.title,
    description: m.description,
    date: m.dueDate,
    status: m.status === 'approved' || m.status === 'paid' ? ('completed' as const) : m.status === 'in_progress' ? ('current' as const) : ('upcoming' as const),
  }));

  return (
    <div className="workspace-page-root">
      <div className="container workspace-container">
        
        {/* Simulation Notice Disclaimer */}
        <div className="simulation-notice-bar" role="alert">
          <Sparkles size={18} />
          <span>
            <strong>Interactive Workspace Simulator:</strong> All message sends, milestone releases, and file uploads are simulated locally for demonstration. No actual payments or external emails have been triggered.
          </span>
        </div>

        {/* Workspace Main Header */}
        <div className="workspace-header-card">
          <div className="workspace-header-top">
            <div className="title-block">
              <span className="workspace-id-tag">Workspace ID: {project.id}</span>
              <h1 className="project-title">{project.title}</h1>
              <p className="agreed-scope">
                <strong>Agreed Scope:</strong> {project.agreedScope}
              </p>
            </div>

            <div className="escrow-status-block">
              <span className="escrow-label">Milestone Escrow Budget</span>
              <span className="escrow-amount">${project.totalBudget} USD</span>
              <span className="escrow-state-pill">{project.escrowStatus}</span>
            </div>
          </div>

          <div className="workspace-header-participants">
            <div className="participant-item">
              <span className="participant-role">Client:</span>
              <img src={project.clientAvatar} alt={project.clientName} className="participant-avatar" />
              <strong>{project.clientName}</strong>
            </div>

            <div className="participant-item">
              <span className="participant-role">Talent:</span>
              <img src={project.talentAvatar} alt={project.talentName} className="participant-avatar" />
              <strong>{project.talentName}</strong> ({project.talentRole})
            </div>

            <div className="workspace-actions-flex">
              {project.status === 'completed' ? (
                <span className="completed-pill">
                  <CheckCircle2 size={16} /> Escrow Released & Completed
                </span>
              ) : (
                <>
                  <Button
                    variant="lime"
                    size="sm"
                    onClick={handleApproveProject}
                    leftIcon={<ShieldCheck size={16} />}
                  >
                    Simulate Release Escrow Payout
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRevisionModal(true)}
                  >
                    Request Revision ({project.revisionsUsed}/{project.revisionsAllowed})
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <section className="workspace-section">
          <h2 className="section-heading">Milestone Progress</h2>
          <ProjectTimeline steps={timelineSteps} />
        </section>

        {/* Workspace Main Grid */}
        <div className="workspace-main-grid">
          
          {/* Left Column: Audio Vault & Deliverables */}
          <main className="workspace-left-col">
            
            {/* Audio Deliverables Vault */}
            <section className="workspace-card-block">
              <div className="card-header-flex">
                <h3 className="card-heading flex-heading">
                  <FileText size={20} className="icon-lime" />
                  <span>Deliverables & Audio Vault</span>
                </h3>
                <span className="vault-count">{project.files.length} Files Uploaded</span>
              </div>

              <div className="files-list">
                {project.files.map((file) => (
                  <div key={file.id} className="file-item-card">
                    <div className="file-meta">
                      <h4 className="file-name">{file.fileName}</h4>
                      <span className="file-details">
                        {file.fileSize} • Version {file.version} • Uploaded by {file.uploadedBy} on {file.uploadedAt}
                      </span>
                    </div>

                    <div className="file-audio-preview">
                      <PortfolioPlayer
                        item={{
                          id: file.id,
                          title: file.fileName,
                          category: 'production',
                          coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&q=80',
                          duration: '3:45',
                          description: 'Delivered Master WAV Pass',
                          roles: ['Mixing'],
                          genre: 'Afrobeats',
                        }}
                      />
                    </div>

                    <div className="file-actions-row">
                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          showToast(`Simulated download of ${file.fileName}`, 'info');
                        }}
                        className="download-link"
                      >
                        <Download size={16} /> Download 24-bit WAV & Stems
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Milestones Breakdown Table */}
            <section className="workspace-card-block">
              <h3 className="card-heading">Agreed Payment Milestones</h3>
              <div className="milestones-table-wrapper">
                <table className="milestones-table">
                  <thead>
                    <tr>
                      <th>Milestone</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.milestones.map((m) => (
                      <tr key={m.id}>
                        <td className="font-bold">{m.title}</td>
                        <td>{m.description}</td>
                        <td>{m.dueDate}</td>
                        <td className="font-bold">${m.amount} USD</td>
                        <td>
                          <span className={`milestone-status-badge ${m.status}`}>
                            {m.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </main>

          {/* Right Column: Live Chat & Revision Thread */}
          <aside className="workspace-right-sidebar">
            <div className="chat-card-block">
              
              <div className="chat-header">
                <MessageSquare size={18} className="icon-lime" />
                <h3>Project Chat & Revision Notes</h3>
              </div>

              {/* Message Feed */}
              <div className="chat-feed">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-bubble-wrapper ${msg.senderRole === 'client' ? 'client-bubble' : 'talent-bubble'}`}
                  >
                    <div className="msg-meta-row">
                      <span className="msg-sender">{msg.senderName}</span>
                      <span className="msg-time">{msg.timestamp}</span>
                    </div>

                    <div className="msg-text-card">
                      <p>{msg.text}</p>
                      
                      {msg.attachments && (
                        <div className="msg-attachment-box">
                          <FileText size={14} />
                          <span>{msg.attachments[0].name} ({msg.attachments[0].size})</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  placeholder="Type revision notes or feedback..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="chat-input"
                />
                <Button variant="lime" size="sm" type="submit">
                  <Send size={16} />
                </Button>
              </form>

            </div>
          </aside>

        </div>

      </div>

      {/* Revision Request Dialog */}
      {showRevisionModal && (
        <div className="modal-backdrop animate-fade-in">
          <div className="modal-content-box">
            <h3>Request Project Revision</h3>
            <p className="modal-subtext">
              Specify your feedback for the talent. Revisions used: {project.revisionsUsed + 1} of {project.revisionsAllowed} included.
            </p>
            
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="e.g. Please bring up the lead vocal by +1.5dB and add slightly more hall reverb on the chorus..."
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
            />

            <div className="modal-buttons-row">
              <Button variant="outline" onClick={() => setShowRevisionModal(false)}>
                Cancel
              </Button>
              <Button variant="lime" onClick={handleRequestRevision}>
                Submit Revision Request
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectWorkspacePage;
