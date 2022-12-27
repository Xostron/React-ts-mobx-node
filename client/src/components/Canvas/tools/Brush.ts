import React from "react";
import Tool from "./Tool";

interface IBrush extends Tool {
    mouseDown: boolean;
    mouseUp: boolean;
}

export default class Brush extends Tool implements IBrush {
    mouseDown: boolean;
    mouseUp: boolean;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
        this.mouseDown = false
        this.mouseUp = false
    }



    destroyEvents(): void {
        throw new Error("Method not implemented.");
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)

    }

    mouseUpHandler(ev: MouseEvent) {
        this.mouseDown = false
    }
    mouseDownHandler(ev: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
    }
    mouseMoveHandler(ev: MouseEvent) {
        if (this.mouseDown) this.draw()
    }
    draw() {

    }
}




