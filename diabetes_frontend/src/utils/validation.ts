import type { PredictionField, PredictionRequest } from '@/types/prediction';

type ValidationRule = (value: number) => string | null;

/**
 * Purely technical validity checks — never a clinical judgment about
 * whether a value is healthy, only whether it is a usable number for
 * the model to consume.
 */
const rules: Record<PredictionField, ValidationRule> = {
  Pregnancies: (v) => (v < 0 ? 'Pregnancies cannot be negative.' : null),
  Glucose: (v) => (v <= 0 ? 'Glucose must be greater than 0.' : null),
  BloodPressure: (v) => (v <= 0 ? 'Blood pressure must be greater than 0.' : null),
  SkinThickness: (v) => (v < 0 ? 'Skin thickness cannot be negative.' : null),
  Insulin: (v) => (v < 0 ? 'Insulin cannot be negative.' : null),
  BMI: (v) => (v <= 0 ? 'BMI must be greater than 0.' : null),
  DiabetesPedigreeFunction: (v) =>
    v < 0 ? 'Diabetes pedigree function cannot be negative.' : null,
  Age: (v) => (v <= 0 ? 'Age must be greater than 0.' : null),
};

export function validateField(field: PredictionField, rawValue: string): string | null {
  if (rawValue.trim() === '') return 'This field is required.';
  const value = Number(rawValue);
  if (Number.isNaN(value)) return 'Enter a valid number.';
  return rules[field](value);
}

export function validateAll(
  values: Record<PredictionField, string>
): Partial<Record<PredictionField, string>> {
  const errors: Partial<Record<PredictionField, string>> = {};
  (Object.keys(values) as PredictionField[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

export function toPredictionRequest(
  values: Record<PredictionField, string>
): PredictionRequest {
  return {
    Pregnancies: Number(values.Pregnancies),
    Glucose: Number(values.Glucose),
    BloodPressure: Number(values.BloodPressure),
    SkinThickness: Number(values.SkinThickness),
    Insulin: Number(values.Insulin),
    BMI: Number(values.BMI),
    DiabetesPedigreeFunction: Number(values.DiabetesPedigreeFunction),
    Age: Number(values.Age),
  };
}
