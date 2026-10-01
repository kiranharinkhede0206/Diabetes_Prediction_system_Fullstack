import { useState } from 'react';
import type {
  ErrorKind,
  PredictionField,
  PredictionResponse,
  PredictionStatus,
} from '@/types/prediction';
import { EMPTY_VALUES } from '@/utils/fieldConfig';
import { toPredictionRequest, validateAll, validateField } from '@/utils/validation';
import {
  PredictionProcessingError,
  PredictionServiceUnavailableError,
  requestPrediction,
} from '@/services/predictionApi';
import AssessmentForm from './AssessmentForm';
import PredictionResult from './PredictionResult';

interface AssessmentProps {
  onPredictionCreated: () => void;
}

export default function Assessment({
  onPredictionCreated,
}: AssessmentProps) {
  const [values, setValues] = useState<Record<PredictionField, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<PredictionField, string>>>({});
  const [status, setStatus] = useState<PredictionStatus>('idle');
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const isSubmitting = status === 'loading';

  function handleChange(field: PredictionField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: PredictionField) {
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error ?? undefined }));
  }

  async function handleSubmit() {
  if (isSubmitting) return;

  const validationErrors = validateAll(values);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  setStatus('loading');
  setErrorKind(null);

  let response: PredictionResponse;

  try {
    response = await requestPrediction(
      toPredictionRequest(values)
    );
  } catch (err) {
    setStatus('error');

    if (err instanceof PredictionServiceUnavailableError) {
      setErrorKind('unavailable');
    } else if (err instanceof PredictionProcessingError) {
      setErrorKind('processing');
    } else {
      setErrorKind('processing');
    }

    return;
  }

  // Prediction request succeeded
  setResult(response);
  setStatus('success');

  // Refresh prediction history separately
  onPredictionCreated();
}

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setResult(null);
    setStatus('idle');
    setErrorKind(null);
  }

  return (
    <section id="assessment" className="rule py-28 md:py-40">
      <div className="container-editorial">
        <div className="mb-16 max-w-xl">
          <p className="label-eyebrow mb-4">Health Measurements</p>

          <h2 className="font-serif text-4xl font-light leading-[1.05] text-paper md:text-5xl">
            Provide the parameters required by the prediction model.
          </h2>
        </div>

        {status === 'success' && result ? (
          <PredictionResult
            result={result}
            onReset={handleReset}
          />
        ) : (
          <>
            {status === 'error' && (
              <div
                role="alert"
                className="mb-10 border border-signal-high/40 bg-signal-high/5 px-6 py-5"
              >
                <p className="font-serif text-xl font-light text-paper">
                  {errorKind === 'unavailable'
                    ? 'Prediction Service Unavailable'
                    : 'Unable To Generate Prediction'}
                </p>

                <p className="mt-2 font-sans text-sm text-paper-muted">
                  {errorKind === 'unavailable'
                    ? 'Please try again.'
                    : 'Please check the submitted measurements and try again.'}
                </p>
              </div>
            )}

            <AssessmentForm
              values={values}
              errors={errors}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </section>
  );
}