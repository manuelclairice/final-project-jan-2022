import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { SignInResponseBody } from './api/signIn';

const signInPageStyle = css`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #8360c3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
`;

const signInButtonStyle = css`
  padding: 5px 15px;
  width: 35%;
  background-color: #ab0068;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  border: 0;
  outline: none;
`;

const errorStyle = css`
  color: #e50000;
`;
const signUpRedirectionStyle = css`
  color: #2ebf91;
  text-decoration: none;
  cursor: pointer;
  :hover {
    color: #ab0068;
  }
`;

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  userObject: { firstName: string };
  csrfToken: string;
};

export default function SignIn(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <div css={signInPageStyle}>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Sign in</title>
          <meta name="description" content="Sign in to your account" />
        </Head>
        <div css={formBoxStyle}>
          <div css={formBoxTitleStyle}>
            <h1>Sign in to your account</h1>
          </div>
          <form
            css={formStyle}
            onSubmit={async (event) => {
              event.preventDefault();
              const signInResponse = await fetch('/api/signIn', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  csrfToken: props.csrfToken,
                }),
              });

              const signInResponseBody =
                (await signInResponse.json()) as SignInResponseBody;

              if ('errors' in signInResponseBody) {
                setErrors(signInResponseBody.errors);
                return;
              }

              const returnTo = router.query.returnTo;
              console.log('returnTo', returnTo);

              if (
                returnTo &&
                !Array.isArray(returnTo) &&
                /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
              ) {
                await router.push(returnTo);
                return;
              }
              props.refreshUserProfile();
              await router.push(`/`);
            }}
          >
            <div>
              <div>
                <input
                  value={username}
                  placeholder="Username"
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </div>
              <br />
              <button css={signInButtonStyle}>Sign In</button> or create an
              account{' '}
              <Link href="/signUp">
                <a css={signUpRedirectionStyle}>here</a>
              </Link>
            </div>
            <div css={errorStyle}>
              {errors.map((error) => {
                return (
                  <div key={`error-${error.message}`}>{error.message}</div>
                );
              })}
            </div>
          </form>
        </div>
      </Layout>
    </div>
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
        destination: `https://${context.req.headers.host}/signIn`,
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
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
