# Diabetes Prediction System

An end-to-end machine learning web application that predicts diabetes risk based on eight clinical parameters. The system combines a trained Random Forest model with a React frontend, FastAPI backend, and database for storing prediction history.

> This project is developed for educational and machine learning demonstration purposes and should not be used as a medical diagnostic system.

## Live Demo

[View Live Application](YOUR_LIVE_FRONTEND_URL)

## Repository

[View Source Code](YOUR_GITHUB_REPOSITORY_URL)

## Overview

The Diabetes Prediction System is a full-stack machine learning application designed to demonstrate how a trained classification model can be integrated into a real-world web application.

Users can enter eight clinical parameters through the web interface and receive:

- A diabetes prediction
- Model probability
- Prediction history
- Timestamped assessment records
- A summary of selected input parameters

The application connects a React frontend to a FastAPI backend, where the machine learning model processes the submitted data and stores the resulting prediction in a database.

## Key Features

- Machine learning based diabetes risk prediction
- Random Forest classification model
- React and TypeScript frontend
- FastAPI REST API
- Prediction probability display
- Prediction history
- Database-backed prediction records
- Timestamped prediction records
- Client-side input validation
- Backend request validation
- Frontend and backend separation
- REST API communication
- Responsive user interface
- Interactive assessment workflow
- Model probability visualization
- Historical assessment display
- API documentation through FastAPI Swagger UI

## Application Workflow

```text
User enters clinical parameters
              │
              ▼
       Frontend Validation
              │
              ▼
       React Frontend
              │
              │ POST /predict
              ▼
       FastAPI Backend
              │
              ▼
      Input Data Processing
              │
              ▼
      Trained ML Pipeline
              │
        ┌─────┴─────┐
        ▼           ▼
   Prediction   Probability
        │           │
        └─────┬─────┘
              ▼
       Database Storage
              │
              ▼
       API Response
              │
              ▼
       Result Display
              │
              ▼
      Prediction History
System Architecture

The application follows a layered architecture consisting of four main components:

Frontend Layer

The frontend is responsible for providing the user-facing assessment interface.

It handles:

Collecting clinical input values
Client-side form validation
Sending prediction requests to the backend
Displaying prediction results
Displaying model probability
Displaying prediction history
Managing loading and error states

Technologies:

React
TypeScript
Vite
Tailwind CSS
Backend Layer

The backend provides the REST API and acts as the communication layer between the frontend, machine learning model, and database.

It handles:

Request validation
Input data preparation
Machine learning inference
Probability calculation
Database operations
API responses
CORS configuration

Technologies:

Python
FastAPI
Uvicorn
Pandas
Joblib
Machine Learning Layer

The machine learning layer contains the trained classification pipeline used to generate diabetes predictions.

Technology:

Scikit-learn
Random Forest
Database Layer

The database layer stores prediction records generated through the application.

It allows previously generated assessments to be retrieved and displayed through the prediction history section.

Technologies:

SQLite
SQLAlchemy
Machine Learning Model

The system uses a Random Forest classifier for binary classification.

The model takes the following eight clinical parameters as input:

Feature	Description
Pregnancies	Number of pregnancies
Glucose	Plasma glucose concentration
BloodPressure	Diastolic blood pressure
SkinThickness	Skin fold thickness
Insulin	Insulin level
BMI	Body mass index
DiabetesPedigreeFunction	Diabetes pedigree function value
Age	Age of the individual

The trained machine learning model is stored as a serialized Scikit-learn pipeline:

diabetes_backend/
└── model/
    └── diabetes_model_pipeline.pkl

The backend loads this pipeline and uses it to generate:

Classification result
Positive-class probability

Example response:

{
  "prediction": "Diabetes Predicted",
  "probability": 0.685
}

The frontend converts the probability value into a percentage for display.

Model Evaluation

The initial Random Forest model achieved approximately:

Accuracy: 77.9%
Recall: 59.3%
F1 Score: 65.3%

A subsequent hyperparameter tuning experiment was performed using:

n_estimators = 200
max_depth = 15

The tuned configuration produced approximately:

Accuracy: 74.0%
Recall: 53.7%
F1 Score: 59.2%

The baseline model was therefore retained as the selected model for the current application.

Multiple evaluation metrics were considered instead of relying only on accuracy, since the application involves a medical prediction task where different types of classification errors can have different consequences.

Frontend

The frontend provides the complete user-facing assessment experience.

Main Sections

The application interface contains:

Navigation
Hero section
Introduction
Model information
How It Works
Assessment form
Prediction result
Prediction history
Footer
Assessment Form

The assessment form collects the eight parameters required by the machine learning model:

Pregnancies
Glucose
Blood Pressure
Skin Thickness
Insulin
BMI
Diabetes Pedigree Function
Age

The frontend validates the entered values before sending the request to the backend.

Prediction Result

After a successful prediction, the application displays:

Prediction result
Model probability
Probability visualization
Explanation of the result
Option to start a new assessment

The displayed probability represents the model's estimated probability for the positive class. It should not be interpreted as a medical diagnosis.

Prediction History

The application maintains a history of previously generated predictions.

Prediction history is retrieved from the backend using:

GET /predictions

Each prediction record contains information such as:

Prediction result
Probability
Glucose
BMI
Age
Timestamp

The most recent assessment is displayed first.

Backend API

The FastAPI backend exposes REST endpoints for communication with the frontend.

GET /

Used to verify that the backend API is running.

Example response:

{
  "message": "Diabetes Prediction API is running"
}
POST /predict

Generates a diabetes prediction from the submitted clinical parameters.

Example request:

{
  "Pregnancies": 4,
  "Glucose": 171,
  "BloodPressure": 34,
  "SkinThickness": 56,
  "Insulin": 100,
  "BMI": 30,
  "DiabetesPedigreeFunction": 0.5,
  "Age": 25
}

Example response:

{
  "prediction": "Diabetes Predicted",
  "probability": 0.685
}
GET /predictions

Retrieves previously generated prediction records from the database.

The endpoint returns stored assessment data along with the prediction, probability, and creation timestamp.

API Documentation

FastAPI automatically provides interactive API documentation through Swagger UI.

During development, the API documentation can be accessed at:

/docs

The Swagger interface allows API endpoints to be tested directly without using the frontend.

Database Design

The application uses SQLAlchemy as the ORM layer over SQLite.

The prediction table stores the input parameters along with the generated prediction.

Field	Purpose
id	Unique prediction identifier
Pregnancies	Input parameter
Glucose	Input parameter
BloodPressure	Input parameter
SkinThickness	Input parameter
Insulin	Input parameter
BMI	Input parameter
DiabetesPedigreeFunction	Input parameter
Age	Input parameter
prediction	Model prediction
probability	Positive-class probability
created_at	Prediction creation timestamp

The database allows prediction history to persist beyond the current frontend session.

Project Structure
diabetes_full/
│
├── diabetes_backend/
│   ├── model/
│   │   └── diabetes_model_pipeline.pkl
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── requirements.txt
│
├── diabetes_frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── .gitignore
└── README.md
Frontend API Integration

The frontend communicates with the FastAPI backend through a dedicated API service.

For generating predictions:

requestPrediction()
        │
        ▼
POST /predict
        │
        ▼
FastAPI Backend
        │
        ▼
Prediction Response

For retrieving prediction history:

getPredictions()
        │
        ▼
GET /predictions
        │
        ▼
Prediction History

The frontend manages different API states including:

Loading
Successful prediction
Service unavailable
Prediction processing error
Prediction history loading error
Error Handling

The application separates validation errors, network errors, and prediction-processing errors.

The frontend handles:

Invalid form inputs
Network or service failures
Invalid API responses
Prediction processing failures
Prediction history loading failures

This prevents backend failures from being incorrectly displayed as successful predictions.

Environment Configuration

The frontend uses an environment variable to configure the backend API URL.

Example:

VITE_API_URL=http://localhost:8000

For deployment, this value should be changed to the URL of the deployed backend.

The actual .env file is excluded from the Git repository, while .env.example is included to document the required configuration.

Local Development
Prerequisites

Make sure the following are installed:

Python
Node.js
npm
Git
Backend

Navigate to the backend directory:

cd diabetes_backend

Create a virtual environment:

python -m venv venv

Activate the environment on Windows:

venv\Scripts\activate

Install the dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn main:app --reload

The backend will run locally on:

http://localhost:8000
Frontend

Open another terminal and navigate to the frontend:

cd diabetes_frontend

Install the dependencies:

npm install

Create the .env file and configure the backend URL:

VITE_API_URL=http://localhost:8000

Start the development server:

npm run dev
Deployment

The application can be deployed as separate frontend and backend services.

React Frontend
      │
      │ API Requests
      ▼
FastAPI Backend
      │
      ├── Machine Learning Model
      │
      └── Database

For production deployment, the frontend environment variable should point to the deployed backend:

VITE_API_URL=<DEPLOYED_BACKEND_URL>

The backend must also be configured to allow requests from the deployed frontend origin through CORS.

Security and Privacy

The repository does not contain:

API keys
Authentication credentials
Passwords
Private tokens
Personal information
Production database credentials
Private environment variables

Environment files are excluded through .gitignore.

The local SQLite database is also excluded from version control.

Limitations
The model is intended for educational and demonstration purposes.
The prediction should not be considered a medical diagnosis.
Model performance depends on the dataset used for training.
The application does not replace professional medical evaluation.
The current database implementation uses SQLite.
The model may not generalize to populations that differ from the training data.
The application currently focuses on a single machine learning prediction task.
Future Improvements

Potential improvements include:

PostgreSQL integration for production
User authentication
User account management
SHAP-based model explainability
More extensive model evaluation
Cross-validation
Automated testing
CI/CD pipeline
Model monitoring
Production logging
Cloud deployment
Improved accessibility
Improved mobile responsiveness
More detailed prediction analytics
Technologies Used
Frontend
├── React
├── TypeScript
├── Vite
└── Tailwind CSS

Backend
├── Python
├── FastAPI
├── Uvicorn
├── Pandas
└── Joblib

Machine Learning
├── Scikit-learn
└── Random Forest

Database
├── SQLite
└── SQLAlchemy

Tools
├── Git
├── GitHub
└── VS Code
Project Goals

This project demonstrates the integration of:

Machine learning
REST API development
Frontend development
Database management
Model inference
Full-stack application architecture

The primary goal is to move beyond a standalone machine learning notebook and demonstrate how a trained machine learning model can be integrated into an interactive software application.

Disclaimer

This application is developed for educational and machine learning demonstration purposes.

The predictions generated by this system should not be interpreted as medical advice, diagnosis, or treatment recommendations.

Always consult a qualified healthcare professional for medical evaluation and decisions.