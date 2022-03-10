exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	CREATE TABLE users (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  username varchar(30) NOT NULL UNIQUE,
	  password_hash varchar(100) NOT NULL
	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE users`;
};
