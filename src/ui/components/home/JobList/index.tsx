import React, { FormEvent, useEffect } from "react";
import JobCard from "@ui/components/home/JobCard";
import { useStore } from "effector-react";
import { $jobs, loadActiveJobs, loadActiveJobsFx } from "@application/jobs";
import { getJobNumber } from "@domain/job";

const JobList = ({ useStoreHook = useStore }) => {
  const loading = useStoreHook(loadActiveJobsFx.pending);
  const jobs = useStoreHook($jobs);

  useEffect(() => {
    const abortController = new AbortController();

    loadActiveJobs(abortController);

    return () => abortController.abort();
  }, []);

  function searchJobCase(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const fetchMsg = jobs.length
    ? "Looking for new active jobs"
    : "Fetching active jobs";

  return (
    <aside className="content z-1 min-w-sm">
      <h4>Dispatches</h4>
      <br />
      <form onSubmit={searchJobCase} className="flex items-center">
        <input
          type="search"
          aria-label="Search job case"
          name="job-case"
          placeholder="Find case"
          className="mr-2 p-2 rounded"
          required
        />
        <button type="submit" className="btn btn-small btn-icon">
          <i className="block i-mdi-magnify text-base" />
        </button>
      </form>
      <br />
      <section className="space-y-3 max-h-80vh">
        {jobs.map((job) => (
          <JobCard key={getJobNumber(job)} job={job} />
        ))}
        {loading && (
          <section>
            <h6>{fetchMsg}...</h6>
          </section>
        )}
      </section>
    </aside>
  );
};

export default React.memo(JobList);
