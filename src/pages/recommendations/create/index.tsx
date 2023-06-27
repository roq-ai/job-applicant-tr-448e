import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRecommendation } from 'apiSdk/recommendations';
import { Error } from 'components/error';
import { recommendationValidationSchema } from 'validationSchema/recommendations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CandidateInterface } from 'interfaces/candidate';
import { UserInterface } from 'interfaces/user';
import { JobPostingInterface } from 'interfaces/job-posting';
import { getCandidates } from 'apiSdk/candidates';
import { getUsers } from 'apiSdk/users';
import { getJobPostings } from 'apiSdk/job-postings';
import { RecommendationInterface } from 'interfaces/recommendation';

function RecommendationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RecommendationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRecommendation(values);
      resetForm();
      router.push('/recommendations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RecommendationInterface>({
    initialValues: {
      candidate_id: (router.query.candidate_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
      job_posting_id: (router.query.job_posting_id as string) ?? null,
    },
    validationSchema: recommendationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Recommendation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<CandidateInterface>
            formik={formik}
            name={'candidate_id'}
            label={'Select Candidate'}
            placeholder={'Select Candidate'}
            fetcher={getCandidates}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<JobPostingInterface>
            formik={formik}
            name={'job_posting_id'}
            label={'Select Job Posting'}
            placeholder={'Select Job Posting'}
            fetcher={getJobPostings}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'recommendation',
  operation: AccessOperationEnum.CREATE,
})(RecommendationCreatePage);
