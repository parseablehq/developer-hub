import { useEffect, useState } from "react";

export function useIsMac() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Safely read userAgentData if supported
    const uaPlatform =
      (navigator as any).userAgentData?.platform ||
      navigator.platform ||
      navigator.userAgent;

    const macMatches = /Mac/i.test(uaPlatform);

    setIsMac(macMatches);
  }, []);

  return isMac;
}
