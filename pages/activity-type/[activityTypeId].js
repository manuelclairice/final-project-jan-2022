// import Image from 'next/image';
import Layout from '../../components/Layout';
import { getActivityTypeById, getClubById } from '../../util/database';
import Head from 'next/head';

export default function ActivityType(props) {
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
      {/* <div>
        <Image
          src={`/${props.activity.name}.jpg`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
        <div>
          <button>Get in touch</button>
        </div>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
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
        <button>Get in touch</button>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
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
        <button>Get in touch</button>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
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
        <button>Get in touch</button>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
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
        <button>Get in touch</button>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
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
        <button>Get in touch</button>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
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
        <button>Get in touch</button>
      </div>
      <div>
        <Image
          src={`/${props.activity.name}.jpg`}
          width="200"
          height="200"
        />
        <div>{props.club.companyName}</div>
        <div>{props.club.street}</div>
        <div>{props.club.city}</div>
        <div>{props.club.postCode}</div>
        <div>{props.club.email}</div>
        <div>{props.club.hourlyRate} euro/h</div>
      </div> */}
      <div>
        <button>Get in touch</button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const activityTypeId = context.query.activityTypeId;

  const activity = await getActivityTypeById(activityTypeId);
  const club = await getClubById(activity.clubs_id);

  console.log(activity);
  console.log(activityTypeId);

  return {
    props: {
      activity,
      activityTypeId,
      club,
    },
  };
}
