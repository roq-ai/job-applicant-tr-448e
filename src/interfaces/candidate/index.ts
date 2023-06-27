import { NoteInterface } from 'interfaces/note';
import { RecommendationInterface } from 'interfaces/recommendation';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface CandidateInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status: string;
  job_posting_id: string;
  created_at?: any;
  updated_at?: any;
  note?: NoteInterface[];
  recommendation?: RecommendationInterface[];
  job_posting?: JobPostingInterface;
  _count?: {
    note?: number;
    recommendation?: number;
  };
}

export interface CandidateGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  status?: string;
  job_posting_id?: string;
}
