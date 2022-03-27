import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SignUpResponseBody } from '../../pages/api/signUp';
// import { FormData } from '../../pages/club-registration-steps';
// import { Props } from '../../pages/club-registration-steps';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

const signUpPageStyle = css`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #8360c3;
  background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);
  background: linear-gradient(to right, #2ebf91, #8360c3);
  background-position: center;
  background-size: cover;
  position: absolute;
`;

const formBoxStyle = css`
  position: relative;
  border-radius: 20px;
  padding: 5px;
  width: 450px;
  height: auto;
  display: table;
  margin: 6% auto;
  background-color: #fff;
`;

const formBoxTitleStyle = css`
  text-align: center;
`;

const formStyle = css`
  top: 180px;
  padding: 30px 80px;
  max-width: 800px;
  display: table;
  margin: 0 auto;
  box-shadow: 0 15px 16px 0.17px rgba(0, 0, 0, 0.05);

  div {
    display: table-row;
  }

  input {
    display: table-cell;
    margin-bottom: 10px;
    width: 300px;
    padding: 10px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #999;
    outline: none;
    background: transparent;
  }

  span {
    bottom: 68px;
    position: absolute;
  }
`;

const signUpButtonStyle = css`
  position: relative;
  align-items: center;
  width: 85%;
  padding: 10px 30px;
  display: block;
  margin: auto;
  background-color: #ab0068;
  color: #fff;
  border: 0;
  outline: none;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

const errorStyle = css`
  color: #e50000;
`;

export type Errors = { message: string }[];

type FormData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  activities: string;
  ageGroups: string;
  introduction: string;
};

export type Props = {
  refreshUserProfile: () => void;
  // userObject: { firstName: string };
};

export default function Form(props: Props) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>([]);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    activities: '',
    ageGroups: '',
    introduction: '',
  });
  const formSteps = ['Step One', 'Step Two', 'Step Three', 'Final Step'];

  const StepDisplay = () => {
    if (step === 0) {
      return <StepOne formData={formData} setFormData={setFormData} />;
    } else if (step === 1) {
      return <StepTwo formData={formData} setFormData={setFormData} />;
    } else if (step === 2) {
      return <StepThree formData={formData} setFormData={setFormData} />;
    } else {
      return <StepFour formData={formData} setFormData={setFormData} />;
    }
  };
  const router = useRouter();
  return (
    <div css={signUpPageStyle}>
      <div css={formBoxStyle}>
        <div css={formBoxTitleStyle}>
          <h1>Create your new account</h1>
        </div>
        <div>
          <div
            style={{
              width:
                step === 0
                  ? '25%'
                  : step === 1
                  ? '50%'
                  : step === 2
                  ? '75%'
                  : '100%',
            }}
          >
            progressbar
          </div>
          <div>
            <h1>{formSteps[step]}</h1>
          </div>
        </div>

        <form
          css={formStyle}
          onSubmit={async (event) => {
            event.preventDefault();
            const signUpResponse = await fetch('/api/signUp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
              }),
            });

            const signUpResponseBody =
              (await signUpResponse.json()) as SignUpResponseBody;

            if ('errors' in signUpResponseBody) {
              setErrors(signUpResponseBody.errors);
              return;
            }
            props.refreshUserProfile();
            await router.push('/');
          }}
        >
          <div>
            <div>{StepDisplay}</div>
            <br />
            <br />
            <div>
              <button
                disabled={step === 0}
                onClick={() => {
                  setStep((currentStep) => currentStep + 1);
                }}
                css={signUpButtonStyle}
              >
                Prev
              </button>
              <button
                onClick={() => {
                  if (step === formSteps.length - 1) {
                    alert(' Form Submited');
                  } else {
                    setStep((currentStep) => currentStep + 1);
                  }
                }}
                css={signUpButtonStyle}
              >
                Next
              </button>
            </div>
          </div>
          <div css={errorStyle}>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>
        </form>
      </div>
      {/* </Layout> */}
    </div>
  );
}
