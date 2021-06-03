// writting middleware 
export function checkId(ctx, next) {
    try {
        if(ctx.params.id > 2) {
            ctx.test = "this is test"
            ctx.state.user = "this is user"
            return next() 
        } 
        ctx.body = "không có user"
    } catch (error) {
        ctx.body = error.message
    }
}