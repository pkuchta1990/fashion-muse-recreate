import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "fashionhero.isPro";

const read = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const useProAccess = () => {
  const [isPro, setIsPro] = useState<boolean>(read);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIsPro(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const activate = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsPro(true);
  }, []);

  const deactivate = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, "false");
    setIsPro(false);
  }, []);

  return { isPro, activate, deactivate };
};
