// FilterModal.tsx - Next.js TypeScript Version

// Import React and hooks (React import is optional in Next.js 13+)
import React, { useState } from 'react';

// Import icons from lucide-react (common icon library for Next.js)
import { X, Globe, Camera, CameraOff, Users } from 'lucide-react';

// ==========================================
// TYPE DEFINITIONS (KEY DIFFERENCE #1)
// ==========================================

// Define the structure of filter state
interface FilterState {
  category: string[];
  visibility: 'all' | 'public';
  cameraRequired: 'all' | 'yes' | 'no';
  attendanceRequired: 'all' | 'yes' | 'no';
  availability: 'all' | 'available';
  rank: 'all' | string;
}

// Define props interface for the component
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void; // Optional callback with filters
}

// ==========================================
// COMPONENT DEFINITION (KEY DIFFERENCE #2)
// ==========================================

// Use React.FC (Function Component) with typed props
const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  onApply 
}) => {
  
  // ==========================================
  // STATE WITH TYPE ANNOTATION (KEY DIFFERENCE #3)
  // ==========================================
  
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    visibility: 'all',
    cameraRequired: 'all',
    attendanceRequired: 'all',
    availability: 'all',
    rank: 'all'
  });

  // ==========================================
  // CONSTANTS WITH TYPE INFERENCE
  // ==========================================
  
  // TypeScript infers this as readonly string array
  const categories: readonly string[] = [
    'University',
    'School',
    'Working Professional'
  ] as const;

  // ==========================================
  // EVENT HANDLERS WITH TYPED PARAMETERS
  // ==========================================
  
  // Type the parameter as string
  const toggleCategory = (cat: string): void => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter(c => c !== cat)
        : [...prev.category, cat]
    }));
  };

  const handleApply = (): void => {
    console.log('Applied filters:', filters);
    
    // Call parent callback if provided
    if (onApply) {
      onApply(filters);
    }
    
    onClose();
  };

  const handleReset = (): void => {
    setFilters({
      category: [],
      visibility: 'all',
      cameraRequired: 'all',
      attendanceRequired: 'all',
      availability: 'all',
      rank: 'all'
    });
  };

  // Early return if modal is closed
  if (!isOpen) return null;

  // ==========================================
  // JSX RETURN (Similar to React JS)
  // ==========================================
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl shadow-2xl max-w-xl w-full">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-[#4a3728]">Filter Groups</h2>
            <p className="text-sm text-[#6b5847]">Find your perfect study group</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-4 bg-white rounded-b-2xl">
          
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-bold text-[#4a3728] mb-3">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.category.includes(cat)
                      ? 'bg-[#8b7355] text-white shadow-md'
                      : 'bg-[#f6ede8] text-[#4a3728] hover:bg-[#e0d8cf]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Filters Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Public Only Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="text-[#4a3728]" size={18} />
                <span className="text-sm font-semibold text-[#4a3728]">
                  Public Only
                </span>
              </div>
              <button
                onClick={() => setFilters({ 
                  ...filters, 
                  visibility: filters.visibility === 'public' ? 'all' : 'public' 
                })}
                className={`w-11 h-6 rounded-full transition-all ${
                  filters.visibility === 'public' ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
                aria-label="Toggle public visibility"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                  filters.visibility === 'public' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Camera On Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <Camera className="text-[#4a3728]" size={18} />
                <span className="text-sm font-semibold text-[#4a3728]">
                  Camera On
                </span>
              </div>
              <button
                onClick={() => setFilters({ 
                  ...filters, 
                  cameraRequired: filters.cameraRequired === 'yes' ? 'all' : 'yes' 
                })}
                className={`w-11 h-6 rounded-full transition-all ${
                  filters.cameraRequired === 'yes' ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
                aria-label="Toggle camera required"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                  filters.cameraRequired === 'yes' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Camera Off Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <CameraOff className="text-[#4a3728]" size={18} />
                <span className="text-sm font-semibold text-[#4a3728]">
                  Camera Off
                </span>
              </div>
              <button
                onClick={() => setFilters({ 
                  ...filters, 
                  cameraRequired: filters.cameraRequired === 'no' ? 'all' : 'no' 
                })}
                className={`w-11 h-6 rounded-full transition-all ${
                  filters.cameraRequired === 'no' ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
                aria-label="Toggle camera off"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                  filters.cameraRequired === 'no' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Available Only Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#f6ede8] rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="text-[#4a3728]" size={18} />
                <span className="text-sm font-semibold text-[#4a3728]">
                  Available Only
                </span>
              </div>
              <button
                onClick={() => setFilters({ 
                  ...filters, 
                  availability: filters.availability === 'available' ? 'all' : 'available' 
                })}
                className={`w-11 h-6 rounded-full transition-all ${
                  filters.availability === 'available' ? 'bg-[#8b7355]' : 'bg-gray-300'
                }`}
                aria-label="Toggle availability filter"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                  filters.availability === 'available' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 border-2 border-[#4a3728] text-[#4a3728] rounded-lg font-bold hover:bg-[#f6ede8] transition-all"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#8b7355] to-[#6b5847] hover:from-[#6b5847] hover:to-[#4a3728] text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// EXPORT (KEY DIFFERENCE #4)
// ==========================================

// Named export (preferred in Next.js)
export default FilterModal;

// You can also export the types for use in parent components
export type { FilterState, FilterModalProps };