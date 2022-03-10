import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getValidSessionByToken } from '../util/database';
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

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
};

export default function SignUp(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <Layout userObject={props.userObject}>
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
          props.refreshUserProfile();
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const token = context.req.cookies.sessionToken;

  if (token) {
    const session = await getValidSessionByToken(token);

    if (session) {
      console.log(session);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
