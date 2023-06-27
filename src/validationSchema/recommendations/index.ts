import * as yup from 'yup';

export const recommendationValidationSchema = yup.object().shape({
  candidate_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
  job_posting_id: yup.string().nullable().required(),
});
