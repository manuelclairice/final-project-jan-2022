import { GetServerSidePropsContext } from 'next';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import { getUserByValidSessionToken } from '../../util/database';

type Props = {
  userObject: { firstName: string };
  user: { firstName: string; lastName: string };
};

export default function ProtectedUser(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <h1>My profile</h1>
      <div>
        <div>{props.user.firstName}</div>
        <div>{props.user.lastName}</div>
      </div>
      <div>
        <h2>My favorite activities</h2>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  if (user) {
    return {
      props: { user: user },
    };
  }

  return {
    redirect: {
      // destination: `/users/protected-user`,
      destination: `/signIn?returnTo=/users/protected-user`,
      permanent: false,
    },
  };
}
