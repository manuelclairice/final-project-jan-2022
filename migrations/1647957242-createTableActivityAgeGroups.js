exports.up = async (sql) => {
  await sql`
  CREATE TABLE activity_age_groups (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		age_groups_id integer REFERENCES age_groups (id) ON DELETE CASCADE,
		activities_id integer REFERENCES activities (id) ON DELETE CASCADE
	);
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE activity_age_groups
  `;
};
