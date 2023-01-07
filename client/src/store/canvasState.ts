import { makeAutoObservable } from "mobx";



class canvasState {
    canvas = {} as HTMLCanvasElement
    socket: WebSocket | null = null
    sessionid: string = ''
    undoList: string[] = []
    redoList: string[] = []
    username: string = ''
    // fillColor = '#000000'
    // strokeColor = '#000000'
    // lineWidth = 1

    constructor() {
        makeAutoObservable(this)
    }

    // setFillColor(color: string) {
    //     this.fillColor = color
    // }

    // setStrokeColor(color: string) {
    //     this.strokeColor = color
    // }

    // setLineWidth(width: number) {
    //     this.lineWidth = width
    // }
    setSessionid(id: string) {
        this.sessionid = id
    }

    setSocket(socket: WebSocket) {
        this.socket = socket
    }

    setUsername(username: string) {
        this.username = username
    }

    setCanvas(tool: any) {
        this.canvas = tool
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
    }
    pushToRedo(data: string) {
        this.redoList.push(data)
    }
    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop() as string
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl || ''
            img.onload = () => {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        else {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
        console.log('undo = ', this.undoList)
        console.log('undo = ', this.redoList)
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop() as string
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl || ''
            img.onload = () => {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        console.log('redo = ', this.undoList)
        console.log('redo = ', this.redoList)
    }
}

export default new canvasState()