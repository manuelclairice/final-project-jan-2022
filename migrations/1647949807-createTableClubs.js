exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	CREATE TABLE clubs (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  user_id integer REFERENCES users (id) ON DELETE CASCADE,
		-- first_name varchar(15) NOT NULL,
		-- last_name varchar(20) NOT NULL,
		company_name varchar(50) NOT NULL,
		email varchar(100) NOT NULL,
		hourly_rate varchar(20) NOT NULL,
		address_id integer REFERENCES address (id) ON DELETE CASCADE
	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE clubs`;
};
