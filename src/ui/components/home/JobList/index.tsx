import React, { FormEvent, useEffect } from "react";
import JobCard from "@ui/components/home/JobCard";
import { useStore } from "effector-react";
import { $jobs, loadActiveJobs, loadActiveJobsFx } from "@application/jobs";
import { getJobNumber } from "@domain/job";

const JobList = ({ useStoreHook = useStore }) => {
  const loading = useStoreHook(loadActiveJobsFx.pending);
  const jobs = useStoreHook($jobs);

  useEffect(() => {
    loadActiveJobs();
  }, []);

  function searchJobCase(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <article className="content z-1 min-w-sm">
      <h4>Dispatches</h4>
      <br />
      <form onSubmit={searchJobCase} className={"flex items-center"}>
        <input
          type="search"
          aria-label="Search job case"
          name="job-case"
          placeholder="Find case"
          className="mr-1"
          required
        />
        <button type="submit" className="">
          <div className="i-mdi-magnify text-2xl" />
        </button>
      </form>
      <br />
      <section className="space-y-3 overflow-y-auto max-h-80vh p-1">
        {jobs.map((job) => (
          <JobCard key={getJobNumber(job)} job={job} />
        ))}
        {loading && <p>Loading</p>}
      </section>
    </article>
  );
};

export default React.memo(JobList);
