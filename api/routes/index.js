const knex = require('knex')
const dotenv = require('dotenv');
dotenv.config();

var pg = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URL,
  searchPath: ['knex', 'public'],
});

const routes = [
  {
  method: 'get',
  path: '/test',
  handler: async ctx => {
    const guys = ["Maciek", "Ignas", "Alexis"];

    ctx.ok(guys)
    }
  },
  {
    method: 'post',
    path: '/api/submission',
    handler: async ctx => {
      const data = ctx.request.body
      console.log('data', data)

      const submissionId = await pg('photos')
        .returning(['id'])
        .insert({
          author: 'test user',
          image_url: 'www.test.com',
          image_position: '(31.865668, -28.737904)',
          image_time: '2038-01-19 03:14:07',
          company: 'test company',
          comment: 'bad comment'
        })

      ctx.ok(submissionId)
    }
  }
]

module.exports = {
  routes
}
