import React from "react";
import Tool from "./Tool";

interface ICircle extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;
    startX: number;
    startY: number;
    saved: string;
}

export default class Circle extends Tool implements ICircle {
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
            let radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x: number, y: number, r: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.arc(x, y, r, 0, Math.PI * 2, false)
            this.ctx?.stroke()
            // this.ctx?.fill()
            console.log('draw circle')
        }

    }
}




