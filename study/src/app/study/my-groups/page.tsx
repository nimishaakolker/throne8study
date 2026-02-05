'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Crown,
  Calendar,
  Clock,
  Camera,
  CameraOff,
  Globe,
  Lock,
  UserPlus,
  Settings,
  LogOut,
  MoreVertical,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Bell,
  Search,
  Filter,
  ChevronRight,
  X,
  Trash2,
  Edit,
  CheckCircle
} from "lucide-react";

// Types
interface Member {
  id: number;
  name: string;
  avatar: string;
  joinedDate: string;
  studyTime: number;
  attendance: number;
  streak: number;
  rank: number;
  violations: number;
  lastActive: string;
}

interface Group {
  id: number;
  title: string;
  description: string;
  category: string;
  members: number;
  capacity: number;
  goalHours: number;
  cameraRequired: boolean;
  visibility: 'public' | 'private';
  isCreator: boolean;
  joinedDate: string;
  lastActive: string;
  streak: number;
  studyTime: number;
  rank: number;
  attendance: number;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group | null;
  onUpdate: (groupId: number, formData: Partial<Group>) => void;
  onDelete: (groupId: number) => void;
  onLeave: (groupId: number) => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  goalHours: number;
  capacity: number;
  cameraRequired: boolean;
  visibility: 'public' | 'private';
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  group, 
  onUpdate, 
  onDelete, 
  onLeave 
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [formData, setFormData] = useState<FormData>({
    title: group?.title || '',
    description: group?.description || '',
    category: group?.category || '',
    goalHours: group?.goalHours || 8,
    capacity: group?.capacity || 20,
    cameraRequired: group?.cameraRequired || false,
    visibility: group?.visibility || 'public',
  });

  // Mock members data for management
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "👩‍🎓",
      joinedDate: "2024-01-10",
      studyTime: 145,
      attendance: 95,
      streak: 15,
      rank: 1,
      violations: 0,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      avatar: "👨‍💻",
      joinedDate: "2024-01-12",
      studyTime: 98,
      attendance: 78,
      streak: 8,
      rank: 4,
      violations: 2,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Ananya Gupta",
      avatar: "👩‍💼",
      joinedDate: "2024-01-08",
      studyTime: 167,
      attendance: 92,
      streak: 20,
      rank: 2,
      violations: 0,
      lastActive: "30 mins ago"
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "👨‍🔬",
      joinedDate: "2024-01-15",
      studyTime: 72,
      attendance: 65,
      streak: 5,
      rank: 6,
      violations: 3,
      lastActive: "3 days ago"
    }
  ]);

  const categories: string[] = [
    'JEE Aspirant',
    'NEET Aspirant',
    'UPSC Preparation',
    'College Student',
    'Professional',
    'Language Learning',
    'Coding & Tech',
    'Other'
  ];

  const handleSave = (): void => {
    if (group) {
      onUpdate(group.id, formData);
      onClose();
    }
  };

  const handleDelete = (): void => {
    if (group && window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      onDelete(group.id);
      onClose();
    }
  };

  const handleLeave = (): void => {
    if (group && window.confirm('Are you sure you want to leave this group?')) {
      onLeave(group.id);
      onClose();
    }
  };

  const handleKickMember = (memberId: number, memberName: string): void => {
    if (window.confirm(`Are you sure you want to remove ${memberName} from the group?`)) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const handleWarnMember = (memberId: number, memberName: string): void => {
    if (window.confirm(`Send a warning to ${memberName}?`)) {
      alert(`Warning sent to ${memberName}`);
    }
  };

  if (!isOpen || !group) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#e0d8cf] p-4 flex justify-between items-center rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-[#4a3728]">
              {group.isCreator ? 'Group Management' : 'Group Info'}
            </h2>
            <p className="text-sm text-[#6b5847]">{group.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {group.isCreator ? (
          <>
            {/* Tabs for Creator */}
            <div className="border-b border-[#e0d8cf] bg-[#f6ede8] px-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 font-semibold text-sm transition-all ${
                    activeTab === 'overview'
                      ? 'border-b-4 border-[#8b7355] text-[#4a3728]'
                      : 'text-[#6b5847] hover:text-[#4a3728]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`px-4 py-3 font-semibold text-sm transition-all ${
                    activeTab === 'members'
                      ? 'border-b-4 border-[#8b7355] text-[#4a3728]'
                      : 'text-[#6b5847] hover:text-[#4a3728]'
                  }`}
                >
                  Members ({members.length})
                </button>
               
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-3 font-semibold text-sm transition-all ${
                    activeTab === 'settings'
                      ? 'border-b-4 border-[#8b7355] text-[#4a3728]'
                      : 'text-[#6b5847] hover:text-[#4a3728]'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-[#f6ede8] rounded-lg p-3 border border-[#e0d8cf]">
                      <div className="text-2xl font-bold text-[#4a3728]">{members.length}</div>
                      <div className="text-xs text-[#6b5847] mt-1">Total Members</div>
                    </div>
                    <div className="bg-[#f6ede8] rounded-lg p-3 border border-[#e0d8cf]">
                      <div className="text-2xl font-bold text-[#4a3728]">
                        {Math.round(members.reduce((acc, m) => acc + m.attendance, 0) / members.length)}%
                      </div>
                      <div className="text-xs text-[#6b5847] mt-1">Avg Attendance</div>
                    </div>
                    <div className="bg-[#f6ede8] rounded-lg p-3 border border-[#e0d8cf]">
                      <div className="text-2xl font-bold text-[#4a3728]">
                        {members.reduce((acc, m) => acc + m.studyTime, 0)}h
                      </div>
                      <div className="text-xs text-[#6b5847] mt-1">Total Study Time</div>
                    </div>
                    <div className="bg-[#f6ede8] rounded-lg p-3 border border-[#e0d8cf]">
                      <div className="text-2xl font-bold text-[#4a3728]">
                        {members.filter(m => m.violations > 0).length}
                      </div>
                      <div className="text-xs text-[#6b5847] mt-1">Violations</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#4a3728] mb-2">Top Performers</h3>
                    <div className="space-y-2">
                      {members.sort((a, b) => b.studyTime - a.studyTime).slice(0, 3).map((member, index) => (
                        <div key={member.id} className="flex items-center gap-2 p-2 bg-[#f6ede8] rounded-lg text-sm">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold bg-[#8b7355] text-white text-xs">
                            {index + 1}
                          </div>
                          <div className="text-lg">{member.avatar}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-[#4a3728] text-sm">{member.name}</div>
                            <div className="text-xs text-[#6b5847]">{member.studyTime}h • {member.attendance}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#4a3728] mb-2">Needs Attention</h3>
                    {members.filter(m => m.attendance < 80 || m.violations > 0).length > 0 ? (
                      <div className="space-y-2">
                        {members.filter(m => m.attendance < 80 || m.violations > 0).map((member) => (
                          <div key={member.id} className="flex items-center gap-2 p-2 bg-[#f6ede8] rounded-lg border border-[#e0d8cf] text-sm">
                            <div className="text-lg">{member.avatar}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-[#4a3728] text-sm">{member.name}</div>
                              <div className="text-xs text-[#6b5847]">
                                {member.attendance < 80 && `${member.attendance}% attendance`}
                                {member.attendance < 80 && member.violations > 0 && ' • '}
                                {member.violations > 0 && `${member.violations} violation(s)`}
                              </div>
                            </div>
                            <button
                              onClick={() => handleWarnMember(member.id, member.name)}
                              className="px-2 py-1 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded text-xs font-semibold"
                            >
                              Warn
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-sm text-[#6b5847] bg-[#f6ede8] rounded-lg">
                        All members performing well
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#4a3728]">All Members</h3>
                    <div className="text-xs text-[#6b5847]">
                      {members.length} / {group.capacity} members
                    </div>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {members.map((member) => (
                      <div key={member.id} className="p-3 bg-[#f6ede8] rounded-lg hover:bg-[#e0d8cf] transition-all border border-[#e0d8cf]">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">{member.avatar}</div>
                            <div>
                              <div className="font-semibold text-[#4a3728]">{member.name}</div>
                              <div className="text-xs text-[#6b5847]">Joined {member.joinedDate}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleKickMember(member.id, member.name)}
                            className="px-2 py-1 bg-[#6b5847] hover:bg-[#4a3728] text-white rounded text-xs font-semibold flex items-center gap-1"
                          >
                            <X size={12} />
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3 pt-2 border-t border-[#e0d8cf]">
                          <div>
                            <div className="text-xs text-[#6b5847]">Study Time</div>
                            <div className="text-sm font-bold text-[#4a3728]">{member.studyTime}h</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6b5847]">Attendance</div>
                            <div className="text-sm font-bold text-[#4a3728]">{member.attendance}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6b5847]">Streak</div>
                            <div className="text-sm font-bold text-[#4a3728]">{member.streak} days</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6b5847]">Rank</div>
                            <div className="text-sm font-bold text-[#4a3728]">#{member.rank}</div>
                          </div>
                        </div>

                        {member.violations > 0 && (
                          <div className="mt-2 px-2 py-1 bg-[#8b7355] text-white text-xs rounded inline-block">
                            {member.violations} Violation(s)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Group Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4a3728] mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Daily Goal (hrs)</label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={formData.goalHours}
                        onChange={(e) => setFormData({ ...formData, goalHours: parseInt(e.target.value) || 8 })}
                        className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Capacity</label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 20 })}
                        className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Visibility</label>
                      <select
                        value={formData.visibility}
                        onChange={(e) => setFormData({ ...formData, visibility: e.target.value as 'public' | 'private' })}
                        className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-[#f6ede8] rounded-lg">
                    <div className="flex items-center gap-2">
                      <Camera className="text-[#4a3728]" size={16} />
                      <div className="text-sm font-semibold text-[#4a3728]">Camera Required</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, cameraRequired: !formData.cameraRequired })}
                      className={`w-11 h-6 rounded-full transition-all ${
                        formData.cameraRequired ? 'bg-[#8b7355]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                        formData.cameraRequired ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#e0d8cf] space-y-2">
                    <button
                      onClick={handleSave}
                      className="w-full px-4 py-2 bg-linear-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <CheckCircle size={16} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 bg-[#6b5847] hover:bg-[#4a3728] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 size={16} />
                      Delete Group
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Member view (non-creator)
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="bg-[#f6ede8] rounded-lg p-4">
                <h3 className="font-semibold text-[#4a3728] mb-3">Group Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Category:</span>
                    <span className="font-semibold text-[#4a3728]">{group.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Daily Goal:</span>
                    <span className="font-semibold text-[#4a3728]">{group.goalHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Capacity:</span>
                    <span className="font-semibold text-[#4a3728]">{group.members}/{group.capacity} members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Visibility:</span>
                    <span className="font-semibold text-[#4a3728]">{group.visibility === 'public' ? 'Public' : 'Private'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Camera:</span>
                    <span className="font-semibold text-[#4a3728]">{group.cameraRequired ? 'Required' : 'Optional'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Joined:</span>
                    <span className="font-semibold text-[#4a3728]">{group.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6ede8] rounded-lg p-4">
                <h3 className="font-semibold text-[#4a3728] mb-3">Your Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Study Time:</span>
                    <span className="font-semibold text-[#4a3728]">{group.studyTime} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Attendance:</span>
                    <span className="font-semibold text-[#4a3728]">{group.attendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Streak:</span>
                    <span className="font-semibold text-[#4a3728]">{group.streak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b5847]">Rank:</span>
                    <span className="font-semibold text-[#4a3728]">#{group.rank}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLeave}
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Leave Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface GroupCardProps {
  group: Group;
  onSettingsClick: (group: Group) => void;
  onOpenClick: (groupId: number) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onSettingsClick, onOpenClick }) => (
  <div className="bg-white rounded-xl border-2 border-[#e0d8cf] hover:border-[#8b7355] hover:shadow-lg transition-all duration-200 overflow-hidden">
    <div className="p-4 bg-[#f6ede8] border-b border-[#e0d8cf]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-[#4a3728]">{group.title}</h3>
            {group.isCreator && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#8b7355] rounded-full">
                <Crown size={12} className="text-white" />
                <span className="text-xs font-bold text-white">Creator</span>
              </div>
            )}
          </div>
          <p className="text-sm text-[#6b5847] line-clamp-2">{group.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-1 bg-white rounded-md text-xs font-semibold text-[#4a3728]">
          {group.category}
        </span>
        {group.visibility === 'public' ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-md">
            <Globe size={12} className="text-[#4a3728]" />
            <span className="text-xs font-semibold text-[#4a3728]">Public</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-md">
            <Lock size={12} className="text-[#4a3728]" />
            <span className="text-xs font-semibold text-[#4a3728]">Private</span>
          </div>
        )}
        <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-md">
          {group.cameraRequired ? <Camera size={12} className="text-[#4a3728]" /> : <CameraOff size={12} className="text-[#4a3728]" />}
          <span className="text-xs font-semibold text-[#4a3728]">
            Camera {group.cameraRequired ? 'On' : 'Off'}
          </span>
        </div>
      </div>
    </div>

    <div className="p-4 grid grid-cols-4 gap-3 border-b border-[#e0d8cf]">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Users size={14} className="text-[#8b7355]" />
          <span className="text-lg font-bold text-[#4a3728]">{group.members}</span>
        </div>
        <span className="text-xs text-[#6b5847]">Members</span>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Target size={14} className="text-[#8b7355]" />
          <span className="text-lg font-bold text-[#4a3728]">{group.goalHours}h</span>
        </div>
        <span className="text-xs text-[#6b5847]">Daily Goal</span>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <TrendingUp size={14} className="text-[#8b7355]" />
          <span className="text-lg font-bold text-[#4a3728]">{group.streak}</span>
        </div>
        <span className="text-xs text-[#6b5847]">Streak</span>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Award size={14} className="text-[#8b7355]" />
          <span className="text-lg font-bold text-[#4a3728]">#{group.rank}</span>
        </div>
        <span className="text-xs text-[#6b5847]">Rank</span>
      </div>
    </div>

    <div className="px-4 py-3 space-y-2 border-b border-[#e0d8cf]">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-[#4a3728]">Study Time</span>
          <span className="text-xs font-bold text-[#8b7355]">{group.studyTime}h</span>
        </div>
        <div className="w-full bg-[#e0d8cf] rounded-full h-2">
          <div 
            className="bg-[#8b7355] h-2 rounded-full transition-all"
            style={{ width: `${Math.min((group.studyTime / (group.goalHours * 30)) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-[#4a3728]">Attendance</span>
          <span className="text-xs font-bold text-[#8b7355]">{group.attendance}%</span>
        </div>
        <div className="w-full bg-[#e0d8cf] rounded-full h-2">
          <div 
            className="bg-[#8b7355] h-2 rounded-full transition-all"
            style={{ width: `${group.attendance}%` }}
          />
        </div>
      </div>
    </div>

    <div className="px-4 py-3 flex items-center justify-between">
      <div className="text-xs text-[#6b5847]">
        <Clock size={12} className="inline mr-1" />
        Active {group.lastActive}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onSettingsClick(group)}
          className="px-3 py-1.5 bg-[#f6ede8] hover:bg-[#e0d8cf] text-[#4a3728] rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
        >
          <Settings size={14} />
          {group.isCreator ? 'Manage' : 'Info'}
        </button>
        <button 
          onClick={() => onOpenClick(group.id)}
          className="px-3 py-1.5 bg-linear-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
        >
          <MessageCircle size={14} />
          Open
        </button>
      </div>
    </div>
  </div>
);

const MyGroups: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [settingsGroup, setSettingsGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      title: "Focus JEE Warriors",
      description: "Daily 6AM-8AM study sessions for serious JEE aspirants",
      category: "JEE Aspirant",
      members: 45,
      capacity: 50,
      goalHours: 8,
      cameraRequired: true,
      visibility: "public",
      isCreator: true,
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
      streak: 15,
      studyTime: 120,
      rank: 3,
      attendance: 95
    },
    {
      id: 2,
      title: "NEET Biology Masters",
      description: "Evening biology deep dive sessions with doubt clearing",
      category: "NEET Aspirant",
      members: 38,
      capacity: 40,
      goalHours: 6,
      cameraRequired: true,
      visibility: "public",
      isCreator: false,
      joinedDate: "2024-01-20",
      lastActive: "5 hours ago",
      streak: 12,
      studyTime: 72,
      rank: 7,
      attendance: 88
    },
    {
      id: 3,
      title: "Early Birds Study Club",
      description: "5AM-7AM morning study sessions. Camera on, no distractions.",
      category: "College Student",
      members: 25,
      capacity: 30,
      goalHours: 2,
      cameraRequired: true,
      visibility: "private",
      isCreator: true,
      joinedDate: "2024-01-10",
      lastActive: "1 day ago",
      streak: 20,
      studyTime: 40,
      rank: 1,
      attendance: 98
    },
    {
      id: 4,
      title: "Python Coders Unite",
      description: "Daily coding practice and project building sessions",
      category: "Coding & Tech",
      members: 52,
      capacity: 60,
      goalHours: 4,
      cameraRequired: false,
      visibility: "public",
      isCreator: false,
      joinedDate: "2024-01-25",
      lastActive: "30 mins ago",
      streak: 8,
      studyTime: 32,
      rank: 12,
      attendance: 75
    },
    {
      id: 5,
      title: "UPSC Strategy Group",
      description: "Daily current affairs and answer writing practice",
      category: "UPSC Preparation",
      members: 30,
      capacity: 35,
      goalHours: 10,
      cameraRequired: true,
      visibility: "public",
      isCreator: true,
      joinedDate: "2024-01-05",
      lastActive: "4 hours ago",
      streak: 25,
      studyTime: 250,
      rank: 2,
      attendance: 92
    }
  ]);

  const handleUpdateGroup = (groupId: number, updatedData: Partial<Group>): void => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, ...updatedData } : g));
  };

  const handleDeleteGroup = (groupId: number): void => {
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const handleLeaveGroup = (groupId: number): void => {
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const handleOpenGroup = (groupId: number): void => {
    router.push(`/study/my-groups/${groupId}`);
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "created" && group.isCreator) ||
                      (activeTab === "joined" && !group.isCreator);
    return matchesSearch && matchesTab;
  });

  const stats = {
    totalGroups: groups.length,
    createdGroups: groups.filter(g => g.isCreator).length,
    joinedGroups: groups.filter(g => !g.isCreator).length,
    totalStudyHours: groups.reduce((acc, g) => acc + g.studyTime, 0),
    avgAttendance: groups.length > 0 ? Math.round(groups.reduce((acc, g) => acc + g.attendance, 0) / groups.length) : 0
  };

  return (
    <div className="ml-auto min-h-screen max-w-6xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#4a3728] mb-2">My Study Groups</h1>
        <p className="text-[#6b5847]">Manage and track your study groups</p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border-2 border-[#e0d8cf] hover:border-[#8b7355] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8b7355] rounded-lg flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4a3728]">{stats.totalGroups}</div>
              <div className="text-xs text-[#6b5847]">Total Groups</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border-2 border-[#e0d8cf] hover:border-[#8b7355] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8b7355] rounded-lg flex items-center justify-center">
              <Crown className="text-white" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4a3728]">{stats.createdGroups}</div>
              <div className="text-xs text-[#6b5847]">Created</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border-2 border-[#e0d8cf] hover:border-[#8b7355] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8b7355] rounded-lg flex items-center justify-center">
              <UserPlus className="text-white" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4a3728]">{stats.joinedGroups}</div>
              <div className="text-xs text-[#6b5847]">Joined</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border-2 border-[#e0d8cf] hover:border-[#8b7355] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8b7355] rounded-lg flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4a3728]">{stats.totalStudyHours}h</div>
              <div className="text-xs text-[#6b5847]">Study Hours</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border-2 border-[#e0d8cf] hover:border-[#8b7355] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8b7355] rounded-lg flex items-center justify-center">
              <Award className="text-white" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4a3728]">{stats.avgAttendance}%</div>
              <div className="text-xs text-[#6b5847]">Avg Attendance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 border-2 border-[#e0d8cf]">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "all"
                  ? "bg-linear-to-r from-[#8b7355] to-[#6b5847] text-white shadow-md"
                  : "bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]"
              }`}
            >
              All Groups ({stats.totalGroups})
            </button>
            <button
              onClick={() => setActiveTab("created")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 ${
                activeTab === "created"
                  ? "bg-linear-to-r from-[#8b7355] to-[#6b5847] text-white shadow-md"
                  : "bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]"
              }`}
            >
              <Crown size={16} />
              Created ({stats.createdGroups})
            </button>
            <button
              onClick={() => setActiveTab("joined")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 ${
                activeTab === "joined"
                  ? "bg-linear-to-r from-[#8b7355] to-[#6b5847] text-white shadow-md"
                  : "bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]"
              }`}
            >
              <UserPlus size={16} />
              Joined ({stats.joinedGroups})
            </button>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5847]" size={18} />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onSettingsClick={setSettingsGroup}
              onOpenClick={handleOpenGroup}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border-2 border-[#e0d8cf]">
          <div className="w-20 h-20 bg-[#f6ede8] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={40} className="text-[#8b7355]" />
          </div>
          <h3 className="text-xl font-bold text-[#4a3728] mb-2">No groups found</h3>
          <p className="text-[#6b5847] mb-4">
            {searchQuery 
              ? "Try adjusting your search query" 
              : activeTab === "created"
              ? "You haven't created any groups yet"
              : "You haven't joined any groups yet"}
          </p>
          <button className="px-6 py-2 bg-linear-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
            Browse Groups
          </button>
        </div>
      )}

      <SettingsModal 
        isOpen={!!settingsGroup}
        onClose={() => setSettingsGroup(null)}
        group={settingsGroup}
        onUpdate={handleUpdateGroup}
        onDelete={handleDeleteGroup}
        onLeave={handleLeaveGroup}
      />
    </div>
  );
};

export default MyGroups;