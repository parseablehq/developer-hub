import { useEffect, useState } from "react";
interface NavigatorWithUAData extends Navigator {
  userAgentData?: {
    platform?: string;
  };
}

export function useIsMac() {
  const [isMac, setIsMac] = useState<boolean>(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithUAData;

    const uaPlatform =
      nav.userAgentData?.platform || navigator.platform || navigator.userAgent;

    const macMatches = /Mac/i.test(uaPlatform);

    setIsMac(macMatches);
  }, []);

  return isMac;
}
