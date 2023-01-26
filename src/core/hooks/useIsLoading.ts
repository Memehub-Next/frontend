import { useBoolean } from "@chakra-ui/react";
import { useCallback } from "react";

export function useIsLoading<T extends Array<any>, U>(func: (...args: T) => Promise<U>): [boolean, (...args: T) => Promise<U>] {
  const [isLoading, { on, off }] = useBoolean(false);
  return [
    isLoading,
    useCallback(
      async (...args: T): Promise<U> => {
        on();
        const result = await func(...args);
        off();
        return result;
      },
      [func]
    ),
  ];
}
