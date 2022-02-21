import React from "react";
import { useRoute } from "wouter";

const Job = React.lazy(() => import("../Job"));

const SidePanel = () => {
  const [match, params] = useRoute("/home/:uid");

  return match ? (
    <aside className="card card--primary card--right w-md ml-auto z-1">
      <React.Suspense fallback={<p>Loading</p>}>
        {params?.uid && <Job {...params} />}
      </React.Suspense>
    </aside>
  ) : null;
};

export default SidePanel;
