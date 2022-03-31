exports.up = async (sql) => {
  // <insert magic here>
  await sql`
	CREATE TABLE clubs (
	  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

		age_groups_id integer REFERENCES age_groups (id) ON DELETE CASCADE,
		activity_types_id integer REFERENCES activity_types (id) ON DELETE CASCADE,
		company_name varchar(50) NOT NULL,
		street varchar(100) NOT NULL,
		city varchar(50) NOT NULL,
		post_code varchar(10) NOT NULL,
		email varchar(100) NOT NULL,
		hourly_rate varchar(20) NOT NULL
	);`;
};

exports.down = async (sql) => {
  // just in case...

  await sql`
	DROP TABLE clubs`;
};

// user_id integer REFERENCES users (id) ON DELETE CASCADE,
