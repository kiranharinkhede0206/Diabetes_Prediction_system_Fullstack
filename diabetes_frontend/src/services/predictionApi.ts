import type { PredictionRequest, PredictionResponse,PredictionHistory,} from '@/types/prediction';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export class PredictionServiceUnavailableError extends Error {
  constructor() {
    super('PREDICTION SERVICE UNAVAILABLE');
    this.name = 'PredictionServiceUnavailableError';
  }
}

export class PredictionProcessingError extends Error {
  constructor() {
    super('UNABLE TO GENERATE PREDICTION');
    this.name = 'PredictionProcessingError';
  }
}

/**
 * Sends the eight health parameters to the FastAPI backend and returns the
 * model's classification and probability. Throws a typed error so the UI
 * can distinguish "backend unreachable" from "backend returned a failure".
 */
export async function requestPrediction(
  payload: PredictionRequest
): Promise<PredictionResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Network failure — the API could not be reached at all.
    throw new PredictionServiceUnavailableError();
  }

  if (!response.ok) {
    throw new PredictionProcessingError();
  }

  try {
    const data = (await response.json()) as PredictionResponse;
    if (typeof data.probability !== 'number' || !data.prediction) {
      throw new Error('Malformed response');
    }
    console.log("Prediction API response:", data);
    return data;
  } catch {
    throw new PredictionProcessingError();
  }
}
  export async function getPredictions(): Promise<PredictionHistory[]> {
  const response = await fetch(`${API_BASE_URL}/predictions`);

  if (!response.ok) {
    throw new Error("Failed to fetch prediction history");
  }

  return response.json();
}
  
