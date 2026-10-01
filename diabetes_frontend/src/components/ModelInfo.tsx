const MODEL_FACTS = [
  { label: 'Model', value: 'Random Forest Classifier' },
  { label: 'Task', value: 'Binary Classification' },
  { label: 'Input', value: '8 health parameters' },
  { label: 'Output', value: 'Prediction + Probability' },
];

export default function ModelInfo() {
  return (
    <section id="model" className="rule py-28 md:py-40">
      <div className="container-editorial">
        <p className="label-eyebrow mb-6">The Model</p>

        <div className="grid grid-cols-1 md:grid-cols-4">
          {MODEL_FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={
                i === 0
                  ? 'rule py-8 pr-6 md:border-t-0'
                  : 'rule border-ink-line py-8 pr-6 md:border-l md:border-t-0 md:pl-6'
              }
            >
              <p className="label-eyebrow mb-3 text-paper-muted">{fact.label}</p>
              <p className="font-serif text-2xl font-light text-paper md:text-3xl">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
