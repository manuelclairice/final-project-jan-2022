const caregivers = [
  {
    first_name: 'Sanela',
    last_name: 'Duric',
    email: 'sanela.duric83@gmail.com',
  },
  {
    first_name: 'Yvette',
    last_name: 'Savignan',
    email: 'manuel.clairice@gmail.com',
  },
  {
    first_name: 'Fritz',
    last_name: 'Clairice',
    email: 'manuel.clairice@gmail.com',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO caregivers ${sql(caregivers, 'first_name', 'last_name', 'email')}
	`;
  // <insert magic here>
};

exports.down = async (sql) => {
  for (const caregiver of caregivers) {
    await sql`
		DELETE FROM
		caregivers
		WHERE
		first_name = ${caregiver.first_name} AND
		last_name = ${caregiver.last_name}
    email = ${caregiver.email}
		`;
  }
  // just in case...
};
