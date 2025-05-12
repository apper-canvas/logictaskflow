import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial boards data
const initialBoards = [
  { id: 1, title: "Project Alpha", color: "#3b82f6" },
  { id: 2, title: "Marketing Tasks", color: "#8b5cf6" },
  { id: 3, title: "Personal Goals", color: "#f97316" }
];

// Initial lists with cards data
const initialLists = {
  1: [
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 101, title: "Research competitors", description: "Analyze top 5 competitors", labels: ["research"], dueDate: "2023-06-30" },
        { id: 102, title: "Create wireframes", description: "Design initial mockups", labels: ["design"], dueDate: "2023-07-01" }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        { id: 201, title: "Develop MVP", description: "Create minimal viable product", labels: ["development"], dueDate: "2023-07-15" }
      ]
    },
    {
      id: 3,
      title: "Done",
      cards: [
        { id: 301, title: "Project planning", description: "Initial project scope and timeline", labels: ["planning"], dueDate: "2023-06-15" }
      ]
    }
  ],
  2: [],
  3: []
};

// Create boards slice
const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: initialBoards,
    lists: initialLists
  },
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
      state.lists[action.payload.id] = [];
    },
    updateLists: (state, action) => {
      const { boardId, lists } = action.payload;
      state.lists[boardId] = lists;
    }
  }
});

// Export actions
export const { addBoard, updateLists } = boardsSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
});