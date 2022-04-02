import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getActivityTypes } from '../util/database';
// import { getActivityTypeById } from '../util/database';

const heroImageStyle = css`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/hero-1.jpg');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const homePageTextStyle = css`
  position: relative;
`;

const activitiesButtonsStyle = css`
  display: inline-block;
  margin: 70px;
  position: relative;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;

  button {
    border-radius: 100px;
    padding: 30px;
    border-width: 5px;
    border-style: solid;
    /* margin: auto; */
    text-align: center;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    width: 120px;
    height: 120px;

    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;

const artButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #800080;
`;
const musicButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #ab0068;
`;
const cookingButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #e8c954;
`;
const danceButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #008080;
`;
const sportButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #088da5;
`;

export default function Home(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Vienna Kids Club</title>
        <meta
          name="description"
          content="Find the best club in Vienna for your children"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Image src="/hero-1.jpg" width="1500" height="500" />  */}
      <div css={heroImageStyle}>
        <div css={homePageTextStyle}>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
          <h2>
            Quam vulputate dignissim suspendisse in est ante in. Ipsum faucibus
            vitae aliquet nec. Purus sit amet volutpat consequat mauris nunc.
            Volutpat odio facilisis mauris sit amet massa vitae.
          </h2>
          <h3>
            Velit euismod in pellentesque massa placerat duis. Tincidunt vitae
            semper quis lectus nulla at. Eget egestas purus viverra accumsan in
            nisl nisi. Venenatis cras sed felis eget velit aliquet sagittis id
            consectetur. Dui sapien eget mi proin sed libero. Morbi quis commodo
            odio aenean.
          </h3>
        </div>
      </div>
      <section>
        <div
          // key={`activities- ${activityType.id}`}
          css={activitiesButtonsStyle}
        >
          <div css={activitiesButtonsStyle}>
            <Link href="activities/art">
              <a>
                <button css={artButtonStyle}>Art</button>
              </a>
            </Link>
          </div>
          <div css={activitiesButtonsStyle}>
            <Link href="/activities/music">
              <a>
                <button css={musicButtonStyle}>Music</button>
              </a>
            </Link>
          </div>
          <div css={activitiesButtonsStyle}>
            <Link href="/activities/cooking">
              <a>
                <button css={cookingButtonStyle}>Cooking</button>
              </a>
            </Link>
          </div>
          <div css={activitiesButtonsStyle}>
            <Link href="/activities/dance">
              <a>
                <button css={danceButtonStyle}>Dance</button>
              </a>
            </Link>
          </div>
          <div css={activitiesButtonsStyle}>
            <Link href="/activities/sport">
              <a>
                <button css={sportButtonStyle}>Sport</button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const activityTypeId = context.query.activityTypeId;
  const activityTypes = await getActivityTypes();
  console.log(activityTypes);

  return {
    props: {
      activityTypes,
      // activityTypeId,
    },
  };
}
