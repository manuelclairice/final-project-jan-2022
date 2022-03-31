import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import Layout from '../components/Layout';
import { getActivities } from '../util/database';

const activityCardStyle = css`
  cursor: pointer;
`;

export default function Activities(props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Activities</title>
          <meta name="description" content="List of all the activities" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Activities</h1>

        {props.activities.map((activity) => {
          return (
            <div key={`activities- ${activity.id}`} css={activityCardStyle}>
              <Link href={`/activities/${activity.id}`}>
                <a>
                  <div>
                    <h2>{activity.name}</h2>
                    <p>{activity.description}</p>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const activities = await getActivities();

  return {
    props: {
      activities: activities,
    },
  };
}
