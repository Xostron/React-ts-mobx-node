import React from "react";
import Brush from "./Brush";




export default class Eraser extends Brush {


    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string,
        fillColor: string, strokeColor: string, lineWidth: number) {
        super(canvas, socket, id, fillColor, strokeColor, lineWidth)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            // this.draw(e.offsetX, e.offsetY)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.offsetX,
                    y: e.offsetY,
                    fillcolor: 'white',
                    strokecolor: 'white',
                    linewidth: this.lineWidth,
                }
            }))
        }
    }

    static staticDraw(ctx: CanvasRenderingContext2D,
        x: number, y: number, fillColor: string,
        strokeColor: string, lineWidth: number) {
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
        console.log('server: draw eraser')
    }
}




