import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiActivity, FiBriefcase, FiHeart } from 'react-icons/fi';

const Home = () => {
  const cards = [
    {
      title: "Recommendation Model",
      description: "Get personalized content recommendations based on your emotional state and preferences.",
      path: "/recommendation",
      color: "from-blue-500 to-indigo-600",
      icon: <FiHeart className="w-8 h-8 mb-4" />,
      delay: 0.2
    },
    {
      title: "Stress Level Prediction",
      description: "Analyze your daily habits and symptoms to predict and manage your stress levels.",
      path: "/stress-prediction",
      color: "from-purple-500 to-pink-600",
      icon: <FiActivity className="w-8 h-8 mb-4" />,
      delay: 0.3
    },
    {
      title: "Burnout Prediction",
      description: "Identify early signs of burnout and get personalized prevention strategies.",
      path: "/burnout-prediction",
      color: "from-red-500 to-yellow-600",
      icon: <FiBriefcase className="w-8 h-8 mb-4" />,
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ML Dashboard</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Harness the power of machine learning to get personalized insights, predictions, and recommendations tailored to you.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card) => (
            <motion.div
              key={card.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: card.delay }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Link to={card.path} className="block h-full">
                <div className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-lg h-full flex flex-col overflow-hidden`}>
                  <div className="p-8 text-white flex-1 flex flex-col">
                    <div className="flex-1">
                      {card.icon}
                      <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
                      <p className="text-white/90 leading-relaxed mb-6">{card.description}</p>
                    </div>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white">
                        Explore
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How does it work?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our ML models are trained on extensive datasets to understand emotional patterns and human behaviors.
            Get started by exploring any of our prediction tools above, and discover insights that could help improve your wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <span className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">Advanced ML Algorithms</span>
            <span className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-full">Real-time Predictions</span>
            <span className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">Personalized Insights</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;