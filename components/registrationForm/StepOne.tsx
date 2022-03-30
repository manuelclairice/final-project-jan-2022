import { css } from '@emotion/react';
import React from 'react';
import { Form } from 'react-bootstrap';
import { SignUpResponseBody } from '../../pages/api/signUp';
import { useState } from 'react';
import { FormValues } from './MultiForm';

// ------  CSS IN JS ----- //
const errorStyle = css`
  color: #e50000;
`;

type Errors = { message: string }[];
type Props = {
  refreshUserProfile: () => void;
  // userObject: { firstName: string };
};

const StepOne = (props: Props) => {
  const [errors, setErrors] = useState<Errors>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [name]: event.target.value });
    };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const signUpResponse = await fetch('/api/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formValues.username,
            password: formValues.password,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
          }),
        });

        const signUpResponseBody =
          (await signUpResponse.json()) as SignUpResponseBody;

        if ('errors' in signUpResponseBody) {
          setErrors(signUpResponseBody.errors);
          return;
        }
        props.refreshUserProfile();
      }}
    >
      <h2>Step 1</h2>
      <Form.Group>
        <Form.Control
          placeholder="Username"
          onChange={handleChange('username')}
          name="username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handleChange('password')}
          name="password"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          placeholder="First Name"
          onChange={handleChange('firstName')}
          name="firstName"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          placeholder="Last Name"
          onChange={handleChange('lastName')}
          name="lastName"
        />
      </Form.Group>
      <div css={errorStyle}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
    </form>
  );
};

export default StepOne;
