import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const StressLevelPrediction = () => {
  const [formData, setFormData] = useState({
    Gender: 'Male',
    Age: 35,
    Occupation: 'Software Engineer',
    Sleep_Duration: 7.0,
    BMI_Category: 'Normal',
    Heart_Rate: 70,
    Daily_Steps: 5000,
    Systolic_BP: 120
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Predefined values from dataset
  const occupations = [
    'Software Engineer', 'Doctor', 'Accountant', 'Teacher', 'Manager', 
    'Engineer', 'Sales Representative', 'Salesperson', 'Lawyer', 'Nurse', 'Scientist'
  ];
  
  const bmiCategories = ['Underweight', 'Normal', 'Overweight', 'Obese'];
  
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
      // Transform data format for API
      const transformedData = {
        Gender: formData.Gender === 'Male' ? 1 : 0,
        Age: parseInt(formData.Age),
        Occupation: getOccupationCode(formData.Occupation),
        Sleep_Duration: parseFloat(formData.Sleep_Duration),
        BMI_Category: getBmiCategoryCode(formData.BMI_Category),
        Heart_Rate: parseInt(formData.Heart_Rate),
        Daily_Steps: parseInt(formData.Daily_Steps),
        Systolic_BP: parseInt(formData.Systolic_BP)
      };
      
      const response = await axios.post('http://localhost:5001/api/predict', transformedData);
      setPrediction(response.data);
    } catch (err) {
      console.error('Error making prediction:', err);
      setError(err.response?.data?.error || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const getOccupationCode = (occupation) => {
    const occupationMap = {
      'Scientist': 0, 
      'Doctor': 1, 
      'Accountant': 2, 
      'Teacher': 3, 
      'Manager': 4, 
      'Engineer': 5,
      'Sales Representative': 6, 
      'Salesperson': 7, 
      'Lawyer': 8, 
      'Software Engineer': 9, 
      'Nurse': 10
    };
    return occupationMap[occupation] || 0;
  };
  
  const getBmiCategoryCode = (category) => {
    const bmiMap = {'Underweight': 1, 'Normal': 2, 'Overweight': 3, 'Obese': 3};
    return bmiMap[category] || 2;
  };
  
  const getStressLevelColor = (level) => {
    if (level <= 4) return '#4CAF50'; // green
    if (level <= 6) return '#FF9800'; // orange
    return '#F44336'; // red
  };
  
  const getStressDescription = (level) => {
    if (level <= 4) return 'Low';
    if (level <= 6) return 'Moderate';
    return 'High';
  };

  // Field description tooltips
  const fieldDescriptions = {
    Gender: "Biological sex affects stress response mechanisms",
    Age: "Age influences physiological stress response and coping mechanisms",
    Occupation: "Different professions have varying stress levels",
    Sleep_Duration: "Quality sleep is essential for stress management",
    BMI_Category: "Body Mass Index classification relates to overall health",
    Heart_Rate: "Resting heart rate can indicate stress levels",
    Daily_Steps: "Physical activity helps reduce stress",
    Systolic_BP: "The top number in blood pressure reading"
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-6xl mx-auto my-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Stress Level Predictor</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        This tool uses a Random Forest machine learning model trained on health and lifestyle data to predict stress levels.
        Adjust the parameters below to see how different factors affect your predicted stress level.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender Selection */}
              <div className="relative">
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="Gender"
                    value={formData.Gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              
              {/* Age Slider */}
              <div className="relative">
                <p className="text-sm font-medium text-gray-700 mb-2">Age: {formData.Age}</p>
                <Slider
                  value={formData.Age}
                  onChange={(_, value) => handleSliderChange('Age', value)}
                  min={25}
                  max={60}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* Occupation Selection */}
              <div className="relative">
                <FormControl fullWidth>
                  <InputLabel id="occupation-label">Occupation</InputLabel>
                  <Select
                    labelId="occupation-label"
                    name="Occupation"
                    value={formData.Occupation}
                    label="Occupation"
                    onChange={handleChange}
                  >
                    {occupations.map(occupation => (
                      <MenuItem key={occupation} value={occupation}>{occupation}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              
              {/* BMI Category */}
              <div className="relative">
                <FormControl fullWidth>
                  <InputLabel id="bmi-label">BMI Category</InputLabel>
                  <Select
                    labelId="bmi-label"
                    name="BMI_Category"
                    value={formData.BMI_Category}
                    label="BMI Category"
                    onChange={handleChange}
                  >
                    {bmiCategories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Health Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sleep Duration */}
              <div className="relative">
                <p className="text-sm font-medium text-gray-700 mb-2">Sleep Duration: {formData.Sleep_Duration} hours</p>
                <Slider
                  value={formData.Sleep_Duration}
                  onChange={(_, value) => handleSliderChange('Sleep_Duration', value)}
                  min={5}
                  max={9}
                  step={0.1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 6, label: '6h' },
                    { value: 7, label: '7h' },
                    { value: 8, label: '8h' }
                  ]}
                />
              </div>
              
              {/* Heart Rate */}
              <div className="relative">
                <p className="text-sm font-medium text-gray-700 mb-2">Heart Rate: {formData.Heart_Rate} bpm</p>
                <Slider
                  value={formData.Heart_Rate}
                  onChange={(_, value) => handleSliderChange('Heart_Rate', value)}
                  min={60}
                  max={90}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 65, label: '65' },
                    { value: 75, label: '75' },
                    { value: 85, label: '85' }
                  ]}
                />
              </div>
              
              {/* Daily Steps */}
              <div className="relative">
                <p className="text-sm font-medium text-gray-700 mb-2">Daily Steps: {formData.Daily_Steps}</p>
                <Slider
                  value={formData.Daily_Steps}
                  onChange={(_, value) => handleSliderChange('Daily_Steps', value)}
                  min={3000}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 4000, label: '4k' },
                    { value: 7000, label: '7k' },
                    { value: 10000, label: '10k' }
                  ]}
                />
              </div>
              
              {/* Systolic BP */}
              <div className="relative">
                <p className="text-sm font-medium text-gray-700 mb-2">Systolic BP: {formData.Systolic_BP} mmHg</p>
                <Slider
                  value={formData.Systolic_BP}
                  onChange={(_, value) => handleSliderChange('Systolic_BP', value)}
                  min={110}
                  max={150}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 120, label: '120' },
                    { value: 130, label: '130' },
                    { value: 140, label: '140' }
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
              <p className="mt-4 text-gray-600">Analyzing your data using Random Forest model...</p>
            </div>
          )}
          
          {!loading && !prediction && !error && (
            <div className="flex flex-col items-center justify-center h-64">
              <img 
                src="/images/mental-health1.png" 
                alt="Mental Health" 
                className="h-24 w-24 mb-4 opacity-70"
              />
              <p className="text-gray-500 text-center max-w-md">
                Complete the form and click "Predict Stress Level" to receive a personalized stress assessment based on our Random Forest model.
              </p>
            </div>
          )}
          
          {prediction && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Stress Level Assessment</h2>
                
                <div className="w-40 h-40 mb-4">
                  <CircularProgressbar
                    value={prediction.stress_level}
                    maxValue={10}
                    text={`${prediction.stress_level}`}
                    styles={buildStyles({
                      textSize: '1.5rem',
                      pathColor: getStressLevelColor(prediction.stress_level),
                      textColor: getStressLevelColor(prediction.stress_level),
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
                
                <div className={`text-center px-4 py-2 rounded-full font-semibold text-white mb-2`}
                     style={{ backgroundColor: getStressLevelColor(prediction.stress_level) }}>
                  {getStressDescription(prediction.stress_level)} Stress Level
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Personalized Recommendations</h3>
                <ul className="space-y-3">
                  {prediction.stress_level <= 4 ? (
                    <>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">✓</span>
                        <span>Maintain your current health practices</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">✓</span>
                        <span>Include regular exercise in your routine</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">✓</span>
                        <span>Continue healthy sleep habits</span>
                      </li>
                    </>
                  ) : prediction.stress_level <= 6 ? (
                    <>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>Practice mindfulness or meditation for 10-15 minutes daily</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>Ensure consistent sleep schedule of 7-8 hours</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>Consider taking short breaks during work hours</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>Increase physical activity to at least 7000 steps per day</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Consider consulting a healthcare professional</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Implement stress reduction techniques like deep breathing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Prioritize sleep hygiene and aim for 8 hours of sleep</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Increase physical activity and consider cardiovascular exercise</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Evaluate work-life balance and consider lifestyle adjustments</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Key Health Insights</h3>
                <p className="text-blue-700 text-sm">
                  {prediction.stress_level <= 4 ? 
                    "Your predicted stress level is low. Your lifestyle choices appear to be supporting good mental health." :
                   prediction.stress_level <= 6 ?
                    "Your predicted stress level is moderate. Some aspects of your lifestyle may be contributing to increased stress." :
                    "Your predicted stress level is high. Several aspects of your current health metrics suggest significant stress impact."
                  }
                  
                  {formData.Sleep_Duration < 7 ? 
                    " Your sleep duration is below recommended levels, which may contribute to stress." : ""}
                    
                  {formData.Daily_Steps < 5000 ? 
                    " Increasing your daily steps could help reduce stress levels." : ""}
                    
                  {formData.Heart_Rate > 80 ? 
                    " Your elevated heart rate may indicate physiological stress." : ""}
                </p>
              </div>
              
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StressLevelPrediction;