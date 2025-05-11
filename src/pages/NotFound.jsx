import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const AlertCircle = getIcon("AlertCircle");
  const Home = getIcon("Home");
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-surface-50 dark:bg-surface-900"
    >
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertCircle size={48} className="text-red-500 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-2">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          <Home size={20} className="mr-2" />
          Return Home
        </Link>
      </div>
    </motion.div>
  );
}

export default NotFound;