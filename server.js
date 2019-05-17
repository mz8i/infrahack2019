const Koa = require("koa");
const koaRouter = require('koa-joi-router')
const HttpStatus = require("http-status");
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const respond = require('koa-respond')

const PORT = process.env.PORT || 3000

const router = new koaRouter()

const routes = [
  {
  method: 'get',
  path: '/test',
  handler: async ctx => {
    const books = ["Maciek", "Ignas", "Alexis"];

    ctx.ok(books)
    }
  }
]

router.route(routes)

const app = new Koa()

app
  .use(respond())
  .use(router.middleware())

app.listen(PORT, function () {
    console.log("Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
