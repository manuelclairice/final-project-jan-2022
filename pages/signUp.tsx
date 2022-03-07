import Head from 'next/head';
import Layout from '../components/Layout';

export default function SignUp() {
  return (
    <Layout>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up to our website" />
      </Head>
      <h1>Create your account</h1>
    </Layout>
  );
}
