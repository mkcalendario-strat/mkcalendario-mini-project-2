"use client";

import { useEffect, useState } from "react";

const breakpoints: Record<string, string> = {
  "xs": "(max-width: 639px)",
  "sm": "(min-width: 640px) and (max-width: 767px)",
  "md": "(min-width: 768px) and (max-width: 1023px)",
  "lg": "(min-width: 1024px) and (max-width: 1279px)",
  "xl": "(min-width: 1280px) and (max-width: 1535px)",
  "2xl": "(min-width: 1536px)"
};

export function useShouldHideOn(hideOn: Array<keyof typeof breakpoints> = []) {
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    if (!hideOn.length) return;

    const mediaQueries = hideOn
      .map((bp) => {
        const query = breakpoints[bp];
        return query ? window.matchMedia(query) : null;
      })
      .filter(Boolean) as MediaQueryList[];

    const update = () => {
      const hide = mediaQueries.some((m) => m.matches);
      setShouldHide(hide);
    };

    update();

    mediaQueries.forEach((mq) => mq.addEventListener("change", update));
    return () => {
      mediaQueries.forEach((mq) => mq.removeEventListener("change", update));
    };
  }, [hideOn]);

  return shouldHide;
}
