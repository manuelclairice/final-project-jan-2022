exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	CREATE TABLE address (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  street varchar(50) NOT NULL UNIQUE,
	  city varchar(50) NOT NULL,
		postal_code varchar(20) NOT NULL
	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE address`;
};
