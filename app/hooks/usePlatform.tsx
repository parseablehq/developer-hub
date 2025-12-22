import { useEffect, useState } from "react";

type Platform = "mac" | "windows" | "linux" | "other";

interface NavigatorWithUAData extends Navigator {
  userAgentData?: {
    platform?: string;
  };
}

export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    const nav = navigator as NavigatorWithUAData;

    const platformStr =
      nav.userAgentData?.platform ?? navigator.platform ?? navigator.userAgent;

    const p = platformStr.toLowerCase();

    if (p.includes("mac")) {
      setPlatform("mac");
    } else if (p.includes("win")) {
      setPlatform("windows");
    } else if (p.includes("linux")) {
      setPlatform("linux");
    } else {
      setPlatform("other");
    }
  }, []);

  return platform;
}
