import React from 'react';

export default class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    socket: WebSocket
    id: string
    fillColor?: string
    strokeColor?: string
    lineWidth?: number

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string,
        fillColor: string, strokeColor: string, lineWidth: number) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.lineWidth = lineWidth
        this.destroyEvents()
        this.socket = socket
        this.id = id
    }

    // set fillColor(color: string) {
    //     if (this.ctx) {
    //         this.ctx.fillStyle = color
    //     }
    // }



    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null

    }

}