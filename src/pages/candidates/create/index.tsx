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
import { createCandidate } from 'apiSdk/candidates';
import { Error } from 'components/error';
import { candidateValidationSchema } from 'validationSchema/candidates';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { JobPostingInterface } from 'interfaces/job-posting';
import { getJobPostings } from 'apiSdk/job-postings';
import { CandidateInterface } from 'interfaces/candidate';

function CandidateCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CandidateInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCandidate(values);
      resetForm();
      router.push('/candidates');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CandidateInterface>({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      status: '',
      job_posting_id: (router.query.job_posting_id as string) ?? null,
    },
    validationSchema: candidateValidationSchema,
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
            Create Candidate
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="first_name" mb="4" isInvalid={!!formik.errors?.first_name}>
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="first_name" value={formik.values?.first_name} onChange={formik.handleChange} />
            {formik.errors.first_name && <FormErrorMessage>{formik.errors?.first_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="last_name" mb="4" isInvalid={!!formik.errors?.last_name}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="last_name" value={formik.values?.last_name} onChange={formik.handleChange} />
            {formik.errors.last_name && <FormErrorMessage>{formik.errors?.last_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="email" mb="4" isInvalid={!!formik.errors?.email}>
            <FormLabel>Email</FormLabel>
            <Input type="text" name="email" value={formik.values?.email} onChange={formik.handleChange} />
            {formik.errors.email && <FormErrorMessage>{formik.errors?.email}</FormErrorMessage>}
          </FormControl>
          <FormControl id="phone" mb="4" isInvalid={!!formik.errors?.phone}>
            <FormLabel>Phone</FormLabel>
            <Input type="text" name="phone" value={formik.values?.phone} onChange={formik.handleChange} />
            {formik.errors.phone && <FormErrorMessage>{formik.errors?.phone}</FormErrorMessage>}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
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
  entity: 'candidate',
  operation: AccessOperationEnum.CREATE,
})(CandidateCreatePage);
