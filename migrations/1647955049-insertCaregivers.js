const caregivers = [
  {
    first_name: 'Sanela',
    last_name: 'Duric',
  },
  {
    first_name: 'Yvette',
    last_name: 'Savignan',
  },
  {
    first_name: 'Fritz',
    last_name: 'Clairice',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO caregivers ${sql(caregivers, 'first_name', 'last_name')}
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
		`;
  }
  // just in case...
};
