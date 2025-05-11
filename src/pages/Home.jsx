import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home({ darkMode, toggleDarkMode }) {
  const [boards, setBoards] = useState([
    { id: 1, title: "Project Alpha", color: "#3b82f6" },
    { id: 2, title: "Marketing Tasks", color: "#8b5cf6" },
    { id: 3, title: "Personal Goals", color: "#f97316" }
  ]);
  
  const Moon = getIcon("Moon");
  const Sun = getIcon("Sun");
  const Plus = getIcon("Plus");
  const ChevronRight = getIcon("ChevronRight");
  const Kanban = getIcon("Kanban");
  
  const addNewBoard = (boardTitle) => {
    if (!boardTitle.trim()) {
      toast.error("Board title cannot be empty!");
      return;
    }
    
    const colors = ["#3b82f6", "#8b5cf6", "#f97316", "#ec4899", "#10b981", "#6366f1"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newBoard = {
      id: Date.now(),
      title: boardTitle,
      color: randomColor
    };
    
    setBoards([...boards, newBoard]);
    toast.success("New board created successfully!");
  };
  
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewBoard(newBoardTitle);
    setNewBoardTitle("");
    setShowNewBoardForm(false);
  };
  
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header/Navigation */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-primary dark:text-primary-light">
                <Kanban size={28} />
              <h1 className="text-xl font-bold tracking-tight">Trelllllooooooo</h1>
              <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="card h-full">
              <h2 className="text-lg font-semibold mb-4">Your Boards</h2>
              
              <ul className="space-y-2 mb-4">
                {boards.map(board => (
                  <li key={board.id}>
                    <button
                      onClick={() => setSelectedBoard(board)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all group ${
                        selectedBoard?.id === board.id 
                          ? 'bg-primary/10 dark:bg-primary/20'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                      }`}
                    >
                      <span 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: board.color }}
                      ></span>
                      <span className="flex-1 text-left truncate">{board.title}</span>
                      <ChevronRight 
                        size={16} 
                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                          selectedBoard?.id === board.id ? 'opacity-100' : ''
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              
              {showNewBoardForm ? (
                <form onSubmit={handleSubmit} className="mt-2">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Enter board title"
                      className="input text-sm"
                      value={newBoardTitle}
                      onChange={(e) => setNewBoardTitle(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary text-sm py-1.5">
                      Create
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline text-sm py-1.5"
                      onClick={() => setShowNewBoardForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setShowNewBoardForm(true)} 
                  className="flex items-center justify-center w-full p-2 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-surface-500 dark:text-surface-400"
                >
                  <Plus size={16} className="mr-2" />
                  <span>Add New Board</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {selectedBoard ? (
              <MainFeature board={selectedBoard} />
            ) : (
              <div className="card p-8 flex flex-col items-center justify-center text-center">
                <Kanban size={64} className="text-primary dark:text-primary-light mb-4" />
                <h2 className="text-2xl font-bold mb-2">Select a Board to Get Started</h2>
                <p className="text-surface-500 dark:text-surface-400 max-w-md mb-4">
                  Choose a board from the sidebar or create a new one to organize your tasks in a visual Kanban layout.
                </p>
                <button 
                  onClick={() => setShowNewBoardForm(true)}
                  className="btn btn-primary flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Create Your First Board
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default Home;