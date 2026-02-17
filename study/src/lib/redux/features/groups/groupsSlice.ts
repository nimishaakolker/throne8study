// ============================================================
// groupsSlice.ts
// ------------------------------------------------------------
// WHY THIS FILE EXISTS:
// Previously ALL state in MyGroups lived in useState:
//
//   const [groups, setGroups] = useState<Group[]>([...mockData])
//   const [activeTab, setActiveTab] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [settingsGroupId, setSettingsGroup] = useState(null)
//
// Problems with that approach:
//   1. Navigate away → groups reset back to mock data
//   2. Another page can't access groups count
//   3. Every update needs to be passed as props (prop drilling)
//
// With Redux:
//   - State survives navigation
//   - Any component can read/update groups
//   - One place to see ALL possible state changes (the reducers)
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Group, GroupTabType } from '../../types';

// ============================================================
// STATE SHAPE
// ------------------------------------------------------------
// This is the "blueprint" of what lives in Redux for groups.
// Every field here is accessible via useAppSelector.
// ============================================================
interface GroupsState {
  // The list of groups the current user belongs to
  items: Group[];

  // Which tab is active: 'all' | 'created' | 'joined'
  // Previously: useState<string>('all') in page.tsx
  activeTab: GroupTabType;

  // What the user typed in the search box
  // Previously: useState<string>('') in page.tsx
  searchQuery: string;

  // The id of the group whose settings modal is open
  // null means no modal is open
  // Previously: useState<Group | null>(null) in page.tsx
  // NOTE: We store the ID not the whole Group object.
  // Storing objects in Redux that also exist in items[] creates
  // duplicate data that can get out of sync.
  settingsGroupId: number | null;
}

// ============================================================
// INITIAL STATE
// ------------------------------------------------------------
// This is the starting value when the app first loads.
// In production, items[] would be populated by an API call.
// For now we use mock data so the UI works immediately.
// ============================================================
const initialState: GroupsState = {
  items: [
    {
      id: 1,
      title: 'Focus JEE Warriors',
      description: 'Daily 6AM-8AM study sessions for serious JEE aspirants',
      category: 'JEE Aspirant',
      members: 45,
      capacity: 50,
      goalHours: 8,
      cameraRequired: true,
      visibility: 'public',
      isCreator: true,
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      streak: 15,
      studyTime: 120,
      rank: 3,
      attendance: 95,
    },
    {
      id: 2,
      title: 'NEET Biology Masters',
      description: 'Evening biology deep dive sessions with doubt clearing',
      category: 'NEET Aspirant',
      members: 38,
      capacity: 40,
      goalHours: 6,
      cameraRequired: true,
      visibility: 'public',
      isCreator: false,
      joinedDate: '2024-01-20',
      lastActive: '5 hours ago',
      streak: 12,
      studyTime: 72,
      rank: 7,
      attendance: 88,
    },
    {
      id: 3,
      title: 'Early Birds Study Club',
      description: '5AM-7AM morning study sessions. Camera on, no distractions.',
      category: 'College Student',
      members: 25,
      capacity: 30,
      goalHours: 2,
      cameraRequired: true,
      visibility: 'private',
      isCreator: true,
      joinedDate: '2024-01-10',
      lastActive: '1 day ago',
      streak: 20,
      studyTime: 40,
      rank: 1,
      attendance: 98,
    },
    {
      id: 4,
      title: 'Python Coders Unite',
      description: 'Daily coding practice and project building sessions',
      category: 'Coding & Tech',
      members: 52,
      capacity: 60,
      goalHours: 4,
      cameraRequired: false,
      visibility: 'public',
      isCreator: false,
      joinedDate: '2024-01-25',
      lastActive: '30 mins ago',
      streak: 8,
      studyTime: 32,
      rank: 12,
      attendance: 75,
    },
    {
      id: 5,
      title: 'UPSC Strategy Group',
      description: 'Daily current affairs and answer writing practice',
      category: 'UPSC Preparation',
      members: 30,
      capacity: 35,
      goalHours: 10,
      cameraRequired: true,
      visibility: 'public',
      isCreator: true,
      joinedDate: '2024-01-05',
      lastActive: '4 hours ago',
      streak: 25,
      studyTime: 250,
      rank: 2,
      attendance: 92,
    },
  ],
  activeTab: 'all',
  searchQuery: '',
  settingsGroupId: null,
};

// ============================================================
// SLICE
// ------------------------------------------------------------
// createSlice does 3 things at once:
//   1. Defines the reducers (how state changes)
//   2. Auto-generates action creators from reducer names
//   3. Handles Immer immutability (you can write state.x = y
//      and it handles the immutable update behind the scenes)
// ============================================================
const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {

    // ----------------------------------------------------------
    // updateGroup
    // Merges partial updates into an existing group.
    // Called when: user saves changes in SettingsModal
    //
    // PayloadAction<{ id, data }> means the action carries:
    //   action.payload.id   → which group to update
    //   action.payload.data → what fields to update (partial)
    //
    // Partial<Group> means you don't have to pass ALL fields —
    // just the ones that changed.
    // ----------------------------------------------------------
    updateGroup: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Group> }>
    ) => {
      const index = state.items.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        // Spread existing group then overwrite with new data
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },

    // ----------------------------------------------------------
    // deleteGroup
    // Removes a group from the list entirely.
    // Called when: creator clicks "Delete Group" in settings
    //
    // Also clears settingsGroupId if it was the deleted group —
    // prevents showing a modal for a group that no longer exists.
    // ----------------------------------------------------------
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(g => g.id !== action.payload);
      if (state.settingsGroupId === action.payload) {
        state.settingsGroupId = null;
      }
    },

    // ----------------------------------------------------------
    // leaveGroup
    // Same as deleteGroup from the state perspective —
    // the group disappears from the user's list.
    // Kept as a separate action because in production, leaving
    // vs deleting will call different API endpoints.
    // ----------------------------------------------------------
    leaveGroup: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(g => g.id !== action.payload);
      if (state.settingsGroupId === action.payload) {
        state.settingsGroupId = null;
      }
    },

    // ----------------------------------------------------------
    // setActiveTab
    // Updates which tab filter is selected.
    // Called when: user clicks All / Created / Joined tabs
    // ----------------------------------------------------------
    setActiveTab: (state, action: PayloadAction<GroupTabType>) => {
      state.activeTab = action.payload;
    },

    // ----------------------------------------------------------
    // setSearchQuery
    // Updates the search string.
    // Called when: user types in the search input
    // ----------------------------------------------------------
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // ----------------------------------------------------------
    // openSettings
    // Stores which group's settings modal is open.
    // We store the ID not the object — the component uses the ID
    // to look up the full group from state.items via a selector.
    // ----------------------------------------------------------
    openSettings: (state, action: PayloadAction<number>) => {
      state.settingsGroupId = action.payload;
    },

    // ----------------------------------------------------------
    // closeSettings
    // Clears the open settings modal.
    // ----------------------------------------------------------
    closeSettings: (state) => {
      state.settingsGroupId = null;
    },
  },
});

// ============================================================
// EXPORTS
// ------------------------------------------------------------
// Named export for actions → used in hooks/components to dispatch
// Default export for reducer → registered in store.ts
// ============================================================
export const {
  updateGroup,
  deleteGroup,
  leaveGroup,
  setActiveTab,
  setSearchQuery,
  openSettings,
  closeSettings,
} = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;