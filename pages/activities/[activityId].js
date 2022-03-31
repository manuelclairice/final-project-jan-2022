import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getActivityById, getClubById } from '../../util/database';

export default function SingleActivity(props) {
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
      <div>
        <h1>{props.activity.name}</h1>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
      <div>
        <Image
          src={`/images/activities/${props.activity.name}.png`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div>
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
