const Koa = require("koa");
const koaRouter = require('koa-joi-router')
const HttpStatus = require("http-status");
const bodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const respond = require('koa-respond')
const { routes } = require('./api/routes')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8080

const router = new koaRouter()

router.route(routes)

const app = new Koa()

// SERVES FRONTEND
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/unlit-app/build")); //serve the build directory
app.use(mount("/", static_pages));

app
  .use(cors())
  .use(bodyParser())
  .use(respond())
  .use(router.middleware())

app.listen(PORT, function () {
    console.log("Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
