import { useState } from "react";
import useAsyncEffect from "use-async-effect";

export const useAsyncEffectReload = (callback: () => Promise<any>, deps: Array<any>, timeout: number) => {
  const [reload, setReload] = useState(false);
  useAsyncEffect(
    async (isMounted) => {
      if (!isMounted()) return;
      await callback();
      return setTimeout(() => setReload((reload) => !reload), timeout);
    },
    (id) => (id ? clearTimeout(id) : null),
    [...deps, reload]
  );
};
