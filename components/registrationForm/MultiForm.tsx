import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import { SignUpResponseBody } from '../../pages/api/signUp';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
// import StepThree from './StepThree';
// import StepFour from './StepFour';

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

// const signUpButtonStyle = css`
//   position: relative;
//   align-items: center;
//   width: 85%;
//   padding: 10px 30px;
//   display: block;
//   margin: auto;
//   background-color: #ab0068;
//   color: #fff;
//   border: 0;
//   outline: none;
//   font-weight: bold;
//   border-radius: 20px;
//   cursor: pointer;
// `;

// const errorStyle = css`
//   color: #e50000;
// `;

export type Errors = { message: string }[];

export type FormValues = {
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

export default function MultiForm(props: Props) {
  const [step, setStep] = useState(1);
  // const [errors, setErrors] = useState<Errors>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    activities: '',
    ageGroups: '',
    introduction: '',
  });

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // console.log(formValues);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues({ ...formValues, [name]: event.target.value });
    };

  const router = useRouter();

  return (
    <div css={signUpPageStyle}>
      <div css={formBoxStyle}>
        <div css={formBoxTitleStyle}>
          <h1>Create your new account</h1>
        </div>
        <div>
          {/* <div
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
          </div> */}
          <div>
            <h1>{}</h1>
          </div>
        </div>

        <form
          css={formStyle}
          onSubmit={async (event) => {
            event.preventDefault();
            //   const signUpResponse = await fetch('/api/signUp', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            // username: username,
            // password: password,
            // firstName: firstName,
            // lastName: lastName,
            // address: address,
            // activities: activities,
            // ageGroups: ageGroups,
            // introduction: introduction,
            //   }),
            // });

            // const signUpResponseBody =
            //   (await signUpResponse.json()) as SignUpResponseBody;

            // if ('errors' in signUpResponseBody) {
            //   setErrors(signUpResponseBody.errors);
            //   return;
            // }
            // props.refreshUserProfile();
            await router.push('/');
          }}
        >
          <div>
            {
              {
                1: <StepOne refreshUserProfile={props.refreshUserProfile} />,
                2: <StepTwo handleChange={handleChange} />,
                // 3: <StepThree handleChange={handleChange} />,
                // 4: <StepFour handleChange={handleChange} />,
              }[step]
            }
          </div>
          <div className="d-flex justify-content-around px-5 mt-5">
            {step > 1 ? (
              <button className="btn btn-warning" onClick={prevStep}>
                Back
              </button>
            ) : null}
            <button className="btn btn-warning" onClick={nextStep}>
              {step === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
          {/* <div css={errorStyle}>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div> */}
        </form>
      </div>
      {/* </Layout> */}
    </div>
  );
}
