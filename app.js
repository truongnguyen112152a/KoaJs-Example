import dotenv from 'dotenv'
import koa from 'koa'
import KoaRouter from 'koa-router'
import json from 'koa-json'
import KoaStatic from 'koa-static'
import send from 'koa-send'
import Body from 'koa-body'
const app = new koa()
const router = new KoaRouter()

dotenv.config()
app.use(json())
app.use(router.routes())
app.use(router.allowedMethods())

// Server static file
app.use(KoaStatic('public')) 

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
        message: "hohoh",
        data: 123
    }
})

// Router SendFile from Server

router.get("/me", async ctx => {
    console.log(ctx.request.header.cookie.split("=")[1]);
    let data = await send(ctx, "./public/me.html")
})

// Router response

router.get("/home", async ctx => {
    console.log(ctx.request.header.cookie.split("=")[1]);
    ctx.response.body = "<h1>This is home page</h1>"
})

// router use body
router.post("/me", Body(), async ctx => {
    try {
        console.log(ctx.request.body);
        ctx.response.body = ctx.request.body
        ctx.response.message = "success"
        console.log(ctx.response);
        ctx.redirect("/")
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`connect to port ${process.env.PORT} successfuly!!`);
})

