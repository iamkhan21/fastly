import { app } from "@application/app";
import jobs from "@constants/jobs.json";
import { FullJob, Job, SelectedJob } from "@domain/job";

export const $jobs = app.createStore<Job[]>(jobs as Job[]);

export const $selectedJob = app.createStore<SelectedJob>(null);

type JobDetailsPayload = {
  jobId: number;
  signal: AbortSignal;
};

export const resetJob = app.createEvent();
export const selectJob = app.createEvent<Job>();
export const loadJobDetails = app.createEvent<JobDetailsPayload>();
export const loadJobDetailsFx = app.createEffect<JobDetailsPayload, FullJob>();
