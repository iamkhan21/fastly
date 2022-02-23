import React, { FormEvent } from "react";
import JobCard from "@ui/components/home/JobCard";

const JobList = () => {
  function searchJobCase(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <article className="content z-1">
      <h4>Dispatches</h4>
      <br />
      <form onSubmit={searchJobCase}>
        <input
          type="search"
          aria-label="Search job case"
          name="job-case"
          placeholder="Find case"
          className="mr-1"
          required
        />
        <button type="submit">
          <div className="i-mdi-search text-xl" />
        </button>
      </form>

      <br />
      <section className="space-y-3">
        <JobCard uid={"job1"} />
        <JobCard uid={"job2"} />
      </section>
    </article>
  );
};

export default React.memo(JobList);
