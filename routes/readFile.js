import KoaRouter from 'koa-router'
import fs from 'fs'
import util from 'util'
const router = new KoaRouter()

// read file sync
router.get("/file", ctx => {
    try {
        let result = fs.readFileSync("./files/test.txt", "utf-8")
        ctx.response.body = result
    } catch (error) {
        console.log(error);
    }
})

// read file async
router.get("/async-file", async ctx => {
    try {
        const customRead = util.promisify(fs.readFile);
        const customWrite = util.promisify(fs.writeFile);
        const data1 = await customRead("./files/test.txt", 'utf-8');
        await customWrite("./files/test2.txt", "yes", 'utf-8');
        const data2 = await customRead("./files/test2.txt", 'utf-8');
        ctx.response.body = data1 + " ** " + data2
    } catch (error) {
        ctx.response.body = error
    }
})
router.get("/array", async ctx => {
    try {
        let data = await fs.readFile("./files/test.txt", "utf-8", async (err, data) => {
            console.log(data);
            ctx.response.body = data
        })
        console.log("object");
    } catch (error) {
        ctx.response.body = "this is : " + error
    }
    ctx.response.body = "test"
})

export default router