import KoaRouter from 'koa-router'
const router = new KoaRouter()
import {checkId} from "../middleware/checkId.js"

// fake data
var user = [
    {
        name: "name1",
        email: "email1"
    },{
        name: "name2",
        email: "email2"
    },{
        name: "name3",
        email: "email3"
    },{
        name: "name4",
        email: "email4"
    },{
        name: "name5",
        email: "email5"
    }
]
// Using middleware
router.get("/user/:id", checkId, ctx => {
    console.log(ctx.test);
    console.log(ctx.state.user);
    ctx.body = (ctx.params.id - 1) < user.length ? {...user[ctx.params.id - 1], test: ctx.test}
    : "không có user nào"
})
export default router
