// MindPulse - Frontend Application Logic

// Auto-detect API backend base URL
const API_URL = window.location.origin.includes('http') 
  ? `${window.location.origin}/predict` 
  : 'http://127.0.0.1:8000/predict';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkBackendHealth();
  // Auto predict once on startup with default values
  submitPrediction();
});

// Sync range sliders with UI text values
function updateRangeVal(elementId, formattedValue) {
  const badge = document.getElementById(elementId);
  if (badge) {
    badge.textContent = formattedValue;
  }
}

// Check backend API connection
async function checkBackendHealth() {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const alertBox = document.getElementById('connectionAlert');

  try {
    // Ping backend with a lightweight request or root endpoint
    const response = await fetch(API_URL.replace('/predict', '/docs'), { method: 'HEAD', mode: 'cors' });
    statusDot.className = 'status-dot connected';
    statusText.textContent = 'FastAPI Backend Online';
    alertBox.style.display = 'none';
  } catch (err) {
    statusDot.className = 'status-dot error';
    statusText.textContent = 'Backend Offline';
    alertBox.style.display = 'flex';
  }
}

// Preset Profiles Data
const presets = {
  balanced: {
    Age: 21,
    Gender: 'Male',
    Academic_Level: 'Undergraduate',
    Country: 'India',
    Most_Used_Platform: 'Instagram',
    Purpose_Of_Use: 'Entertainment',
    Avg_Daily_Usage_Hours: 2.5,
    Daily_Unlocks: 75,
    Study_Hours: 6.0,
    Physical_Activity_Hours: 2.5,
    Sleep_Hours_Per_Night: 8.0,
    Stress_Level: 'Low'
  },
  high_social: {
    Age: 19,
    Gender: 'Female',
    Academic_Level: 'Undergraduate',
    Country: 'USA',
    Most_Used_Platform: 'TikTok',
    Purpose_Of_Use: 'Entertainment',
    Avg_Daily_Usage_Hours: 8.5,
    Daily_Unlocks: 240,
    Study_Hours: 1.5,
    Physical_Activity_Hours: 0.5,
    Sleep_Hours_Per_Night: 5.0,
    Stress_Level: 'High'
  },
  exam_stress: {
    Age: 23,
    Gender: 'Female',
    Academic_Level: 'Graduate',
    Country: 'India',
    Most_Used_Platform: 'YouTube',
    Purpose_Of_Use: 'Education',
    Avg_Daily_Usage_Hours: 4.5,
    Daily_Unlocks: 150,
    Study_Hours: 9.5,
    Physical_Activity_Hours: 0.5,
    Sleep_Hours_Per_Night: 4.5,
    Stress_Level: 'Very High'
  }
};

// Load Preset Profile
function loadPreset(presetKey) {
  const data = presets[presetKey];
  if (!data) return;

  // Age & Country
  document.getElementById('age').value = data.Age;
  document.getElementById('country').value = data.Country;

  // Radio Groups Helper
  setRadioValue('Gender', data.Gender);
  setRadioValue('Academic_Level', data.Academic_Level);
  setRadioValue('Most_Used_Platform', data.Most_Used_Platform);
  setRadioValue('Purpose_Of_Use', data.Purpose_Of_Use);
  setRadioValue('Stress_Level', data.Stress_Level);

  // Sliders & Badges
  setSlider('avgUsage', 'avgUsageVal', data.Avg_Daily_Usage_Hours, ' hrs');
  setSlider('dailyUnlocks', 'dailyUnlocksVal', data.Daily_Unlocks, ' unlocks');
  setSlider('studyHours', 'studyHoursVal', data.Study_Hours, ' hrs');
  setSlider('physicalActivity', 'physicalActivityVal', data.Physical_Activity_Hours, ' hrs');
  setSlider('sleepHours', 'sleepHoursVal', data.Sleep_Hours_Per_Night, ' hrs');

  // Trigger prediction
  submitPrediction();
}

function setRadioValue(name, val) {
  const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
  if (radio) radio.checked = true;
}

function setSlider(sliderId, badgeId, val, unit) {
  const slider = document.getElementById(sliderId);
  if (slider) {
    slider.value = val;
    updateRangeVal(badgeId, val + unit);
  }
}

// Form Submit Handler
function handleFormSubmit(event) {
  event.preventDefault();
  submitPrediction();
}

// Execute Prediction Request
async function submitPrediction() {
  const form = document.getElementById('predictionForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const alertBox = document.getElementById('connectionAlert');

  // Build Payload matching Pydantic StudentData schema exactly
  const formData = new FormData(form);
  
  const payload = {
    Age: parseInt(document.getElementById('age').value, 10),
    Gender: formData.get('Gender'),
    Country: document.getElementById('country').value,
    Academic_Level: formData.get('Academic_Level'),
    Most_Used_Platform: formData.get('Most_Used_Platform'),
    Purpose_Of_Use: formData.get('Purpose_Of_Use'),
    Avg_Daily_Usage_Hours: parseFloat(document.getElementById('avgUsage').value),
    Daily_Unlocks: parseInt(document.getElementById('dailyUnlocks').value, 10),
    Study_Hours: parseFloat(document.getElementById('studyHours').value),
    Physical_Activity_Hours: parseFloat(document.getElementById('physicalActivity').value),
    Sleep_Hours_Per_Night: parseFloat(document.getElementById('sleepHours').value),
    Stress_Level: formData.get('Stress_Level')
  };

  // UI Loading State
  btnText.textContent = 'Evaluating Model...';
  btnSpinner.style.display = 'block';
  submitBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || 'Prediction request failed');
    }

    const result = await response.json();
    const score = result.predicted_mental_health_score;

    // Update API status as connected
    document.getElementById('statusDot').className = 'status-dot connected';
    document.getElementById('statusText').textContent = 'FastAPI Backend Online';
    alertBox.style.display = 'none';

    // Render results
    renderResults(score, payload);

  } catch (error) {
    console.error('Prediction Error:', error);
    alertBox.style.display = 'flex';
    document.getElementById('statusDot').className = 'status-dot error';
    document.getElementById('statusText').textContent = 'Backend Offline';
    
    // Provide a fallback estimate for testing UI if server is starting
    const fallbackScore = calculateFallbackEstimate(payload);
    renderResults(fallbackScore, payload);

  } finally {
    btnText.textContent = 'Calculate Mental Health Score';
    btnSpinner.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Render Gauge Meter & Insights
function renderResults(score, input) {
  // Score display & animation
  const scoreElem = document.getElementById('scoreValue');
  animateScore(scoreElem, score);

  // SVG Gauge arc offset (total dasharray = 283)
  const gaugeFill = document.getElementById('gaugeFill');
  const clampedScore = Math.max(0, Math.min(10, score));
  const offset = 283 - (clampedScore / 10) * 283;
  gaugeFill.style.strokeDashoffset = offset;

  // Status Badge
  const badge = document.getElementById('statusBadge');
  const badgeText = document.getElementById('statusBadgeText');

  if (score >= 7.0) {
    badge.className = 'health-status-badge status-good';
    badgeText.textContent = '🌟 Thriving & Balanced';
  } else if (score >= 5.0) {
    badge.className = 'health-status-badge status-moderate';
    badgeText.textContent = '⚠️ Moderate Stress / Watch Screen Time';
  } else {
    badge.className = 'health-status-badge status-risk';
    badgeText.textContent = '🚨 High Vulnerability / Burnout Risk';
  }

  // Factor Breakdown Analysis
  const tagSleep = document.getElementById('tagSleep');
  if (input.Sleep_Hours_Per_Night >= 7.5) {
    tagSleep.className = 'factor-tag tag-positive';
    tagSleep.textContent = 'Optimal (7.5+ hrs)';
  } else if (input.Sleep_Hours_Per_Night >= 6.0) {
    tagSleep.className = 'factor-tag tag-neutral';
    tagSleep.textContent = 'Moderate (' + input.Sleep_Hours_Per_Night + ' hrs)';
  } else {
    tagSleep.className = 'factor-tag tag-negative';
    tagSleep.textContent = 'Deprived (<6 hrs)';
  }

  const tagScreen = document.getElementById('tagScreen');
  if (input.Avg_Daily_Usage_Hours <= 3.5 && input.Daily_Unlocks <= 100) {
    tagScreen.className = 'factor-tag tag-positive';
    tagScreen.textContent = 'Low Digital Fatigue';
  } else if (input.Avg_Daily_Usage_Hours <= 6.0) {
    tagScreen.className = 'factor-tag tag-neutral';
    tagScreen.textContent = 'Moderate Screen Use';
  } else {
    tagScreen.className = 'factor-tag tag-negative';
    tagScreen.textContent = 'High Screen Time (' + input.Avg_Daily_Usage_Hours + 'h)';
  }

  const tagBalance = document.getElementById('tagBalance');
  if (input.Physical_Activity_Hours >= 1.5 && input.Stress_Level.toLowerCase() !== 'very high') {
    tagBalance.className = 'factor-tag tag-positive';
    tagBalance.textContent = 'Active & Resilient';
  } else if (input.Physical_Activity_Hours >= 0.5) {
    tagBalance.className = 'factor-tag tag-neutral';
    tagBalance.textContent = 'Fair Balance';
  } else {
    tagBalance.className = 'factor-tag tag-negative';
    tagBalance.textContent = 'Sedentary Risk';
  }

  // Generate Insights List
  const recsList = document.getElementById('recommendationsList');
  recsList.innerHTML = '';
  const tips = generateRecommendations(input, score);
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    recsList.appendChild(li);
  });
}

// Animate Score Counter
function animateScore(elem, finalVal) {
  let current = 0;
  const duration = 800; // ms
  const steps = 30;
  const stepTime = duration / steps;
  const increment = finalVal / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= finalVal) {
      current = finalVal;
      clearInterval(timer);
    }
    elem.textContent = current.toFixed(2);
  }, stepTime);
}

// Recommendations Engine
function generateRecommendations(input, score) {
  const tips = [];

  if (input.Sleep_Hours_Per_Night < 6.5) {
    tips.push(`Increasing sleep from ${input.Sleep_Hours_Per_Night}h to 7-8h per night can significantly boost focus and improve score.`);
  }

  if (input.Avg_Daily_Usage_Hours > 5.0) {
    tips.push(`High daily screen time (${input.Avg_Daily_Usage_Hours} hrs on ${input.Most_Used_Platform}) correlates with digital fatigue. Try setting a 2-hour daily app limit.`);
  }

  if (input.Daily_Unlocks > 150) {
    tips.push(`Unlocking phone ${input.Daily_Unlocks} times/day disrupts deep study concentration. Enable Do Not Disturb during focus blocks.`);
  }

  if (input.Physical_Activity_Hours < 1.0) {
    tips.push(`Adding 30–45 minutes of daily physical activity enhances sleep quality and relieves academic stress.`);
  }

  if (input.Stress_Level.toLowerCase() === 'very high' || input.Stress_Level === 'High') {
    tips.push(`High stress level reported. Incorporate mindfulness breaks and break study sessions into 25-minute Pomodoro intervals.`);
  }

  if (tips.length === 0) {
    tips.push(`Excellent routine! Maintain your current healthy balance of study, sleep (${input.Sleep_Hours_Per_Night}h), and physical activity.`);
  }

  return tips;
}

// Heuristic Fallback Estimate (only used if server is down)
function calculateFallbackEstimate(input) {
  let score = 7.0;
  
  if (input.Sleep_Hours_Per_Night < 6) score -= 1.2;
  if (input.Sleep_Hours_Per_Night >= 8) score += 0.8;
  
  if (input.Avg_Daily_Usage_Hours > 6) score -= 1.0;
  if (input.Daily_Unlocks > 180) score -= 0.6;
  
  if (input.Physical_Activity_Hours >= 1.5) score += 0.7;
  if (input.Physical_Activity_Hours < 0.5) score -= 0.5;
  
  if (input.Stress_Level.toLowerCase() === 'very high') score -= 1.5;
  else if (input.Stress_Level === 'High') score -= 0.8;
  else if (input.Stress_Level === 'Low') score += 0.6;

  return Math.max(1.0, Math.min(9.8, Math.round(score * 100) / 100));
}
