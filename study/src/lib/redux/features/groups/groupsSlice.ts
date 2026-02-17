import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { Group, GroupTabType, PublicGroup } from '../../types';

// ─── State ───────────────────────────────────────────────────────────────────

interface ExpandedSections {
  university: boolean;
  dsa: boolean;
  jee: boolean;
  public: boolean;
}

interface GroupsState {
  items: Group[];
  activeTab: GroupTabType;
  searchQuery: string;
  settingsGroupId: number | null;
  browseItems: Group[];
  publicGroups: PublicGroup[];
  joinedGroupIds: number[];
  browseSearchQuery: string;
  isCreateModalOpen: boolean;
  expandedSections: ExpandedSections;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: GroupsState = {
  items: [
    {
      id: 1,
      title: 'Focus JEE Warriors',
      description: 'Daily 6AM-8AM study sessions for serious JEE aspirants',
      category: 'JEE Aspirant',
      members: 45, capacity: 50, goalHours: 8,
      cameraRequired: true, cameraOn: true, visibility: 'public',
      isCreator: true, joinedDate: '2024-01-15', lastActive: '2 hours ago',
      streak: 15, studyTime: 120, rank: 3, attendanceAvg: 95, attendance: 95,
      leader: 'Aman Sharma',
    },
    {
      id: 2,
      title: 'NEET Biology Masters',
      description: 'Evening biology deep dive sessions with doubt clearing',
      category: 'NEET Aspirant',
      members: 38, capacity: 40, goalHours: 6,
      cameraRequired: true, cameraOn: true, visibility: 'public',
      isCreator: false, joinedDate: '2024-01-20', lastActive: '5 hours ago',
      streak: 12, studyTime: 72, rank: 7, attendanceAvg: 88, attendance: 88,
      leader: 'Riya Verma',
    },
    {
      id: 3,
      title: 'Early Birds Study Club',
      description: '5AM-7AM morning study sessions. Camera on, no distractions.',
      category: 'College Student',
      members: 25, capacity: 30, goalHours: 2,
      cameraRequired: true, cameraOn: true, visibility: 'private',
      isCreator: true, joinedDate: '2024-01-10', lastActive: '1 day ago',
      streak: 20, studyTime: 40, rank: 1, attendanceAvg: 98, attendance: 98,
      leader: 'You',
    },
    {
      id: 4,
      title: 'Python Coders Unite',
      description: 'Daily coding practice and project building sessions',
      category: 'Coding & Tech',
      members: 52, capacity: 60, goalHours: 4,
      cameraRequired: false, cameraOn: false, visibility: 'public',
      isCreator: false, joinedDate: '2024-01-25', lastActive: '30 mins ago',
      streak: 8, studyTime: 32, rank: 12, attendanceAvg: 75, attendance: 75,
      leader: 'Kunal Mehta',
    },
    {
      id: 5,
      title: 'UPSC Strategy Group',
      description: 'Daily current affairs and answer writing practice',
      category: 'UPSC Preparation',
      members: 30, capacity: 35, goalHours: 10,
      cameraRequired: true, cameraOn: true, visibility: 'public',
      isCreator: true, joinedDate: '2024-01-05', lastActive: '4 hours ago',
      streak: 25, studyTime: 250, rank: 2, attendanceAvg: 92, attendance: 92,
      leader: 'You',
    },
  ],
  activeTab: 'all',
  searchQuery: '',
  settingsGroupId: null,
  browseItems: [],
  publicGroups: [],
  joinedGroupIds: [],
  browseSearchQuery: '',
  isCreateModalOpen: false,
  expandedSections: {
    university: false,
    dsa: false,
    jee: false,
    public: false,
  },
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    // my-groups
    updateGroup: (state, action: PayloadAction<{ id: number; data: Partial<Group> }>) => {
      const index = state.items.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(g => g.id !== action.payload);
      if (state.settingsGroupId === action.payload) state.settingsGroupId = null;
    },
    leaveGroup: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(g => g.id !== action.payload);
      if (state.settingsGroupId === action.payload) state.settingsGroupId = null;
    },
    setActiveTab: (state, action: PayloadAction<GroupTabType>) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    openSettings: (state, action: PayloadAction<number>) => {
      state.settingsGroupId = action.payload;
    },
    closeSettings: (state) => {
      state.settingsGroupId = null;
    },

    // browse-groups
    seedBrowseGroups: (
      state,
      action: PayloadAction<{ browseItems: Group[]; publicGroups: PublicGroup[] }>
    ) => {
      if (state.browseItems.length === 0) state.browseItems = action.payload.browseItems;
      if (state.publicGroups.length === 0) state.publicGroups = action.payload.publicGroups;
    },
    joinGroup: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.joinedGroupIds.includes(id)) return;
      state.joinedGroupIds.push(id);
      const group = state.browseItems.find(g => g.id === id);
      if (group && group.members < group.capacity) group.members += 1;
    },
    unjoinGroup: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.joinedGroupIds = state.joinedGroupIds.filter(gid => gid !== id);
      const group = state.browseItems.find(g => g.id === id);
      if (group && group.members > 0) group.members -= 1;
    },
    setBrowseSearchQuery: (state, action: PayloadAction<string>) => {
      state.browseSearchQuery = action.payload;
    },
    openCreateModal: (state) => { state.isCreateModalOpen = true; },
    closeCreateModal: (state) => { state.isCreateModalOpen = false; },
    toggleSectionExpanded: (state, action: PayloadAction<keyof ExpandedSections>) => {
      state.expandedSections[action.payload] = !state.expandedSections[action.payload];
    },
  },
});

// ─── Actions ─────────────────────────────────────────────────────────────────

export const {
  updateGroup, deleteGroup, leaveGroup,
  setActiveTab, setSearchQuery, openSettings, closeSettings,
  seedBrowseGroups, joinGroup, unjoinGroup,
  setBrowseSearchQuery, openCreateModal, closeCreateModal, toggleSectionExpanded,
} = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;

// ─── Selector type (avoids circular import with store.ts) ─────────────────────

interface StateWithGroups {
  groups: GroupsState;
}

// ─── Selectors — my-groups ────────────────────────────────────────────────────

export const selectGroupItems      = (state: StateWithGroups) => state.groups.items;
export const selectActiveTab       = (state: StateWithGroups) => state.groups.activeTab;
export const selectSearchQuery     = (state: StateWithGroups) => state.groups.searchQuery;
export const selectSettingsGroupId = (state: StateWithGroups) => state.groups.settingsGroupId;
export const selectSettingsGroup   = (state: StateWithGroups) =>
  state.groups.items.find(g => g.id === state.groups.settingsGroupId) ?? null;

export const selectFilteredGroups = createSelector(
  [selectGroupItems, selectActiveTab, selectSearchQuery],
  (items, activeTab, searchQuery) => {
    let result = items;
    if (activeTab === 'created') result = result.filter(g => g.isCreator);
    if (activeTab === 'joined')  result = result.filter(g => !g.isCreator);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        g => g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)
      );
    }
    return result;
  }
);

// ─── Selectors — browse-groups ────────────────────────────────────────────────

export const selectBrowseItems       = (state: StateWithGroups) => state.groups.browseItems ?? [];
export const selectPublicGroups      = (state: StateWithGroups) => state.groups.publicGroups;
export const selectJoinedGroupIds    = (state: StateWithGroups) => state.groups.joinedGroupIds;
export const selectBrowseSearchQuery = (state: StateWithGroups) => state.groups.browseSearchQuery;
export const selectIsCreateModalOpen = (state: StateWithGroups) => state.groups.isCreateModalOpen;
export const selectExpandedSections  = (state: StateWithGroups) => state.groups.expandedSections;

const filterBySection = (items: Group[], section: string, query: string): Group[] => {
  if (!items || !Array.isArray(items)) return [];
  let result = items.filter(g => (g as any).section === section);
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      g => g.title.toLowerCase().includes(q) ||
           g.category.toLowerCase().includes(q) ||
           g.leader.toLowerCase().includes(q)
    );
  }
  return result;
};

export const selectFilteredUniversityGroups = createSelector(
  [selectBrowseItems, selectBrowseSearchQuery],
  (items, query) => filterBySection(items, 'university', query)
);
export const selectFilteredDsaGroups = createSelector(
  [selectBrowseItems, selectBrowseSearchQuery],
  (items, query) => filterBySection(items, 'dsa', query)
);
export const selectFilteredJeeGroups = createSelector(
  [selectBrowseItems, selectBrowseSearchQuery],
  (items, query) => filterBySection(items, 'jee', query)
);