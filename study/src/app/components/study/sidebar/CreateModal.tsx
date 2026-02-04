// CreateGroupModal.tsx - Next.js TypeScript Version

'use client';  // Required for useState and browser APIs in Next.js 13+

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Download, 
  Copy, 
  Share2, 
  Users, 
  Target, 
  Globe, 
  Lock, 
  Camera, 
  CameraOff 
} from 'lucide-react';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

// Step type - only two possible values
type ModalStep = 'form' | 'success';

// Visibility type - union of literal types
type Visibility = 'public' | 'private';

// Form data structure
interface FormData {
  title: string;
  description: string;
  cameraOn: boolean;
  goalHours: number;
  attendanceRequired: boolean;
  attendanceAvg: number;
  leader: string;
  visibility: Visibility;
  category: string;
  capacity: number;
}

// Component props
interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGroupCreated?: (formData: FormData, groupLink: string) => void;  // Optional callback
}

// ==========================================
// COMPONENT
// ==========================================

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ 
  isOpen, 
  onClose,
  onGroupCreated 
}) => {
  
  // ==========================================
  // STATE - All properly typed
  // ==========================================
  
  const [step, setStep] = useState<ModalStep>('form');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    cameraOn: false,
    goalHours: 8,
    attendanceRequired: false,
    attendanceAvg: 75,
    leader: '',
    visibility: 'public',
    category: '',
    capacity: 20
  });

  const [groupLink, setGroupLink] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // ==========================================
  // CONSTANTS
  // ==========================================
  
  const categories: readonly string[] = [
    'School Student',
    'College Student',
    'Other'
  ] as const;

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================
  
  // Generate a random group link
  const generateGroupLink = (): string => {
    const randomId = Math.random().toString(36).substr(2, 9);
    return `https://throne8.app/join/${randomId}`;
  };

  // ==========================================
  // EVENT HANDLERS - All typed
  // ==========================================
  
  const handleSubmit = (): void => {
    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.leader) {
      alert('Please fill in all required fields');
      return;
    }
    
    const generatedLink = generateGroupLink();
    setGroupLink(generatedLink);
    setStep('success');
    
    // Call parent callback if provided
    if (onGroupCreated) {
      onGroupCreated(formData, generatedLink);
    }
  };

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(groupLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link. Please copy manually.');
    }
  };

  const handleClose = (): void => {
    setStep('form');
    setFormData({
      title: '',
      description: '',
      cameraOn: false,
      goalHours: 8,
      attendanceRequired: false,
      attendanceAvg: 75,
      leader: '',
      visibility: 'public',
      category: '',
      capacity: 20
    });
    onClose();
  };

  // ==========================================
  // INPUT CHANGE HANDLERS - Typed events
  // ==========================================
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, leader: e.target.value });
  };

  const handleGoalHoursChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, goalHours: parseInt(e.target.value) || 8 });
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, capacity: parseInt(e.target.value) || 20 });
  };

  const handleAttendanceAvgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, attendanceAvg: parseInt(e.target.value) });
  };

  const toggleVisibility = (visibility: Visibility): void => {
    setFormData({ ...formData, visibility });
  };

  const toggleCameraOn = (): void => {
    setFormData({ ...formData, cameraOn: !formData.cameraOn });
  };

  const toggleAttendanceRequired = (): void => {
    setFormData({ ...formData, attendanceRequired: !formData.attendanceRequired });
  };

  // Early return if modal is closed
  if (!isOpen) return null;

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================
  
  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#4a3728]">Group Created!</h2>
            <button 
              onClick={handleClose} 
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 space-y-3">
            {/* Success Icon */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#4a3728]">
                "{formData.title}" is now live!
              </h3>
            </div>

            {/* QR Code Section */}
            <div className="bg-gradient-to-br from-[#f6ede8] to-[#e0d8cf] rounded-xl p-4 text-center space-y-3">
              <p className="text-sm font-semibold text-[#4a3728]">Scan to Join</p>
              <div className="bg-white w-32 h-32 mx-auto rounded-lg shadow-md flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-br from-[#4a3728] to-[#6b5847] opacity-20 rounded-md flex items-center justify-center">
                  <span className="text-xs text-[#4a3728] font-mono">QR Code</span>
                </div>
              </div>
              <button 
                className="bg-[#4a3728] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#6b5847] transition-all flex items-center gap-2 mx-auto"
                onClick={() => console.log('Download QR code')}
              >
                <Download size={16} />
                Download
              </button>
            </div>

            {/* Share Link */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#4a3728]">Share Link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={groupLink}
                  readOnly
                  className="flex-1 px-3 py-2 border-2 border-[#e0d8cf] rounded-lg bg-[#f6ede8] text-[#4a3728] font-mono text-xs"
                  aria-label="Group link"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-[#8b7355] text-white hover:bg-[#6b5847]'
                  }`}
                >
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button 
                className="bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(groupLink)}`, '_blank')}
              >
                <Share2 size={14} />
                WhatsApp
              </button>
              <button 
                className="bg-[#0088cc] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
                onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(groupLink)}`, '_blank')}
              >
                <Share2 size={14} />
                Telegram
              </button>
              <button 
                className="bg-[#1DA1F2] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(groupLink)}`, '_blank')}
              >
                <Share2 size={14} />
                Twitter
              </button>
            </div>

            {/* Group Details Summary */}
            <div className="bg-[#f6ede8] rounded-xl p-4 space-y-2">
              <p className="text-sm font-bold text-[#4a3728]">Group Details</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#6b5847]">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{formData.capacity} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={14} />
                  <span>{formData.goalHours}h/day</span>
                </div>
                <div className="flex items-center gap-1">
                  {formData.visibility === 'public' ? <Globe size={14} /> : <Lock size={14} />}
                  <span>{formData.visibility === 'public' ? 'Public' : 'Private'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {formData.cameraOn ? <Camera size={14} /> : <CameraOff size={14} />}
                  <span>Camera {formData.cameraOn ? 'On' : 'Off'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setStep('form')}
                className="flex-1 px-4 py-2 border-2 border-[#4a3728] text-[#4a3728] rounded-lg font-semibold text-sm hover:bg-[#f6ede8] transition-all"
              >
                Create Another
              </button>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-[#8b7355] text-white rounded-lg font-semibold text-sm hover:bg-[#6b5847] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // FORM SCREEN
  // ==========================================
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#4a3728]">Create Study Group</h2>
            <p className="text-sm text-[#6b5847]">Set up your study group</p>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Group Title */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-1">
              Group Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g., Focus JEE Warriors"
              className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="E.g., Daily 6AM-8AM study sessions. Rules: Camera on, no phone. For serious JEE aspirants with Class 11 Physics/Maths completed. Active study + doubt clearing."
              rows={2}
              className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/30 outline-none text-sm resize-none"
              required
            />
            <p className="mt-1 text-xs text-blue-600">
              <span className="font-semibold">💡 Tip:</span> Mention group rules, target audience, active times, prerequisites & study goals
            </p>
          </div>

          {/* Category and Leader */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                required
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                Leader *
              </label>
              <input
                type="text"
                value={formData.leader}
                onChange={handleLeaderChange}
                placeholder="Your name"
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Goal Hours and Capacity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                Daily Goal (hrs)
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={formData.goalHours}
                onChange={handleGoalHoursChange}
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                Capacity
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={formData.capacity}
                onChange={handleCapacityChange}
                className="w-full px-3 py-2 border-2 border-[#e0d8cf] rounded-lg focus:border-[#8b7355] outline-none text-sm"
              />
            </div>
          </div>

          {/* Visibility Toggle */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728] mb-2">
              Visibility
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleVisibility('public')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.visibility === 'public'
                    ? 'border-[#8b7355] bg-[#8b7355]/10'
                    : 'border-[#e0d8cf] hover:border-[#8b7355]/50'
                }`}
              >
                <Globe className="w-5 h-5 mx-auto mb-1 text-[#4a3728]" />
                <div className="text-sm font-semibold text-[#4a3728]">Public</div>
              </button>

              <button
                type="button"
                onClick={() => toggleVisibility('private')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.visibility === 'private'
                    ? 'border-[#8b7355] bg-[#8b7355]/10'
                    : 'border-[#e0d8cf] hover:border-[#8b7355]/50'
                }`}
              >
                <Lock className="w-5 h-5 mx-auto mb-1 text-[#4a3728]" />
                <div className="text-sm font-semibold text-[#4a3728]">Private</div>
              </button>
            </div>
          </div>

          {/* Settings Toggles */}
          <div className="space-y-2">
            {/* Camera Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <Camera className="text-[#4a3728]" size={16} />
                <div>
                  <div className="text-sm font-semibold text-[#4a3728]">
                    Camera Required
                  </div>
                  <div className="text-xs text-[#6b5847]">Must turn on camera</div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleCameraOn}
                className={`w-11 h-6 rounded-full transition-all ${
                  formData.cameraOn ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
                aria-label="Toggle camera requirement"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                  formData.cameraOn ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Attendance Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#4a3728]" size={16} />
                <div>
                  <div className="text-sm font-semibold text-[#4a3728]">
                    Attendance Required
                  </div>
                  <div className="text-xs text-[#6b5847]">Track attendance</div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleAttendanceRequired}
                className={`w-11 h-6 rounded-full transition-all ${
                  formData.attendanceRequired ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
                aria-label="Toggle attendance requirement"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                  formData.attendanceRequired ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Attendance Percentage (conditional) */}
            {formData.attendanceRequired && (
              <div className="pl-3">
                <label className="block text-xs font-semibold text-[#4a3728] mb-1">
                  Minimum Attendance (%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={formData.attendanceAvg}
                  onChange={handleAttendanceAvgChange}
                  className="w-full"
                />
                <div className="text-center text-xl font-bold text-[#4a3728] mt-1">
                  {formData.attendanceAvg}%
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Create Study Group
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// EXPORTS
// ==========================================

export default CreateGroupModal;

// Export types for parent components
export type { FormData, CreateGroupModalProps, ModalStep, Visibility };