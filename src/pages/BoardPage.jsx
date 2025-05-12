import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function BoardPage({ darkMode, toggleDarkMode }) {
  const { boardId } = useParams();
  const navigate = useNavigate();
  
  // Get board data from Redux store
  const boards = useSelector(state => state.boards.boards);
  const selectedBoard = boards.find(board => board.id === parseInt(boardId));
  
  const ArrowLeft = getIcon("ArrowLeft");
  
  // Redirect to home if board doesn't exist
  useEffect(() => {
    if (!selectedBoard) {
      navigate('/');
    }
  }, [selectedBoard, navigate]);
  
  if (!selectedBoard) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <div className="p-4 flex items-center">
        <button onClick={() => navigate('/')} className="btn btn-outline mr-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Boards
        </button>
      </div>
      <MainFeature board={selectedBoard} />
    </motion.div>
  );
}

export default BoardPage;