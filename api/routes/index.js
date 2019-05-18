const { uploadImage } = require('../handlers')

const routes = [
  {
    method: 'get',
    path: '/test',
    handler: async ctx => {
      console.log('test routes')
      const guys = ["Maciek", "Ignas", "Alexis"];

      ctx.ok(guys)
    }
  },
  {
    method: 'post',
    path: '/image-upload',
    handler: uploadImage
  }
]

module.exports = {
  routes
}
