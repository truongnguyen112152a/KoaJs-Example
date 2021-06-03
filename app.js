import dotenv from 'dotenv'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import json from 'koa-json'
import koaStatic from 'koa-static'
import staticRouter from "./routes/staticFile.js"
import middleRouter from "./routes/useMiddle.js"
import bodyRouter from "./routes/useBody.js"
const app = new Koa()
const router = new KoaRouter()

dotenv.config()
app.use(json())
app.use(staticRouter.routes())
app.use(staticRouter.allowedMethods())
app.use(middleRouter.routes())
app.use(middleRouter.allowedMethods())
app.use(bodyRouter.routes())
app.use(bodyRouter.allowedMethods())
app.use(router.routes())
app.use(router.allowedMethods())


// Server static file
app.use(koaStatic('public')) 

app.keys = ["cookies"] // use app.keys

// cascading
app.use(async (ctx, next) => {
    console.log(1);
    ctx.cookies.set("token", "this is token", {signed: true})
    next();
    const rt = ctx.response.get('Case1');
    console.log(rt);
});

app.use(async (ctx, next) => {
    console.log(2);
    let token = ctx.cookies.get("token")
    console.log(token);
    next();
    const rt = ctx.response.get('Case2');
    console.log(rt);
});

app.use(async (ctx, next) => {
    next();
    ctx.set('Case1', "this is case 1");
    ctx.set('Case2', "this is case 2");
    console.log(3);
});

// Context

app.use(async ctx => {
    ctx.body = {
        message: "test context",
        data: 123
    }
})

// Router response
router.get("/home", async ctx => {
    ctx.response.body = "<h1>This is home page</h1>"
})

app.listen(process.env.PORT, () => {
    console.log(`connect to port ${process.env.PORT} successfuly!!`);
})