import React from "react";
import { useRoute } from "wouter";

const Job = React.lazy(() => import("../Job"));

const SidePanel = () => {
  const [match, params] = useRoute("/home/:uid");

  return match ? (
    <aside className="p-2 w-md bg-gray-500 ml-auto shadow-lg shadow-gray-500 z-1">
      <React.Suspense fallback={<p>Loading</p>}>
        {params?.uid && <Job {...params} />}
      </React.Suspense>
    </aside>
  ) : null;
};

export default SidePanel;
