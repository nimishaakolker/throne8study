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
  Pause
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
  const [showChat, setShowChat] = useState<boolean>(true);
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [studyTime, setStudyTime] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

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
      studyTime: 145,
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
      studyTime: 98,
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
      studyTime: 167,
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
      studyTime: 72,
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

  // Format time
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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] flex flex-col z-50">
      {/* Header - Fixed */}
      <div className="bg-white border-b-2 border-[#e0d8cf] px-4 py-4 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/study/my-groups')}
              className="p-2 hover:bg-[#f6ede8] rounded-lg transition-all"
            >
              <ChevronLeft size={24} className="text-[#4a3728]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#4a3728]">{groupData.title}</h1>
                {groupData.isCreator && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#8b7355] rounded-full">
                    <Crown size={12} className="text-white" />
                    <span className="text-xs font-bold text-white">Host</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-[#6b5847]">{groupData.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div className={`text-2xl font-bold ${isSessionActive ? 'text-green-600' : 'text-[#4a3728]'}`}>
                    {formatTime(studyTime)}
                  </div>
                  {isSessionActive && (
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="text-xs text-[#6b5847]">Session Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4a3728]">{members.filter(m => m.isOnline).length}</div>
                <div className="text-xs text-[#6b5847]">Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4a3728]">{groupData.currentStreak}</div>
                <div className="text-xs text-[#6b5847]">Day Streak</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleToggleSession}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isSessionActive
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isSessionActive ? (
                  <>
                    <Pause size={18} />
                    Pause Session
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Start Session
                  </>
                )}
              </button>

              <button
                onClick={() => router.push(`/study/my-groups/${groupId}/chat`)}
                className="px-4 py-2 bg-[#8b7355] hover:bg-[#6b5847] text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Go to Chat Room
              </button>
              
              <button
                onClick={handleLeaveRoom}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <LogOut size={18} />
                Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Video Grid - Scrollable */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Self Video */}
            <div className="relative aspect-video bg-gradient-to-br from-[#8b7355] to-[#6b5847] rounded-xl overflow-hidden border-4 border-[#8b7355] shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                {isCameraOn ? (
                  <div className="text-6xl">👤</div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">📹</div>
                    <div className="text-white font-semibold">Camera Off</div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">You</span>
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
                    <div className="text-6xl">{member.avatar}</div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-2">{member.avatar}</div>
                      <div className="text-white font-semibold text-sm">{member.name}</div>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">{member.name}</span>
                    <div className="flex gap-1">
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

        {/* Right Sidebar - Chat & Members */}
        {(showChat || showMembers) && (
          <div className="w-80 bg-white border-l-2 border-[#e0d8cf] flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#e0d8cf] shrink-0">
              <button
                onClick={() => { setShowChat(true); setShowMembers(false); }}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-all ${
                  showChat && !showMembers
                    ? 'bg-[#f6ede8] text-[#4a3728] border-b-4 border-[#8b7355]'
                    : 'text-[#6b5847] hover:bg-[#f6ede8]'
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
                    : 'text-[#6b5847] hover:bg-[#f6ede8]'
                }`}
              >
                <Users size={16} className="inline mr-2" />
                Members ({members.filter(m => m.isOnline).length})
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

                <div className="p-4 border-t border-[#e0d8cf] shrink-0">
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
                        ? 'bg-[#f6ede8] hover:bg-[#e0d8cf]'
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
                      <div className="flex-1">
                        <div className="font-semibold text-[#4a3728] text-sm">{member.name}</div>
                        <div className="text-xs text-[#6b5847]">
                          {member.studyTime}h • Rank #{member.rank}
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
        )}
      </div>

      {/* Bottom Controls - Fixed */}
      <div className="bg-white border-t-2 border-[#e0d8cf] px-6 py-4 shrink-0">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isMicOn
                ? 'bg-[#8b7355] hover:bg-[#6b5847] text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={isMicOn ? "Mute" : "Unmute"}
          >
            {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>

          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isCameraOn
                ? 'bg-[#8b7355] hover:bg-[#6b5847] text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={isCameraOn ? "Turn off camera" : "Turn on camera"}
          >
            {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <button
            onClick={() => {
              setShowChat(!showChat);
              if (showMembers && !showChat) {
                setShowMembers(false);
              }
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              showChat
                ? 'bg-[#8b7355] text-white'
                : 'bg-[#f6ede8] hover:bg-[#e0d8cf] text-[#4a3728]'
            }`}
            title="Toggle chat"
          >
            <MessageCircle size={24} />
          </button>

          <button
            onClick={() => {
              setShowMembers(!showMembers);
              if (showChat && !showMembers) {
                setShowChat(false);
              }
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
              showMembers
                ? 'bg-[#8b7355] text-white'
                : 'bg-[#f6ede8] hover:bg-[#e0d8cf] text-[#4a3728]'
            }`}
            title="Toggle members"
          >
            <Users size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupRoom;