/**
 * Trusted by – social proof strip (Weframe-style)
 */
export function TrustedBySection() {
  return (
    <section className="trusted-by-pattern py-12 md:py-16 border-y border-border">
      <div className="container mx-auto max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 md:px-6 lg:px-8 2xl:px-12 3xl:px-16">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground">
          <span className="text-base font-medium">Startups</span>
          <span className="text-base font-medium">SMBs</span>
          <span className="text-base font-medium">Enterprises</span>
          <span className="text-base font-medium">Agencies</span>
        </div>
      </div>
    </section>
  );
}
