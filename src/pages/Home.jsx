import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard } from '../store/index.js';
import getIcon from '../utils/iconUtils';

function Home({ darkMode, toggleDarkMode }) {
  const boards = useSelector(state => state.boards.boards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const Moon = getIcon("Moon");
  const Sun = getIcon("Sun");
  const Plus = getIcon("Plus");
  const ChevronRight = getIcon("ChevronRight");
  const Kanban = getIcon("Kanban");
  const Layout = getIcon("Layout");
  
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
    
    dispatch(addBoard(newBoard));
    toast.success("New board created!");
  };
  
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewBoard(newBoardTitle);
    setNewBoardTitle("");
    setShowNewBoardForm(false);
  };
  
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
              </span>
              <h1 className="text-xl font-bold tracking-tight">Trelllllooooooo</h1>
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
      
        <h1 className="text-2xl font-bold mb-8">Your Boards</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map(board => (
            <div 
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
              className="card p-6 cursor-pointer hover:shadow-lg transition-shadow"
              style={{ borderTop: `4px solid ${board.color}` }}
            >
              <div className="flex items-center mb-3">
                <Layout size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">{board.title}</h3>
              </div>
              <p className="text-surface-500 dark:text-surface-400 mb-4">
                Click to view and manage tasks
              </p>
              <button className="btn btn-outline w-full">Open Board</button>
            </div>
          ))}
          
          {/* Add New Board Tile */}
          <div 
            onClick={() => setShowNewBoardForm(true)}
            className="card p-6 border-2 border-dashed border-surface-300 dark:border-surface-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
          >
            <Plus size={40} className="text-primary dark:text-primary-light mb-3" />
            <h3 className="text-xl font-semibold mb-2">Create New Board</h3>
            <p className="text-surface-500 dark:text-surface-400">
              Add a new board to organize your tasks
            </p>
          </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default Home;