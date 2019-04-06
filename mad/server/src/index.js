const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const env = require('./config/.env');

router.get('/', (ctx, next) => {
	ctx.body = 'koa';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT, async () => {
	console.log('connected');
});
