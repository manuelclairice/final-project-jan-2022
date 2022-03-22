const activityTypes = [
  {
    name: 'Art',
  },
  {
    name: 'Music',
  },
  {
    name: 'Cooking',
  },
  {
    name: 'Dance',
  },
  {
    name: 'Sport',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO activity_types ${sql(activityTypes, 'name')}
	`;
  // <insert magic here>
};

exports.down = async (sql) => {
  for (const activityType of activityTypes) {
    await sql`
		DELETE FROM
		activity_types
		WHERE
		name = ${activityType.name}
		`;
  }
  // just in case...
};
