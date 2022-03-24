import { JobUID } from "@domain/job";

export type JobDetailsPayload = {
  jobUID: JobUID;
  abortController: AbortController;
};
