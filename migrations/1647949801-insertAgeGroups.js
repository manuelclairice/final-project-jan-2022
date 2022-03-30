const ages = [
  {
    name: '0 to 3',
  },
  {
    name: '4 to 6',
  },
  {
    name: '7 to 10',
  },
  {
    name: '11 to 14',
  },
  {
    name: '15 to 18',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO age_groups ${sql(ages, 'name')}
	`;
  // <insert magic here>
};

exports.down = async (sql) => {
  for (const age of ages) {
    await sql`
		DELETE FROM
		age_groups
		WHERE
		name = ${age.name}
		`;
  }
  // just in case...
};
