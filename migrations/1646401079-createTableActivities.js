exports.up = async (sql) => {
  // <insert magic here>
  await sql`


	CREATE TABLE activities (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  type_id integer NOT NULL,
	  name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    activity_providers_id INTEGER NOT NULL
	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE activities`;
};
