import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link';
import Layout from '../../components/Layout';
import { getActivities, getClubById } from '../../util/database';
import { css } from '@emotion/react';
import ContactForm from '../../components/contactForm';

const singleClubPageStyle = css`
  margin-left: 70px;
`;

const activityCardStyle = css`
  position: relative;
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
`;
const clubBioStyle = css`
  position: relative;
  display: inline-block;
  align-items: center;

  /* border-radius: 10px;
  border: 1px solid #ccc; */
  padding: 15px;
  margin-bottom: 40px;
  margin-right: 10px;
  margin-left: 22px;
  height: 70px;
  width: 700px;
  justify-content: space-evenly;
`;
const activityReviewStyle = css`
  position: relative;
  display: inline-block;
  align-items: center;

  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  /* margin-bottom: 40px; */
  margin-right: 10px;
  margin-left: 22px;
  height: 70px;
  width: 700px;
  justify-content: space-evenly;
`;

const clubDetailsStyle = css`
  display: inline-block;
  align-items: center;
  position: relative;
  /* border-radius: 10px;
  border: 1px solid #ccc; */
  padding: 15px;
  /* margin-bottom: 20px; */
  margin-right: 10px;
  margin-left: 22px;
  width: 220px;
  justify-content: space-evenly;
`;

const formSectionStyle = css`
  display: inline-block;
  align-items: center;
  position: absolute;
  /* border-radius: 10px;
  border: 1px solid #ccc; */
  padding: 15px;
  /* margin-bottom: 20px; */
  /* margin-top: 40px; */
  /* margin-right: 10px;
  margin-left: 100px; */
  width: 300px;
  /* justify-content: space-evenly; */
`;

const reviewAnchorStyle = css`
  cursor: pointer;
  :hover {
    color: #ab0068;
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
        <div css={singleClubPageStyle}>
          <section>
            <div css={activityCardStyle}>
              <Image
                src={`/logos/${props.club.id}.png`}
                width="200"
                height="200"
              />
            </div>

            <div css={clubBioStyle}>
              <p>
                <strong> Bio: {props.club.companyName}</strong>, is a non-profit
                organization working to provide students with valuable,
                creative, inspiring, and fun activities. Learn about our
                history, team, our Programs and more by getting in contact with
                us.
              </p>
            </div>
          </section>
          <section>
            <div css={activityReviewStyle}>
              <p>
                <strong> Reviews: {props.club.companyName}</strong>, has not
                been reviewed yet. Be the first to review this club.{' '}
                <p>
                  Leave a review <a css={reviewAnchorStyle}>here</a>
                </p>
              </p>
            </div>
          </section>
          <h3> </h3>
          <section>
            <div css={clubDetailsStyle}>
              <div>
                <strong>Details:</strong>
              </div>
              <br />
              <div>{props.club.companyName}</div>
              <div>{props.club.street}</div>
              <div>{props.club.city}</div>
              <div>{props.club.postCode}</div>
              <br />
              <div>mobile: 0676 123 4567</div>
              <div>{props.club.email}</div>
              <br />
              <div>
                <strong>{props.club.hourlyRate} euro/h</strong>
              </div>
            </div>

            <div css={clubDetailsStyle}>
              <div>
                <strong>Opening Times:</strong>
              </div>
              <br />
              <div>Monday: 9h - 19h</div>
              <br />
              <div>Tuesday: 10h - 20h </div>
              <br />
              <div>Wednesday: 9h - 19h </div>
              <br />
              <div>Thursday: 10 - 20h</div>
              <br />
              <div>Friday: 10h - 18h</div>
            </div>
            <div css={clubDetailsStyle}>
              <div>
                <strong>Age groups:</strong>
              </div>
              <br />
              <div>Baby/Toddler: 0-3 yrs.</div>
              <br />
              <div>Preschool: 4-6 yrs.</div>
              <br />
              <div>Gradeschooler: 7-10 yrs</div>
              <br />
              <div>Adolescent: 11-14 yrs.</div>
              <br />
              <div>Teenager: 15-18 yrs.</div>
            </div>
          </section>
          <div css={formSectionStyle}>
            <ContactForm />
          </div>
        </div>
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
