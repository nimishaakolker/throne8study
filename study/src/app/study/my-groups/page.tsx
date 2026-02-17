'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users, Crown, Calendar, Clock, Camera, CameraOff, Globe, Lock,
  UserPlus, Settings, LogOut, MoreVertical, Target, TrendingUp,
  Award, MessageCircle, Bell, Search, Filter, ChevronRight, X,
  Trash2, Edit, CheckCircle, ChevronDown
} from "lucide-react";

// ✅ ADD THESE 3 LINES — that's the entire Redux change
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateGroup, deleteGroup, leaveGroup } from "@/lib/redux/features/groups/groupsSlice";

// ─── Types (unchanged) ────────────────────────────────────────
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

// ─── SettingsModal (100% unchanged) ───────────────────────────
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, group, onUpdate, onDelete, onLeave }) => {
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

  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Priya Sharma",  avatar: "👩‍🎓", joinedDate: "2024-01-10", studyTime: 145, attendance: 95, streak: 15, rank: 1, violations: 0, lastActive: "2 hours ago" },
    { id: 2, name: "Rahul Kumar",   avatar: "👨‍💻", joinedDate: "2024-01-12", studyTime: 98,  attendance: 78, streak: 8,  rank: 4, violations: 2, lastActive: "1 day ago"   },
    { id: 3, name: "Ananya Gupta",  avatar: "👩‍💼", joinedDate: "2024-01-08", studyTime: 167, attendance: 92, streak: 20, rank: 2, violations: 0, lastActive: "30 mins ago" },
    { id: 4, name: "Vikram Singh",  avatar: "👨‍🔬", joinedDate: "2024-01-15", studyTime: 72,  attendance: 65, streak: 5,  rank: 6, violations: 3, lastActive: "3 days ago"  },
  ]);

  const categories: string[] = [
    'JEE Aspirant', 'NEET Aspirant', 'UPSC Preparation', 'College Student',
    'Professional', 'Language Learning', 'Coding & Tech', 'Other'
  ];

  const handleSave = (): void => { if (group) { onUpdate(group.id, formData); onClose(); } };
  const handleDelete = (): void => { if (group && window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) { onDelete(group.id); onClose(); } };
  const handleLeave = (): void => { if (group && window.confirm('Are you sure you want to leave this group?')) { onLeave(group.id); onClose(); } };
  const handleKickMember = (memberId: number, memberName: string): void => { if (window.confirm(`Are you sure you want to remove ${memberName} from the group?`)) { setMembers(members.filter(m => m.id !== memberId)); } };
  const handleWarnMember = (memberId: number, memberName: string): void => { if (window.confirm(`Send a warning to ${memberName}?`)) { alert(`Warning sent to ${memberName}`); } };

  if (!isOpen || !group) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#e0d8cf] p-3 sm:p-4 flex justify-between items-start sm:items-center rounded-t-xl sm:rounded-t-2xl z-10">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#4a3728] truncate">{group.isCreator ? 'Group Management' : 'Group Info'}</h2>
            <p className="text-xs sm:text-sm text-[#6b5847] truncate">{group.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        {group.isCreator ? (
          <>
            <div className="border-b border-[#e0d8cf] bg-[#f6ede8] px-2 sm:px-4 overflow-x-auto">
              <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
                {['overview', 'members', 'settings'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === tab ? 'border-b-4 border-[#8b7355] text-[#4a3728]' : 'text-[#6b5847] hover:text-[#4a3728]'}`}>
                    {tab === 'members' ? `Members (${members.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              {activeTab === 'overview' && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                    {[
                      { label: 'Total Members',    value: members.length },
                      { label: 'Avg Attendance',   value: `${Math.round(members.reduce((acc, m) => acc + m.attendance, 0) / members.length)}%` },
                      { label: 'Total Study Time', value: `${members.reduce((acc, m) => acc + m.studyTime, 0)}h` },
                      { label: 'Violations',       value: members.filter(m => m.violations > 0).length },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-[#f6ede8] rounded-lg p-2 sm:p-3 border border-[#e0d8cf]">
                        <div className="text-xl sm:text-2xl font-bold text-[#4a3728]">{value}</div>
                        <div className="text-[10px] sm:text-xs text-[#6b5847] mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#4a3728] mb-2">Top Performers</h3>
                    <div className="space-y-2">
                      {members.sort((a, b) => b.studyTime - a.studyTime).slice(0, 3).map((member, index) => (
                        <div key={member.id} className="flex items-center gap-2 p-2 bg-[#f6ede8] rounded-lg text-sm">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold bg-[#8b7355] text-white text-xs">{index + 1}</div>
                          <div className="text-base sm:text-lg">{member.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[#4a3728] text-xs sm:text-sm truncate">{member.name}</div>
                            <div className="text-[10px] sm:text-xs text-[#6b5847]">{member.studyTime}h • {member.attendance}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#4a3728] mb-2">Needs Attention</h3>
                    {members.filter(m => m.attendance < 80 || m.violations > 0).length > 0 ? (
                      <div className="space-y-2">
                        {members.filter(m => m.attendance < 80 || m.violations > 0).map((member) => (
                          <div key={member.id} className="flex items-center gap-2 p-2 bg-[#f6ede8] rounded-lg border border-[#e0d8cf] text-sm">
                            <div className="text-base sm:text-lg">{member.avatar}</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[#4a3728] text-xs sm:text-sm truncate">{member.name}</div>
                              <div className="text-[10px] sm:text-xs text-[#6b5847]">
                                {member.attendance < 80 && `${member.attendance}% attendance`}
                                {member.attendance < 80 && member.violations > 0 && ' • '}
                                {member.violations > 0 && `${member.violations} violation(s)`}
                              </div>
                            </div>
                            <button onClick={() => handleWarnMember(member.id, member.name)} className="px-2 py-1 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded text-xs font-semibold flex-shrink-0">Warn</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-3 sm:py-4 text-xs sm:text-sm text-[#6b5847] bg-[#f6ede8] rounded-lg">All members performing well</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'members' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-[#4a3728]">All Members</h3>
                    <div className="text-xs text-[#6b5847]">{members.length} / {group.capacity} members</div>
                  </div>
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    {members.map((member) => (
                      <div key={member.id} className="p-2 sm:p-3 bg-[#f6ede8] rounded-lg hover:bg-[#e0d8cf] transition-all border border-[#e0d8cf]">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="text-xl sm:text-2xl flex-shrink-0">{member.avatar}</div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-[#4a3728] text-xs sm:text-sm truncate">{member.name}</div>
                              <div className="text-[10px] sm:text-xs text-[#6b5847]">Joined {member.joinedDate}</div>
                            </div>
                          </div>
                          <button onClick={() => handleKickMember(member.id, member.name)} className="px-2 py-1 bg-[#6b5847] hover:bg-[#4a3728] text-white rounded text-xs font-semibold flex items-center gap-1 flex-shrink-0 ml-2">
                            <X size={10} className="sm:w-3 sm:h-3" /><span className="hidden xs:inline">Remove</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2 border-t border-[#e0d8cf]">
                          {[['Study Time', `${member.studyTime}h`], ['Attendance', `${member.attendance}%`], ['Streak', `${member.streak} days`], ['Rank', `#${member.rank}`]].map(([l, v]) => (
                            <div key={l}><div className="text-[10px] sm:text-xs text-[#6b5847]">{l}</div><div className="text-xs sm:text-sm font-bold text-[#4a3728]">{v}</div></div>
                          ))}
                        </div>
                        {member.violations > 0 && <div className="mt-2 px-2 py-1 bg-[#8b7355] text-white text-[10px] sm:text-xs rounded inline-block">{member.violations} Violation(s)</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Group Title</label>
                      <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs sm:text-sm">
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4a3728] mb-1">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs sm:text-sm resize-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Daily Goal (hrs)</label>
                      <input type="number" min="1" max="24" value={formData.goalHours} onChange={(e) => setFormData({ ...formData, goalHours: parseInt(e.target.value) || 8 })} className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Capacity</label>
                      <input type="number" min="5" max="100" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 20 })} className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3728] mb-1">Visibility</label>
                      <select value={formData.visibility} onChange={(e) => setFormData({ ...formData, visibility: e.target.value as 'public' | 'private' })} className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs sm:text-sm">
                        <option value="public">Public</option><option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-[#f6ede8] rounded-lg">
                    <div className="flex items-center gap-2"><Camera className="text-[#4a3728]" size={14} /><div className="text-xs sm:text-sm font-semibold text-[#4a3728]">Camera Required</div></div>
                    <button type="button" onClick={() => setFormData({ ...formData, cameraRequired: !formData.cameraRequired })} className={`w-10 h-5 sm:w-11 sm:h-6 rounded-full transition-all ${formData.cameraRequired ? 'bg-[#8b7355]' : 'bg-gray-300'}`}>
                      <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full transition-all ${formData.cameraRequired ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="pt-2 border-t border-[#e0d8cf] space-y-2">
                    <button onClick={handleSave} className="w-full px-4 py-2 sm:py-2.5 bg-linear-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <CheckCircle size={14} className="sm:w-4 sm:h-4" /> Save Changes
                    </button>
                    <button onClick={handleDelete} className="w-full px-4 py-2 sm:py-2.5 bg-[#6b5847] hover:bg-[#4a3728] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <Trash2 size={14} className="sm:w-4 sm:h-4" /> Delete Group
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="bg-[#f6ede8] rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-[#4a3728] mb-2 sm:mb-3 text-sm sm:text-base">Group Information</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                {[['Category', group.category], ['Daily Goal', `${group.goalHours} hours`], ['Capacity', `${group.members}/${group.capacity}`], ['Visibility', group.visibility], ['Camera', group.cameraRequired ? 'Required' : 'Optional'], ['Joined', group.joinedDate]].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-2"><span className="text-[#6b5847]">{l}:</span><span className="font-semibold text-[#4a3728] text-right">{v}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-[#f6ede8] rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-[#4a3728] mb-2 sm:mb-3 text-sm sm:text-base">Your Stats</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                {[['Study Time', `${group.studyTime} hours`], ['Attendance', `${group.attendance}%`], ['Streak', `${group.streak} days`], ['Rank', `#${group.rank}`]].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-2"><span className="text-[#6b5847]">{l}:</span><span className="font-semibold text-[#4a3728]">{v}</span></div>
                ))}
              </div>
            </div>
            <button onClick={handleLeave} className="w-full px-4 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" /> Leave Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── GroupCard (100% unchanged) ───────────────────────────────
interface GroupCardProps {
  group: Group;
  onSettingsClick: (group: Group) => void;
  onOpenClick: (groupId: number) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onSettingsClick, onOpenClick }) => (
  <div onClick={() => onOpenClick(group.id)} className="bg-white rounded-lg sm:rounded-xl border-2 border-[#e0d8cf] hover:border-[#8b7355] hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer">
    <div className="p-3 sm:p-4 bg-[#f6ede8] border-b border-[#e0d8cf]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-[#4a3728] break-words">{group.title}</h3>
            {group.isCreator && (
              <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-[#8b7355] rounded-full flex-shrink-0">
                <Crown size={10} className="sm:w-3 sm:h-3 text-white" />
                <span className="text-[10px] sm:text-xs font-bold text-white">Creator</span>
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#6b5847] line-clamp-2">{group.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded-md text-[10px] sm:text-xs font-semibold text-[#4a3728]">{group.category}</span>
        {group.visibility === 'public' ? (
          <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded-md"><Globe size={10} className="sm:w-3 sm:h-3 text-[#4a3728]" /><span className="text-[10px] sm:text-xs font-semibold text-[#4a3728]">Public</span></div>
        ) : (
          <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded-md"><Lock size={10} className="sm:w-3 sm:h-3 text-[#4a3728]" /><span className="text-[10px] sm:text-xs font-semibold text-[#4a3728]">Private</span></div>
        )}
        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded-md">
          {group.cameraRequired ? <Camera size={10} className="sm:w-3 sm:h-3 text-[#4a3728]" /> : <CameraOff size={10} className="sm:w-3 sm:h-3 text-[#4a3728]" />}
          <span className="text-[10px] sm:text-xs font-semibold text-[#4a3728]">Camera {group.cameraRequired ? 'On' : 'Off'}</span>
        </div>
      </div>
    </div>
    <div className="p-3 sm:p-4 grid grid-cols-4 gap-2 sm:gap-3 border-b border-[#e0d8cf]">
      {[{ Icon: Users, v: group.members, l: 'Members' }, { Icon: Target, v: `${group.goalHours}h`, l: 'Daily Goal' }, { Icon: TrendingUp, v: group.streak, l: 'Streak' }, { Icon: Award, v: `#${group.rank}`, l: 'Rank' }].map(({ Icon, v, l }) => (
        <div key={l} className="text-center">
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1"><Icon size={12} className="sm:w-[14px] sm:h-[14px] text-[#8b7355]" /><span className="text-base sm:text-lg font-bold text-[#4a3728]">{v}</span></div>
          <span className="text-[10px] sm:text-xs text-[#6b5847]">{l}</span>
        </div>
      ))}
    </div>
    <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-2 border-b border-[#e0d8cf]">
      {[{ l: 'Study Time', v: `${group.studyTime}h`, p: Math.min((group.studyTime / (group.goalHours * 30)) * 100, 100) }, { l: 'Attendance', v: `${group.attendance}%`, p: group.attendance }].map(({ l, v, p }) => (
        <div key={l}>
          <div className="flex justify-between items-center mb-1"><span className="text-[10px] sm:text-xs font-semibold text-[#4a3728]">{l}</span><span className="text-[10px] sm:text-xs font-bold text-[#8b7355]">{v}</span></div>
          <div className="w-full bg-[#e0d8cf] rounded-full h-1.5 sm:h-2"><div className="bg-[#8b7355] h-1.5 sm:h-2 rounded-full transition-all" style={{ width: `${p}%` }} /></div>
        </div>
      ))}
    </div>
    <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
      <div className="text-[10px] sm:text-xs text-[#6b5847] flex items-center gap-1"><Clock size={10} className="sm:w-3 sm:h-3 inline flex-shrink-0" /><span className="truncate">Active {group.lastActive}</span></div>
      <button onClick={(e) => { e.stopPropagation(); onSettingsClick(group); }} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#f6ede8] hover:bg-[#e0d8cf] text-[#4a3728] rounded-lg text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1">
        <Settings size={12} className="sm:w-[14px] sm:h-[14px]" /><span className="hidden xs:inline">{group.isCreator ? 'Manage' : 'Info'}</span>
      </button>
    </div>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────
export default function MyGroups() {
  const router = useRouter();

  // ✅ CHANGED: was const [groups, setGroups] = useState<Group[]>([...mockData])
  // Now groups come from Redux — persists across navigation
  const dispatch = useAppDispatch();
  const groups = useAppSelector(state => state.groups.items) as Group[];

  // ✅ UNCHANGED: these stay as useState — pure UI state
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [settingsGroup, setSettingsGroup] = useState<Group | null>(null);

  // ✅ CHANGED: was setGroups(groups.map(...))
  // Now dispatches to Redux
  const handleUpdateGroup = (groupId: number, updatedData: Partial<Group>): void => {
    dispatch(updateGroup({ id: groupId, data: updatedData }));
  };

  // ✅ CHANGED: was setGroups(groups.filter(...))
  const handleDeleteGroup = (groupId: number): void => {
    dispatch(deleteGroup(groupId));
  };

  // ✅ CHANGED: was setGroups(groups.filter(...))
  const handleLeaveGroup = (groupId: number): void => {
    dispatch(leaveGroup(groupId));
  };

  // ✅ UNCHANGED
  const handleOpenGroup = (groupId: number): void => {
    router.push(`/study/my-groups/${groupId}`);
  };

  // ✅ UNCHANGED — filtering still happens in the component
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" ||
                      (activeTab === "created" && group.isCreator) ||
                      (activeTab === "joined" && !group.isCreator);
    return matchesSearch && matchesTab;
  });

  // ✅ UNCHANGED — stats computed from Redux state
  const stats = {
    totalGroups: groups.length,
    createdGroups: groups.filter(g => g.isCreator).length,
    joinedGroups: groups.filter(g => !g.isCreator).length,
    totalStudyHours: groups.reduce((acc, g) => acc + g.studyTime, 0),
    avgAttendance: groups.length > 0 ? Math.round(groups.reduce((acc, g) => acc + g.attendance, 0) / groups.length) : 0
  };

  return (
    <div className="min-h-screen w-full p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4a3728] mb-1 sm:mb-2">My Study Groups</h1>
          <p className="text-sm sm:text-base text-[#6b5847]">Manage and track your study groups</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          {[
            { Icon: Users,    v: stats.totalGroups,          l: 'Total Groups',   extra: '' },
            { Icon: Crown,    v: stats.createdGroups,        l: 'Created',        extra: '' },
            { Icon: UserPlus, v: stats.joinedGroups,         l: 'Joined',         extra: '' },
            { Icon: Clock,    v: `${stats.totalStudyHours}h`, l: 'Study Hours',   extra: '' },
            { Icon: Award,    v: `${stats.avgAttendance}%`,  l: 'Avg Attendance', extra: 'col-span-2 sm:col-span-1' },
          ].map(({ Icon, v, l, extra }) => (
            <div key={l} className={`bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border-2 border-[#e0d8cf] hover:border-[#8b7355] transition-all ${extra}`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8b7355] rounded-lg flex items-center justify-center flex-shrink-0"><Icon className="text-white" size={16} /></div>
                <div className="min-w-0"><div className="text-xl sm:text-2xl font-bold text-[#4a3728]">{v}</div><div className="text-[10px] sm:text-xs text-[#6b5847] truncate">{l}</div></div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border-2 border-[#e0d8cf]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto">
              <button onClick={() => setActiveTab("all")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === "all" ? "bg-linear-to-r from-[#8b7355] to-[#6b5847] text-white shadow-md" : "bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]"}`}>
                All Groups ({stats.totalGroups})
              </button>
              <button onClick={() => setActiveTab("created")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-1 whitespace-nowrap ${activeTab === "created" ? "bg-linear-to-r from-[#8b7355] to-[#6b5847] text-white shadow-md" : "bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]"}`}>
                <Crown size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Created ({stats.createdGroups})</span>
                <span className="xs:hidden">({stats.createdGroups})</span>
              </button>
              <button onClick={() => setActiveTab("joined")} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-1 whitespace-nowrap ${activeTab === "joined" ? "bg-linear-to-r from-[#8b7355] to-[#6b5847] text-white shadow-md" : "bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]"}`}>
                <UserPlus size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Joined ({stats.joinedGroups})</span>
                <span className="xs:hidden">({stats.joinedGroups})</span>
              </button>
            </div>
            <div className="flex-1 relative">
              <input type="text" placeholder="Search groups..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-1.5 sm:py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-xs sm:text-sm" />
              <Search className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#6b5847] pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} onSettingsClick={setSettingsGroup} onOpenClick={handleOpenGroup} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg sm:rounded-xl p-8 sm:p-12 text-center border-2 border-[#e0d8cf]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f6ede8] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"><Users size={32} className="sm:w-10 sm:h-10 text-[#8b7355]" /></div>
            <h3 className="text-lg sm:text-xl font-bold text-[#4a3728] mb-2">No groups found</h3>
            <p className="text-sm sm:text-base text-[#6b5847] mb-3 sm:mb-4">
              {searchQuery ? "Try adjusting your search query" : activeTab === "created" ? "You haven't created any groups yet" : "You haven't joined any groups yet"}
            </p>
            <button className="px-4 sm:px-6 py-2 bg-linear-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl text-sm sm:text-base">Browse Groups</button>
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
    </div>
  );
}