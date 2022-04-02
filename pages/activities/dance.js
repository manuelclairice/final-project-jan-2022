import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import Layout from '../../components/Layout';
import { getActivities } from '../../util/database';

const activityCardStyle = css`
  cursor: pointer;
`;

export default function DanceActivities(props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Dance Activities</title>
          <meta name="description" content="List of all the dance activities" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>ART</h1>

        {props.activities.map((activity) => {
          if (activity.id > 9 && activity.id < 13) {
            return (
              <div key={`activities- ${activity.id}`} css={activityCardStyle}>
                <Link href={`/activities/${activity.id}`}>
                  <a>
                    <div>
                      <h3>{activity.name}</h3>
                      <p>{activity.description}</p>
                      {/* <h3>{activity.id}</h3> */}
                    </div>
                  </a>
                </Link>
              </div>
            );
          }
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
