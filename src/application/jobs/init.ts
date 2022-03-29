import {
  $jobs,
  $selectedJob,
  loadActiveJobs,
  loadActiveJobsFx,
  loadJobDetails,
  loadJobDetailsFx,
  resetJob,
  resetJobs,
  selectJob,
} from "@application/jobs/index";
import { forward } from "effector";
import { FullJob, Job } from "@domain/job";
import { storageAdapter } from "@services/storageAdapter";
import { TokenType } from "@services/types";
import { jobsAdapter } from "@services/jobsAdapter";
import { of } from "await-of";

loadJobDetailsFx.use(async ({ jobUID, abortController }): Promise<FullJob> => {
  if (abortController.signal.aborted) {
    return Promise.reject("aborted");
  }

  const token = await storageAdapter().getToken(TokenType.auth_token);

  if (!token) throw "Token missed";

  // TODO: remove
  await new Promise((resolve) => {
    setTimeout(resolve, 1_000);
  });

  const [data, err] = await of(
    jobsAdapter().getJobInfo(token, jobUID, abortController)
  );

  if (err || !data) {
    throw "Can't load job info";
  }

  return data;
  // return new Promise((resolve, reject) => {
  //   const timeout = setTimeout(() => {
  //     // @ts-ignore
  //     resolve(jobs[jobId] as FullJob);
  //   }, 2_000);
  //
  //   signal.onabort = () => {
  //     clearTimeout(timeout);
  //     reject(aborted);
  //   };
  // });
});

forward({
  from: loadJobDetails,
  to: loadJobDetailsFx,
});

loadActiveJobsFx.use(async (abortController) => {
  if (abortController.signal.aborted) {
    return Promise.reject("aborted");
  }

  const token = await storageAdapter().getToken(TokenType.auth_token);

  if (!token) throw "Token missed";

  // TODO: remove
  await new Promise((resolve) => {
    setTimeout(resolve, 1_000);
  });

  const [data, err] = await of(
    jobsAdapter().getActiveJobs(token, abortController)
  );

  if (err || !data) {
    throw "Can't load jobs";
  }

  return data;
});

forward({
  from: loadActiveJobs,
  to: loadActiveJobsFx,
});

const newJobSelected = selectJob.filter({
  fn: (job) =>
    ($selectedJob.getState() as Job)?.service?.number !== job?.service?.number,
});

$jobs.reset(resetJobs).on([loadActiveJobsFx.doneData], (_, jobs) => jobs);

$selectedJob
  .reset(resetJob)
  .on([newJobSelected, loadJobDetailsFx.doneData], (_, job) => job);
