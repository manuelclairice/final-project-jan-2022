const clubDetails = [
  // ----------  SPORT  ----------

  {
    company_name: 'Swimming Club Stadlau',
    street: 'Schwabengasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@swimmstadlau.com',
    hourly_rate: '10',
  },
  {
    company_name: 'Swimming Club Kagran',
    street: 'Kagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hi@swimmkagran.com',
    hourly_rate: '10',
  },
  {
    company_name: 'Gymnastic Club Stadlau',
    street: 'Gymgasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@gymstadlau.com',
    hourly_rate: '10',
  },
  {
    company_name: 'Gymnastic Club Kagran',
    street: 'Gymkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@gymkagran.com',
    hourly_rate: '10',
  },
  {
    company_name: 'Judo Club Stadlau',
    street: 'Judogasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@judostadlau.com',
    hourly_rate: '10',
  },
  {
    company_name: 'Judo Club Kagran',
    street: 'Judokagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@judokagran.com',
    hourly_rate: '10',
  },

  // ----------  ART  ----------
  {
    company_name: 'Crafting Club Stadlau',
    street: 'Craftgasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@craftstadlau.com',
    hourly_rate: '12',
  },
  {
    company_name: 'Crafting Club Kagran',
    street: 'Craftkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@craftkagran.com',
    hourly_rate: '12',
  },
  {
    company_name: 'Drawing Club Stadlau',
    street: 'Drawgasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@drawstadlau.com',
    hourly_rate: '12',
  },
  {
    company_name: 'Drawing Club Kagran',
    street: 'Drawkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@drawkagarn.com',
    hourly_rate: '12',
  },
  {
    company_name: 'Pottery Club Stadlau',
    street: 'Pottergasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@potstadlau.com',
    hourly_rate: '15',
  },
  {
    company_name: 'Pottery Club Kagran',
    street: 'Potterkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@potkagran.com',
    hourly_rate: '15',
  },

  // ----------  MUSIC  ----------
  {
    company_name: 'Guitar Club Stadlau',
    street: 'Guitargasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@guitarstadlau.com',
    hourly_rate: '18',
  },
  {
    company_name: 'Guitar Club Kagran',
    street: 'Guitarkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@guitarkagran.com',
    hourly_rate: '18',
  },
  {
    company_name: 'Piano Club Stadlau',
    street: 'Pianogasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@pianostadlau.com',
    hourly_rate: '18',
  },
  {
    company_name: 'Piano Club Kagran',
    street: 'Pianokagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@pianokagran.com',
    hourly_rate: '18',
  },
  {
    company_name: 'Violin Club Stadlau',
    street: 'Violingasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@violinstadlau.com',
    hourly_rate: '20',
  },
  {
    company_name: 'Violin Club Kagran',
    street: 'Violinkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@violinkagran.com',
    hourly_rate: '20',
  },

  // ----------  DANCE  ----------
  {
    company_name: 'Ballet Club Stadlau',
    street: 'Balletgasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@balletstadlau.com',
    hourly_rate: '20',
  },
  {
    company_name: 'Ballet Club Kagran',
    street: 'Balletkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@balletkagran.com',
    hourly_rate: '20',
  },
  {
    company_name: 'Breakdance Club Stadlau',
    street: 'Breakdancengasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@breakstadlau.com',
    hourly_rate: '20',
  },
  {
    company_name: 'Breakdance Club Kagran',
    street: 'Breakdancenkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@breakkagran.com',
    hourly_rate: '20',
  },
  {
    company_name: 'Modern Dance Club Stadlau',
    street: 'Moderndancengasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@jazzstadlau.com',
    hourly_rate: '20',
  },
  {
    company_name: 'Modern Dance Club Kagran',
    street: 'Moderndancenkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@jazzkagran.com',
    hourly_rate: '20',
  },

  // ----------  COOKING  ----------
  {
    company_name: 'Baking Club Stadlau',
    street: 'Bakinggasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@bakestadlau.com',
    hourly_rate: '15',
  },
  {
    company_name: 'Baking Club Kagran',
    street: 'Bakingkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@bakekagran.com',
    hourly_rate: '15',
  },
  {
    company_name: 'Cake Club Stadlau',
    street: 'Cakegasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@cakestadlau.com',
    hourly_rate: '15',
  },
  {
    company_name: 'Cake Club Kagran',
    street: 'Cakekagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@cakekagran.com',
    hourly_rate: '15',
  },
  {
    company_name: 'Breakfast Club Stadlau',
    street: 'Breakfastgasse 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@breakfaststadlau.com',
    hourly_rate: '15',
  },
  {
    company_name: 'Breakfast Club Kagran',
    street: 'Breakfastkagranstraße 1',
    city: 'Vienna',
    postal_code: '1220',
    email: 'hello@breakfastkagran.com',
    hourly_rate: '15',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO clubs ${sql(
    clubDetails,
    'company_name',
    'street',
    'city',
    'postal_code',
    'email',
    'hourly_rate',
  )}
	`;
  // <insert magic here>
};

exports.down = async (sql) => {
  for (const clubDetail of clubDetails) {
    await sql`
		DELETE FROM
		clubs
		WHERE
		company_name = ${clubDetail.company_name} AND
		street = ${clubDetail.street} AND
		city = ${clubDetail.city} AND
		postal_code = ${clubDetail.postal_code} AND
		email = ${clubDetail.email} AND
		hourly_rate = ${clubDetail.hourly_rate}
		`;
  }
  // just in case...
};
