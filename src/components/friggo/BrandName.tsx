import React, { useEffect, useState } from "react";

type Props = {
  label?: string;
  sizeClass?: string;
  animateOnFirstLoad?: boolean;
  forceAnimate?: boolean;
  showIcon?: boolean;
};

export default function BrandName({
  label = "Frigo",
  sizeClass = "text-xl sm:text-2xl md:text-2xl",
  animateOnFirstLoad = true,
  forceAnimate = false,
  showIcon = false,
}: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const key = "friggo:brand-animated:v1";
    if (forceAnimate) {
      setAnimate(true);
      const id = setTimeout(() => setAnimate(false), 1200);
      return () => clearTimeout(id);
    }
    if (!animateOnFirstLoad) return;
    const done = localStorage.getItem(key);
    if (!done) {
      setAnimate(true);
      localStorage.setItem(key, "1");
      const id = setTimeout(() => setAnimate(false), 1200);
      return () => clearTimeout(id);
    }
  }, [animateOnFirstLoad, forceAnimate]);

  const brandLabel = label === "Frigo" ? "Friggo" : label;

  return (
    <div className="brand-inline">
      {showIcon && (
        <div className="brand-icon bg-white/0 dark:bg-black/0">
          <img
            src="/icon.png"
            alt={label}
            className="w-full h-full object-cover transform scale-[1.15]"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className={`brand-text ${sizeClass} font-sans font-extrabold tracking-tight`}>{
        animate ? (
          <span className="brand-anim">
            <span className="brand-anim-inner">{brandLabel}</span>
          </span>
        ) : (
          <span>{brandLabel}</span>
        )
      }</div>
    </div>
  );
}
