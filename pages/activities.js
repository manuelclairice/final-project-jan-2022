import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getActivities } from '../util/database';

const activityCardStyle = css`
  display: inline-block;
  align-items: center;

  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 22px;
  width: 220px;
  justify-content: space-evenly;
  /* text-decoration: none; */
  cursor: pointer;
  :hover {
    transition: transform 125ms;
    transform: translateY(-10px);
  }
`;

// const activityCardTextStyle = css`
//   text-decoration: none;
// `;

// const activitiesPageStyle = css`
//   display: inline-block;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 50px;
// `;

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
        <div>
          {props.activities.map((activity) => {
            return (
              <div key={`activities- ${activity.id}`} css={activityCardStyle}>
                <Link href={`/activities/${activity.id}`}>
                  <a>
                    <Image
                      src={`/images/${activity.id}.png`}
                      width="300"
                      height="300"
                    />
                    <div>
                      <h3>{activity.name}</h3>
                      <p>{activity.description}</p>
                      {/* <h3>{activity.id}</h3> */}
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
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
