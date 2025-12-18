import React, { useState, useMemo, useEffect } from 'react';
import { 
  Container, Paper, Typography, TextField, Radio, RadioGroup, 
  FormControlLabel, Checkbox, FormGroup, Button, Box, 
  LinearProgress, Fade, Divider, Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import LockClockIcon from '@mui/icons-material/LockClock'; // Lock Icon
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../firebase/config';
import { questions } from '../data/questions';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// --- 🛑 CONFIGURATION: SET YOUR CONFERENCE TIMES HERE 🛑 ---
const SECTION_SCHEDULE = {
  // 'Intro', 'A', and 'B' are open immediately
  'Intro': null, 
  'Section A: Profile': null,
  'Section B: Exposure': null,

  // --- SCHEDULED SESSIONS (YYYY-MM-DDTHH:MM:SS) ---
  // Example: '2024-12-25T14:30:00' means 2:30 PM
  
  // REPLACE THESE WITH YOUR REAL DATES/TIMES
  'Session 1: Responsive Governance': '2025-12-17T10:30:00', 
  'Session 2: Ease of Doing Business (EoDB)': '2025-12-17T15:00:00',
  'Session 3: Challenges in Urban Development and Way Forward': '2025-12-17T16:30:00',
  'Session 4: Law & Future Roadmap': '2025-12-17T17:30:00',
  'Session 5: PPP & Infrastructure': '2025-12-18T10:30:00',
};

const SurveyPage = () => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0); 
  
  // Lock State
  const [isLocked, setIsLocked] = useState(false);
  const [timeUntilUnlock, setTimeUntilUnlock] = useState('');

  const navigate = useNavigate();

  // --- 1. Sequence Logic ---
  const sectionHeaders = useMemo(() => {
    const headers = [...new Set(questions.map(q => q.section))];
    return ['Intro', ...headers];
  }, []);

  const currentSection = sectionHeaders[activeStep];
  const isIntro = currentSection === 'Intro';

  // Filter questions
  const pageQuestions = useMemo(() => {
    if (isIntro) return [];
    return questions.filter(q => q.section === currentSection);
  }, [currentSection, isIntro]);

  // --- 2. TIME CHECK LOGIC ---
  useEffect(() => {
    const checkLockStatus = () => {
      const unlockTimeStr = SECTION_SCHEDULE[currentSection];
      
      // If null, it's always open
      if (!unlockTimeStr) {
        setIsLocked(false);
        return;
      }

      const unlockDate = new Date(unlockTimeStr);
      const now = new Date();

      if (now >= unlockDate) {
        // Time has passed, unlock it
        setIsLocked(false);
      } else {
        // Time hasn't passed, keep locked and calculate remaining time
        setIsLocked(true);
        
        // Calculate nice countdown string
        const diff = unlockDate - now;
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        let timeString = "";
        if (days > 0) timeString += `${days}d `;
        if (hours > 0) timeString += `${hours}h `;
        timeString += `${minutes}m`;
        
        // If less than a minute
        if (days === 0 && hours === 0 && minutes === 0) {
           timeString = "less than 1 minute";
        }

        setTimeUntilUnlock(timeString);
      }
    };

    // Run check immediately
    checkLockStatus();

    // Run check every second (to update countdown or auto-unlock)
    const interval = setInterval(checkLockStatus, 1000);

    return () => clearInterval(interval);
  }, [currentSection]);


  // --- Handlers ---
  const handleTextChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckbox = (id, value) => {
    const current = answers[id] || [];
    const newValues = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    setAnswers(prev => ({ ...prev, [id]: newValues }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (activeStep < sectionHeaders.length - 1) {
      setActiveStep(prev => prev + 1);
      scrollToTop();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const handleSubmit = async () => {
    if(!window.confirm("Are you sure you want to submit the survey?")) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "feedback"), { 
        ...answers, 
        submittedAt: serverTimestamp() 
      });
      navigate('/success');
    } catch (error) {
      console.error(error);
      alert("Error submitting. Please check your connection.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      
      {!isIntro && (
        <Box sx={{ position: 'sticky', top: 64, zIndex: 10, bgcolor: '#f8fafc', pb: 2, borderBottom: '1px solid #e2e8f0' }}>
          <LinearProgress 
            variant="determinate" 
            value={(activeStep / (sectionHeaders.length - 1)) * 100} 
            sx={{ height: 6, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#1e3a8a' } }}
          />
          <Container maxWidth="md" sx={{ mt: 1.5 }}>
            <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              STEP {activeStep} of {sectionHeaders.length - 1}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" color="#1e3a8a" noWrap>
              {currentSection}
            </Typography>
          </Container>
        </Box>
      )}

      <Container maxWidth="md" sx={{ mb: 10, minHeight: '60vh', mt: isIntro ? 8 : 4 }}>
        
        <Fade in={true} key={activeStep} timeout={600}>
          <Box>
            
            {/* --- INTRO PAGE --- */}
            {isIntro && (
              <Paper elevation={4} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, textAlign: 'center', borderTop: '6px solid #1e3a8a' }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                   <InfoIcon sx={{ fontSize: 60, color: '#1e3a8a', opacity: 0.2 }} />
                </Box>
                <Typography variant="h4" fontWeight="800" color="#1e3a8a" gutterBottom>
                  Feedback Form for IAS Officers
                </Typography>
                <Typography variant="h6" fontWeight="500" color="text.secondary" sx={{ mb: 4 }}>
                  Perceptions on Frontline Implementation and Citizen-Centric Governance
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Box sx={{ textAlign: 'left', bgcolor: '#f1f5f9', p: 3, borderRadius: 2, mb: 5 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Introduction</Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                    This survey has been designed for Indian Administrative Service (IAS) officers, to capture your expert assessment of frontline staff behaviour and implementation challenges in key domains.
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                    It shifts the focus from external "citizen experience" to your insights and experiences as a District Magistrate or sectoral leader. The survey can be administered after training sessions on Ease of Doing Business, urban development, tourism, citizen services, poverty reduction, artificial intelligence, and Sustainable Development Goals.
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="#1e3a8a">
                    Your responses will remain anonymous and will be used for analysis and improvement of training practices.
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleNext}
                  endIcon={<PlayArrowIcon />}
                  sx={{ px: 6, py: 2, fontSize: '1.2rem', bgcolor: '#1e3a8a' }}
                >
                  Start Survey
                </Button>
              </Paper>
            )}

            {/* --- LOCKED SESSION SCREEN --- */}
            {!isIntro && isLocked && (
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 8, 
                  borderRadius: 3, 
                  textAlign: 'center', 
                  bgcolor: '#f1f5f9', 
                  border: '2px dashed #94a3b8',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'
                }}
              >
                <LockClockIcon sx={{ fontSize: 80, color: '#64748b', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" color="#1e3a8a" gutterBottom>
                  Session Locked
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                  The questions for <strong>{currentSection}</strong> will open automatically when the session ends.
                </Typography>
                
                <Chip 
                  label={`Opens in: ${timeUntilUnlock}`} 
                  color="warning" 
                  sx={{ fontSize: '1.1rem', py: 2, px: 2, fontWeight: 'bold' }} 
                />

                <Button variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={handleBack} sx={{ mt: 5 }}>
                  Go Back
                </Button>
              </Paper>
            )}

            {/* --- ACTIVE QUESTIONS --- */}
            {!isIntro && !isLocked && (
              <>
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                  <Chip label={`PART ${activeStep}`} color="primary" sx={{ mb: 2, fontWeight: 'bold' }} />
                  <Typography variant="h5" fontWeight="bold" color="#1e3a8a">
                    {currentSection}
                  </Typography>
                </Box>

                {pageQuestions.map((q) => (
                  <Paper key={q.id} elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.6 }}>
                      {q.text}
                    </Typography>

                    {q.type === 'text' && (
                      <TextField fullWidth variant="outlined" placeholder="Your Answer"
                        value={answers[q.id] || ''} onChange={(e) => handleTextChange(q.id, e.target.value)} />
                    )}
                    
                    {q.type === 'textarea' && (
                      <TextField fullWidth multiline rows={4} variant="outlined" placeholder="Type here..."
                        value={answers[q.id] || ''} onChange={(e) => handleTextChange(q.id, e.target.value)} />
                    )}
                    
                    {q.type === 'radio' && (
                      <RadioGroup value={answers[q.id] || ''} onChange={(e) => handleTextChange(q.id, e.target.value)}>
                        {q.options.map(opt => (
                          <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                        ))}
                      </RadioGroup>
                    )}
                    
                    {q.type === 'checkbox' && (
                      <FormGroup>
                        {q.options.map(opt => (
                          <FormControlLabel key={opt} 
                            control={<Checkbox checked={(answers[q.id] || []).includes(opt)} onChange={() => handleCheckbox(q.id, opt)} />} 
                            label={opt} 
                          />
                        ))}
                      </FormGroup>
                    )}
                    
                    {q.type === 'likert' && (
                      <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="caption" color="text.secondary">Strongly Disagree</Typography>
                            <Typography variant="caption" color="text.secondary">Strongly Agree</Typography>
                         </Box>
                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected = parseInt(answers[q.id]) === val;
                              return (
                                <Box key={val} onClick={() => handleTextChange(q.id, val)}
                                  sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                  <Box sx={{ 
                                    width: { xs: 36, md: 48 }, height: { xs: 36, md: 48 }, 
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    bgcolor: isSelected ? '#1e3a8a' : 'white', 
                                    color: isSelected ? 'white' : '#64748b',
                                    border: isSelected ? 'none' : '2px solid #cbd5e1',
                                    fontWeight: 'bold', boxShadow: isSelected ? 4 : 0, transition: 'all 0.2s'
                                  }}>
                                    {val}
                                  </Box>
                                </Box>
                              );
                            })}
                         </Box>
                      </Box>
                    )}
                  </Paper>
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, pt: 4, borderTop: '1px solid #e2e8f0' }}>
                  <Button variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={handleBack} size="large">
                    Back
                  </Button>

                  {activeStep === sectionHeaders.length - 1 ? (
                    <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleSubmit} disabled={loading} size="large" sx={{ px: 4, bgcolor: '#166534' }}>
                      {loading ? "Sending..." : "Submit Survey"}
                    </Button>
                  ) : (
                    <Button variant="contained" endIcon={<NavigateNextIcon />} onClick={handleNext} size="large" sx={{ px: 4, bgcolor: '#1e3a8a' }}>
                      Next Section
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default SurveyPage;