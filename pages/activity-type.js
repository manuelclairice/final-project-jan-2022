import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import Layout from '../components/Layout';
import { getActivities, getActivityTypes } from '../util/database';

const activityCardStyle = css`
  cursor: pointer;
`;

export default function ActivityTypePage(props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Activities</title>
          <meta name="description" content="List of all the activities" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Activities</h1>

        {props.activityTypes.map((activityType) => {
          return (
            <div key={`activities- ${activityType.id}`} css={activityCardStyle}>
              <Link href={`/activities/${activityType.id}`}>
                <a>
                  <div>
                    <h2>{activityType.name}</h2>

                    {/* <p>{activityType.description}</p> */}
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

// export async function getServerSideProps() {
//   const activities = await getActivities();

//   return {
//     props: {
//       activities: activities,
//     },
//   };
// }

export async function getServerSideProps() {
  // const activityTypeId = context.query.activityType;

  const activityTypes = await getActivityTypes();

  const activities = await getActivities();

  console.log(activityTypes);
  // console.log(activityTypeId);

  return {
    props: {
      activityTypes,
      activities,
      // activityTypeId,
    },
  };
}
