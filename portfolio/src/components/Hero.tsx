const INFO_CARDS = [
  {
    icon: "/images/hero/icon-location.png",
    iconBg: "#0478fd",
    label: "currently in",
    value: "Hyderabad,Telangana, IND",
    dark: false,
  },
  {
    icon: "/images/hero/icon-company.png",
    iconBg: "#fdcc03",
    label: "Company",
    value: "Nxtwave",
    dark: false,
  },
  {
    icon: "/images/hero/icon-focus.png",
    iconBg: "transparent",
    label: "Focus",
    value: "Product Design and Thinking",
    dark: false,
    iconBorder: true,
  },
  {
    icon: "/images/hero/icon-tea.png",
    iconBg: "#faa506",
    label: "Fueled By",
    value: "Ginger Tea",
    dark: false,
  },
  {
    icon: "/images/hero/icon-projects.png",
    iconBg: "#0479fd",
    label: "Me in action",
    value: "View Projects",
    dark: true,
    href: "#work",
  },
] as const;

function CautionBanner() {
  return (
    <div className="animate-strip-pop relative w-full overflow-hidden">
      <div className="flex h-[77px] w-full items-center justify-center">
        <div className="w-full rotate-[2deg]">
          <div
            className="relative flex h-7 w-full items-center justify-center shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
            style={{
              background:
                "repeating-linear-gradient(-45deg, #ff8c00 0px, #ff8c00 18px, #ffffff 18px, #ffffff 36px)",
            }}
          >
            <div className="absolute inset-y-0 flex items-center bg-white px-8">
              <p className="text-center text-base font-bold tracking-wide text-[#0a0a0a]">
                UPDATES ON THE WAY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DecorativeIcons() {
  return (
    <div
      className="flex items-center justify-center gap-0"
      style={{ animation: "hero-fade-up 0.55s ease-out 0.5s both" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/product-designer-tag.png"
        alt="Product Designer"
        className="sticker-hover max-[720px]:h-14 h-24 w-auto shrink-0 object-contain drop-shadow-[0px_6px_16px_rgba(0,0,0,0.14)]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/safety-pin-simple.png"
        alt="Simple"
        className="sticker-hover sticker-hover-left max-[720px]:h-14 h-24 w-auto shrink-0 object-contain drop-shadow-[0px_6px_16px_rgba(0,0,0,0.14)]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/tools.png"
        alt=""
        aria-hidden
        className="sticker-hover max-[720px]:h-14 h-24 w-auto shrink-0 object-contain drop-shadow-[0px_6px_16px_rgba(0,0,0,0.14)]"
      />
      <div className="sticker-hover sticker-hover-left relative max-[720px]:h-14 max-[720px]:w-[56px] h-24 w-[96px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/bulb.png"
          alt=""
          aria-hidden
          className="h-full w-full object-contain"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/lightning.svg"
          alt=""
          aria-hidden
          className="absolute max-[720px]:top-[19px] max-[720px]:left-[12px] max-[720px]:h-[19px] max-[720px]:w-[26px] top-[33px] left-[20px] h-[32px] w-[45px] object-contain"
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/magic-wand.png"
        alt=""
        aria-hidden
        className="sticker-hover max-[720px]:h-14 h-24 w-auto shrink-0 object-contain drop-shadow-[0px_6px_16px_rgba(0,0,0,0.14)]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/sparkles.png"
        alt=""
        aria-hidden
        className="sticker-hover sticker-hover-left max-[720px]:h-14 h-24 w-auto shrink-0 object-contain drop-shadow-[0px_6px_16px_rgba(0,0,0,0.14)]"
      />
    </div>
  );
}

type InfoCardProps = (typeof INFO_CARDS)[number];

function InfoCard({ card }: { card: InfoCardProps }) {
  const content = (
    <>
      <div
        className={`relative size-8 shrink-0 overflow-hidden rounded-[4px] ${"iconBorder" in card && card.iconBorder ? "border-2 border-black" : ""}`}
        style={card.iconBg !== "transparent" ? { backgroundColor: card.iconBg } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.icon} alt="" className="size-full object-cover" />
      </div>
      <div className="flex flex-col items-start">
        <p className={`text-sm leading-6 ${card.dark ? "text-[#aaa]" : "text-[#5f5f5f]"}`}>
          {card.label}
        </p>
        <div className="flex items-center">
          <p className={`text-base font-semibold leading-6 ${card.dark ? "text-white" : "text-[#0a0a0a]"}`}>
            {card.value}
          </p>
          {"href" in card && card.href ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/hero/arrow-down.svg" alt="" className="size-6" />
          ) : null}
        </div>
      </div>
    </>
  );

  const className = `flex flex-1 flex-col gap-2 rounded-2xl border border-[#eee] p-[25px] ${
    card.dark ? "bg-[#282828]" : "bg-white"
  }`;

  if ("href" in card && card.href) {
    return (
      <a
        href={card.href}
        className={`${className} transition-opacity hover:opacity-90`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex w-full flex-col items-center gap-14 bg-white pt-[72px]"
      style={{ cursor: "url('/images/cursor-scaled.png') 5 4, auto" }}
    >
      <CautionBanner />

      <div className="flex w-full max-w-[980px] flex-col items-center gap-8 px-8 pt-8 pb-10 md:px-12">
        <DecorativeIcons />

        <p
          className="text-center text-[32px] font-bold leading-[1.15] tracking-[-0.9px] text-[#171717] md:text-[60px] md:leading-[69px]"
          style={{ animation: "hero-fade-up 0.6s ease-out 0.8s both" }}
        >
          Nancy, who thinks critically to achieve <span className="hover-bounce">impactful outcomes</span> backed by numbers
        </p>

        <div
          className="flex w-full items-center justify-between gap-6 max-[720px]:justify-center"
          style={{ animation: "hero-fade-up 0.55s ease-out 1.1s both" }}
        >
          {/* Worked at — label + logos all in one row */}
          <div className="flex items-center gap-5">
            <p className="max-[720px]:hidden shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-[#bbb]">worked at</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Group 6030.png" alt="NxtWave" className="max-[720px]:h-5 h-8 w-auto object-contain" />
            {/* Cars24 — equal padding all sides via object-cover crop */}
            <div className="max-[720px]:h-5 max-[720px]:w-[55px] h-8 w-[88px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cars24.png" alt="CARS24" className="h-full w-full object-cover" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/DeHaat.png" alt="DeHaat" className="max-[720px]:h-6 h-10 w-auto object-contain" />
          </div>

          {/* Promo — right, hidden on mobile */}
          <div className="max-[720px]:hidden flex shrink-0 items-start gap-[5px]">
            <div className="flex shrink-0 rotate-180 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/arrow-promo.svg" alt="" width={28} height={11} className="mt-1" />
            </div>
            <p className="text-right font-handwriting text-[20px] leading-[18px] tracking-[-1.2px] text-[#666]">
              I&apos;ve been recently promoted to
              <br />
              product designer 2 @Nxtwave
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-full bg-[#f7f7f7] py-4"
        style={{ animation: "hero-fade-up 0.55s ease-out 1.4s both" }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-stretch justify-center gap-4 px-8 md:flex-nowrap md:px-12">
          {INFO_CARDS.map((card) => (
            <InfoCard key={card.label} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
