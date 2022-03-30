import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { getValidSessionByToken } from '../util/database';
import { RegisterClubResponseBody } from './api/club-registration';

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

type Errors = { message: string }[];

export type Props = {
  refreshUserProfile: () => void;
  userObject: { firstName: string };
};

export default function RegisterClub(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postCode: '',
  });
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div css={signUpPageStyle}>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Register your Club</title>
          <meta
            name="description"
            content="Register your Club to our website"
          />
        </Head>
        <div css={formBoxStyle}>
          <div css={formBoxTitleStyle}>
            <h1>Create your new account</h1>
          </div>

          <form
            css={formStyle}
            onSubmit={async (event) => {
              event.preventDefault();
              const registerClubResponse = await fetch(
                '/api/club-registration',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    companyName: companyName,
                    email: email,
                    hourlyRate: hourlyRate,
                  }),
                },
              );

              const registerClubResponseBody =
                (await registerClubResponse.json()) as RegisterClubResponseBody;

              if ('errors' in registerClubResponseBody) {
                setErrors(registerClubResponseBody.errors);
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
              <div>
                <input
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(event) =>
                    setCompanyName(event.currentTarget.value)
                  }
                />
              </div>
              <div>
                <input
                  placeholder="Street"
                  value={address.street}
                  name="street"
                  onChange={updateAddress}
                />
              </div>
              <div>
                <input
                  placeholder="City"
                  value={address.city}
                  name="city"
                  onChange={updateAddress}
                />
              </div>
              <div>
                <input
                  placeholder="Post Code"
                  value={address.postCode}
                  name="postCode"
                  onChange={updateAddress}
                />
              </div>

              <br />
              <br />
              <div>
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </div>
              <div>
                <input
                  placeholder="Hourly rate"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.currentTarget.value)}
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
