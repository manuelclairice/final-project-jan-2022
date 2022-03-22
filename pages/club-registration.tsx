import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getValidSessionByToken } from '../util/database';
import { SignUpResponseBody } from './api/signUp';

const signUpPageStyle = css`
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

// const userType = css`
//   width: 220px;
//   margin: 35px auto;
//   position: relative;
//   border: 1px solid #999;
//   border-radius: 30px;
// `;
// const userTypeButtonStyle = css`
//   padding: 10px 30px;
//   cursor: pointer;
//   background: transparent;
//   border: 0;
//   outline: none;
//   position: relative;
// `;

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

// const userTypeDivButtonStyle = css`
//   top: 0;
//   left: 0;
/* position: absolute; */
/* width: 110px;
  height: 100%; */
//   background-color: #fff;
//   background: linear-gradient(to right, #2ebf91, #8360c3);
//   border-radius: 30px;
//   transition: 0.5s;
// `;

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

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  userObject: { firstName: string };
};

export default function SignUp(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <div css={signUpPageStyle}>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Sign up</title>
          <meta name="description" content="Sign up to our website" />
        </Head>
        <div css={formBoxStyle}>
          <div css={formBoxTitleStyle}>
            <h1>Create your new account</h1>
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
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </div>
              <div>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </div>
              <div>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </div>
              <br />
              <br />

              <button css={signUpButtonStyle}>Submit</button>
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
        destination: `https://${context.req.headers.host}/signUp`,
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
