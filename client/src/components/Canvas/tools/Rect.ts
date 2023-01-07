import React from "react";
import Tool from "./Tool";

interface IRect extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;
    startX: number;
    startY: number;
    width: number
    height: number
    saved: string;
}

export default class Rect extends Tool implements IRect {
    mouseDown: boolean
    mouseUp: boolean
    startX: number
    startY: number
    width: number
    height: number
    saved: string


    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string,
        fillColor: string, strokeColor: string, lineWidth: number) {
        super(canvas, socket, id, fillColor, strokeColor, lineWidth)
        this.listen()
        this.mouseDown = false
        this.mouseUp = false
        this.startX = 0;
        this.startY = 0;
        this.width = 0
        this.height = 0
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
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                fillcolor: this.fillColor,
                strokecolor: this.strokeColor,
                linewidth: this.lineWidth
            }
        }))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
        this.startX = e.offsetX
        this.startY = e.offsetY
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {

        if (this.mouseDown) {
            let currentX = e.offsetX
            let currentY = e.offsetY
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x: number, y: number, w: number, h: number) {
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
            this.ctx?.rect(x, y, w, h)
            this.ctx?.stroke()
            this.ctx?.fill()
            console.log('draw rect')
        }

    }

    static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number,
        h: number, fillColor: string, strokeColor: string, lineWidth: number) {
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.stroke()
        ctx.fill()
        ctx.beginPath()
        console.log('server: draw rect')
    }
}




