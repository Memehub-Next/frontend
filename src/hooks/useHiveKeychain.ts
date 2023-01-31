import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import { Environment } from "../utils/environment";
export const useHiveKeychain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState<boolean>();
  const hasWindow = typeof window !== undefined;

  useAsyncEffect(
    async (isMounted) => {
      if (isMounted()) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const isBrowser = Environment.isBrowser();
        const isInstalled = isBrowser && window.hasOwnProperty("hive_keychain");
        console.log({ isBrowser });
        console.log({ window });
        console.log({ isInstalled });
        setIsInstalled(isInstalled);
        setIsLoading(false);
      }
    },
    [hasWindow]
  );
  return { isLoading, isInstalled };
};
