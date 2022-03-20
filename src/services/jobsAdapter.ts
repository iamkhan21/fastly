import { JobsService } from "@services/ports";
import { getActiveJobs } from "@services/api";
import { Job } from "@domain/job";
import { AuthToken } from "@services/types";

export function jobsAdapter(): JobsService {
  return {
    getActiveJobs(token: AuthToken): Promise<Job[] | null> {
      return getActiveJobs(token);
    },
  };
}
