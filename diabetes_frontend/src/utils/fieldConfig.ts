import type { PredictionField } from '@/types/prediction';

export interface FieldConfig {
  field: PredictionField;
  label: string;
  placeholder: string;
  unit?: string;
  helper: string;
  step?: string;
}

export const FIELD_CONFIG: FieldConfig[] = [
  {
    field: 'Pregnancies',
    label: 'Pregnancies',
    placeholder: '2',
    helper: 'Number of pregnancies',
    step: '1',
  },
  {
    field: 'Glucose',
    label: 'Glucose',
    placeholder: '140',
    unit: 'mg/dL',
    helper: 'Plasma glucose concentration',
    step: '1',
  },
  {
    field: 'BloodPressure',
    label: 'Blood Pressure',
    placeholder: '72',
    unit: 'mmHg',
    helper: 'Diastolic blood pressure',
    step: '1',
  },
  {
    field: 'SkinThickness',
    label: 'Skin Thickness',
    placeholder: '30',
    unit: 'mm',
    helper: 'Triceps skin fold thickness',
    step: '1',
  },
  {
    field: 'Insulin',
    label: 'Insulin',
    placeholder: '125',
    unit: 'μU/mL',
    helper: '2-hour serum insulin',
    step: '1',
  },
  {
    field: 'BMI',
    label: 'BMI',
    placeholder: '32.3',
    unit: 'kg/m²',
    helper: 'Body mass index',
    step: '0.1',
  },
  {
    field: 'DiabetesPedigreeFunction',
    label: 'Diabetes Pedigree Function',
    placeholder: '0.50',
    helper: 'Diabetes pedigree function based on family history',
    step: '0.01',
  },
  {
    field: 'Age',
    label: 'Age',
    placeholder: '35',
    unit: 'years',
    helper: 'Age in years',
    step: '1',
  },
];

export const EMPTY_VALUES: Record<PredictionField, string> = FIELD_CONFIG.reduce(
  (acc, { field }) => ({ ...acc, [field]: '' }),
  {} as Record<PredictionField, string>
);
