import React from "react";
import Tool from "./Tool";

interface IBrush extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;

}

export default class Brush extends Tool implements IBrush {
    mouseDown: boolean;
    mouseUp: boolean;



    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string,
        fillColor: string, strokeColor: string, lineWidth: number) {
        super(canvas, socket, id, fillColor, strokeColor, lineWidth)
        this.listen()
        this.mouseDown = false
        this.mouseUp = false


    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)

    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.offsetX, e.offsetY)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            // this.draw(e.offsetX, e.offsetY)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.offsetX,
                    y: e.offsetY,
                    fillcolor: this.fillColor,
                    strokecolor: this.strokeColor,
                    linewidth: this.lineWidth,
                }
            }))
        }
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number,
        fillColor: string, strokeColor: string, lineWidth: number) {
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
        console.log('draw brush', strokeColor)
    }
}




