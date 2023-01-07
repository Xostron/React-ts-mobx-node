import React from "react";
import Tool from "./Tool";

interface ILine extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    saved: string;
}

export default class Line extends Tool implements ILine {
    mouseDown: boolean;
    mouseUp: boolean;
    X1: number;
    Y1: number;
    X2: number;
    Y2: number;
    saved: string;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string,
        fillColor: string, strokeColor: string, lineWidth: number) {
        super(canvas, socket, id, fillColor, strokeColor, lineWidth)
        this.listen()
        this.mouseDown = false
        this.mouseUp = false
        this.X1 = 0;
        this.Y1 = 0;
        this.X2 = 0;
        this.Y2 = 0;
        this.saved = ''
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
                type: 'line',
                x1: this.X1,
                y1: this.Y1,
                x2: this.X2,
                y2: this.Y2,
                fillcolor: this.fillColor,
                strokecolor: this.strokeColor,
                linewidth: this.lineWidth
            }
        }))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.X1 = e.offsetX
        this.Y1 = e.offsetY
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.X2 = e.offsetX
            this.Y2 = e.offsetY
            this.draw(this.X1, this.Y1, this.X2, this.Y2)
        }
    }

    draw(x1: number, y1: number, x2: number, y2: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            if (this.ctx) {
                this.ctx.fillStyle = this.fillColor || 'black'
                this.ctx.strokeStyle = this.strokeColor || 'black'
                this.ctx.lineWidth = this.lineWidth || 1
            }
            this.ctx?.beginPath()
            this.ctx?.moveTo(x1, y1)
            this.ctx?.lineTo(x2, y2)
            this.ctx?.stroke()
            console.log('draw line')
        }
    }

    static staticDraw(ctx: CanvasRenderingContext2D,
        x1: number, y1: number, x2: number, y2: number,
        fillColor: string, strokeColor: string, lineWidth: number) {
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.fill()
        console.log('server: draw line')
    }
}




