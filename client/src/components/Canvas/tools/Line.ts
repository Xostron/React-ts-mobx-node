import React from "react";
import Tool from "./Tool";

interface ILine extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;
    color: string
    lineWidth: number
    startX: number;
    startY: number;
    saved: string;
}

export default class Line extends Tool implements ILine {
    mouseDown: boolean;
    mouseUp: boolean;
    color: string
    lineWidth: number
    startX: number;
    startY: number;
    saved: string;

    constructor(canvas: HTMLCanvasElement, color?: string, lineWidth?: number) {

        super(canvas)
        this.listen()
        this.mouseDown = false
        this.mouseUp = false
        this.color = color || 'black'
        this.lineWidth = lineWidth || 1
        this.startX = 0;
        this.startY = 0;
        this.saved = ''
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)

    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
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
            this.draw(e.offsetX, e.offsetY)
        }
    }

    draw(x: number, y: number) {
        if (this.ctx) {
            this.ctx.strokeStyle = this.color
            this.ctx.lineWidth = this.lineWidth
        }
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.moveTo(this.startX, this.startY)
            this.ctx?.lineTo(x, y)
            this.ctx?.stroke()
            console.log('draw line')
        }
    }
}




