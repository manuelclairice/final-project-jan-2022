import Head from 'next/head';
// import Image from 'next/image';
import Layout from '../components/Layout';

export default function Activities(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Activities</title>
        <meta name="description" content="List of all the activities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Activities</h1>
    </Layout>
  );
}
