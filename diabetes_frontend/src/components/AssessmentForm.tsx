import type { PredictionField } from '@/types/prediction';
import { FIELD_CONFIG } from '@/utils/fieldConfig';

interface AssessmentFormProps {
  values: Record<PredictionField, string>;
  errors: Partial<Record<PredictionField, string>>;
  isSubmitting: boolean;
  onChange: (field: PredictionField, value: string) => void;
  onBlur: (field: PredictionField) => void;
  onSubmit: () => void;
}

export default function AssessmentForm({
  values,
  errors,
  isSubmitting,
  onChange,
  onBlur,
  onSubmit,
}: AssessmentFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {FIELD_CONFIG.map(({ field, label, placeholder, unit, helper, step }) => {
          const errorId = `${field}-error`;
          const hasError = Boolean(errors[field]);

          return (
            <div key={field}>
              <label
                htmlFor={field}
                className="mb-2 flex items-baseline justify-between font-sans text-[13px] uppercase tracking-widest2 text-paper"
              >
                <span>{label}</span>
                {unit && <span className="text-paper-muted normal-case">{unit}</span>}
              </label>

              <input
                id={field}
                name={field}
                type="number"
                inputMode="decimal"
                step={step}
                placeholder={placeholder}
                value={values[field]}
                onChange={(e) => onChange(field, e.target.value)}
                onBlur={() => onBlur(field)}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                data-invalid={hasError}
                className="field-input"
              />

              <p
                id={errorId}
                className={`mt-2 min-h-[1.1rem] text-xs ${
                  hasError ? 'text-signal-high' : 'text-paper-muted'
                }`}
              >
                {errors[field] ?? helper}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <button type="submit" className="btn-editorial" disabled={isSubmitting}>
          {isSubmitting ? 'Analyzing…' : 'Predict Diabetes Risk'}
          {!isSubmitting && (
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path
                d="M1 5H15M15 5L11 1M15 5L11 9"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
