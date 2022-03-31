import { GetServerSidePropsContext } from 'next';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import { getUserByValidSessionToken } from '../../util/database';

type Props = {
  userObject: { firstName: string };
  user: { id: number; username: string; firstName: string; lastName: string };
};

export default function ProtectedUser(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <div>
        <div>
          <h1>My profile</h1>
          <div> user name is {props.user.lastName}</div>
          <div> Welcome back {props.user.firstName}</div>
        </div>
        <div>
          <h2>My favorite activities</h2>
        </div>
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
