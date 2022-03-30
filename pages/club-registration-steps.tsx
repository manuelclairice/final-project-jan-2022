import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import MultiForm from '../components/registrationForm/MultiForm';
import { getValidSessionByToken } from '../util/database';

type Props = {
  refreshUserProfile: () => void;
  userObject: { firstName: string };
};

export default function RegistrationSteps(props: Props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Sign up</title>
          <meta name="description" content="Sign up to our website" />
        </Head>
        <div>
          <MultiForm refreshUserProfile={props.refreshUserProfile} />
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
