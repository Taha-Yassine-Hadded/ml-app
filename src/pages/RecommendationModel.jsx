import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  TextField,
  OutlinedInput,
  Box 
} from '@mui/material';

const RecommendationModel = () => {
  const [formData, setFormData] = useState({
    emotion: 'happy',
    contentType: 'music',
    count: 3
  });
  const [recommendations, setRecommendations] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [contentTypes, setContentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch emotions and content types on component mount
  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/emotions');
        setEmotions(response.data.emotions);
        setFormData(prev => ({ ...prev, emotion: response.data.emotions[0] || 'happy' }));
      } catch (err) {
        console.error('Error fetching emotions:', err);
        setEmotions(['happy', 'sad', 'neutral', 'surprise', 'angry']);
      }
    };

    const fetchContentTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content-types');
        console.log('Content types response:', response.data);
        
        // Check for contentTypes (camelCase) which is what your API returns
        const contentTypes = response.data.contentTypes || [];
        console.log('Parsed content types:', contentTypes);
        
        setContentTypes(contentTypes);
        if (contentTypes.length > 0) {
          const defaultType = contentTypes.find(type => type !== 'all') || contentTypes[0];
          setFormData(prev => ({ ...prev, contentType: defaultType }));
        }
      } catch (err) {
        console.error('Error fetching content types:', err);
        setContentTypes(['music', 'video', 'book', 'article', 'game', 'meditation', 'podcast', 'documentary']);
      }
    };

    fetchEmotions();
    fetchContentTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'count' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const contentTypeParam = formData.contentType === "all" || formData.contentType === "" 
        ? null 
        : formData.contentType;
      
      console.log("Sending request with params:", {
        emotion: formData.emotion,
        content_type: contentTypeParam,
        count: formData.count
      });
      
      const response = await axios.get(`http://localhost:5000/api/recommendations`, {
        params: {
          emotion: formData.emotion,
          content_type: contentTypeParam,
          count: formData.count
        }
      });
      
      console.log("Received response:", response.data);
      if (response.data.status === 'success') {
        setRecommendations(response.data.recommendations);
        if (response.data.recommendations.length === 0) {
          setError('No recommendations found for the selected criteria.');
        }
      } else {
        setError(response.data.message || 'Failed to fetch recommendations');
      }
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get an emoji for the current emotion
  const getEmotionEmoji = (emotion) => {
    const emojiMap = {
      'happy': '😊',
      'sad': '😢',
      'neutral': '😐',
      'surprise': '😲',
      'angry': '😠',
      'fear': '😨',
      'disgust': '🤢',
      'calm': '😌'
    };
    return emojiMap[emotion.toLowerCase()] || '🙂';
  };

  // Get icon for content type
  const getContentTypeIcon = (type) => {
    const iconMap = {
      'music': '🎵',
      'video': '🎬',
      'book': '📚',
      'article': '📰',
      'game': '🎮',
      'meditation': '🧘',
      'podcast': '🎙️',
      'documentary': '🎥'
    };
    return iconMap[type.toLowerCase()] || '📌';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-6xl mx-auto my-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Personalized Content Recommendations</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Discover content tailored to your current emotional state and interests using our AI-powered recommendation engine.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Preferences</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <span className="mr-2 text-xl">{getEmotionEmoji(formData.emotion)}</span>
                  How are you feeling today?
                </div>
                <FormControl fullWidth disabled={loading || emotions.length === 0}>
                  <InputLabel id="emotion-label">Emotion</InputLabel>
                  <Select
                    labelId="emotion-label"
                    id="emotion"
                    name="emotion"
                    value={formData.emotion}
                    onChange={handleChange}
                    input={<OutlinedInput label="Emotion" />}
                    sx={{ 
                      borderRadius: '0.5rem',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                      }
                    }}
                  >
                    {emotions.map(emotion => (
                      <MenuItem key={emotion} value={emotion}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '8px' }}>{getEmotionEmoji(emotion)}</span>
                          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <span className="mr-2 text-xl">{getContentTypeIcon(formData.contentType)}</span>
                  What type of content are you looking for?
                </div>
                <FormControl fullWidth disabled={loading || contentTypes.length === 0}>
                  <InputLabel id="content-type-label">Content Type</InputLabel>
                  <Select
                    labelId="content-type-label"
                    id="contentType"
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Content Type" />}
                    sx={{ 
                      borderRadius: '0.5rem',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                      }
                    }}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    {contentTypes.filter(type => type !== 'all').map(type => (
                      <MenuItem key={type} value={type}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '8px' }}>{getContentTypeIcon(type)}</span>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <span className="mr-2 text-xl">🔢</span>
                  Number of recommendations
                </div>
                <TextField
                  type="number"
                  id="count"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ min: 1, max: 10 }}
                  disabled={loading}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '0.5rem'
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    }
                  }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-6 transition duration-200"
            >
              {loading ? 'Getting Recommendations...' : 'Get Personalized Recommendations'}
            </motion.button>
          </form>
        
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-50 p-6 rounded-xl flex flex-col justify-center">
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Customizing recommendations for you...</p>
            </div>
          )}
          
          {!loading && !recommendations.length && !error && (
            <div className="flex flex-col items-center justify-center h-64">
              <img 
                src="/images/content.png" 
                alt="Recommendations" 
                className="h-24 w-24 mb-4 opacity-70"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/96?text=🎯";
                }}
              />
              <p className="text-gray-500 text-center max-w-md">
                Select your preferences and click "Get Personalized Recommendations" to receive content suggestions based on your mood.
              </p>
            </div>
          )}
          
          {recommendations.length > 0 && (
            <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recommendations</h2>
              
              {recommendations.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 text-xl p-3 rounded-lg mr-3">
                      {getContentTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-700">{item.title}</h3>
                      <div className="flex flex-wrap gap-1 my-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.type}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      )}
                      
                      <div className="mb-3">
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <span>Recommended for: {item.emotion}</span>
                        </div>
                      </div>
                      
                      {item.url && (
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          View Content
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationModel;