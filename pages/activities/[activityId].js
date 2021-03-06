import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getActivityById, getClubById } from '../../util/database';
import { css } from '@emotion/react';

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
  /* text-decoration: none; */
  /* cursor: pointer;
  :hover {
    transition: transform 125ms;
    transform: translateY(-10px);
  } */
`;

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

const getInTouchButtonStyle = css`
  button {
    padding: 5px 15px;
    width: 35%;
    background-color: #ab0068;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    border: 0;

    outline: none;
  }
`;

export default function SingleActivityPage(props) {
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
      <div>{/* <h1>{props.activity.name}</h1> */}</div>
      <div css={activityCardStyle}>
        <Image
          src={`/images/${props.activity.id}.png`}
          width="300"
          height="300"
        />
        <div>
          <h3>{props.activity.name}</h3>
          {/* <p>{props.activity.description}</p> */}
          {/* <h3>{activity.id}</h3> */}
        </div>
      </div>
      <section css={getInTouchButtonStyle}>
        <div css={singleClubCardStyle}>
          <Link href={`/clubs/${props.club.id}`}>
            <a>
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
              <div>
                <button>Get in touch</button>
              </div>
            </a>
          </Link>
        </div>
        <div css={singleClubCardStyle}>
          <Link href={`/clubs/${props.club.id}`}>
            <a>
              <Image src="/logos/51.png" width="200" height="200" />
              <div>Painting Club Neubau</div>
              <br />
              <div>Paintgasse 3</div>
              <div>{props.club.city}</div>
              <div>1070</div>
              <div>hello@paintclub.com</div>
              <br />
              <div>{props.club.hourlyRate} euro/h</div>
              <br />
              <div>
                <button>Get in touch</button>
              </div>
            </a>
          </Link>
        </div>
        <div css={singleClubCardStyle}>
          <Link href={`/clubs/${props.club.id}`}>
            <a>
              <Image src="/logos/52.png" width="200" height="200" />
              <div>Graffiti Club Seestadt</div>
              <br />
              <div>Graffitistrasse 321</div>
              <div>{props.club.city}</div>
              <div>{props.club.postCode}</div>
              <div>info@graffiti.at</div>
              <br />
              <div>{props.club.hourlyRate} euro/h</div>
              <br />
              <div>
                <button>Get in touch</button>
              </div>
            </a>
          </Link>
        </div>
        <div css={singleClubCardStyle}>
          <Link href={`/clubs/${props.club.id}`}>
            <a>
              <Image src="/logos/53.png" width="200" height="200" />
              <div>Little Artist</div>
              <br />
              <div>Artgasse 5</div>
              <div>{props.club.city}</div>
              <div>1030</div>
              <div>art@littleartist.com</div>
              <br />
              <div>{props.club.hourlyRate} euro/h</div>
              <br />
              <div>
                <button>Get in touch</button>
              </div>
            </a>
          </Link>
        </div>
        <div css={singleClubCardStyle}>
          <Link href={`/clubs/${props.club.id}`}>
            <a>
              <Image src="/logos/54.png" width="200" height="200" />
              <div>Craft Club Vienna</div>
              <br />
              <div>Bastelstrasse 101</div>
              <div>{props.club.city}</div>
              <div>1010</div>
              <div>bsteln@craftclub.at</div>
              <br />
              <div>{props.club.hourlyRate} euro/h</div>
              <br />
              <div>
                <button>Get in touch</button>
              </div>
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const activityId = context.query.activityId;

  const activity = await getActivityById(activityId);
  const club = await getClubById(activity.clubs_id);

  console.log(activity);
  console.log(activityId);

  return {
    props: {
      activity,
      activityId,
      club,
    },
  };
}
