import KoaRouter from 'koa-router'
const router = new KoaRouter()
import send from 'koa-send'

router.get("/me", async ctx => {
    // console.log(ctx.request.header.cookie.split(";")[0].split("=")[1]);
    await send(ctx, "./public/me.html")
})
export default router