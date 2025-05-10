import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const StressLevelPrediction = () => {
  const [formData, setFormData] = useState({
    Age: 20,
    Course: 'Computer Science',
    Gender: 'Male',
    CGPA: 3.5,
    Depression_Score: 2,
    Anxiety_Score: 2,
    Sleep_Quality: 3,
    Physical_Activity: 2,
    Diet_Quality: 3,
    Social_Support: 'Medium',
    Relationship_Status: 'Single',
    Substance_Use: 'No',
    Counseling_Service_Use: 'No',
    Family_History: 'No',
    Chronic_Illness: 'No',
    Financial_Stress: 2,
    Extracurricular_Involvement: 'Yes',
    Semester_Credit_Load: 15,
    Residence_Type: 'On-Campus',
    Stress_Level: 0 // This is for feature engineering
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert numeric inputs from strings to numbers
      const processedData = {};
      for (const [key, value] of Object.entries(formData)) {
        if (['Age', 'CGPA', 'Depression_Score', 'Anxiety_Score', 'Sleep_Quality', 
             'Physical_Activity', 'Diet_Quality', 'Financial_Stress', 
             'Semester_Credit_Load', 'Stress_Level'].includes(key)) {
          processedData[key] = parseFloat(value);
        } else {
          processedData[key] = value;
        }
      }
      
      const response = await axios.post('http://localhost:5001/api/predict', processedData);
      setPrediction(response.data);
    } catch (err) {
      console.error('Error making prediction:', err);
      setError(err.response?.data?.error || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const getStressLevelColor = (level) => {
    switch(level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-6xl mx-auto my-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Student Stress Level Prediction</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Fill out the form below to predict your stress level based on various factors.
        Adjust the parameters to see how different factors affect your predicted stress level.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Age: {formData.Age}</p>
                <Slider
                  value={formData.Age}
                  onChange={(_, value) => handleSliderChange('Age', value)}
                  min={18}
                  max={60}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* Gender */}
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="Gender"
                  value={formData.Gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              
              {/* Course */}
              <FormControl fullWidth>
                <InputLabel id="course-label">Course</InputLabel>
                <Select
                  labelId="course-label"
                  id="course"
                  name="Course"
                  value={formData.Course}
                  label="Course"
                  onChange={handleChange}
                >
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                  <MenuItem value="Medicine">Medicine</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              
              {/* CGPA */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">CGPA: {formData.CGPA}</p>
                <Slider
                  value={formData.CGPA}
                  onChange={(_, value) => handleSliderChange('CGPA', value)}
                  min={0}
                  max={4.0}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Mental Health Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Depression Score */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Depression Score: {formData.Depression_Score}</p>
                <Slider
                  value={formData.Depression_Score}
                  onChange={(_, value) => handleSliderChange('Depression_Score', value)}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' }
                  ]}
                />
              </div>
              
              {/* Anxiety Score */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Anxiety Score: {formData.Anxiety_Score}</p>
                <Slider
                  value={formData.Anxiety_Score}
                  onChange={(_, value) => handleSliderChange('Anxiety_Score', value)}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' }
                  ]}
                />
              </div>
              
              {/* Sleep Quality */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Sleep Quality: {formData.Sleep_Quality}</p>
                <Slider
                  value={formData.Sleep_Quality}
                  onChange={(_, value) => handleSliderChange('Sleep_Quality', value)}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' }
                  ]}
                />
              </div>


              {/* Current Stress Level - Renamed */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Pressure Index: {formData.Stress_Level}</p>
                <Slider
                  value={formData.Stress_Level}
                  onChange={(_, value) => handleSliderChange('Stress_Level', value)}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' }
                  ]}
                />
              </div>
              
              {/* Financial Stress */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Financial Stress: {formData.Financial_Stress}</p>
                <Slider
                  value={formData.Financial_Stress}
                  onChange={(_, value) => handleSliderChange('Financial_Stress', value)}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' }
                  ]}
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
              {loading ? 'Analyzing...' : 'Predict Stress Level'}
            </motion.button>
          </form>
        </div>
        
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
              <p className="mt-4 text-gray-600">Analyzing your data...</p>
            </div>
          )}
          
          {prediction && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Prediction Result</h2>
                <div className={`inline-block px-6 py-3 rounded-full font-bold text-lg ${getStressLevelColor(prediction.stress_level)}`}>
                  {prediction.stress_level} Stress Level
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Probability Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(prediction.probabilities).map(([level, probability]) => (
                    <div key={level}>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{level} Stress</span>
                        <span>{probability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            level === 'Low' ? 'bg-green-500' : 
                            level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${probability}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">What This Means</h3>
                <p className="text-blue-700">
                  {prediction.stress_level === 'Low' && 
                    'Your stress levels appear to be well-managed. Continue practicing healthy coping strategies and maintain your current routines.'}
                  {prediction.stress_level === 'Medium' && 
                    'You may be experiencing moderate stress. Consider incorporating more stress-reduction techniques into your daily routine, such as mindfulness, exercise, or better time management.'}
                  {prediction.stress_level === 'High' && 
                    'Your stress levels appear to be high. It would be beneficial to speak with a mental health professional for additional support and develop a comprehensive stress management plan.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {prediction.stress_level === 'Low' && (
                    <>
                      <li>Continue your current healthy habits</li>
                      <li>Check in regularly to monitor your stress levels</li>
                      <li>Build resilience for future stressful situations</li>
                    </>
                  )}
                  {prediction.stress_level === 'Medium' && (
                    <>
                      <li>Practice daily relaxation techniques</li>
                      <li>Consider adjusting your course workload if possible</li>
                      <li>Ensure you're getting adequate sleep and exercise</li>
                      <li>Connect with friends and family for support</li>
                    </>
                  )}
                  {prediction.stress_level === 'High' && (
                    <>
                      <li>Schedule a visit with your university's counseling services</li>
                      <li>Discuss your workload with academic advisors</li>
                      <li>Prioritize self-care and stress reduction activities</li>
                      <li>Consider joining a support group</li>
                      <li>Develop a structured stress management plan</li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
          
          {!prediction && !error && !loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <img 
                src="images/mental-health1.png" 
                alt="Mental Health" 
                className="w-24 h-24 mb-4 opacity-60"
              />
              <p className="text-gray-500 text-center max-w-md">
                Complete the form and click "Predict Stress Level" to receive a personalized stress assessment based on our machine learning model.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StressLevelPrediction;