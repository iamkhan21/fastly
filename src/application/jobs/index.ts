import { app } from "@application/app";
import { FullJob, Job, SelectedJob } from "@domain/job";
import { JobDetailsPayload } from "@application/jobs/types";

export const $jobs = app.createStore<Job[]>([]);

export const resetJobs = app.createEvent();
export const loadActiveJobs = app.createEvent<AbortController>();
export const loadActiveJobsFx = app.createEffect<AbortController, Job[]>();

export const $selectedJob = app.createStore<SelectedJob>(null);

export const resetJob = app.createEvent();
export const selectJob = app.createEvent<Job>();
export const loadJobDetails = app.createEvent<JobDetailsPayload>();
export const loadJobDetailsFx = app.createEffect<JobDetailsPayload, FullJob>();
