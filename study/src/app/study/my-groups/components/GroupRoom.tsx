'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  LogOut,
  MessageCircle,
  UserPlus,
  Crown,
  Clock,
  Target,
  Award,
  TrendingUp,
  MoreVertical,
  X,
  Send,
  Smile,
  Paperclip,
  Phone,
  PhoneOff,
  Monitor,
  MonitorOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  Info,
  Play,
  Pause,
  Menu,
  Bell,
  Zap,
  Megaphone
} from "lucide-react";

// Types
interface Member {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  isSpeaking: boolean;
  studyTime: number;
  rank: number;
  videoEnabled: boolean;
  audioEnabled: boolean;
}

interface Message {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

interface GroupData {
  id: number;
  title: string;
  description: string;
  category: string;
  members: number;
  capacity: number;
  goalHours: number;
  cameraRequired: boolean;
  isCreator: boolean;
  currentStreak: number;
}

interface GroupRoomProps {
  groupId: number;
}

const GroupRoom: React.FC<GroupRoomProps> = ({ groupId }) => {
  const router = useRouter();
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [studyTime, setStudyTime] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState<boolean>(false);
  const [showChallengeModal, setShowChallengeModal] = useState<boolean>(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState<boolean>(false);

  // Mock group data - In production, fetch this based on groupId
  const [groupData, setGroupData] = useState<GroupData>({
    id: groupId,
    title: "Focus JEE Warriors",
    description: "Daily 6AM-8AM study sessions for serious JEE aspirants",
    category: "JEE Aspirant",
    members: 12,
    capacity: 50,
    goalHours: 8,
    cameraRequired: true,
    isCreator: true,
    currentStreak: 15
  });

  // Mock members data
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "👩‍🎓",
      isOnline: true,
      isSpeaking: false,
      studyTime: 8700, // in seconds (145 minutes)
      rank: 1,
      videoEnabled: true,
      audioEnabled: true
    },
    {
      id: 2,
      name: "Rahul Kumar",
      avatar: "👨‍💻",
      isOnline: true,
      isSpeaking: true,
      studyTime: 5880, // in seconds (98 minutes)
      rank: 4,
      videoEnabled: true,
      audioEnabled: false
    },
    {
      id: 3,
      name: "Ananya Gupta",
      avatar: "👩‍💼",
      isOnline: true,
      isSpeaking: false,
      studyTime: 10020, // in seconds (167 minutes)
      rank: 2,
      videoEnabled: false,
      audioEnabled: true
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "👨‍🔬",
      isOnline: false,
      isSpeaking: false,
      studyTime: 4320, // in seconds (72 minutes)
      rank: 6,
      videoEnabled: false,
      audioEnabled: false
    }
  ]);

  // Mock chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Priya Sharma",
      avatar: "👩‍🎓",
      message: "Good morning everyone! Let's crush today's study session 💪",
      timestamp: "9:00 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      avatar: "👤",
      message: "Good morning! Ready to focus!",
      timestamp: "9:02 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Rahul Kumar",
      avatar: "👨‍💻",
      message: "Can someone help me with organic chemistry later?",
      timestamp: "9:05 AM",
      isOwn: false
    }
  ]);

  // Timer effect - only runs when session is active
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isSessionActive) {
      timer = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSessionActive]);

  // Format time in HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (): void => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        avatar: "👤",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleLeaveRoom = (): void => {
    if (window.confirm('Are you sure you want to leave this study session?')) {
      router.push('/study/my-groups');
    }
  };

  const handleToggleSession = (): void => {
    setIsSessionActive(!isSessionActive);
  };

  const handleSendNotification = (): void => {
    // In production, this would call an API to send notifications
    alert('Study reminder sent to all inactive members! 📚');
    setShowNotificationPopup(false);
  };

  const handleCreateChallenge = (): void => {
    // In production, this would open a challenge creation modal
    setShowChallengeModal(true);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] flex flex-col z-50">
      {/* Header - Responsive */}
      <div className="px-2 sm:px-4 py-3 sm:py-3 shrink-0 lg:backdrop-blur-md lg:bg-white/40 lg:border-b lg:border-[#d4c4b5] lg:shadow-md">
        {/* Mobile Header - Clean with Glassmorphism */}
        <div className="lg:hidden">
          {/* Top Row - Group name with announcement icon */}
          <div className="flex items-center gap-2 mb-3">
            <div className="min-w-0 flex-1 bg-white/70 backdrop-blur-md rounded-full px-4 py-2.5 shadow-lg border border-white/40 flex items-center justify-between">
              <h1 className="text-sm font-bold text-[#4a3728] truncate leading-tight flex-1">
                {groupData.title}
              </h1>
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="ml-2 p-1.5 bg-amber-100/80 backdrop-blur-sm hover:bg-amber-200/80 rounded-full transition-all shrink-0"
                title="Group announcements"
              >
                <Megaphone size={16} className="text-amber-600" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/40 shrink-0">
              <Users size={16} className="text-[#4a3728]" />
              <span className="text-sm font-bold text-[#4a3728]">
                {members.filter(m => m.isOnline).length}
              </span>
            </div>
          </div>

          {/* Timer & Actions Row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Big Timer Display */}
            <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/40">
              <div className="flex items-center justify-center gap-2">
                <div className={`text-2xl font-bold tabular-nums ${isSessionActive ? 'text-green-600' : 'text-[#4a3728]'}`}>
                  {formatTime(studyTime)}
                </div>
                {isSessionActive && (
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-semibold text-green-600 uppercase tracking-wide">Live</span>
                  </div>
                )}
              </div>
            </div>

            {/* Session Control */}
            <button
              onClick={handleToggleSession}
              className={`px-4 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 text-sm shadow-lg ${
                isSessionActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              }`}
            >
              {isSessionActive ? (
                <>
                  <Pause size={16} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start
                </>
              )}
            </button>

            {/* Leave Button */}
            <button
              onClick={handleLeaveRoom}
              className="p-3 bg-white/70 backdrop-blur-md hover:bg-red-50/70 rounded-2xl transition-all shadow-lg border border-white/40"
            >
              <LogOut size={18} className="text-red-500" />
            </button>
          </div>

          {/* Go to Chat Room Button - Mobile/Tablet */}
          <button
            onClick={() => router.push(`/study/my-groups/${groupId}/chat`)}
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-md hover:bg-[#8b7355]/10 text-[#8b7355] rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 text-sm shadow-lg border border-white/40"
          >
            <MessageCircle size={16} />
            Go to Chat Room
          </button>
        </div>

        {/* Desktop Header - Professional & Elegant */}
        <div className="hidden lg:flex items-center justify-between gap-6 px-6 py-4">
          {/* Left Section - Group Identity */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push('/study/my-groups')}
              className="text-[#6b5847] hover:text-[#4a3728] transition-all text-sm font-medium flex items-center gap-1.5"
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </button>

            <div className="h-10 w-px bg-[#d4c4b5]"></div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl xl:text-2xl font-bold text-[#4a3728] tracking-tight">
                  {groupData.title}
                </h1>
                {groupData.isCreator && (
                  <span className="px-3 py-1 bg-[#8b7355] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Host
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6b5847] mt-0.5">{groupData.category}</p>
            </div>
          </div>

          {/* Center Section - Live Stats */}
          <div className="flex items-center gap-8">
            {/* Session Timer */}
            <div className="text-center">
              <div className="text-xs font-semibold text-[#6b5847] uppercase tracking-wider mb-1">Session Time</div>
              <div className={`text-2xl xl:text-3xl font-bold tabular-nums tracking-tight ${
                isSessionActive ? 'text-green-600' : 'text-[#4a3728]'
              }`}>
                {formatTime(studyTime)}
              </div>
            </div>

            <div className="h-12 w-px bg-[#d4c4b5]"></div>

            {/* Online Members */}
            <div className="text-center">
              <div className="text-xs font-semibold text-[#6b5847] uppercase tracking-wider mb-1">Active Now</div>
              <div className="text-2xl xl:text-3xl font-bold text-[#4a3728] tabular-nums">
                {members.filter(m => m.isOnline).length}
                <span className="text-lg text-[#6b5847] ml-1">/ {groupData.members}</span>
              </div>
            </div>

            <div className="h-12 w-px bg-[#d4c4b5]"></div>

            {/* Streak */}
            <div className="text-center">
              <div className="text-xs font-semibold text-[#6b5847] uppercase tracking-wider mb-1">Day Streak</div>
              <div className="text-2xl xl:text-3xl font-bold text-[#8b7355] tabular-nums">
                {groupData.currentStreak}
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAnnouncementModal(true)}
              className="px-4 py-2 bg-white/60 hover:bg-white/80 text-[#6b5847] hover:text-[#4a3728] rounded-lg transition-all text-sm font-medium backdrop-blur-sm border border-[#d4c4b5]"
            >
              Announcements
            </button>

            <button
              onClick={() => router.push(`/study/my-groups/${groupId}/chat`)}
              className="px-5 py-2.5 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded-lg transition-all text-sm font-bold shadow-sm"
            >
              Chat Room
            </button>

            <button
              onClick={handleToggleSession}
              className={`px-5 py-2.5 rounded-lg font-bold transition-all text-sm shadow-sm ${
                isSessionActive
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSessionActive ? 'Pause Session' : 'Start Session'}
            </button>
            
            <button
              onClick={handleLeaveRoom}
              className="px-4 py-2 text-[#6b5847] hover:text-red-600 transition-all text-sm font-medium"
            >
              Leave
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Video Grid - Scrollable */}
        <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Mobile View - Avatar/Video Cards with Study Time */}
          <div className="lg:hidden grid grid-cols-2 gap-2 max-w-2xl mx-auto">
            {/* Self Card */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-lg border-2 border-[#8b7355]/50">
              <div className="flex flex-col items-center">
                {isCameraOn ? (
                  <div className="w-full aspect-square bg-gradient-to-br from-[#8b7355] to-[#6b5847] rounded-lg mb-2 flex items-center justify-center">
                    <div className="text-5xl">📹</div>
                  </div>
                ) : (
                  <div className="text-5xl mb-2">👤</div>
                )}
                <div className="font-bold text-[#4a3728] text-sm mb-1">You</div>
                <div className="text-base font-bold text-[#4a3728] mb-2 tabular-nums">
                  {formatTime(studyTime)}
                </div>
                <div className="flex gap-1">
                  {isMicOn ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Mic size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <MicOff size={12} className="text-white" />
                    </div>
                  )}
                  {isCameraOn ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Video size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <VideoOff size={12} className="text-white" />
                    </div>
                  )}
                </div>
                {isSessionActive && (
                  <div className="mt-2 px-2 py-0.5 bg-green-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    ACTIVE
                  </div>
                )}
              </div>
            </div>

            {/* Other Members Cards */}
            {members.filter(m => m.isOnline).map((member) => (
              <div
                key={member.id}
                className={`bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-lg border-2 ${
                  member.isSpeaking ? 'border-green-500' : 'border-white/40'
                }`}
              >
                <div className="flex flex-col items-center">
                  {member.videoEnabled ? (
                    <div className="w-full aspect-square bg-gradient-to-br from-[#4a3728] to-[#6b5847] rounded-lg mb-2 flex items-center justify-center relative">
                      <div className="text-4xl">{member.avatar}</div>
                      <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="text-5xl mb-2">{member.avatar}</div>
                      <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                  <div className="font-bold text-[#4a3728] text-sm mb-1 text-center truncate w-full">
                    {member.name.split(' ')[0]}
                  </div>
                  <div className="text-base font-bold text-[#4a3728] mb-1 tabular-nums">
                    {formatTime(member.studyTime)}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Award size={12} className="text-amber-500" />
                    <span className="text-xs font-semibold text-[#6b5847]">
                      Rank #{member.rank}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {member.audioEnabled ? (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        member.isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-green-500'
                      }`}>
                        <Mic size={12} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <MicOff size={12} className="text-white" />
                      </div>
                    )}
                    {member.videoEnabled ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Video size={12} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <VideoOff size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Video Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Self Video */}
            <div className="relative aspect-video bg-gradient-to-br from-[#8b7355] to-[#6b5847] rounded-xl overflow-hidden border-4 border-[#8b7355] shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                {isCameraOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#8b7355] to-[#6b5847] flex items-center justify-center">
                    <div className="text-6xl">📹</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">👤</div>
                    <div className="text-white font-semibold">Camera Off</div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold text-sm">You</span>
                    <div className="flex items-center gap-1 text-xs text-white/80 tabular-nums">
                      <Clock size={10} />
                      {formatTime(studyTime)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {isMicOn ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Mic size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <MicOff size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 rounded-full text-xs font-bold text-white">
                LIVE
              </div>
              {isSessionActive && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  ACTIVE
                </div>
              )}
            </div>

            {/* Other Members */}
            {members.filter(m => m.isOnline).map((member) => (
              <div
                key={member.id}
                className={`relative aspect-video bg-gradient-to-br from-[#4a3728] to-[#6b5847] rounded-xl overflow-hidden shadow-lg ${
                  member.isSpeaking ? 'ring-4 ring-green-500' : 'border-2 border-[#e0d8cf]'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {member.videoEnabled ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#4a3728] to-[#6b5847] flex items-center justify-center">
                      <div className="text-6xl">{member.avatar}</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-2">{member.avatar}</div>
                      <div className="text-white font-semibold text-sm">{member.name}</div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-semibold text-sm truncate">{member.name}</span>
                      <div className="flex items-center gap-2 text-xs text-white/80">
                        <div className="flex items-center gap-1 tabular-nums">
                          <Clock size={10} />
                          {formatTime(member.studyTime)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={10} />
                          #{member.rank}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {member.audioEnabled ? (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          member.isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-green-500'
                        }`}>
                          <Mic size={14} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <MicOff size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-[#8b7355] rounded-full text-xs font-bold text-white">
                  #{member.rank}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Chat & Members (Desktop & Tablet) */}
        {(showChat || showMembers) && (
          <div className="hidden md:flex w-64 lg:w-80 bg-white/80 backdrop-blur-md border-l-2 border-[#e0d8cf] flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#e0d8cf] shrink-0">
              <button
                onClick={() => { setShowChat(true); setShowMembers(false); }}
                className={`flex-1 px-3 lg:px-4 py-2.5 lg:py-3 font-semibold text-xs lg:text-sm transition-all ${
                  showChat && !showMembers
                    ? 'bg-[#f6ede8] text-[#4a3728] border-b-4 border-[#8b7355]'
                    : 'text-[#6b5847] hover:bg-[#f6ede8]'
                }`}
              >
                <MessageCircle size={14} className="inline mr-1.5 lg:mr-2" />
                Chat
              </button>
              <button
                onClick={() => { setShowMembers(true); setShowChat(false); }}
                className={`flex-1 px-3 lg:px-4 py-2.5 lg:py-3 font-semibold text-xs lg:text-sm transition-all ${
                  showMembers && !showChat
                    ? 'bg-[#f6ede8] text-[#4a3728] border-b-4 border-[#8b7355]'
                    : 'text-[#6b5847] hover:bg-[#f6ede8]'
                }`}
              >
                <Users size={14} className="inline mr-1.5 lg:mr-2" />
                Members ({members.filter(m => m.isOnline).length})
              </button>
            </div>

            {/* Chat View */}
            {showChat && !showMembers && (
              <>
                <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2 lg:space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="text-xl lg:text-2xl shrink-0">{msg.avatar}</div>
                      <div className={`flex-1 ${msg.isOwn ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-1.5 lg:gap-2 mb-1">
                          <span className={`text-xs font-semibold text-[#4a3728] ${msg.isOwn ? 'order-2' : ''}`}>
                            {msg.sender}
                          </span>
                          <span className="text-xs text-[#6b5847]">{msg.timestamp}</span>
                        </div>
                        <div
                          className={`inline-block px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm ${
                            msg.isOwn
                              ? 'bg-[#8b7355] text-white rounded-tr-none'
                              : 'bg-[#f6ede8] text-[#4a3728] rounded-tl-none'
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 lg:p-4 border-t border-[#e0d8cf] shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-2.5 lg:px-3 py-1.5 lg:py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-xs lg:text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-3 lg:px-4 py-1.5 lg:py-2 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded-lg transition-all"
                    >
                      <Send size={16} className="lg:w-4.5 lg:h-4.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Members View */}
            {showMembers && !showChat && (
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className={`p-2.5 lg:p-3 rounded-lg transition-all ${
                      member.isOnline
                        ? 'bg-[#f6ede8] hover:bg-[#e0d8cf]'
                        : 'bg-gray-100 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 lg:gap-3">
                      <div className="relative">
                        <div className="text-2xl lg:text-3xl">{member.avatar}</div>
                        {member.isOnline && (
                          <div className="absolute bottom-0 right-0 w-2.5 lg:w-3 h-2.5 lg:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#4a3728] text-xs lg:text-sm truncate">{member.name}</div>
                        <div className="text-xs text-[#6b5847] tabular-nums">
                          {formatTime(member.studyTime)} • Rank #{member.rank}
                        </div>
                      </div>
                      {member.isOnline && (
                        <div className="flex gap-1 shrink-0">
                          {member.videoEnabled && (
                            <div className="w-5 lg:w-6 h-5 lg:h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Video size={10} className="text-white lg:w-3 lg:h-3" />
                            </div>
                          )}
                          {member.audioEnabled && (
                            <div className={`w-5 lg:w-6 h-5 lg:h-6 rounded-full flex items-center justify-center ${
                              member.isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-green-500'
                            }`}>
                              <Mic size={10} className="text-white lg:w-3 lg:h-3" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Chat/Members Overlay */}
      {(showChat || showMembers) && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => { setShowChat(false); setShowMembers(false); }}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-2xl max-h-[70vh] flex flex-col border-t-2 border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tabs */}
            <div className="flex border-b border-[#e0d8cf] shrink-0">
              <button
                onClick={() => { setShowChat(true); setShowMembers(false); }}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-all ${
                  showChat && !showMembers
                    ? 'bg-[#f6ede8] text-[#4a3728] border-b-4 border-[#8b7355]'
                    : 'text-[#6b5847]'
                }`}
              >
                <MessageCircle size={16} className="inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => { setShowMembers(true); setShowChat(false); }}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-all ${
                  showMembers && !showChat
                    ? 'bg-[#f6ede8] text-[#4a3728] border-b-4 border-[#8b7355]'
                    : 'text-[#6b5847]'
                }`}
              >
                <Users size={16} className="inline mr-2" />
                Members ({members.filter(m => m.isOnline).length})
              </button>
              <button
                onClick={() => { setShowChat(false); setShowMembers(false); }}
                className="p-3 text-[#6b5847]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat View */}
            {showChat && !showMembers && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="text-2xl shrink-0">{msg.avatar}</div>
                      <div className={`flex-1 ${msg.isOwn ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold text-[#4a3728] ${msg.isOwn ? 'order-2' : ''}`}>
                            {msg.sender}
                          </span>
                          <span className="text-xs text-[#6b5847]">{msg.timestamp}</span>
                        </div>
                        <div
                          className={`inline-block px-3 py-2 rounded-lg text-sm ${
                            msg.isOwn
                              ? 'bg-[#8b7355] text-white rounded-tr-none'
                              : 'bg-[#f6ede8] text-[#4a3728] rounded-tl-none'
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-[#e0d8cf] shrink-0 bg-white/90 backdrop-blur-md">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded-lg transition-all"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Members View */}
            {showMembers && !showChat && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className={`p-3 rounded-lg transition-all ${
                      member.isOnline
                        ? 'bg-[#f6ede8]'
                        : 'bg-gray-100 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="text-3xl">{member.avatar}</div>
                        {member.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#4a3728] text-sm">{member.name}</div>
                        <div className="text-xs text-[#6b5847] tabular-nums">
                          {formatTime(member.studyTime)} • Rank #{member.rank}
                        </div>
                      </div>
                      {member.isOnline && (
                        <div className="flex gap-1">
                          {member.videoEnabled && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Video size={12} className="text-white" />
                            </div>
                          )}
                          {member.audioEnabled && (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              member.isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-green-500'
                            }`}>
                              <Mic size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Controls - Fixed, Responsive with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/40 border-t border-[#d4c4b5] shadow-lg px-3 sm:px-4 md:px-6 py-3 sm:py-4 shrink-0 safe-area-bottom">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isMicOn
                ? 'bg-[#8b7355] hover:bg-[#6b5847] text-white'
                : 'bg-[#4a3728] hover:bg-[#4a3728] text-white'
            }`}
            title={isMicOn ? "Mute" : "Unmute"}
          >
            {isMicOn ? <Mic size={20} className="sm:w-6 sm:h-6" /> : <MicOff size={20} className="sm:w-6 sm:h-6" />}
          </button>

          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isCameraOn
                ? 'bg-[#8b7355] hover:bg-[#6b5847] text-white'
                : 'bg-[#4a3728] hover:bg-[#4a3728] text-white'
            }`}
            title={isCameraOn ? "Turn off camera" : "Turn on camera"}
          >
            {isCameraOn ? <Video size={20} className="sm:w-6 sm:h-6" /> : <VideoOff size={20} className="sm:w-6 sm:h-6" />}
          </button>

          {/* Notify Button - All devices */}
          <button
            onClick={() => setShowNotificationPopup(!showNotificationPopup)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg bg-[#4a3728] text-white relative"
            title="Notify inactive members"
          >
            <Bell size={20} className="sm:w-6 sm:h-6" />
            {groupData.members - members.filter(m => m.isOnline).length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">
                  {groupData.members - members.filter(m => m.isOnline).length}
                </span>
              </div>
            )}
          </button>

          {/* Challenge Button - All devices */}
          <button
            onClick={handleCreateChallenge}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg bg-[#4a3728] text-white"
            title="Start group challenge"
          >
            <Zap size={20} className="sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => {
              setShowChat(!showChat);
              if (showMembers && !showChat) {
                setShowMembers(false);
              }
            }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              showChat  
                  ? 'bg-[#8b7355] hover:bg-[#6b5847] text-white'
                : 'bg-[#4a3728] hover:bg-[#4a3728] text-white'
            }`}
            title="Toggle chat"
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => {
              setShowMembers(!showMembers);
              if (showChat && !showMembers) {
                setShowChat(false);
              }
            }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              showMembers
                ? 'bg-[#8b7355] hover:bg-[#6b5847] text-white'
                : 'bg-[#4a3728] hover:bg-[#4a3728] text-white'
            }`}
            title="Toggle members"
          >
            <Users size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Notification Popup */}
      {showNotificationPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNotificationPopup(false)}>
          <div 
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#f6ede8] rounded-full flex items-center justify-center">
                <Bell size={24} className="text-[#8b7355]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4a3728]">Send Study Reminder</h3>
                <p className="text-xs text-[#6b5847]">Motivate inactive members</p>
              </div>
            </div>

            <div className="bg-[#f6ede8] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#4a3728] mb-2">
                <span className="font-semibold">Message to send:</span>
              </p>
              <p className="text-sm text-[#6b5847] italic">
                "Hey study buddy! 📚 Your group is in session right now. Join us and let's crush our goals together! 💪"
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6b5847] mb-4">
              <span>Will notify:</span>
              <span className="font-semibold text-[#4a3728]">
                {groupData.members - members.filter(m => m.isOnline).length} inactive members
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNotificationPopup(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-[#4a3728] rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="flex-1 px-4 py-2.5 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowChallengeModal(false)}>
          <div 
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Zap size={24} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4a3728]">Start Group Challenge</h3>
                <p className="text-xs text-[#6b5847]">Compete and motivate each other</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <button className="w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all text-left border-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#4a3728] mb-1">⏱️ Speed Challenge</div>
                    <div className="text-xs text-[#6b5847]">Who can study 2 hours fastest?</div>
                  </div>
                  <ChevronLeft className="rotate-180 text-purple-500" size={20} />
                </div>
              </button>

              <button className="w-full p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all text-left border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#4a3728] mb-1">🔥 Streak Battle</div>
                    <div className="text-xs text-[#6b5847]">7-day consistency challenge</div>
                  </div>
                  <ChevronLeft className="rotate-180 text-green-500" size={20} />
                </div>
              </button>

              <button className="w-full p-4 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-xl transition-all text-left border-2 border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#4a3728] mb-1">🎯 Daily Goal Race</div>
                    <div className="text-xs text-[#6b5847]">First to hit 8 hours today wins</div>
                  </div>
                  <ChevronLeft className="rotate-180 text-amber-500" size={20} />
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowChallengeModal(false)}
              className="w-full px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-[#4a3728] rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAnnouncementModal(false)}>
          <div 
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Megaphone size={24} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4a3728]">Group Announcements</h3>
                <p className="text-xs text-[#6b5847]">Important updates from host</p>
              </div>
            </div>

            <div className="space-y-3 mb-5 max-h-96 overflow-y-auto">
              {/* Recent Announcement */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border-l-4 border-amber-500">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown size={14} className="text-amber-600" />
                    <span className="text-xs font-semibold text-amber-700">Host</span>
                  </div>
                  <span className="text-xs text-[#6b5847]">2 hours ago</span>
                </div>
                <p className="text-sm text-[#4a3728] font-medium mb-1">📚 Important: Today's Focus</p>
                <p className="text-sm text-[#6b5847]">
                  Let's aim for 6+ hours today! Remember to take breaks every 90 minutes. We're almost at our group goal! 💪
                </p>
              </div>

              {/* Older Announcement */}
              <div className="bg-[#f6ede8] rounded-xl p-4 border-l-4 border-[#8b7355]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown size={14} className="text-[#8b7355]" />
                    <span className="text-xs font-semibold text-[#6b5847]">Host</span>
                  </div>
                  <span className="text-xs text-[#6b5847]">Yesterday</span>
                </div>
                <p className="text-sm text-[#4a3728] font-medium mb-1">🎉 Milestone Achieved!</p>
                <p className="text-sm text-[#6b5847]">
                  Congrats everyone! We've completed 15 days streak as a group. Keep up the amazing work!
                </p>
              </div>

              {/* Info Message */}
              <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">System</span>
                  </div>
                  <span className="text-xs text-[#6b5847]">3 days ago</span>
                </div>
                <p className="text-sm text-[#4a3728] font-medium mb-1">ℹ️ New Feature</p>
                <p className="text-sm text-[#6b5847]">
                  You can now track your individual progress in real-time. Check the timer below your profile!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAnnouncementModal(false)}
              className="w-full px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-[#4a3728] rounded-lg font-semibold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupRoom;