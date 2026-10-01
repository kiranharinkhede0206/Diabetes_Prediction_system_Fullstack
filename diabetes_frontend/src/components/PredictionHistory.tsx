import { useEffect, useState } from "react";
import { getPredictions } from "../services/predictionApi";
import type { PredictionHistory as PredictionHistoryType } from "../types/prediction";

interface PredictionHistoryProps {
  refreshTrigger: number;
}

export default function PredictionHistory({
  refreshTrigger,
}: PredictionHistoryProps) {
  const [predictions, setPredictions] = useState<PredictionHistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPredictions() {
      try {
        setLoading(true);
        setError("");

        const data = await getPredictions();
        setPredictions(data);
      } catch {
        setError("Unable to load prediction history.");
      } finally {
        setLoading(false);
      }
    }

    loadPredictions();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <section className="border-t border-ink-line py-24">
        <div className="container-editorial">
          <p className="label-eyebrow">Prediction History</p>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-clinical border-t-transparent" />

            <p className="font-sans text-sm text-paper-muted">
              Loading prediction history...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="border-t border-ink-line py-24">
        <div className="container-editorial">
          <p className="label-eyebrow">Prediction History</p>

          <div className="mt-8 border border-ink-linestrong bg-ink-raised p-6">
            <p className="font-sans text-sm text-signal-high">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="prediction-history"
      className="border-t border-ink-line py-24 md:py-32"
    >
      <div className="container-editorial">
        {/* Section heading */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-eyebrow">Prediction History</p>

            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-paper md:text-6xl">
              Previous
              <br />
              Assessments
            </h2>
          </div>

          <div className="flex items-end md:col-span-5">
            <p className="max-w-md font-sans text-sm leading-relaxed text-paper-muted">
              A record of previous model predictions generated through this
              assessment system.
            </p>
          </div>
        </div>

        {/* Empty state */}
        {predictions.length === 0 ? (
          <div className="mt-16 border border-ink-line bg-ink-raised p-10 text-center">
            <p className="font-serif text-2xl text-paper">No assessments yet</p>

            <p className="mt-3 font-sans text-sm text-paper-muted">
              Complete an assessment to see your prediction history here.
            </p>
          </div>
        ) : (
          <div className="mt-16">
            {/* History count */}
            <div className="mb-6 flex items-center justify-between border-b border-ink-line pb-4">
              <p className="label-eyebrow">
                {predictions.length}{" "}
                {predictions.length === 1 ? "Assessment" : "Assessments"}
              </p>

              <span className="font-sans text-xs text-paper-muted">
                Most recent first
              </span>
            </div>

            {/* Prediction cards */}
            <div className="space-y-4">
              {predictions.map((item, index) => {
                const probability = Math.round(item.probability * 100);

                const isPositive = item.prediction === "Diabetes Predicted";

                return (
                  <article
                    key={item.id}
                    className="group border border-ink-line bg-ink-raised p-6 transition-all duration-300 hover:border-ink-linestrong md:p-8"
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                      {/* Number + result */}
                      <div className="lg:col-span-4">
                        <div className="flex items-start justify-between">
                          <span className="font-sans text-xs tracking-widest text-paper-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={`px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest ${
                              isPositive
                                ? "bg-signal-high/10 text-signal-high"
                                : "bg-clinical-dim text-clinical"
                            }`}
                          >
                            {isPositive ? "Positive" : "Negative"}
                          </span>
                        </div>

                        <h3 className="mt-8 font-serif text-2xl font-semibold leading-tight text-paper">
                          {item.prediction}
                        </h3>

                        <p className="mt-3 font-sans text-xs text-paper-muted">
                          {new Date(`${item.created_at}Z`).toLocaleString(
                            "en-IN",
                            {
                              timeZone: "Asia/Kolkata",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                        </p>
                      </div>

                      {/* Probability */}
                      <div className="lg:col-span-4">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="label-eyebrow">Model Probability</p>

                            <p className="mt-3 font-serif text-4xl font-semibold text-paper">
                              {probability}%
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 h-1.5 w-full overflow-hidden bg-ink-line">
                          <div
                            className={`h-full transition-all duration-700 ${
                              isPositive ? "bg-signal-high" : "bg-clinical"
                            }`}
                            style={{
                              width: `${probability}%`,
                            }}
                          />
                        </div>

                        <p className="mt-3 font-sans text-xs leading-relaxed text-paper-muted">
                          Output probability from the trained machine learning
                          model.
                        </p>
                      </div>

                      {/* Input summary */}
                      <div className="lg:col-span-4">
                        <p className="label-eyebrow">Assessment Data</p>

                        <div className="mt-5 grid grid-cols-3 gap-4">
                          <div>
                            <p className="font-sans text-[10px] uppercase tracking-widest text-paper-muted">
                              Glucose
                            </p>

                            <p className="mt-1 font-serif text-xl font-semibold text-paper">
                              {item.Glucose}
                            </p>

                            <p className="font-sans text-[10px] text-paper-muted">
                              mg/dL
                            </p>
                          </div>

                          <div>
                            <p className="font-sans text-[10px] uppercase tracking-widest text-paper-muted">
                              BMI
                            </p>

                            <p className="mt-1 font-serif text-xl font-semibold text-paper">
                              {item.BMI}
                            </p>
                          </div>

                          <div>
                            <p className="font-sans text-[10px] uppercase tracking-widest text-paper-muted">
                              Age
                            </p>

                            <p className="mt-1 font-serif text-xl font-semibold text-paper">
                              {item.Age}
                            </p>

                            <p className="font-sans text-[10px] text-paper-muted">
                              years
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
