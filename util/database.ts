import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

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

export type Activity = {
  id: number;
  name: string;
  descritpion: string;
};

export async function getActivities() {
  const activities = await sql<Activity[]>`
  SELECT * FROM activities`;
  console.log(activities);

  return activities.map((activity) => camelcaseKeys(activity));
}

export async function getActivityById(id: number) {
  const [activity] = await sql<[Activity | undefined]>`
  SELECT * FROM activities WHERE id = ${id}`;
  return activity;
}

export async function createActivityType(name: string) {
  const [activityType] = await sql<[ActivityType]>`
  INSERT INTO
    activity_types (name)
  VALUES
    (${name})
  RETURNING
    *`;
  return camelcaseKeys(activityType);
}

export async function updateActivityTypeById(id: number, name: string) {
  const [activityType] = await sql<[ActivityType]>`
  UPDATE
    activity_types
  SET
    name = ${name}
  WHERE
    id = ${id}
  RETURNING
    *`;
  return camelcaseKeys(activityType);
}

export async function deleteActivityTypeById(id: number) {
  const [activityType] = await sql<[ActivityType]>`
  DELETE FROM
    activity_types
  WHERE
    id = ${id}
  RETURNING
    *`;
  return camelcaseKeys(activityType);
}

export type ActivityType = {
  id: number;
  name: string;
};

export async function getActivityTypes() {
  const activityTypes = await sql<ActivityType[]>`
  SELECT
    *
  FROM
    activity_types`;
  console.log(activityTypes);

  return activityTypes.map((activityType) => camelcaseKeys(activityType));
}

export async function getActivityTypeById(id: number) {
  const [activityType] = await sql`
  SELECT
    id,
    name
  FROM
    activity_types
  WHERE
    id = ${id}`;
  console.log(activityType);
  console.log(id);
  return activityType;
}

export async function getActivityByTypeId(activityId: number) {
  const [activityType] = await sql<[Activity | undefined]>`
  SELECT
    activity_types.id as activity_type_id,
    activities.name as activity_name,
    activities.description as activity_description
  FROM
    activities,
    activity_types
  WHERE

    activities.activity_type_id = activity_types.id AND
    activities.id = ${activityId}`;

  return activityType && camelcaseKeys(activityType);
}

export type AgeGroup = {
  id: number;
  name: string;
};

export async function getAgeGroups() {
  const ageGroups = await sql<Activity[]>`
  SELECT * FROM age_groups;`;
  console.log(ageGroups);

  return ageGroups.map((ageGroup) => camelcaseKeys(ageGroup));
}

export async function getAgeGroupById(id: number) {
  const [ageGroup] = await sql<[AgeGroup | undefined]>`
  SELECT * FROM age_groups WHERE id = ${id};`;
  return ageGroup;
}

// ---------- SESSIONS ----------

type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token
  `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

// ---------- USERS ----------

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username,
      first_name,
      last_name
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.first_name,
      users.last_name
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<[{ id: number } | undefined]>`
    SELECT id FROM users WHERE username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username,
      password_hash
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function createUser(
  username: string,
  passwordHash: string,
  firstName: string,
  lastName: string,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
    (username, password_hash, first_name, last_name)
  VALUES
    (${username}, ${passwordHash}, ${firstName}, ${lastName})
    RETURNING
    id,
    username,
    first_name,
    last_name
  `;
  return camelcaseKeys(user);
}

// ---------- CAREGIVER ----------

export type Caregiver = {
  id: number;
  firstName: string;
  lastName: string;
  userId: number;
};

export async function createCaregiver(
  firstName: string,
  lastName: string,
  userId: number,
) {
  const [caregiver] = await sql<[Caregiver]>`
  INSERT INTO caregivers
    (first_name, last_name, user_id)
  VALUES
    (${firstName}, ${lastName}, ${userId})
    RETURNING
    id,
    first_name,
    last_name
  `;
  return camelcaseKeys(caregiver);
}

// -----------------------------------------------
// -------------------- CLUBS --------------------
// -----------------------------------------------

export type Club = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  addressId: number;
  companyName: string;
  email: string;
  hourlyRate: string;
};

export async function createClub(
  username: string,
  passwordHash: string,
  firstName: string,
  lastName: string,
  addressId: number,
  companyName: string,
  email: string,
  hourlyRate: string,
) {
  const [club] = await sql<[Club]>`
  INSERT INTO clubs
    (username, password_hash, first_name, last_name, address_id, company_name, email, hourly_rate)
  VALUES
    (${username}, ${passwordHash}, ${firstName}, ${lastName},${addressId}, ${companyName}, ${email}, ${hourlyRate})
    RETURNING
    id,
    username,
    first_name,
    last_name,
    address_id,
    company_name,
    email,
    hourly_rate

  `;
  return camelcaseKeys(club);
}
export async function getClubByUsername(username: string) {
  const [club] = await sql<[{ id: number } | undefined]>`
    SELECT
    clubs.id,
    users.username

    FROM
    clubs,
    users
    WHERE
    user_id = users.id AND
    username = ${username}
  `;
  return club && camelcaseKeys(club);
}

export async function getClubById(id: number) {
  const [club] = await sql<[Club | undefined]>`
    SELECT
      id,
      activity_types_id,
      age_groups_id,
      company_name,
      street,
      city,
      post_code,
      email,
      hourly_rate
    FROM
      clubs
    WHERE
      id = ${id}

  `;
  return club && camelcaseKeys(club);
}
