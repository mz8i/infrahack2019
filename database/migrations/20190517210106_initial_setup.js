exports.up = async (knex) => {
    // t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    // t.string('name').notNullable()
    // t.enu('type', [ ...Object.values(CompanyType), 'system' ])
    // t.string('address_first_line').notNullable()
    // t.string('address_second_line')
    // t.string('postcode').notNullable()
    // t.string('city').notNullable()
    // t.string('country').notNullable()
    // t.string('parent_company').notNullable()
    // t.jsonb('point_of_contact').notNullable()
    // t.string('registration_number').notNullable()
    // t.string('code', 4).unique(),
    // t.enu('status', [ 'active', 'application_started', 'inactive', 'pending_approval', 'suspended' ]).defaultTo('pending_approval')
    // t.timestamps(false, true)
    // t.timestamp('deleted_at')
    await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis;')

    await knex.raw(`
      CREATE TABLE photos (
        id SERIAL PRIMARY KEY,
        author VARCHAR(100) NOT NULL,
        image_base64 TEXT NOT NULL,
        image_position POINT NOT NULL,
        image_time TIMESTAMP NOT NULL,
        company VARCHAR(500),
        comment VARCHAR(1000)
      )
    `)

    await knex.raw(`
      CREATE TABLE regions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        boundary GEOMETRY NOT NULL
      )
    `)
};

exports.down = async (knex) => {
  await knex.raw('DROP TABLE IF EXISTS regions CASCADE;')
  await knex.raw('DROP TABLE IF EXISTS photos CASCADE;')
};
