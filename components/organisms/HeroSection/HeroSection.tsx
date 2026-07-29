export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.webp')" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black"
      />

      <div className="relative z-10 flex w-full max-w-5xl items-center justify-center px-6">
        <div className="h-40 w-full max-w-2xl" />
      </div>
    </section>
  );
}
