import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

const cardStyle = css`
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 8px;
`;

const fieldStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  gap: 4px;

  > div:last-child {
    margin: 0;
  }
  > label {
    font-weight: bold;
    font-size: 13px;
    color: #333;
  }
  > input {
    border: 1px solid #333;
    border-radius: 4px;
    font-size: 16px;
    padding: 4px;
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

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up to our website" />
      </Head>

      <h1>Create your new account</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          fetch('/api/signUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
        }}
      >
        <div css={cardStyle}>
          <div css={fieldStyle}>
            <label>Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <div css={fieldStyle}>
            <label>Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <button css={signUpButtonStyle}>Sign Up</button>
        </div>
      </form>
    </Layout>
  );
}
