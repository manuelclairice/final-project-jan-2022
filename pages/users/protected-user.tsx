import { GetServerSidePropsContext } from 'next';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import { getUserByValidSessionToken } from '../../util/database';
import { css } from '@emotion/react';
import Link from 'next/link';

type Props = {
  userObject: { firstName: string };
  user: { id: number; username: string; firstName: string; lastName: string };
};
const addToFavoriteStyle = css`
  cursor: pointer;
  :hover {
    color: #ab0068;
  }
`;

export default function ProtectedUser(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <div>
        <div>
          <h1>My profile</h1>
          <div>
            <h3>Welcome back {props.user.firstName}!</h3>
          </div>
        </div>
        <div>
          <h2>My favorite activities</h2>
          <div>
            <p>You haven't added any activities to your profile.</p>
            <p>
              You can find the activities{' '}
              <Link href="/activities">
                <a css={addToFavoriteStyle}>here</a>
              </Link>
            </p>
          </div>
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
