export const clearAndPasteToMainCanvas = (ctx: CanvasRenderingContext2D, mctx: CanvasRenderingContext2D) => {
    mctx.drawImage(ctx.canvas, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}