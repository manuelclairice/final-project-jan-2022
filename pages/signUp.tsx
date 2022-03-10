import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { SignUpResponseBody } from './api/signUp';

// const cardStyle = css`
//   background-color: #fff;
//   border: 1px solid #333;
//   border-radius: 8px;
//   padding: 8px;
// `;

// const fieldStyle = css`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 8px;
//   gap: 4px;

//   > div:last-child {
//     margin: 0;
//   }
//   > label {
//     font-weight: bold;
//     font-size: 13px;
//     color: #333;
//   }
//   > input {
//     border: 1px solid #333;
//     border-radius: 4px;
//     font-size: 16px;
//     padding: 4px;
//   }
// `;

const formStyle = css`
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 8px;

  display: table;
  margin: 0 auto;

  div {
    display: table-row;
  }

  label,
  input {
    display: table-cell;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  label {
    width: 200px;
    padding-right: 5%;
    text-align: left;
    font-weight: bold;
    font-size: 13px;
    color: #333;
  }

  input {
    width: 300px;
  }
`;

const signUpButtonStyle = css`
  background-color: #ab0068;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  transition: box-shadow 0.3s;
  cursor: pointer;
  /* :hover {
    color: #ab0068;
  } */
`;

const errorStyle = css`
  color: #e50000;
`;

type Errors = { message: string }[];

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up to our website" />
      </Head>

      <h1>Create your new account</h1>
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
              username: username,
              password: password,
            }),
          });

          const signUpResponseBody =
            (await signUpResponse.json()) as SignUpResponseBody;

          if ('errors' in signUpResponseBody) {
            setErrors(signUpResponseBody.errors);
            return;
          }

          await router.push('/');
        }}
      >
        <div /* css={cardStyle} */>
          <div /* css={fieldStyle} */>
            <label>
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
          </div>
          <div /* css={fieldStyle} */>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
          </div>
          <button css={signUpButtonStyle}>Sign Up</button>
        </div>
        <div css={errorStyle}>
          {errors.map((error) => {
            return <div key={`error-${error.message}`}>{error.message}</div>;
          })}
        </div>
      </form>
    </Layout>
  );
}
