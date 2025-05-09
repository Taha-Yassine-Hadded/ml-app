import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const BurnoutPrediction = () => {
  const [formData, setFormData] = useState({
    phq9: 5,
    gad7: 5,
    mbi_ee: 20,
    mbi_dp: 10,
    mbi_ap: 30,
    sleep_hours: 7,
    screen_time: 5,
    workload_stress: 5,
    social_support: 5,
    study_level: '2e année'
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const studyLevels = ['1re année', '2e année', '3e année', 'Master', 'Doctorat'];

  // French to English translation map for risk levels
  const riskLevelTranslation = {
    'Faible': 'Low',
    'Modéré': 'Moderate',
    'Élevé': 'High'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numeric values to numbers
    const parsedValue = ['phq9', 'gad7', 'mbi_ee', 'mbi_dp', 'mbi_ap', 'sleep_hours', 'screen_time', 
                          'workload_stress', 'social_support'].includes(name) 
                          ? parseFloat(value) : value;
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5002/api/burnout-prediction', formData);
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Error getting prediction:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Translate risk level from French to English
  const translateRiskLevel = (riskLevel) => {
    return riskLevelTranslation[riskLevel] || riskLevel;
  };
  
  // Helper function to get risk level color (works with both French and English risk levels)
  const getRiskColor = (risk) => {
    if (!risk) return '#d6d6d6';
    
    // Check for French risk levels first
    if (risk === 'Faible') return '#4CAF50'; // green
    if (risk === 'Modéré') return '#FF9800'; // orange
    if (risk === 'Élevé') return '#F44336'; // red
    
    // Check for English risk levels
    if (risk === 'Low') return '#4CAF50'; // green
    if (risk === 'Moderate') return '#FF9800'; // orange
    if (risk === 'High') return '#F44336'; // red
    
    return '#d6d6d6';
  };

  // Helper function to get progress value based on risk level
  const getRiskProgressValue = (riskLevel) => {
    const normalizedRisk = riskLevel === 'Faible' || riskLevel === 'Low' ? 'Low' : 
                           riskLevel === 'Modéré' || riskLevel === 'Moderate' ? 'Moderate' : 'High';
    
    switch(normalizedRisk) {
      case 'Low': return 33;
      case 'Moderate': return 66;
      case 'High': return 100;
      default: return 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-6xl mx-auto my-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Burnout Predictor</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        This tool uses a machine learning model to predict your risk of burnout based on various factors.
        Adjust the parameters below to see how different factors affect your predicted burnout risk.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PHQ9 Input */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">PHQ-9 Score (Depression): {formData.phq9}</p>
                <Slider
                  value={formData.phq9}
                  onChange={(_, value) => handleSliderChange('phq9', value)}
                  min={0}
                  max={27}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* GAD7 Input */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">GAD-7 Score (Anxiety): {formData.gad7}</p>
                <Slider
                  value={formData.gad7}
                  onChange={(_, value) => handleSliderChange('gad7', value)}
                  min={0}
                  max={21}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Burnout Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MBI EE */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">MBI EE (Emotional Exhaustion): {formData.mbi_ee}</p>
                <Slider
                  value={formData.mbi_ee}
                  onChange={(_, value) => handleSliderChange('mbi_ee', value)}
                  min={0}
                  max={54}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* MBI DP */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">MBI DP (Depersonalization): {formData.mbi_dp}</p>
                <Slider
                  value={formData.mbi_dp}
                  onChange={(_, value) => handleSliderChange('mbi_dp', value)}
                  min={0}
                  max={30}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* MBI AP */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">MBI AP (Personal Accomplishment): {formData.mbi_ap}</p>
                <Slider
                  value={formData.mbi_ap}
                  onChange={(_, value) => handleSliderChange('mbi_ap', value)}
                  min={0}
                  max={48}
                  step={1}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Lifestyle Factors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sleep Hours */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Sleep Hours: {formData.sleep_hours}</p>
                <Slider
                  value={formData.sleep_hours}
                  onChange={(_, value) => handleSliderChange('sleep_hours', value)}
                  min={0}
                  max={12}
                  step={0.5}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* Screen Time */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Screen Time (hours/day): {formData.screen_time}</p>
                <Slider
                  value={formData.screen_time}
                  onChange={(_, value) => handleSliderChange('screen_time', value)}
                  min={0}
                  max={24}
                  step={0.5}
                  valueLabelDisplay="auto"
                />
              </div>
              
              {/* Workload Stress */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Workload Stress: {formData.workload_stress}</p>
                <Slider
                  value={formData.workload_stress}
                  onChange={(_, value) => handleSliderChange('workload_stress', value)}
                  min={0}
                  max={10}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: 'Low' },
                    { value: 10, label: 'High' }
                  ]}
                />
              </div>
              
              {/* Social Support */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Social Support: {formData.social_support}</p>
                <Slider
                  value={formData.social_support}
                  onChange={(_, value) => handleSliderChange('social_support', value)}
                  min={0}
                  max={10}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: 'Low' },
                    { value: 10, label: 'High' }
                  ]}
                />
              </div>
            </div>
            
            {/* Study Level */}
            <FormControl fullWidth className="mt-4">
              <InputLabel id="study-level-label">Study Level</InputLabel>
              <Select
                labelId="study-level-label"
                name="study_level"
                value={formData.study_level}
                label="Study Level"
                onChange={handleChange}
              >
                {studyLevels.map(level => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-6 transition duration-200"
            >
              {loading ? 'Analyzing...' : 'Predict Burnout Risk'}
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
          
          {!loading && !prediction && !error && (
            <div className="flex flex-col items-center justify-center h-64">
              <img 
                src="/images/mental-health2.png" 
                alt="Mental Health" 
                className="h-24 w-24 mb-4 opacity-70"
              />
              <p className="text-gray-500 text-center max-w-md">
                Complete the form and click "Predict Burnout Risk" to receive a personalized burnout assessment.
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
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Burnout Risk Assessment</h2>
                
                <div className="w-40 h-40 mb-4">
                  <CircularProgressbar
                    value={getRiskProgressValue(prediction.risk_level)}
                    maxValue={100}
                    text={translateRiskLevel(prediction.risk_level)}
                    styles={buildStyles({
                      textSize: '14px',
                      pathColor: getRiskColor(prediction.risk_level),
                      textColor: getRiskColor(prediction.risk_level),
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
                
                <div className={`text-center px-4 py-2 rounded-full font-semibold text-white mb-2`}
                     style={{ backgroundColor: getRiskColor(prediction.risk_level) }}>
                  {translateRiskLevel(prediction.risk_level)} Risk Level
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Key Factors</h3>
                <ul className="space-y-3">
                  {(prediction.risk_level === 'Élevé' || prediction.risk_level === 'High') && (
                    <>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Your emotional exhaustion (MBI EE) score is high</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Your depression indicators (PHQ-9) are concerning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">!</span>
                        <span>Your anxiety levels (GAD-7) are elevated</span>
                      </li>
                    </>
                  )}
                  {(prediction.risk_level === 'Modéré' || prediction.risk_level === 'Moderate') && (
                    <>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>You're showing some signs of emotional exhaustion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>Your workload stress is moderate to high</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 flex-shrink-0">!</span>
                        <span>Your sleep patterns could be improved</span>
                      </li>
                    </>
                  )}
                  {(prediction.risk_level === 'Faible' || prediction.risk_level === 'Low') && (
                    <>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">✓</span>
                        <span>Your emotional health indicators are in healthy ranges</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">✓</span>
                        <span>You have good social support systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">✓</span>
                        <span>Your sleep patterns are generally healthy</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Recommendations</h3>
                <p className="text-blue-700 text-sm">
                  {(prediction.risk_level === 'Élevé' || prediction.risk_level === 'High') ? 
                    "Consider speaking with a mental health professional. Take immediate steps to reduce your academic workload and prioritize sleep and physical exercise." :
                   (prediction.risk_level === 'Modéré' || prediction.risk_level === 'Moderate') ?
                    "Implement stress management techniques like meditation. Review your workload and improve sleep hygiene." :
                    "Continue your healthy habits and coping strategies. Maintain your sleep schedule and stay connected with your support network."
                  }
                  
                  {formData.sleep_hours < 7 ? 
                    " Consider increasing your sleep duration to at least 7 hours per night." : ""}
                    
                  {formData.screen_time > 8 ? 
                    " Try to reduce your daily screen time, which may be contributing to stress." : ""}
                    
                  {formData.social_support < 5 ? 
                    " Building stronger social connections could help reduce your burnout risk." : ""}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BurnoutPrediction;