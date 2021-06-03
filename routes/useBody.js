import KoaRouter from 'koa-router'
import body from 'koa-body'
const router = new KoaRouter()

// router use body
router.post("/me", body(), async ctx => {
    try {
        console.log(ctx.request.body);
        ctx.redirect("/")
    } catch (error) {
        console.log(error);
    }
})

export default router