exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	CREATE TABLE age_groups (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  name varchar(30) NOT NULL UNIQUE

	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE age_groups`;
};
