const activities = [
  // ----------  ART  ----------

  {
    activity_types_id: 1,
    name: 'Crafting',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 1,
    name: 'Drawing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 1,
    name: 'Pottery',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },

  // ----------  MUSIC  ----------

  {
    activity_types_id: 2,
    name: 'Piano',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 2,
    name: 'Guitar',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 2,
    name: 'Drums',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },

  // ----------  COOKING  ----------

  {
    activity_types_id: 3,
    name: 'Baking',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 3,
    name: 'Cake Decorating',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 3,
    name: 'Breakfast',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },

  // ----------  DANCE  ----------

  {
    activity_types_id: 4,
    name: 'Ballet',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 4,
    name: 'Breakdance',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 4,
    name: 'Modern Jazz',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },

  // ----------  SPORT  ----------

  {
    activity_types_id: 5,
    name: 'Swimming',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 5,
    name: 'Gymnastics',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
  {
    activity_types_id: 5,
    name: 'Judo',

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet luctus venenatis lectus magna fringilla.',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO activities ${sql(
    activities,
    'name',
    'activity_types_id',
    'description',
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
		description = ${activity.description}

		`;
  }
  // just in case...
};
