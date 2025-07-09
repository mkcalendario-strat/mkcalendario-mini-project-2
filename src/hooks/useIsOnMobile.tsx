import { useCallback, useEffect, useState } from "react";

export default function useIsOnMobile() {
  const [width, setWidth] = useState<number | null>(null);

  const getWidth = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);

    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [getWidth]);

  return width !== null ? width < 768 : null;
}
