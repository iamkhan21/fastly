import { useEffect } from "react";

export function useTitle(title: string): void {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, []);
}
