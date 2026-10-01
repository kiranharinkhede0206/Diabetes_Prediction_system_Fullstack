/**
 * Request payload sent to the FastAPI /predict endpoint.
 * Field names match the trained model's feature order exactly.
 */
export interface PredictionRequest {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
}
export interface PredictionHistory {
  id: number;
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
  prediction: string;
  probability: number;
  created_at: string;
}

/**
 * Response returned by the backend after running the Random Forest classifier.
 */
export interface PredictionResponse {
  prediction: 'Diabetes Predicted' | 'No Diabetes Predicted' | string;
  probability: number; // 0–1, converted to a percentage for display
}

/** Discriminated union describing the current state of an assessment request. */
export type PredictionStatus = 'idle' | 'loading' | 'success' | 'error';

export type ErrorKind = 'unavailable' | 'processing' | null;

/** Keys of PredictionRequest, used to drive the form fields generically. */
export type PredictionField = keyof PredictionRequest;
