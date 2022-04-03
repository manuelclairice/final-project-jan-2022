import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getActivities } from '../../util/database';

const activityCardStyle = css`
  display: inline-flex;

  align-items: center;

  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 30px;
  width: 220px;
  justify-content: space-evenly;
  cursor: pointer;
  :hover {
    transition: transform 125ms;
    transform: translateY(-10px);
  }
`;

export default function SportActivities(props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Sport Activities</title>
          <meta name="description" content="List of all the sport activities" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>ART</h1>

        {props.activities.map((activity) => {
          if (activity.id > 12) {
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
