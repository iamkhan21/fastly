import { app } from "@application/app";
import jobs from "./jobs.json";
import { FullJob, Job } from "@domain/job";

export const $jobs = app.createStore<Job[]>(jobs as Job[]);

export const $selectedJob = app.createStore<Job | FullJob | null>(null);

export const selectJob = app.createEvent<Job>();
export const resetJob = app.createEvent();
export const loadJobDetails = app.createEvent<string>();
export const loadJobDetailsFx = app.createEffect<number, FullJob>();
