exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	CREATE TABLE caregivers (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  first_name VARCHAR(25) NOT NULL,
	  last_name VARCHAR(25) NOT NULL,
		email VARCHAR(50)
		-- user_id INTEGER NOT NULL

	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE caregivers`;
};
