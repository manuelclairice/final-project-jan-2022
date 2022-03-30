exports.up = async (sql) => {
  // <insert magic here>
  await sql`


	CREATE TABLE activities (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  activity_types_id integer REFERENCES  activity_types (id) ON DELETE CASCADE,
	  name VARCHAR(255) NOT NULL,
    description varchar(300) NOT NULL,
    clubs_id integer REFERENCES clubs (id) ON DELETE CASCADE
	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE activities`;
};
