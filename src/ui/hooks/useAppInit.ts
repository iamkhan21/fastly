import { useEffect } from "react";
import { initApp } from "@application/app";

export function useAppInit() {
  useEffect(() => {
    initApp();
  }, []);
}
