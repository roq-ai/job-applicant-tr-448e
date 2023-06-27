import * as yup from 'yup';

export const candidateValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string(),
  status: yup.string().required(),
  job_posting_id: yup.string().nullable().required(),
});
