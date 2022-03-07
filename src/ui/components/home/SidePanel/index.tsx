import React, { useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { animate } from "motion";
import { loadJobDetails } from "@application/jobs";

const JobDescription = React.lazy(() => import("../JobDescription"));

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
    const ac = new AbortController();

    if (params?.uid) {
      loadJobDetails({ jobId: +params.uid, signal: ac.signal });
    }

    return () => ac.abort();
  }, [params?.uid]);

  return (
    <aside
      id={"side-panel"}
      className="fixed top-0 right-0 bottom-0 card card--primary card--right max-w-2xl w-full ml-auto z-1 px-4 py-2 will-change-transform translate-x-full"
    >
      <section className={"flex justify-between"}>
        <p>Job {params?.uid}</p>
        <Link href={"/home"}>
          <button>close</button>
        </Link>
      </section>

      <br />
      {params?.uid && (
        <React.Suspense fallback={<p>Loading</p>}>
          <JobDescription />
        </React.Suspense>
      )}
    </aside>
  );
};

export default SidePanel;
