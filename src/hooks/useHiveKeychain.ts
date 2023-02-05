import { useEffect, useState } from "react";

export const useHiveKeychain = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>();
  const checkHiveKeychain = () => setIsInstalled(typeof window !== "undefined" && window.hasOwnProperty("hive_keychain"));
  useEffect(checkHiveKeychain, []);
  return { isInstalled, checkHiveKeychain };
};
