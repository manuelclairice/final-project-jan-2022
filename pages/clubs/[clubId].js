import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link';
import Layout from '../../components/Layout';
import { getActivities, getClubById } from '../../util/database';
import { css } from '@emotion/react';

const singleClubCardStyle = css`
  display: inline-block;
  align-items: center;
  position: relative;
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

export default function singleClubPage(props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>{props.club.companyName}</title>
          <meta name="description" content="Best club in Vienna" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Club</h1>
        <section>
          <div css={singleClubCardStyle}>
            <Image
              src={`/logos/${props.club.id}.png`}
              width="200"
              height="200"
            />
            <div>{props.club.companyName}</div>
            <br />
            <div>{props.club.street}</div>
            <div>{props.club.city}</div>
            <div>{props.club.postCode}</div>
            <div>{props.club.email}</div>
            <br />
            <div>{props.club.hourlyRate} euro/h</div>
            <br />
          </div>
        </section>
        <section />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const activity = await getActivities();
  const clubId = context.query.clubId;
  const club = await getClubById(clubId);
  console.log(club);
  return {
    props: {
      club,
      activity,
    },
  };
}
