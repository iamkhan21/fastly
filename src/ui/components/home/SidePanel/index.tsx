import React, { useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { animate } from "motion";
import { $selectedJob, loadJobDetails } from "@application/jobs";
import { useStore } from "effector-react";

const JobInfo = React.lazy(() => import("../JobInfo"));

const SidePanel = () => {
  const isOpen = useRef(false);
  const [match, params] = useRoute("/home/:uid");

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

  useEffect(() => {
    if (params?.uid) {
      loadJobDetails(params.uid);
    }
  }, [params?.uid]);

  return (
    <aside
      id={"side-panel"}
      className="fixed top-0 right-0 bottom-0 card card--primary card--right w-md ml-auto z-1 will-change-transform translate-x-full"
    >
      <Link href={"/home"}>
        <button>close</button>
      </Link>
      <hr />
      {params?.uid && (
        <React.Suspense fallback={<p>Loading</p>}>
          <JobInfo {...params} />
        </React.Suspense>
      )}
    </aside>
  );
};

export default SidePanel;
