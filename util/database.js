import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

const sql = connectOneTimeToDatabase();

export async function getActivities() {
  const activities = await sql`
  SELECT * FROM activities;`;
  console.log(activities);

  return activities.map((activity) => camelcaseKeys(activity));
}

export async function getSingleActivity(id) {
  const [activity] = await sql`
  SELECT * FROM activities WHERE id = ${id};`;
  return activity;
}
