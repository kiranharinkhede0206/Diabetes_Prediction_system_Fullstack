const NAV_LINKS = [
  { label: 'About', href: '#introduction' },
  { label: 'Model', href: '#model' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'Info', href: '#footer' },
];

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navigation() {
  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <nav className="container-editorial flex items-center justify-between py-6">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#hero');
          }}
          className="font-sans text-[11px] uppercase leading-tight tracking-widest2 text-paper"
        >
          Diabetes
          <br />
          Prediction System
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="group relative font-sans text-[11px] uppercase tracking-widest2 text-paper-muted transition-colors duration-200 hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-clinical-bright transition-all duration-300 ease-editorial group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#assessment"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#assessment');
          }}
          className="font-sans text-[11px] uppercase tracking-widest2 text-paper-muted transition-colors duration-200 hover:text-paper md:hidden"
        >
          Assess
        </a>
      </nav>
    </header>
  );
}
