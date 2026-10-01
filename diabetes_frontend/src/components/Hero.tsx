function scrollToAssessment() {
  document.querySelector('#assessment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32"
    >
      <div className="container-editorial grid flex-1 grid-cols-1 items-center gap-12 md:grid-cols-12">
        {/* Left: editorial text block */}
        <div className="md:col-span-7 lg:col-span-6">
          <p className=" hero-eyebrow label-eyebrow mb-6">Machine Learning Model</p>

         <h1 className="hero-title font-serif text-[15vw] font-bold leading-[1.05] tracking-tight text-paper sm:text-[9vw] md:text-[6.2vw] lg:text-[5.4rem]">

            Diabetes
            <br />
            Risk
            <br />
            Assessment
          </h1>

          <p className="hero-description mt-8 max-w-sm font-sans text-[15px] leading-relaxed text-paper-muted">
            Machine learning for data-driven health assessment, trained on eight
            clinical parameters.
          </p>

          <button onClick={scrollToAssessment} className="hero-actions btn-editorial mt-10">
            Start Assessment
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path
                d="M1 5H15M15 5L11 1M15 5L11 9"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>

        {/* Right: asymmetric image frame */}
        <div className="relative hidden md:col-span-5 md:block lg:col-span-6">
          <div className="hero-image-frame relative ml-auto aspect-[3/4] w-full max-w-md -translate-y-4 overflow-hidden border border-ink-line animate-float">
            <img
              src="/images/diabetes_img.avif"
              alt="Adult checking a glucose reading in a calm, well-lit setting"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>

     
    </section>
  );
}
