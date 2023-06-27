import { CandidateInterface } from 'interfaces/candidate';
import { UserInterface } from 'interfaces/user';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface RecommendationInterface {
  id?: string;
  candidate_id: string;
  user_id: string;
  job_posting_id: string;
  created_at?: any;
  updated_at?: any;

  candidate?: CandidateInterface;
  user?: UserInterface;
  job_posting?: JobPostingInterface;
  _count?: {};
}

export interface RecommendationGetQueryInterface extends GetQueryInterface {
  id?: string;
  candidate_id?: string;
  user_id?: string;
  job_posting_id?: string;
}
