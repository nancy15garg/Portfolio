const details = [
  { label: "currently based in", value: "Hyderabad, IN" },
  { label: "current company", value: "Nxtwave" },
  { label: "focus", value: "Product design and thiking" },
  { label: "fueled by", value: "Ginger Tea" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center gap-6 px-8 pt-28 pb-10 md:pt-24 md:pb-0 md:px-12"
      style={{ cursor: "url('/images/cursor-scaled.png') 5 4, auto" }}
    >
      {/* About */}
      <div className="flex h-auto w-full max-w-[849px] flex-col justify-end gap-1 md:h-[497px] md:shrink-0">
        <div
          style={{ animation: "hero-fade-up 0.55s ease-out 0.6s both" }}
          className="flex items-end gap-[5px]"
        >
          <p className="font-handwriting text-[20px] leading-[18px] tracking-[-1.2px] text-[#666]">
            I am a
            <br />
            product designer
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/arrow-left.svg"
            alt=""
            width={28}
            height={11}
            className="mb-1 shrink-0"
          />
        </div>

        <div style={{ animation: "hero-fade-up 0.6s ease-out 0.9s both" }}>
          <p className="text-[30px] font-medium leading-[1.15] tracking-[-0.5px] text-[#333] md:text-[60px] md:leading-[69px] md:tracking-[-0.9px]">
            {"who thinks critically to achieve "}
            {/* Framed phrase — always visible on mobile/tablet, hover-reveal on desktop */}
            <span className="group/frame relative inline-block">
              {/* Selection frame border */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-4px] rounded-[3px] border-[1.5px] border-[#ffc905] lg:opacity-0 lg:inset-[-2px] lg:transition-all lg:duration-200 lg:group-hover/frame:opacity-100 lg:group-hover/frame:inset-[-7px]"
              >
                {/* Corner handles */}
                <span className="absolute top-[-2.5px] left-[-2.5px] h-[5px] w-[5px] bg-[#ffc905] lg:h-[7px] lg:w-[7px] lg:top-[-3.5px] lg:left-[-3.5px]" />
                <span className="absolute top-[-2.5px] right-[-2.5px] h-[5px] w-[5px] bg-[#ffc905] lg:h-[7px] lg:w-[7px] lg:top-[-3.5px] lg:right-[-3.5px]" />
                <span className="absolute bottom-[-2.5px] left-[-2.5px] h-[5px] w-[5px] bg-[#ffc905] lg:h-[7px] lg:w-[7px] lg:bottom-[-3.5px] lg:left-[-3.5px]" />
                <span className="absolute bottom-[-2.5px] right-[-2.5px] h-[5px] w-[5px] bg-[#ffc905] lg:h-[7px] lg:w-[7px] lg:bottom-[-3.5px] lg:right-[-3.5px]" />
              </span>
              impactful outcomes
            </span>
            {" backed by "}
            {/* "numbers" — lifts up-left on hover, shadow stays at original position */}
            <span className="inline-block lg:transition-all lg:duration-300 lg:hover:translate-x-[-3px] lg:hover:translate-y-[-5px] lg:hover:[text-shadow:3px_5px_0_rgba(0,0,0,0.09),3px_8px_6px_rgba(0,0,0,0.05)]">
              numbers
            </span>
          </p>
        </div>

        <div
          style={{ animation: "hero-fade-up 0.55s ease-out 1.2s both" }}
          className="flex w-full items-start justify-end gap-[5px]"
        >
          <div className="flex shrink-0 rotate-180 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/arrow-right.svg"
              alt=""
              width={28}
              height={11}
              className="mt-1"
            />
          </div>
          <p className="text-right font-handwriting text-[20px] leading-[18px] tracking-[-1.2px] text-[#666]">
            I&apos;ve been recently promoted to
            <br />
            product designer 2 @Nxtwave
          </p>
        </div>
      </div>

      {/* The details */}
      <div
        style={{ animation: "hero-fade-up 0.55s ease-out 1.55s both" }}
        className="flex w-full max-w-[849px] flex-col gap-6"
      >
        <p className="text-xs font-medium uppercase tracking-[0.72px] text-[#5c5c5c]">
          the details
        </p>
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-4 min-[621px]:flex min-[621px]:flex-wrap min-[621px]:items-start md:flex-nowrap md:gap-8">
          {details.map((item) => (
            <div key={item.label} className="flex min-w-0 flex-col">
              <p className="text-xs tracking-[0.72px] text-[#5c5c5c]">{item.label}</p>
              <p className="pt-1.5 text-base font-medium text-[#0a0a0a]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
