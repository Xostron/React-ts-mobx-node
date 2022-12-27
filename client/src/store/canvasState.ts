import { makeAutoObservable } from "mobx";

class canvasState {
    canvas = null
    constructor() {
        makeAutoObservable(this)
    }
    setCanvas(tool: any) {
        this.canvas = tool
    }
}

export default new canvasState()