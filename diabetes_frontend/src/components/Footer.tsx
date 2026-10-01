export default function Footer() {
  return (
    <footer id="footer" className="py-16">
      <div className="container-editorial flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-sans text-[11px] uppercase leading-tight tracking-widest2 text-paper">
            Diabetes Prediction System
          </p>
          <p className="mt-2 font-sans text-[11px] uppercase tracking-widest2 text-paper-muted">
            ML-Based Risk Assessment
          </p>
        </div>

        <p className="max-w-md font-sans text-xs leading-relaxed text-paper-muted/70">
          This system provides machine-learning-based risk estimates from
          submitted parameters and is not a medical diagnostic tool. Results
          should not replace professional medical advice.
        </p>
      </div>
    </footer>
  );
}
