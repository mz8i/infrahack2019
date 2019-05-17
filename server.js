const Koa = require("koa");
const koaRouter = require('koa-joi-router')
const HttpStatus = require("http-status");
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const respond = require('koa-respond')

const PORT = process.env.PORT || 8080

const router = new koaRouter()

const routes = [
  {
  method: 'get',
  path: '/test',
  handler: async ctx => {
    const guys = ["Maciek", "Ignas", "Alexis"];

    ctx.ok(guys)
    }
  }
]

router.route(routes)

const app = new Koa()

// SERVES FRONTEND
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/unlit-app/build")); //serve the build directory
app.use(mount("/", static_pages));

app
  .use(cors())
  .use(respond())
  .use(router.middleware())

app.listen(PORT, function () {
    console.log("Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
