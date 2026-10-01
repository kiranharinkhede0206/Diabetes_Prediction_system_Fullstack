export default function Introduction() {
  return (
    <section id="introduction" className="rule py-28 md:py-40">
      <div className="container-editorial grid grid-cols-1 gap-10 md:grid-cols-12">
        <h2 className="font-serif text-4xl font-light leading-[1.05] text-paper md:col-span-6 md:text-5xl lg:text-6xl">
          A data-driven approach to diabetes risk
        </h2>

        <div className="md:col-span-5 md:col-start-8">
          <p className="font-sans text-base leading-relaxed text-paper-muted">
            The system analyzes eight health-related parameters using a trained
            machine learning classification model and returns a diabetes
            prediction with an estimated probability.
          </p>
        </div>
      </div>
    </section>
  );
}
