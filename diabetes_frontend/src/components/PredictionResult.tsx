import { useCountUp } from '@/hooks/useCountUp';
import type { PredictionResponse } from '@/types/prediction';

interface PredictionResultProps {
  result: PredictionResponse;
  onReset: () => void;
}

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PredictionResult({
  result,
  onReset,
}: PredictionResultProps) {
  const targetPercent = Math.round(result.probability * 10000) / 100;
  const animatedPercent = useCountUp(targetPercent, 1400, result);

  const isPositive = /^diabetes/i.test(result.prediction);

  const ringColor = isPositive
    ? 'text-signal-high'
    : 'text-signal-low';

  const offset =
    CIRCUMFERENCE * (1 - animatedPercent / 100);

  return (
    <div className="animate-[fadeSlideIn_0.6s_ease-out]">

      {/* Result header */}
      <div className="border-t border-ink-line pt-8 md:pt-10">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left — result */}
          <div className="lg:col-span-6">

            <div className="flex items-center justify-between">
              <p className="label-eyebrow">
                Assessment Result
              </p>

              <span
                className={`px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest ${
                  isPositive
                    ? 'bg-signal-high/10 text-signal-high'
                    : 'bg-clinical-dim text-clinical'
                }`}
              >
                {isPositive ? 'Positive signal' : 'Negative signal'}
              </span>
            </div>

            <h3 className="mt-6 max-w-lg font-serif text-5xl font-semibold leading-[0.98] text-paper md:text-6xl">
              {isPositive ? (
                <>
                  Diabetes
                  <br />
                  Predicted
                </>
              ) : (
                <>
                  No Diabetes
                  <br />
                  Predicted
                </>
              )}
            </h3>

            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-paper-muted">
              This result represents the output of the trained machine
              learning model based on the eight parameters provided.
            </p>

            {/* Model information */}
            <div className="mt-10 grid grid-cols-2 border-t border-ink-line pt-6">

              <div>
                <p className="label-eyebrow text-paper-muted">
                  Model
                </p>

                <p className="mt-2 font-sans text-sm text-paper">
                  Random Forest Classifier
                </p>
              </div>

              <div>
                <p className="label-eyebrow text-paper-muted">
                  Features
                </p>

                <p className="mt-2 font-sans text-sm text-paper">
                  8 health parameters
                </p>
              </div>

            </div>

            <button
              onClick={onReset}
              className="btn-editorial mt-10"
              aria-label="Run a new assessment"
            >
              New Assessment

              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5H15M15 5L11 1M15 5L11 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </button>

          </div>

          {/* Right — probability */}
          <div className="flex flex-col items-center justify-center lg:col-span-6">

            <div className="relative">

              <svg
                width="260"
                height="260"
                viewBox="0 0 220 220"
                className={`${ringColor} h-[260px] w-[260px]`}
                aria-label={`Estimated model probability ${animatedPercent.toFixed(
                  2
                )}%`}
              >

                {/* Background ring */}
                <circle
                  cx="110"
                  cy="110"
                  r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.10"
                  strokeWidth="1"
                />

                {/* Probability ring */}
                <circle
                  cx="110"
                  cy="110"
                  r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90 110 110)"
                  className="transition-[stroke-dashoffset] duration-300"
                />

              </svg>

              {/* Center value */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="font-serif text-5xl font-semibold leading-none text-paper">
                  {animatedPercent.toFixed(1)}%
                </span>

                <span className="mt-3 font-sans text-[10px] font-medium uppercase tracking-widest text-paper-muted">
                  Model Probability
                </span>

              </div>

            </div>

            {/* Probability explanation */}
            <div className="mt-8 max-w-sm text-center">

              <p className="font-serif text-xl text-paper">
                Model output
              </p>

              <p className="mt-2 font-sans text-xs leading-relaxed text-paper-muted">
                This percentage is the model's estimated probability for
                the positive class. It is not a medical diagnosis.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}