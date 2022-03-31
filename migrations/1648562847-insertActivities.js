const activities = [
  // ----------  ART  ----------

  {
    activity_types_id: 1,
    name: 'Crafting',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 7,
  },
  {
    activity_types_id: 1,
    name: 'Drawing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 10,
  },
  {
    activity_types_id: 1,
    name: 'Pottery',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 11,
  },

  // ----------  MUSIC  ----------

  {
    activity_types_id: 2,
    name: 'Piano',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 16,
  },
  {
    activity_types_id: 2,
    name: 'Guitar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 14,
  },
  {
    activity_types_id: 2,
    name: 'Violin',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 18,
  },

  // ----------  COOKING  ----------

  {
    activity_types_id: 3,
    name: 'Baking',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 25,
  },
  {
    activity_types_id: 3,
    name: 'Cake Decorating',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 28,
  },
  {
    activity_types_id: 3,
    name: 'Breakfast',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 29,
  },

  // ----------  DANCE  ----------

  {
    activity_types_id: 4,
    name: 'Ballet',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 20,
  },
  {
    activity_types_id: 4,
    name: 'Breakdance',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 22,
  },
  {
    activity_types_id: 4,
    name: 'Modern Jazz',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 23,
  },

  // ----------  SPORT  ----------

  {
    activity_types_id: 5,
    name: 'Swimming',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 1,
  },
  {
    activity_types_id: 5,
    name: 'Gymnastics',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
    clubs_id: 4,
  },
  {
    activity_types_id: 5,
    name: 'Judo',

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
