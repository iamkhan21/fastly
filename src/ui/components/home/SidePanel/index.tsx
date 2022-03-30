import React, { useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { animate } from "motion";
import ComponentLoader from "@ui/components/shared/ComponentLoader";
import { useLoadJobInfo } from "@ui/hooks/useLoadJobInfo";
import Button from "@mui/material/Button";

const JobDescription = React.lazy(() => import("./JobDescription"));

const SidePanel = () => {
  const isOpen = useRef(false);
  const [match, params] = useRoute("/home/:uid");
  useLoadJobInfo(params?.uid);

  useEffect(() => {
    if (match !== isOpen.current) {
      const selector = "#side-panel";
      const duration = 0.3;

      if (isOpen.current) {
        animate(
          selector,
          { transform: "translateX(100%)" },
          { duration, easing: "ease-out" }
        );
      } else {
        animate(
          selector,
          { transform: "translateX(0)" },
          { duration, easing: "ease-in" }
        );
      }

      isOpen.current = !isOpen.current;
    }
  }, [match]);

  return (
    <aside
      id="side-panel"
      className="fixed top-0 right-0 bottom-0 card card--primary card--right max-w-2xl w-full ml-auto z-1 px-4 py-2 will-change-transform translate-x-full"
    >
      <section className="flex justify-between">
        <h4>Job #{params?.uid}</h4>
        <Link href="/home">
          <Button variant="outlined">
            X
            <i className="i-mdi-window-close" />
          </Button>
        </Link>
      </section>

      <br />
      {/*{params?.uid && (*/}
      <React.Suspense fallback={<ComponentLoader />}>
        <JobDescription />
      </React.Suspense>
      {/*)}*/}
    </aside>
  );
};

export default SidePanel;
