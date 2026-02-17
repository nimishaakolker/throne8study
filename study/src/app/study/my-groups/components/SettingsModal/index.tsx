'use client';

import { useState } from 'react';
import { X, LogOut } from 'lucide-react';
import type { Group, Member, SettingsTabType } from '@/lib/types';
import { OverviewTab } from './OverviewTab';
import { MembersTab }  from './MembersTab';
import { SettingsTab } from './SettingsTab';

// Mock members — in production this comes from API based on group.id
const MOCK_MEMBERS: Member[] = [
  { id: 1, name: 'Priya Sharma',  avatar: '👩‍🎓', joinedDate: '2024-01-10', studyTime: 145, attendance: 95, streak: 15, rank: 1, violations: 0, lastActive: '2 hours ago' },
  { id: 2, name: 'Rahul Kumar',   avatar: '👨‍💻', joinedDate: '2024-01-12', studyTime: 98,  attendance: 78, streak: 8,  rank: 4, violations: 2, lastActive: '1 day ago'   },
  { id: 3, name: 'Ananya Gupta',  avatar: '👩‍💼', joinedDate: '2024-01-08', studyTime: 167, attendance: 92, streak: 20, rank: 2, violations: 0, lastActive: '30 mins ago' },
  { id: 4, name: 'Vikram Singh',  avatar: '👨‍🔬', joinedDate: '2024-01-15', studyTime: 72,  attendance: 65, streak: 5,  rank: 6, violations: 3, lastActive: '3 days ago'  },
];

const TABS: { id: SettingsTabType; label: string }[] = [
  { id: 'overview', label: 'Overview'  },
  { id: 'members',  label: 'Members'   },
  { id: 'settings', label: 'Settings'  },
];

interface SettingsModalProps {
  isOpen:   boolean;
  group:    Group | null;
  onClose:  () => void;
  onUpdate: (id: number, data: Partial<Group>) => void;
  onDelete: (id: number) => void;
  onLeave:  (id: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, group, onClose, onUpdate, onDelete, onLeave,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTabType>('overview');
  const [members, setMembers]     = useState<Member[]>(MOCK_MEMBERS);

  if (!isOpen || !group) return null;

  const handleWarn = (id: number, name: string) => alert(`Warning sent to ${name}`);
  const handleKick = (id: number, name: string) => {
    if (confirm(`Remove ${name} from group?`)) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };
  const handleDelete = () => {
    if (confirm('Delete this group? This cannot be undone.')) {
      onDelete(group.id);
      onClose();
    }
  };
  const handleLeave = () => {
    if (confirm('Leave this group?')) {
      onLeave(group.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e0d8cf] p-3 sm:p-4 flex justify-between items-start sm:items-center rounded-t-xl sm:rounded-t-2xl z-10">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#4a3728] truncate">
              {group.isCreator ? 'Group Management' : 'Group Info'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6b5847] truncate">{group.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1">
            <X size={20} />
          </button>
        </div>

        {/* Creator View */}
        {group.isCreator ? (
          <>
            {/* Tabs */}
            <div className="border-b border-[#e0d8cf] bg-[#f6ede8] px-2 sm:px-4 overflow-x-auto">
              <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-4 border-[#8b7355] text-[#4a3728]'
                        : 'text-[#6b5847] hover:text-[#4a3728]'
                    }`}
                  >
                    {tab.id === 'members' ? `Members (${members.length})` : tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              {activeTab === 'overview' && (
                <OverviewTab members={members} capacity={group.capacity} onWarnMember={handleWarn} />
              )}
              {activeTab === 'members' && (
                <MembersTab members={members} capacity={group.capacity} onKickMember={handleKick} />
              )}
              {activeTab === 'settings' && (
                <SettingsTab
                  group={group}
                  onSave={data => { onUpdate(group.id, data); onClose(); }}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </>
        ) : (
          // Member (non-creator) view
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="bg-[#f6ede8] rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-[#4a3728] mb-2 sm:mb-3 text-sm sm:text-base">Group Information</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: 'Category',   value: group.category                         },
                  { label: 'Daily Goal', value: `${group.goalHours} hours`             },
                  { label: 'Capacity',   value: `${group.members}/${group.capacity}`   },
                  { label: 'Visibility', value: group.visibility                       },
                  { label: 'Camera',     value: group.cameraRequired ? 'Required' : 'Optional' },
                  { label: 'Joined',     value: group.joinedDate                       },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-[#6b5847]">{label}:</span>
                    <span className="font-semibold text-[#4a3728] text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f6ede8] rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-[#4a3728] mb-2 sm:mb-3 text-sm sm:text-base">Your Stats</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: 'Study Time', value: `${group.studyTime} hours` },
                  { label: 'Attendance', value: `${group.attendance}%`     },
                  { label: 'Streak',     value: `${group.streak} days`     },
                  { label: 'Rank',       value: `#${group.rank}`           },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-[#6b5847]">{label}:</span>
                    <span className="font-semibold text-[#4a3728]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleLeave}
              className="w-full px-4 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <LogOut size={16} /> Leave Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};