import { JobsService } from "@services/ports";
import { getActiveJobs, getJobInfo } from "@services/api";

export function jobsAdapter(): JobsService {
  return {
    getJobInfo(token, jobUID, ac) {
      return getJobInfo(token, jobUID, ac);
    },
    getActiveJobs(token, ac) {
      return getActiveJobs(token, ac);
    },
  };
}
