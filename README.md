# 🧠 MindPulse — Student Social Media & Mental Health Impact Predictor

<div align="center">

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit_learn-1.3+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.0+-150458?style=for-the-badge&logo=pandas&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

<p align="center">
  <b>A Full-Stack Machine Learning Web Application & REST API</b><br>
  Predicting student mental health impact scores based on social media usage, academic workload, sleep patterns, physical activity, and stress levels.
</p>

[Key Features](#-key-features) •
[Dataset Overview](#-dataset-overview--exploratory-data-analysis) •
[Architecture](#-system-architecture) •
[ML Benchmark](#-machine-learning-benchmark) •
[Installation](#-getting-started--installation) •
[API Specs](#-api-documentation)

</div>

---

## 📌 GitHub Repository Details

When publishing this repository to GitHub, use the following details:

* **Repository Name**: `mindpulse-student-mental-health`  
  *(Alternative options: `student-mental-health-predictor`, `mindpulse-ai`, `social-media-mental-health-ml`)*
* **Repository Description**:  
  > *Full-stack ML web application & FastAPI service predicting student mental health impact scores from digital habits, sleep, stress, and study metrics.*
* **Topics / Tags**: `machine-learning`, `fastapi`, `python`, `scikit-learn`, `random-forest`, `mental-health`, `glassmorphism`, `fullstack-ml`

---

## 📖 Executive Summary

**MindPulse** is an end-to-end Machine Learning web application designed to evaluate and predict the psychological impact of digital lifestyle factors on students. By combining exploratory data analysis, feature engineering, statistical transformations, and an ensemble **Random Forest Regressor** model with a modern, glassmorphic web dashboard, MindPulse offers students immediate visibility into their mental health trajectory along with tailored actionable insights.

The system is deployed as a production-ready **FastAPI** web server that handles input validation, feature transformation normalization, and pipeline predictions, accompanied by a dynamic single-page web interface.

---

## ✨ Key Features

### 🤖 **1. Production Machine Learning Pipeline**
- Trained on **5,000 student profile records** with 13 behavioral, academic, and health attributes.
- Implements a unified Scikit-Learn `Pipeline` combining log-1p feature scaling, standard scaling, ordinal encoding, and one-hot encoding.
- Powered by a tuned **Random Forest Regressor** achieving an **$R^2$ score of ~0.878** and a low **MAE of 0.346**.

### ⚡ **2. High-Performance FastAPI Backend**
- RESTful asynchronous API endpoint (`POST /predict`) with automatic request validation using **Pydantic**.
- **Categorical Normalization Guard**: Built-in normalization defense ensuring seamless handling of string casing variations (e.g. `Very High` vs `very High`).
- Integrated **CORS middleware** for secure cross-origin requests and static file serving for the frontend dashboard.
- Automatic interactive documentation via **Swagger UI** (`/docs`) and **ReDoc** (`/redoc`).

### 🎨 **3. Glassmorphic Interactive Dashboard**
- Modern dark-mode aesthetic built with pure CSS variables, backdrop blurs, dynamic glow accents, and grid layouts.
- Real-time SVG circular gauge meter that dynamically animates to display predicted mental health scores ($1.0 - 10.0$).
- Custom interactive input controls including radio chips, numeric range inputs, and real-time preset buttons.

### 📊 **4. One-Click Profile Presets**
- **Exam Crunch / High Stress**: 9.5h study, 4.5h sleep, Very High stress.
- **High Screen Time**: 8.5h screen usage, 180 unlocks/day, high fatigue.
- **Balanced Student**: Healthy study-play balance, 8h sleep, active exercise.

### 💡 **5. Intelligent Recommendation Engine**
- Analyzes individual input factors to generate personalized lifestyle suggestions (e.g., sleep debt correction, digital app limits, Pomodoro intervals, exercise targets).

### 🔄 **6. Resilient Client-Side Fallback Engine**
- Built-in JavaScript heuristic fallback estimator ensuring that even if the backend server is unreachable, the dashboard continues to function offline gracefully.

---

## 📊 Dataset Overview & Exploratory Data Analysis

The machine learning core is built upon the dataset **`Student Social Media And Mental Health Impact.csv`**, comprising **5,000 anonymized student observations** across 13 behavioral, academic, digital, and psychological dimensions.

### **1. Target Variable: `Mental_Health_Score`**
- **Type**: Continuous Numerical Score ($3.60$ to $9.40$)
- **Mean Score**: $6.23 \pm 1.28$
- **Interpretation**: Higher scores indicate superior mental wellness, cognitive resilience, and healthy lifestyle balance. Lower scores indicate elevated digital fatigue, burnout risk, and high stress vulnerability.

### **2. Demographics & Coverage**
- **Sample Size**: 5,000 rows, 0 missing/null values across all columns.
- **Age Range**: 18 to 24 years (Mean: 20.8 years).
- **Gender Distribution**: 
  - Male: 2,635 (52.7%)
  - Female: 2,365 (47.3%)
- **Academic Breakdown**:
  - Undergraduate: 3,632 (72.6%)
  - Graduate: 918 (18.4%)
  - High School: 450 (9.0%)
- **Geographical Bucket Distribution**:
  - `India` (389), `USA` (355), `Canada` (230), `Australia` (198), `UK` (185), `Germany` (136), `Mexico` (94), `Turkey` (94), `France` (87), `Other` (1,880).

### **3. Social Media & Digital Usage Habits**
- **Platforms Tracked (12 total)**: Instagram (1,130), TikTok (918), Facebook (719), LinkedIn (523), YouTube (491), Twitter (462), Snapchat (420), WhatsApp (175), LINE (50), VKontakte (40), KakaoTalk (36), WeChat (36).
- **Primary Use Purpose**: Entertainment, Education, Networking, News.

### **4. Psychological Stress Level Distribution**
| Stress Level Categorization | Count | Percentage |
| :--- | :---: | :---: |
| **Very High** | 1,621 | 32.4% |
| **High** | 1,440 | 28.8% |
| **Medium** | 1,295 | 25.9% |
| **Low** | 644 | 12.9% |

### **5. Complete Dataset Feature Dictionary**

| Feature Name | Type | Description / Categories | Preprocessing Technique |
| :--- | :--- | :--- | :--- |
| `Age` | Numerical | Student age (18–24 years) | `StandardScaler` |
| `Gender` | Categorical | `Male`, `Female` | `OneHotEncoder` |
| `Country` | Categorical | Top 10 countries (`India`, `USA`, `UK`...) + `Other` | `Grouped_Country` + `OneHotEncoder` |
| `Academic_Level` | Categorical | `High School`, `Undergraduate`, `Graduate` | `OneHotEncoder` |
| `Most_Used_Platform` | Categorical | `Instagram`, `TikTok`, `YouTube`, `Facebook`, etc. | `OneHotEncoder` |
| `Purpose_Of_Use` | Categorical | `Entertainment`, `Education`, `Networking`, `News` | `OneHotEncoder` |
| `Avg_Daily_Usage_Hours`| Numerical | Hours spent daily on social media (0–24h) | `StandardScaler` |
| `Daily_Unlocks` | Numerical | Number of smartphone screen unlocks per day | `StandardScaler` |
| `Study_Hours` | Numerical | Daily study hours (Right-skewed distribution) | `FunctionTransformer(np.log1p)` + `StandardScaler` |
| `Physical_Activity_Hours`| Numerical| Hours of physical exercise per day (0–24h) | `StandardScaler` |
| `Sleep_Hours_Per_Night`| Numerical | Nightly sleep duration (0–24h) | `StandardScaler` |
| `Stress_Level` | Ordinal | `Low` < `Medium` < `High` < `Very High` | `OrdinalEncoder` |
| **`Mental_Health_Score`**| Numerical | **Target Output** (Continuous 3.60 to 9.40) | Continuous Target Output |

---

## 🏗️ System Architecture

```
                                  +---------------------------------------+
                                  |            User Interface             |
                                  | (index.html + style.css + app.js)     |
                                  +-------------------+-------------------+
                                                      |
                                                      | HTTP POST /predict (JSON)
                                                      v
                                  +---------------------------------------+
                                  |            FastAPI Backend            |
                                  |               (main.py)               |
                                  +-------------------+-------------------+
                                                      |
                                                      | Pydantic Validation & Normalization
                                                      v
                                  +---------------------------------------+
                                  |     Scikit-Learn ML Pipeline          |
                                  |      (Mental_Health_Model.pkl)        |
                                  +-------------------+-------------------+
                                                      |
                    +---------------------------------+---------------------------------+
                    |                                 |                                 |
                    v                                 v                                 v
        +-----------------------+         +-----------------------+         +-----------------------+
        |   Log1p & StandardScaler |         |    OrdinalEncoder     |         |     OneHotEncoder     |
        |     ['Study_Hours']   |         |    ['Stress_Level']   |         | ['Gender','Country'..]|
        +-----------------------+         +-----------------------+         +-----------------------+
                    |                                 |                                 |
                    +---------------------------------+---------------------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |         Random Forest Regressor       |
                                  +-------------------+-------------------+
                                                      |
                                                      | Prediction Score (1.0 - 10.0)
                                                      v
                                  +---------------------------------------+
                                  |    JSON Response & Gauge Animation    |
                                  +---------------------------------------+
```

---

## 🔬 Machine Learning Benchmark & Performance

During model development in [`ml_project.ipynb`](file:///c:/Users/Piyush%20Gupta/Desktop/mental%20health/ml_project.ipynb), multiple regression algorithms were trained and evaluated on 5,000 student records using an 80/20 train-test split.

### **Model Comparison Matrix**

| Model Algorithm | Training $R^2$ | Testing $R^2$ | Mean Absolute Error (MAE) | Root Mean Squared Error (RMSE) |
| :--- | :---: | :---: | :---: | :---: |
| **Linear Regression** | 0.7237 | 0.7398 | 0.5362 | 0.6760 |
| **Random Forest (Default)** 🏆 | **0.9809** | **0.8780** | **0.3465** | **0.4629** |
| **Random Forest (Tuned)** | 0.9547 | 0.8652 | 0.3687 | 0.4865 |

> **Conclusion**: The default **Random Forest Regressor** pipeline provided the highest predictive capability ($R^2 = 0.8780$) and lowest error ($\text{MAE} = 0.3465$), and was selected as the core estimator serialized into [`Mental_Health_Model.pkl`](file:///c:/Users/Piyush%20Gupta/Desktop/mental%20health/Mental_Health_Model.pkl).

---

## 📂 Project Structure

```
mental health/
│
├── main.py                                      # FastAPI server, route handling & Pydantic models
├── Mental_Health_Model.pkl                      # Serialized Scikit-Learn Random Forest Pipeline
├── Student Social Media And Mental Health Impact.csv # Dataset (5,000 student records)
├── ml_project.ipynb                             # Jupyter Notebook: EDA, Transformation & Modeling
├── requirements.txt                             # Python package dependencies
├── .gitignore                                   # Git exclusion patterns
├── README.md                                    # Comprehensive project documentation
│
├── index.html                                   # Glassmorphic frontend dashboard structure
├── style.css                                    # Glassmorphic dark styling & responsive grid layout
└── app.js                                       # Client API communication, gauge math & fallback
```

---

## ⚡ Getting Started & Installation

### **1. Prerequisites**
- Python 3.9 or higher
- Git

### **2. Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/mindpulse-student-mental-health.git
cd mindpulse-student-mental-health
```

### **3. Set Up Virtual Environment (Recommended)**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### **4. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **5. Run the FastAPI Server**
```bash
python -m uvicorn main:app --reload --port 8000
```

### **6. Open Application & API Documentation**
- **Web Application Dashboard**: Open [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/) in your browser.
- **Interactive Swagger Documentation**: Open [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs).
- **ReDoc Schema View**: Open [`http://127.0.0.1:8000/redoc`](http://127.0.0.1:8000/redoc).

---

## 🔌 API Documentation

### **`POST /predict`**
Calculates the predicted student mental health impact score.

#### **Request Headers**
`Content-Type: application/json`

#### **Request Body Example**
```json
{
  "Age": 20,
  "Gender": "Female",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Entertainment",
  "Avg_Daily_Usage_Hours": 5.0,
  "Daily_Unlocks": 140,
  "Study_Hours": 6.5,
  "Physical_Activity_Hours": 1.0,
  "Sleep_Hours_Per_Night": 6.0,
  "Stress_Level": "Very High"
}
```

#### **Response Body Example (`200 OK`)**
```json
{
  "predicted_mental_health_score": 5.6
}
```

#### **Field Constraints**
- `Age`: integer between `10` and `100`.
- `Gender`: `Male` | `Female`.
- `Academic_Level`: `Undergraduate` | `Graduate` | `High School`.
- `Stress_Level`: `Low` | `Medium` | `High` | `Very High` (supports case-insensitive input).
- Numerical hours (`Avg_Daily_Usage_Hours`, `Study_Hours`, etc.): float between `0.0` and `24.0`.

---

## 🛡️ Reliability & Edge Case Handling

1. **Category String Normalization**: Automatically normalizes string casing variations (such as `'very High'` vs `'Very High'`) to prevent `OrdinalEncoder` unknown category errors during transformation.
2. **Dynamic Country Grouping**: Maps input countries outside the top 10 benchmark list to `'Other'` seamlessly matching training set preprocessors.
3. **Client-Side Fallback Engine**: If the FastAPI backend is down or network disconnects, `app.js` runs a client-side heuristic score estimator so the user interface never breaks.

---

## 🤝 Contributing

Contributions are welcome! If you would like to enhance MindPulse:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more details.

<div align="center">
  <br>
  <sub>Built with ❤️ for student wellness and mental health awareness.</sub>
</div>
