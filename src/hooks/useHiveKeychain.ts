import { useEffect, useState } from "react";

export const useHiveKeychain = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>();
  useEffect(() => setIsInstalled(typeof window !== "undefined" && window.hasOwnProperty("hive_keychain")), []);
  return { isInstalled };
};
