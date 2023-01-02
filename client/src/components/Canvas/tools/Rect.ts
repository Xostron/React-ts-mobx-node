import React from "react";
import Tool from "./Tool";

interface IRect extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;
    startX: number;
    startY: number;
    saved: string;
}

export default class Rect extends Tool implements IRect {
    mouseDown: boolean;
    mouseUp: boolean;
    startX: number;
    startY: number;
    saved: string;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
        this.mouseDown = false
        this.mouseUp = false
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
            let currentX = e.offsetX
            let currentY = e.offsetY
            let width = currentX - this.startX
            let height = currentY - this.startY
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.rect(x, y, w, h)
            this.ctx?.stroke()
            this.ctx?.fill()
            console.log('draw rect')
        }

    }
}




