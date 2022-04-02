const activities = [
  // ----------  ART  ----------

  {
    activity_types_id: 1,
    name: 'crafting',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 7,
  },
  {
    activity_types_id: 1,
    name: 'drawing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 10,
  },
  {
    activity_types_id: 1,
    name: 'pottery',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 11,
  },

  // ----------  MUSIC  ----------

  {
    activity_types_id: 2,
    name: 'piano',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 16,
  },
  {
    activity_types_id: 2,
    name: 'guitar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 14,
  },
  {
    activity_types_id: 2,
    name: 'violin',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 18,
  },

  // ----------  COOKING  ----------

  {
    activity_types_id: 3,
    name: 'baking',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 25,
  },
  {
    activity_types_id: 3,
    name: 'cake Decorating',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 28,
  },
  {
    activity_types_id: 3,
    name: 'breakfast',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 29,
  },

  // ----------  DANCE  ----------

  {
    activity_types_id: 4,
    name: 'ballet',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 20,
  },
  {
    activity_types_id: 4,
    name: 'breakdance',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 22,
  },
  {
    activity_types_id: 4,
    name: 'modern Jazz',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 23,
  },

  // ----------  SPORT  ----------

  {
    activity_types_id: 5,
    name: 'swimming',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 1,
  },
  {
    activity_types_id: 5,
    name: 'gymnastics',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 4,
  },
  {
    activity_types_id: 5,
    name: 'judo',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 6,
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO activities ${sql(
    activities,
    'name',
    'activity_types_id',
    'description',
    'clubs_id',
  )}
	`;
  // <insert magic here>
};

exports.down = async (sql) => {
  for (const activity of activities) {
    await sql`
		DELETE FROM
		activities
		WHERE
		name = ${activity.name} AND
		activity_types_id = ${activity.activity_types_id} AND
		description = ${activity.description} AND
    clubs_id = ${activity.clubs_id}
		`;
  }
  // just in case...
};
