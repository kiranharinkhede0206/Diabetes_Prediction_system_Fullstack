const STEPS = [
  {
    number: '01',
    title: 'Enter',
    description: 'Provide the required health measurements.',
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'The trained Random Forest model processes the submitted features.',
  },
  {
    number: '03',
    title: 'Result',
    description: 'The system returns a classification and estimated probability.',
  },
];

export default function HowItWorks() {
  return (
    <section className="rule py-28 md:py-40">
      <div className="container-editorial">
        <p className="label-eyebrow mb-14">How It Works</p>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.number}>
              <span className="font-serif text-6xl font-light text-paper-muted md:text-7xl">
                {step.number}
              </span>
              <div className="mt-6 h-px w-12 bg-clinical-bright" />
              <h3 className="mt-6 font-serif text-2xl font-light text-paper">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[26ch] font-sans text-sm leading-relaxed text-paper-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
