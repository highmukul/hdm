import { motion } from 'framer-motion';

const EmptyState = ({ icon, title, message, actionText, onActionClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
    >
      <div className="mx-auto text-primary mb-4 text-5xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-6">{message}</p>
      {actionText && onActionClick && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onActionClick}
          className="bg-primary text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary-dark transition-colors"
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
