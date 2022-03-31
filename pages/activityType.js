import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getActivityTypes } from '../util/database';

const activitiesButtonsStyle = css`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  text-align: center;

  button {
    border-radius: 100px;
    padding: 30px;
    border-width: 5px;
    border-style: solid;
    margin: 50px;
    /* text-align: center; */
    text-transform: uppercase;
    display: inline-block;
    font-size: 15px;
    width: 120px;
    height: 120px;

    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;

const musicButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #ab0068;
  margin-right: 30px;
`;
const cookingButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #e8c954;
  margin-right: 30px;
`;
const danceButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #008080;
  margin-right: 30px;
`;
const sportButtonStyle = css`
  font-weight: bold;
  color: #fff;
  background-color: #088da5;
`;

export default function ArtPage(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Vienna Kids Club</title>
        <meta
          name="description"
          content="Find the best art club in Vienna for your children"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src="/art-hero.jpg" width="1600" height="500" />
      <div>
        <div>
          <h1>{props.activityTypes.name} activities</h1>
        </div>
        <div>
          <br />
        </div>
      </div>
      <div css={activitiesButtonsStyle}>
        <div>
          <Link href="/activities/2">
            <a>
              <button css={musicButtonStyle}>Music</button>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/activities/3">
            <a>
              <button css={cookingButtonStyle}>Cooking</button>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/activities/4">
            <a>
              <button css={danceButtonStyle}>Dance</button>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/activities/5">
            <a>
              <button css={sportButtonStyle}>Sport</button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const activityTypeId = context.query.activityType;

  const activityTypes = await getActivityTypes();

  console.log(activityTypes);
  // console.log(activityTypeId);

  return {
    props: {
      activityTypes,
      // activityTypeId,
    },
  };
}