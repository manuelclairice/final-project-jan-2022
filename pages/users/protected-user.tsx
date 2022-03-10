import { GetServerSidePropsContext } from 'next';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import { getUserByValidSessionToken } from '../../util/database';

type Props = {
  userObject: { username: string };
  user: { id: number; username: string };
};

export default function ProtectedUser(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <h1>My profile</h1>
      <div> user id is {props.user.id}</div>
      <div> user name is {props.user.username}</div>
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
