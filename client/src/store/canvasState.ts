import { makeAutoObservable } from "mobx";


class canvasState {
    canvas = {} as HTMLCanvasElement
    undoList: string[] = []
    redoList: string[] = []
    username: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username: string) {
        this.username = username
        console.log(username)
    }

    setCanvas(tool: any) {
        this.canvas = tool
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
        // console.log('arr undo = ', this.undoList)
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