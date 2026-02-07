"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Download,
  Smile,
  Reply,
  Pin,
  Trash2,
  Edit3,
  MoreVertical,
  X,
  Check,
  CheckCheck,
  Image as ImageIcon,
  FileText,
  Users,
  HelpCircle,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle,
  Star,
  Upload,
  AtSign,
  Tag,
  Video,
  File,
  Camera,
  Presentation
} from "lucide-react";

// ========================== TYPES ==========================

interface Reaction {
  [emoji: string]: number[];
}

interface FileAttachment {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  isPinned: boolean;
  category: string;
}

interface Message {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: Date;
  readBy: number[];
  reactions: Reaction;
  isPinned: boolean;
  replyTo: number | null;
  type: string;
  files?: FileAttachment[];
  isEdited?: boolean;
}

interface Answer {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
}

interface Doubt {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  title: string;
  question: string;
  category: string;
  tags: string[];
  timestamp: Date;
  isSolved: boolean;
  upvotes: number;
  answers: Answer[];
  taggedUsers: number[];
}

interface Member {
  id: number;
  name: string;
  avatar: string;
}

interface AttachmentType {
  id: string;
  name: string;
  icon: JSX.Element;
  accept: string;
  color: string;
}

interface DoubtInput {
  title: string;
  question: string;
  category: string;
  tags: string[];
}

const GroupChat = () => {
  const params = useParams();
  const router = useRouter();
  const groupId = params?.groupId as string;

  // Tab state
  const [activeTab, setActiveTab] = useState<string>("chat");

  // Chat states
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      userId: 2,
      userName: "Priya Sharma",
      userAvatar: "👩‍🎓",
      text: "Hey everyone! Ready for today's study session?",
      timestamp: new Date(Date.now() - 3600000),
      readBy: [1, 2, 3],
      reactions: { "👍": [1, 3], "🔥": [4] },
      isPinned: true,
      replyTo: null,
      type: "message"
    },
    {
      id: 2,
      userId: 3,
      userName: "Rahul Kumar",
      userAvatar: "👨‍💻",
      text: "Yes! Let's crush it today 💪",
      timestamp: new Date(Date.now() - 3000000),
      readBy: [1, 2, 3, 4],
      reactions: { "💪": [1, 2, 5] },
      isPinned: false,
      replyTo: null,
      type: "message"
    }
  ]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [selectedMessageMenu, setSelectedMessageMenu] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false);

  // File states
  const [files, setFiles] = useState<FileAttachment[]>([
    {
      id: 1,
      name: "Physics_Chapter_5_Notes.pdf",
      size: 2456789,
      type: "application/pdf",
      url: "#",
      uploadedBy: "Priya Sharma",
      uploadedAt: new Date(Date.now() - 86400000),
      isPinned: true,
      category: "Notes"
    },
    {
      id: 2,
      name: "Math_Formula_Sheet.docx",
      size: 567890,
      type: "application/msword",
      url: "#",
      uploadedBy: "Vikram Singh",
      uploadedAt: new Date(Date.now() - 172800000),
      isPinned: false,
      category: "Reference"
    }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileSearchQuery, setFileSearchQuery] = useState<string>("");
  const [selectedFileCategory, setSelectedFileCategory] = useState<string>("All");

  // Doubt states
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: 1,
      userId: 4,
      userName: "Ananya Gupta",
      userAvatar: "👩‍💼",
      title: "Confusion in Electromagnetic Induction",
      question: "Can someone explain Lenz's law with a practical example? I'm having trouble understanding the direction of induced current.",
      category: "Physics",
      tags: ["electromagnetism", "jee-advanced"],
      timestamp: new Date(Date.now() - 7200000),
      isSolved: false,
      upvotes: 5,
      answers: [
        {
          id: 1,
          userId: 2,
          userName: "Priya Sharma",
          userAvatar: "👩‍🎓",
          text: "Lenz's law states that the direction of induced current opposes the change in magnetic flux. Think of it like this: when you bring a magnet near a coil, the coil creates its own magnetic field to oppose the approaching magnet.",
          timestamp: new Date(Date.now() - 3600000),
          upvotes: 8,
          downvotes: 0,
          isAccepted: true
        },
        {
          id: 2,
          userId: 5,
          userName: "Vikram Singh",
          userAvatar: "👨‍🔬",
          text: "Here's a simple experiment: Drop a magnet through a copper tube. It falls slowly because the tube induces currents that create a magnetic field opposing the magnet's motion.",
          timestamp: new Date(Date.now() - 1800000),
          upvotes: 6,
          downvotes: 1,
          isAccepted: false
        }
      ],
      taggedUsers: [2, 5]
    },
    {
      id: 2,
      userId: 3,
      userName: "Rahul Kumar",
      userAvatar: "👨‍💻",
      title: "Integration by Parts Question",
      question: "How do I solve ∫x²e^x dx using integration by parts? Which part should I choose as u?",
      category: "Mathematics",
      tags: ["calculus", "integration"],
      timestamp: new Date(Date.now() - 10800000),
      isSolved: true,
      upvotes: 3,
      answers: [
        {
          id: 3,
          userId: 7,
          userName: "Arjun Reddy",
          userAvatar: "👨‍⚕️",
          text: "Use u = x² and dv = e^x dx. You'll need to apply integration by parts twice. First iteration gives x²e^x - 2∫xe^x dx, then apply it again on the remaining integral.",
          timestamp: new Date(Date.now() - 9000000),
          upvotes: 5,
          downvotes: 0,
          isAccepted: true
        }
      ],
      taggedUsers: [7]
    }
  ]);
  const [doubtInput, setDoubtInput] = useState<DoubtInput>({
    title: "",
    question: "",
    category: "Physics",
    tags: []
  });
  const [newTag, setNewTag] = useState<string>("");
  const [showDoubtForm, setShowDoubtForm] = useState<boolean>(false);
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [answerInput, setAnswerInput] = useState<string>("");
  const [doubtSearchQuery, setDoubtSearchQuery] = useState<string>("");
  const [doubtFilter, setDoubtFilter] = useState<string>("all");
  const [taggedMembers, setTaggedMembers] = useState<number[]>([]);
  const [showAllPinnedMessages, setShowAllPinnedMessages] = useState<boolean>(false);
  const [showMemberTag, setShowMemberTag] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const attachmentMenuRef = useRef<HTMLDivElement>(null);

  const currentUserId = 1;
  const members: Member[] = [
    { id: 1, name: "You", avatar: "👨‍🎓" },
    { id: 2, name: "Priya Sharma", avatar: "👩‍🎓" },
    { id: 3, name: "Rahul Kumar", avatar: "👨‍💻" },
    { id: 4, name: "Ananya Gupta", avatar: "👩‍💼" },
    { id: 5, name: "Vikram Singh", avatar: "👨‍🔬" },
    { id: 6, name: "Sneha Patel", avatar: "👩‍🏫" },
    { id: 7, name: "Arjun Reddy", avatar: "👨‍⚕️" },
    { id: 8, name: "Kavya Nair", avatar: "👩‍🎨" }
  ];

  const emojis: string[] = ["👍", "❤️", "😊", "👏", "✅"];
  const doubtCategories: string[] = ["Physics", "Chemistry", "Mathematics", "Biology", "General"];
  const fileCategories: string[] = ["All", "Notes", "Reference", "Assignments", "Previous Papers"];

  // Attachment types configuration
  const attachmentTypes: AttachmentType[] = [
    {
      id: "photo",
      name: "Photo",
      icon: <Camera size={20} />,
      accept: "image/jpeg,image/png,image/gif,image/webp,image/heic,image/heif",
      color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border border-blue-500/20"
    },
    {
      id: "video",
      name: "Video",
      icon: <Video size={20} />,
      accept: "video/mp4,video/webm,video/quicktime,video/x-msvideo",
      color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border border-purple-500/20"
    },
    {
      id: "document",
      name: "Document",
      icon: <FileText size={20} />,
      accept: ".pdf,.doc,.docx,.txt",
      color: "bg-green-500/10 text-green-600 hover:bg-green-500/20 border border-green-500/20"
    },
    {
      id: "presentation",
      name: "PPT",
      icon: <Presentation size={20} />,
      accept: ".ppt,.pptx",
      color: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border border-orange-500/20"
    },
    {
      id: "file",
      name: "File",
      icon: <File size={20} />,
      accept: "*",
      color: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 border border-gray-500/20"
    }
  ];

  // ==========================
  // UTILITY FUNCTIONS
  // ==========================

  const formatMessageTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string): JSX.Element => {
    if (type.startsWith("image/")) return <ImageIcon size={20} />;
    if (type.startsWith("video/")) return <Video size={20} />;
    if (type.startsWith("application/pdf")) return <FileText size={20} />;
    if (type.includes("presentation") || type.includes("powerpoint")) return <Presentation size={20} />;
    return <File size={20} />;
  };

  const validateFileSize = (file: File): boolean => {
    const maxSize = 50 * 1024 * 1024; // 50MB max
    return file.size <= maxSize;
  };

  const validateFileType = (file: File): boolean => {
    const allowedTypes = [
      // Images
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/heic",
      "image/heif",
      // Videos
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
      // Documents
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain"
    ];
    return allowedTypes.includes(file.type);
  };

  const getFileSizeLimit = (type: string): number => {
    if (type.startsWith("image/")) return 10 * 1024 * 1024; // 10MB for images
    if (type.startsWith("video/")) return 50 * 1024 * 1024; // 50MB for videos
    return 10 * 1024 * 1024; // 10MB for documents
  };

  // ==========================
  // EFFECTS
  // ==========================

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  // Typing simulation
  useEffect(() => {
    if (messageInput) {
      const timeout = setTimeout(() => {
        if (Math.random() > 0.8) {
          setTypingUsers(["Priya Sharma"]);
          setTimeout(() => setTypingUsers([]), 2000);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [messageInput]);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu-container')) {
        setSelectedMessageMenu(null);
        setShowEmojiPicker(null);
      }
      if (attachmentMenuRef.current && !attachmentMenuRef.current.contains(target)) {
        setShowAttachmentMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDoubt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDoubt]);

  // ==========================
  // CHAT FUNCTIONS
  // ==========================

  const handleSendMessage = async (): Promise<void> => {
    if (!messageInput.trim() && uploadedFiles.length === 0) return;

    const newMessage: Message = {
      id: messages.length + 1,
      userId: currentUserId,
      userName: "You",
      userAvatar: "👨‍🎓",
      text: messageInput,
      timestamp: new Date(),
      readBy: [currentUserId],
      reactions: {},
      isPinned: false,
      replyTo: replyingTo,
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      isEdited: false,
      type: "message"
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
    setReplyingTo(null);
    setUploadedFiles([]);
  };

  const handleEditMessage = (messageId: number): void => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;
    setEditingMessage(message);
    setMessageInput(message.text);
    setSelectedMessageMenu(null);
  };

  const handleSaveEdit = (): void => {
    if (!editingMessage || !messageInput.trim()) return;

    setMessages(
      messages.map((m) =>
        m.id === editingMessage.id
          ? { ...m, text: messageInput, isEdited: true }
          : m
      )
    );
    setEditingMessage(null);
    setMessageInput("");
  };

  const handleDeleteMessage = (messageId: number): void => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((m) => m.id !== messageId));
      setSelectedMessageMenu(null);
    }
  };

  const handleToggleMessagePin = (messageId: number): void => {
    setMessages(
      messages.map((m) => (m.id === messageId ? { ...m, isPinned: !m.isPinned } : m))
    );
    setSelectedMessageMenu(null);
  };

  const handleAddReaction = (messageId: number, emoji: string): void => {
    setMessages(
      messages.map((m) => {
        if (m.id === messageId) {
          const reactions = { ...m.reactions };
          if (reactions[emoji]) {
            if (reactions[emoji].includes(currentUserId)) {
              reactions[emoji] = reactions[emoji].filter((id) => id !== currentUserId);
              if (reactions[emoji].length === 0) delete reactions[emoji];
            } else {
              reactions[emoji] = [...reactions[emoji], currentUserId];
            }
          } else {
            reactions[emoji] = [currentUserId];
          }
          return { ...m, reactions };
        }
        return m;
      })
    );
    setShowEmojiPicker(null);
  };

  // ==========================
  // FILE FUNCTIONS
  // ==========================

  const handleAttachmentTypeClick = (type: AttachmentType): void => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type.accept;
      fileInputRef.current.click();
      setShowAttachmentMenu(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      if (!validateFileType(file)) {
        errors.push(`${file.name}: Invalid file type. Allowed: Images (JPG, PNG, GIF, WebP, HEIC), Videos (MP4, WebM, MOV, AVI), Documents (PDF, DOC, DOCX, PPT, PPTX, TXT)`);
      } else {
        const sizeLimit = getFileSizeLimit(file.type);
        if (file.size > sizeLimit) {
          const limitMB = (sizeLimit / (1024 * 1024)).toFixed(0);
          errors.push(`${file.name}: File size exceeds ${limitMB}MB limit`);
        } else {
          validFiles.push(file);
        }
      }
    });

    if (errors.length > 0) {
      alert("Some files were rejected:\n\n" + errors.join("\n"));
    }

    if (validFiles.length === 0) {
      e.target.value = ""; // Reset input
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const newFiles: FileAttachment[] = validFiles.map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedBy: "You",
        uploadedAt: new Date(),
        isPinned: false,
        category: file.type.startsWith("image/") ? "Images" :
          file.type.startsWith("video/") ? "Videos" : "Notes"
      }));

      if (activeTab === "files") {
        setFiles([...newFiles, ...files]);
      } else {
        setUploadedFiles([...uploadedFiles, ...newFiles]);
      }
      setIsUploading(false);
      e.target.value = ""; // Reset input
    }, 1500);
  };

  const handleRemoveFile = (fileId: number): void => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
  };

  const handleDeleteFile = (fileId: number): void => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFiles(files.filter((f) => f.id !== fileId));
      setSelectedMessageMenu(null);
    }
  };

  const handleDownloadFile = (file: FileAttachment): void => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const handleShareFileLink = (file: FileAttachment): void => {
    const link = `${window.location.origin}/files/${file.id}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("File link copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy link");
    });
    setSelectedMessageMenu(null);
  };

  const handleToggleFilePin = (fileId: number): void => {
    setFiles(
      files.map((f) => (f.id === fileId ? { ...f, isPinned: !f.isPinned } : f))
    );
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(fileSearchQuery.toLowerCase());
    const matchesCategory = selectedFileCategory === "All" || file.category === selectedFileCategory;
    return matchesSearch && matchesCategory;
  });

  // ==========================
  // DOUBT FUNCTIONS
  // ==========================

  const handlePostDoubt = (): void => {
    if (!doubtInput.title.trim() || !doubtInput.question.trim()) {
      alert("Please fill in both title and question");
      return;
    }

    const newDoubt: Doubt = {
      id: doubts.length + 1,
      userId: currentUserId,
      userName: "You",
      userAvatar: "👨‍🎓",
      title: doubtInput.title,
      question: doubtInput.question,
      category: doubtInput.category,
      tags: doubtInput.tags,
      timestamp: new Date(),
      isSolved: false,
      upvotes: 0,
      answers: [],
      taggedUsers: taggedMembers
    };

    setDoubts([newDoubt, ...doubts]);
    setDoubtInput({ title: "", question: "", category: "Physics", tags: [] });
    setTaggedMembers([]);
    setShowDoubtForm(false);
    setShowMemberTag(false);
  };

  const handleAnswerDoubt = (): void => {
    if (!answerInput.trim() || !selectedDoubt) return;

    const newAnswer: Answer = {
      id: selectedDoubt.answers.length + 1,
      userId: currentUserId,
      userName: "You",
      userAvatar: "👨‍🎓",
      text: answerInput,
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      isAccepted: false
    };

    setDoubts(
      doubts.map((d) =>
        d.id === selectedDoubt.id
          ? { ...d, answers: [...d.answers, newAnswer] }
          : d
      )
    );
    setSelectedDoubt({ ...selectedDoubt, answers: [...selectedDoubt.answers, newAnswer] });
    setAnswerInput("");
  };

  const handleMarkDoubtSolved = (doubtId: number): void => {
    setDoubts(
      doubts.map((d) => (d.id === doubtId ? { ...d, isSolved: true } : d))
    );
    if (selectedDoubt?.id === doubtId) {
      setSelectedDoubt({ ...selectedDoubt, isSolved: true });
    }
  };

  const handleVoteAnswer = (doubtId: number, answerId: number, voteType: "up" | "down"): void => {
    setDoubts(
      doubts.map((d) => {
        if (d.id === doubtId) {
          const updatedAnswers = d.answers.map((a) => {
            if (a.id === answerId) {
              return {
                ...a,
                upvotes: voteType === "up" ? a.upvotes + 1 : a.upvotes,
                downvotes: voteType === "down" ? a.downvotes + 1 : a.downvotes
              };
            }
            return a;
          });
          return { ...d, answers: updatedAnswers };
        }
        return d;
      })
    );

    if (selectedDoubt?.id === doubtId) {
      const updatedAnswers = selectedDoubt.answers.map((a) => {
        if (a.id === answerId) {
          return {
            ...a,
            upvotes: voteType === "up" ? a.upvotes + 1 : a.upvotes,
            downvotes: voteType === "down" ? a.downvotes + 1 : a.downvotes
          };
        }
        return a;
      });
      setSelectedDoubt({ ...selectedDoubt, answers: updatedAnswers });
    }
  };

  const handleAcceptAnswer = (doubtId: number, answerId: number): void => {
    setDoubts(
      doubts.map((d) => {
        if (d.id === doubtId) {
          const updatedAnswers = d.answers.map((a) => ({
            ...a,
            isAccepted: a.id === answerId
          }));
          return { ...d, answers: updatedAnswers, isSolved: true };
        }
        return d;
      })
    );

    if (selectedDoubt?.id === doubtId) {
      const updatedAnswers = selectedDoubt.answers.map((a) => ({
        ...a,
        isAccepted: a.id === answerId
      }));
      setSelectedDoubt({ ...selectedDoubt, answers: updatedAnswers, isSolved: true });
    }
  };

  const handleUpvoteDoubt = (doubtId: number): void => {
    setDoubts(
      doubts.map((d) => (d.id === doubtId ? { ...d, upvotes: d.upvotes + 1 } : d))
    );
  };

  const handleAddTag = (): void => {
    if (newTag.trim() && !doubtInput.tags.includes(newTag.trim())) {
      setDoubtInput({ ...doubtInput, tags: [...doubtInput.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string): void => {
    setDoubtInput({ ...doubtInput, tags: doubtInput.tags.filter((t) => t !== tag) });
  };

  const handleToggleTagMember = (memberId: number): void => {
    if (taggedMembers.includes(memberId)) {
      setTaggedMembers(taggedMembers.filter((id) => id !== memberId));
    } else {
      setTaggedMembers([...taggedMembers, memberId]);
    }
  };

  const filteredDoubts = doubts.filter((doubt) => {
    const matchesSearch =
      doubt.title.toLowerCase().includes(doubtSearchQuery.toLowerCase()) ||
      doubt.question.toLowerCase().includes(doubtSearchQuery.toLowerCase()) ||
      doubt.tags.some((tag) => tag.toLowerCase().includes(doubtSearchQuery.toLowerCase()));

    const matchesFilter =
      doubtFilter === "all" ||
      (doubtFilter === "solved" && doubt.isSolved) ||
      (doubtFilter === "unsolved" && !doubt.isSolved);

    return matchesSearch && matchesFilter;
  });

  const pinnedMessages = messages.filter((m) => m.isPinned);
  const pinnedFiles = files.filter((f) => f.isPinned);

  // ==========================
  // RENDER
  // ==========================

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-br from-[#f6ede8] via-[#ede4db] to-[#e0d8cf]">
      {/* Glassmorphism Header */}
      <div className="flex-shrink-0 backdrop-blur-xl bg-white/30 border-b border-white/40 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => router.push(`/study/room/${groupId}`)}
              className="p-2.5 hover:bg-white/50 rounded-xl transition-all duration-200 flex-shrink-0 backdrop-blur-sm border border-white/30"
              aria-label="Back to room"
            >
              <ArrowLeft size={20} className="text-[#4a3728]" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#4a3728] truncate">Focus JEE Warriors</h1>
              <p className="text-sm text-[#6b5847]/80 hidden sm:block">8 members • 6 online</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/study/room/${groupId}`)}
            className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm font-semibold flex-shrink-0 backdrop-blur-sm border border-white/20"
          >
            <Users size={18} />
            <span className="hidden sm:inline">Back to Room</span>
            <span className="sm:hidden">Room</span>
          </button>
        </div>

        {/* Modern Tabs */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="px-4 sm:px-6 lg:px-8 flex gap-2 min-w-max">
            {[
              { id: "chat", icon: MessageSquare, label: "Chat" },
              { id: "files", icon: Paperclip, label: `Files (${files.length})` },
              { id: "doubts", icon: HelpCircle, label: `Doubts (${doubts.filter((d) => !d.isSolved).length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 font-semibold transition-all duration-200 whitespace-nowrap text-sm rounded-t-xl relative ${
                  activeTab === tab.id
                    ? "text-[#8b7355] bg-white/50 backdrop-blur-sm border-t border-x border-white/40"
                    : "text-[#6b5847]/70 hover:text-[#8b7355] hover:bg-white/30"
                }`}
              >
                <tab.icon size={16} className="inline mr-2" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8b7355] to-[#6b5847]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "chat" && (
        <>
          {/* Pinned Messages with Glassmorphism */}
          {pinnedMessages.length > 0 && (
            <div className="flex-shrink-0 backdrop-blur-xl bg-amber-100/40 border-b border-amber-200/50">
              <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                    <Pin size={16} />
                    Pinned Messages
                  </div>
                  {pinnedMessages.length > 2 && (
                    <button
                      onClick={() => setShowAllPinnedMessages(!showAllPinnedMessages)}
                      className="text-xs text-amber-700 hover:text-amber-900 font-medium hover:underline"
                    >
                      {showAllPinnedMessages ? 'Show Less' : `Show All (${pinnedMessages.length})`}
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
                  {(showAllPinnedMessages ? pinnedMessages : pinnedMessages.slice(-2)).map((msg) => (
                    <div key={msg.id} className="text-sm text-amber-800 truncate backdrop-blur-sm bg-white/30 rounded-lg px-3 py-2 border border-white/40">
                      <span className="font-semibold">{msg.userName}:</span> {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 space-y-4 sm:space-y-5">
              {messages.map((msg, index) => {
                const showDate =
                  index === 0 ||
                  formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);

                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="flex items-center justify-center my-6">
                        <span className="backdrop-blur-md bg-white/50 text-[#6b5847] text-xs font-semibold px-4 py-2 rounded-full border border-white/60 shadow-sm">
                          {formatDate(msg.timestamp)}
                        </span>
                      </div>
                    )}

                    <div
                      ref={(el) => {
                        messageRefs.current[msg.id] = el;
                      }}
                      className={`flex gap-3 ${msg.userId === currentUserId ? "flex-row-reverse" : ""}`}
                    >
                      {msg.userId !== currentUserId && (
                        <div className="w-10 h-10 rounded-full border-2 border-[#8b7355]/30 backdrop-blur-sm bg-white/50 flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                          {msg.userAvatar}
                        </div>
                      )}

                      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] min-w-0">
                        {msg.userId !== currentUserId && (
                          <div className="font-bold text-sm mb-1.5 text-[#4a3728]">
                            {msg.userName}
                          </div>
                        )}

                        <div
                          className={`relative group menu-container ${
                            msg.userId === currentUserId
                              ? "bg-gradient-to-br from-[#8b7355] to-[#6b5847] text-white shadow-lg"
                              : "backdrop-blur-xl bg-white/60 border border-white/60 shadow-md"
                          } rounded-2xl px-4 py-3 cursor-pointer transition-all duration-200 hover:shadow-xl`}
                          onClick={() => setSelectedMessageMenu(selectedMessageMenu === msg.id ? null : msg.id)}
                        >
                          {msg.replyTo && (
                            <div
                              className={`mb-2 pb-2 ${
                                msg.userId === currentUserId ? "border-white/30" : "border-gray-300"
                              } border-b text-xs opacity-80`}
                            >
                              <Reply size={12} className="inline mr-1" />
                              Replying to:{" "}
                              {messages.find((m) => m.id === msg.replyTo)?.text.substring(0, 30)}...
                            </div>
                          )}

                          <div className="text-sm break-words leading-relaxed">{msg.text}</div>

                          {msg.files && msg.files.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {msg.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="backdrop-blur-sm bg-white/20 rounded-xl p-3 flex items-center gap-3 border border-white/30"
                                >
                                  <div className="p-2 bg-white/20 rounded-lg">
                                    {getFileIcon(file.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold truncate">
                                      {file.name}
                                    </div>
                                    <div className="text-xs opacity-70">
                                      {formatFileSize(file.size)}
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDownloadFile(file);
                                    }}
                                    className="hover:bg-white/20 rounded-lg p-2 flex-shrink-0 transition-all"
                                  >
                                    <Download size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {Object.keys(msg.reactions).length > 0 && (
                            <div className="flex gap-1.5 mt-3 flex-wrap">
                              {Object.entries(msg.reactions).map(([emoji, users]) => (
                                <button
                                  key={emoji}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddReaction(msg.id, emoji);
                                  }}
                                  className={`text-xs px-2.5 py-1 rounded-full backdrop-blur-sm transition-all ${
                                    users.includes(currentUserId)
                                      ? "bg-blue-500/20 border border-blue-400/50"
                                      : "bg-white/30 border border-white/40 hover:bg-white/50"
                                  }`}
                                >
                                  {emoji} {users.length}
                                </button>
                              ))}
                            </div>
                          )}

                          <div
                            className={`flex items-center gap-2 mt-2 text-xs ${
                              msg.userId === currentUserId ? "text-white/70" : "text-gray-600"
                            }`}
                          >
                            <span>{formatMessageTime(msg.timestamp)}</span>
                            {msg.isEdited && <span>(edited)</span>}
                            {msg.userId === currentUserId && (
                              <>
                                {msg.readBy.length === 1 ? (
                                  <Check size={12} />
                                ) : (
                                  <CheckCheck size={12} className="text-blue-300" />
                                )}
                              </>
                            )}
                          </div>

                          {selectedMessageMenu === msg.id && (
                            <div
                              className={`absolute ${msg.userId === currentUserId ? 'right-full mr-3' : 'left-full ml-3'} top-0 backdrop-blur-xl bg-white/90 shadow-2xl rounded-xl border border-white/60 py-2 z-[200] min-w-[160px]`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  setReplyingTo(msg.id);
                                  setSelectedMessageMenu(null);
                                }}
                                className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                              >
                                <Reply size={16} /> Reply
                              </button>
                              <button
                                onClick={() => {
                                  setShowEmojiPicker(msg.id);
                                  setSelectedMessageMenu(null);
                                }}
                                className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                              >
                                <Smile size={16} /> React
                              </button>
                              <button
                                onClick={() => handleToggleMessagePin(msg.id)}
                                className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                              >
                                <Pin size={16} /> {msg.isPinned ? "Unpin" : "Pin"}
                              </button>
                              {msg.userId === currentUserId && (
                                <>
                                  <button
                                    onClick={() => handleEditMessage(msg.id)}
                                    className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                                  >
                                    <Edit3 size={16} /> Edit
                                  </button>
                                  <div className="border-t border-gray-200/50 my-1" />
                                  <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="w-full px-4 py-2.5 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 font-medium transition-all"
                                  >
                                    <Trash2 size={16} /> Delete
                                  </button>
                                </>
                              )}
                            </div>
                          )}

                          {showEmojiPicker === msg.id && (
                            <div
                              className={`absolute ${msg.userId === currentUserId ? 'right-full mr-3' : 'left-full ml-3'} top-0 backdrop-blur-xl bg-white/90 shadow-2xl rounded-xl border border-white/60 p-3 z-[200]`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex gap-2">
                                {emojis.map((emoji) => (
                                  <button
                                    key={emoji}
                                    onClick={() => handleAddReaction(msg.id, emoji)}
                                    className="hover:bg-gray-100/50 rounded-lg p-2 text-xl transition-all hover:scale-110"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="flex-shrink-0 backdrop-blur-xl bg-white/40 border-t border-white/50">
              <div className="px-4 sm:px-6 lg:px-8 py-3 text-sm text-[#6b5847] italic font-medium">
                {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
              </div>
            </div>
          )}

          {/* Reply Banner */}
          {replyingTo && (
            <div className="flex-shrink-0 backdrop-blur-xl bg-blue-100/40 border-t border-blue-200/50">
              <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
                <div className="text-sm flex-1 min-w-0 font-medium text-blue-900">
                  <Reply size={14} className="inline mr-2" />
                  <span className="truncate">
                    Replying to: {messages.find((m) => m.id === replyingTo)?.text.substring(0, 50)}...
                  </span>
                </div>
                <button 
                  onClick={() => setReplyingTo(null)}
                  className="flex-shrink-0 p-1.5 hover:bg-blue-200/50 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Edit Banner */}
          {editingMessage && (
            <div className="flex-shrink-0 backdrop-blur-xl bg-amber-100/40 border-t border-amber-200/50">
              <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="text-sm font-medium text-amber-900">
                  <Edit3 size={14} className="inline mr-2" />
                  Editing message
                </div>
                <button
                  onClick={() => {
                    setEditingMessage(null);
                    setMessageInput("");
                  }}
                  className="p-1.5 hover:bg-amber-200/50 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Attached Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="flex-shrink-0 backdrop-blur-xl bg-gray-100/40 border-t border-gray-200/50">
              <div className="px-4 sm:px-6 lg:px-8 py-3">
                <div className="text-sm font-bold mb-3 text-[#4a3728]">Attached Files:</div>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 backdrop-blur-sm bg-white/60 rounded-xl p-3 text-sm border border-white/60"
                    >
                      <div className="p-2 bg-white/50 rounded-lg">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 truncate min-w-0 font-medium">{file.name}</div>
                      <div className="text-gray-600 text-xs">{formatFileSize(file.size)}</div>
                      <button 
                        onClick={() => handleRemoveFile(file.id)}
                        className="flex-shrink-0 p-1.5 hover:bg-red-100/50 rounded-lg transition-all"
                      >
                        <X size={16} className="text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="flex-shrink-0 backdrop-blur-xl bg-white/50 border-t border-white/60 shadow-2xl">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
              <div className="flex gap-3 items-end">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                <div className="relative" ref={attachmentMenuRef}>
                  <button
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    disabled={isUploading}
                    className="p-3 hover:bg-white/60 rounded-xl transition-all duration-200 flex-shrink-0 backdrop-blur-sm border border-white/40"
                    title="Attach file"
                  >
                    <Paperclip size={20} className={`text-[#6b5847] ${isUploading ? "animate-spin" : ""}`} />
                  </button>

                  {/* Attachment Type Menu */}
                  {showAttachmentMenu && (
                    <div className="absolute bottom-full left-0 mb-3 backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/60 p-3 min-w-[220px] z-[200]">
                      <div className="text-xs font-bold text-gray-700 mb-3 px-2">
                        Select attachment type
                      </div>
                      <div className="space-y-1.5">
                        {attachmentTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handleAttachmentTypeClick(type)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${type.color}`}
                          >
                            {type.icon}
                            <span className="text-sm">{type.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      editingMessage ? handleSaveEdit() : handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 px-4 py-3 border-2 border-white/60 rounded-xl focus:outline-none focus:border-[#8b7355]/50 resize-none min-w-0 text-sm backdrop-blur-sm bg-white/60 transition-all"
                />
                <button
                  onClick={editingMessage ? handleSaveEdit : handleSendMessage}
                  disabled={!messageInput.trim() && uploadedFiles.length === 0}
                  className="p-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-white/20"
                >
                  {editingMessage ? <Check size={20} /> : <Send size={20} />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ==========================
          FILES TAB
      ========================== */}
      {activeTab === "files" && (
        <>
          {/* Pinned Files */}
          {pinnedFiles.length > 0 && (
            <div className="flex-shrink-0 backdrop-blur-xl bg-amber-100/40 border-b border-amber-200/50">
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900 mb-4">
                  <Pin size={16} />
                  Pinned Resources
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pinnedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="backdrop-blur-sm bg-white/60 rounded-xl p-4 flex items-center gap-3 border border-amber-300/50 hover:shadow-lg transition-all"
                    >
                      <div className="p-3 bg-amber-100/50 rounded-lg">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{file.name}</div>
                        <div className="text-xs text-gray-600 mt-0.5">
                          {formatFileSize(file.size)} • {file.uploadedBy}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file)}
                        className="p-2 hover:bg-amber-200/50 rounded-lg flex-shrink-0 transition-all"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={fileSearchQuery}
                    onChange={(e) => setFileSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-white/60 rounded-xl focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 transition-all"
                  />
                </div>
                <select
                  value={selectedFileCategory}
                  onChange={(e) => setSelectedFileCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-white/60 rounded-xl focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 font-medium transition-all"
                >
                  {fileCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  disabled={isUploading}
                  className="px-5 py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all font-semibold disabled:opacity-50 border border-white/20"
                >
                  <Upload size={18} />
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>

              {/* Files Grid */}
              {filteredFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="backdrop-blur-sm bg-white/60 border-2 border-white/60 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-4 bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] rounded-xl shadow-sm">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="relative menu-container">
                          <button
                            onClick={() =>
                              setSelectedMessageMenu(
                                selectedMessageMenu === file.id ? null : file.id
                              )
                            }
                            className="p-2 hover:bg-gray-100/50 rounded-lg transition-all"
                          >
                            <MoreVertical size={18} />
                          </button>
                          {selectedMessageMenu === file.id && (
                            <div className="absolute right-0 top-10 backdrop-blur-xl bg-white/90 shadow-2xl rounded-xl border border-white/60 py-2 z-[200] min-w-[160px]">
                              <button
                                onClick={() => {
                                  handleDownloadFile(file);
                                  setSelectedMessageMenu(null);
                                }}
                                className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                              >
                                <Download size={16} /> Download
                              </button>
                              <button
                                onClick={() => handleShareFileLink(file)}
                                className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                              >
                                <LinkIcon size={16} /> Share Link
                              </button>
                              <button
                                onClick={() => {
                                  handleToggleFilePin(file.id);
                                  setSelectedMessageMenu(null);
                                }}
                                className="w-full px-4 py-2.5 hover:bg-gray-100/50 flex items-center gap-3 text-sm text-gray-700 font-medium transition-all"
                              >
                                <Pin size={16} /> {file.isPinned ? "Unpin" : "Pin"}
                              </button>
                              <div className="border-t border-gray-200/50 my-1" />
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="w-full px-4 py-2.5 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 font-medium transition-all"
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="font-bold text-sm mb-2 truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        {formatFileSize(file.size)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 gap-2 mb-3">
                        <span className="truncate">{file.uploadedBy}</span>
                        <span className="flex-shrink-0">{formatDate(file.uploadedAt)}</span>
                      </div>
                      <div>
                        <span className="text-xs px-3 py-1.5 bg-[#f6ede8] text-[#8b7355] rounded-full font-medium border border-[#8b7355]/20">
                          {file.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <FileText size={56} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No files found</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ==========================
          DOUBTS TAB
      ========================== */}
      {activeTab === "doubts" && (
        <>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {/* Search and Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={doubtSearchQuery}
                    onChange={(e) => setDoubtSearchQuery(e.target.value)}
                    placeholder="Search doubts..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-white/60 rounded-xl focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 transition-all"
                  />
                </div>
                <select
                  value={doubtFilter}
                  onChange={(e) => setDoubtFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-white/60 rounded-xl focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 font-medium transition-all"
                >
                  <option value="all">All Doubts</option>
                  <option value="unsolved">Unsolved</option>
                  <option value="solved">Solved</option>
                </select>
                <button
                  onClick={() => setShowDoubtForm(!showDoubtForm)}
                  className="px-5 py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all font-semibold whitespace-nowrap border border-white/20"
                >
                  <HelpCircle size={18} />
                  Ask Doubt
                </button>
              </div>

              {/* Doubt Form */}
              {showDoubtForm && (
                <div className="backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-2xl p-6 sm:p-8 mb-6 shadow-xl">
                  <h3 className="text-xl font-bold text-[#4a3728] mb-6">Post a Doubt</h3>

                  <input
                    type="text"
                    value={doubtInput.title}
                    onChange={(e) =>
                      setDoubtInput({ ...doubtInput, title: e.target.value })
                    }
                    placeholder="Doubt title..."
                    className="w-full px-4 py-3 border-2 border-white/60 rounded-xl mb-4 focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 transition-all"
                  />

                  <textarea
                    value={doubtInput.question}
                    onChange={(e) =>
                      setDoubtInput({ ...doubtInput, question: e.target.value })
                    }
                    placeholder="Describe your doubt in detail..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-white/60 rounded-xl mb-4 focus:outline-none focus:border-[#8b7355]/50 resize-none backdrop-blur-sm bg-white/60 transition-all"
                  />

                  <select
                    value={doubtInput.category}
                    onChange={(e) =>
                      setDoubtInput({ ...doubtInput, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-white/60 rounded-xl mb-4 focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 font-medium transition-all"
                  >
                    {doubtCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  {/* Tags */}
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        placeholder="Add tag..."
                        className="flex-1 px-4 py-3 border-2 border-white/60 rounded-xl focus:outline-none focus:border-[#8b7355]/50 backdrop-blur-sm bg-white/60 transition-all"
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-3 bg-gray-200/60 rounded-xl hover:bg-gray-300/60 flex-shrink-0 backdrop-blur-sm transition-all"
                      >
                        <Tag size={18} />
                      </button>
                    </div>
                    {doubtInput.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {doubtInput.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-[#f6ede8] text-[#8b7355] rounded-full text-sm flex items-center gap-2 font-medium border border-[#8b7355]/20"
                          >
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tag Members */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowMemberTag(!showMemberTag)}
                      className="text-sm font-semibold text-[#8b7355] mb-3 flex items-center gap-2 hover:underline"
                    >
                      <AtSign size={16} />
                      Tag Members {taggedMembers.length > 0 && `(${taggedMembers.length})`}
                    </button>
                    {showMemberTag && (
                      <div className="border-2 border-white/60 rounded-xl p-4 max-h-48 overflow-y-auto backdrop-blur-sm bg-white/40">
                        {members.slice(1).map((member) => (
                          <label
                            key={member.id}
                            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/50 rounded-lg px-3 transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={taggedMembers.includes(member.id)}
                              onChange={() => handleToggleTagMember(member.id)}
                              className="rounded"
                            />
                            <span className="text-xl">{member.avatar}</span>
                            <span className="text-sm font-medium">{member.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handlePostDoubt}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white rounded-xl hover:shadow-lg transition-all font-semibold border border-white/20"
                    >
                      Post Doubt
                    </button>
                    <button
                      onClick={() => {
                        setShowDoubtForm(false);
                        setDoubtInput({ title: "", question: "", category: "Physics", tags: [] });
                        setTaggedMembers([]);
                        setShowMemberTag(false);
                      }}
                      className="px-6 py-3 border-2 border-white/60 rounded-xl hover:bg-white/50 transition-all font-semibold backdrop-blur-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Doubts List */}
              {filteredDoubts.length > 0 ? (
                <div className="space-y-4">
                  {filteredDoubts.map((doubt) => (
                    <div
                      key={doubt.id}
                      className="backdrop-blur-xl bg-white/70 border-2 border-white/60 rounded-2xl p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedDoubt(doubt)}
                    >
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] border-2 border-[#8b7355]/30 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                            {doubt.userAvatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-[#4a3728] truncate text-base">{doubt.title}</h3>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {doubt.userName} • {formatDate(doubt.timestamp)}
                            </p>
                          </div>
                        </div>
                        {doubt.isSolved ? (
                          <span className="px-3 py-1.5 bg-green-500/10 text-green-700 rounded-full text-xs flex items-center gap-1.5 flex-shrink-0 font-semibold border border-green-500/20">
                            <CheckCircle size={14} />
                            <span className="hidden sm:inline">Solved</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 bg-orange-500/10 text-orange-700 rounded-full text-xs flex items-center gap-1.5 flex-shrink-0 font-semibold border border-orange-500/20">
                            <AlertCircle size={14} />
                            <span className="hidden sm:inline">Unsolved</span>
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                        {doubt.question}
                      </p>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1.5 bg-[#f6ede8] text-[#8b7355] rounded-full text-xs font-semibold border border-[#8b7355]/20">
                            {doubt.category}
                          </span>
                          {doubt.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 bg-gray-100/60 text-gray-700 rounded-full text-xs font-medium backdrop-blur-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                          {doubt.tags.length > 2 && (
                            <span className="px-3 py-1.5 bg-gray-100/60 text-gray-600 rounded-full text-xs font-medium backdrop-blur-sm">
                              +{doubt.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpvoteDoubt(doubt.id);
                            }}
                            className="flex items-center gap-1.5 hover:text-[#8b7355] transition-all font-medium"
                          >
                            <ThumbsUp size={16} />
                            <span>{doubt.upvotes}</span>
                          </button>
                          <span className="flex items-center gap-1.5 font-medium">
                            <MessageSquare size={16} />
                            <span>{doubt.answers.length}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <HelpCircle size={56} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No doubts found</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Doubt Detail Modal */}
      {selectedDoubt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[300] p-4 overflow-y-auto">
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-white/60">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-b-2 border-white/60 p-6 sm:p-8 flex items-start justify-between gap-4 rounded-t-3xl z-10">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] border-2 border-[#8b7355]/30 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                    {selectedDoubt.userAvatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#4a3728] break-words">
                      {selectedDoubt.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedDoubt.userName} • {formatDate(selectedDoubt.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-4 py-2 bg-[#f6ede8] text-[#8b7355] rounded-full text-sm font-semibold border border-[#8b7355]/20">
                    {selectedDoubt.category}
                  </span>
                  {selectedDoubt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedDoubt(null)}
                className="p-2.5 hover:bg-gray-100/50 rounded-xl flex-shrink-0 transition-all"
              >
                <X size={22} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto">
              {/* Question */}
              <div className="p-6 sm:p-8 border-b-2 border-white/60">
                <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">{selectedDoubt.question}</p>
                <div className="flex flex-wrap items-center gap-4 mt-5">
                  <button
                    onClick={() => handleUpvoteDoubt(selectedDoubt.id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8b7355] font-medium transition-all"
                  >
                    <ThumbsUp size={18} />
                    {selectedDoubt.upvotes} Upvotes
                  </button>
                  {selectedDoubt.userId === currentUserId && !selectedDoubt.isSolved && (
                    <button
                      onClick={() => handleMarkDoubtSolved(selectedDoubt.id)}
                      className="px-4 py-2 bg-green-500/10 text-green-700 rounded-lg text-sm hover:bg-green-500/20 font-semibold transition-all border border-green-500/20"
                    >
                      Mark as Solved
                    </button>
                  )}
                </div>
              </div>

              {/* Answers */}
              <div className="p-6 sm:p-8">
                <h3 className="font-bold text-lg mb-5">
                  {selectedDoubt.answers.length}{" "}
                  {selectedDoubt.answers.length === 1 ? "Answer" : "Answers"}
                </h3>
                <div className="space-y-4 mb-6">
                  {selectedDoubt.answers.map((answer) => (
                    <div
                      key={answer.id}
                      className={`border-2 rounded-2xl p-5 transition-all ${
                        answer.isAccepted
                          ? "border-green-400 bg-green-50/50 backdrop-blur-sm"
                          : "border-white/60 backdrop-blur-sm bg-white/40"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] border-2 border-[#8b7355]/30 flex items-center justify-center text-lg flex-shrink-0">
                            {answer.userAvatar}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm">{answer.userName}</p>
                            <p className="text-xs text-gray-600">
                              {formatMessageTime(answer.timestamp)}
                            </p>
                          </div>
                        </div>
                        {answer.isAccepted && (
                          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs flex items-center gap-1.5 flex-shrink-0 font-semibold">
                            <Check size={14} />
                            Accepted
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-4 break-words leading-relaxed">{answer.text}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() =>
                            handleVoteAnswer(selectedDoubt.id, answer.id, "up")
                          }
                          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-600 font-medium transition-all"
                        >
                          <ThumbsUp size={16} />
                          {answer.upvotes}
                        </button>
                        <button
                          onClick={() =>
                            handleVoteAnswer(selectedDoubt.id, answer.id, "down")
                          }
                          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 font-medium transition-all"
                        >
                          <ThumbsDown size={16} />
                          {answer.downvotes}
                        </button>
                        {selectedDoubt.userId === currentUserId &&
                          !answer.isAccepted &&
                          !selectedDoubt.isSolved && (
                            <button
                              onClick={() =>
                                handleAcceptAnswer(selectedDoubt.id, answer.id)
                              }
                              className="ml-auto px-4 py-1.5 bg-green-500/10 text-green-700 rounded-lg text-xs hover:bg-green-500/20 font-semibold transition-all border border-green-500/20"
                            >
                              Accept Answer
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Answer Input */}
                {!selectedDoubt.isSolved && (
                  <div>
                    <h4 className="font-bold mb-4">Your Answer</h4>
                    <textarea
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="Write your answer here..."
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-white/60 rounded-xl mb-4 focus:outline-none focus:border-[#8b7355]/50 resize-none backdrop-blur-sm bg-white/60 transition-all"
                    />
                    <button
                      onClick={handleAnswerDoubt}
                      disabled={!answerInput.trim()}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#8b7355] to-[#6b5847] text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
                    >
                      Post Answer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChat;