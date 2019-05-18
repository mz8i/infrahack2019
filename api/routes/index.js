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
    method: 'post',
    path: '/api/submission',
    handler: async ctx => {
      const data = ctx.request.body
      console.log('data', data)

      const submissionId = await pg('photos')
        .returning(['id'])
        .insert({
          author: data.author,
          image_base64: data.image,
          image_position: `(${data.longitude}, ${data.latitude})`,
          image_time: data.timestamp,
          company: data.company,
          comment: data.comment
        })

      ctx.ok(submissionId)
    }
  },
  {
    method: 'get',
    path: '/api/photos',
    handler: async ctx => {
      const photos = await pg('photos')
        .select(['image_position', 'image_base64', 'company']);

      ctx.ok(photos);
    }
  }
]

module.exports = {
  routes
}
