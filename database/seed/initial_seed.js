exports.seed = async (knex) => {
  await knex('regions').del()
  await knex('photos').del()

  await knex('photos').insert([
    {
      id: 1,
      author: 'test user',
      image_url: 'www.test.com',
      image_position: '(31.865668, -28.737904)',
      image_time: '2038-01-19 03:14:07',
      company: 'test company',
      comment: 'bad comment'
    }
  ])
}
