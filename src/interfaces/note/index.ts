import { CandidateInterface } from 'interfaces/candidate';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface NoteInterface {
  id?: string;
  content: string;
  rating?: number;
  candidate_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  candidate?: CandidateInterface;
  user?: UserInterface;
  _count?: {};
}

export interface NoteGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  candidate_id?: string;
  user_id?: string;
}
