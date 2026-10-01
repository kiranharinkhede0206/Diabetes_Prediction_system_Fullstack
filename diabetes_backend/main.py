# import joblib
# model=joblib.load('model/diabetes_model_pipeline.pkl')
# print("Model loaded successfully!")
# print(model)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

from database import engine, Base, SessionLocal
from models import Prediction


# Create FastAPI app
app = FastAPI()

Base.metadata.create_all(bind=engine)


# Allow React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load your trained diabetes model
model = joblib.load("model/diabetes_model_pipeline.pkl")


# Data that React will send to us
class PredictionInput(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float


# Test endpoint
@app.get("/")
def home():
    return {"message": "Diabetes Prediction API is running"}


# Prediction endpoint
@app.post("/predict")
def predict(data: PredictionInput):

    db = SessionLocal()

    try:
        # Convert incoming data into a DataFrame
        input_data = pd.DataFrame([{
            "Pregnancies": data.Pregnancies,
            "Glucose": data.Glucose,
            "BloodPressure": data.BloodPressure,
            "SkinThickness": data.SkinThickness,
            "Insulin": data.Insulin,
            "BMI": data.BMI,
            "DiabetesPedigreeFunction": data.DiabetesPedigreeFunction,
            "Age": data.Age
        }])

        # Make prediction
        prediction = model.predict(input_data)[0]

        # Get probability of diabetes
        probability = model.predict_proba(input_data)[0][1]

        # Convert 0/1 into text
        if prediction == 1:
            result = "Diabetes Predicted"
        else:
            result = "No Diabetes Predicted"

        # Create database record
        record = Prediction(
            Pregnancies=data.Pregnancies,
            Glucose=data.Glucose,
            BloodPressure=data.BloodPressure,
            SkinThickness=data.SkinThickness,
            Insulin=data.Insulin,
            BMI=data.BMI,
            DiabetesPedigreeFunction=data.DiabetesPedigreeFunction,
            Age=data.Age,
            prediction=result,
            probability=float(probability)
        )

        # Add record to database session
        db.add(record)

        # Save transaction
        db.commit()

        # Get database-generated values such as ID
        db.refresh(record)

        return {
            "prediction": result,
            "probability": float(probability)
        }

    finally:
        # Always close the database session
        db.close()
@app.get("/predictions")
def get_predictions():
    db = SessionLocal()

    try:
        records = db.query(Prediction).order_by(
            Prediction.created_at.desc()
        ).all()

        return records

    finally:
        db.close()