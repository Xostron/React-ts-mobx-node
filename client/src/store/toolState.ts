import { makeAutoObservable } from "mobx";

class toolState {
    tool = null
    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool: any) {
        this.tool = tool
    }
}

export default new toolState()