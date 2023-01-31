import { useCallback, useState } from "react";

export const useCursorPagination = (take: number) => {
  const [cursor, setCursor] = useState<string>();
  return {
    take,
    cursor,
    getLoadMore: useCallback((items?: { createdAt: string }[]) => () => setCursor(items && items.slice(-1)[0].createdAt), []),
  };
};
