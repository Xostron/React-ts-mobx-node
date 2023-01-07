import { makeAutoObservable } from "mobx";
import Tool from "../../components/canvas/tools/Tool";

class toolState {
    // сохраняем объект
    tool = {} as Tool

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool) {
        this.tool = tool

    }

    setStrokeColor(color: string) {
        this.tool.strokeColor = color
    }

    setFillColor(color: string) {
        this.tool.fillColor = color
    }

    setLineWidth(width: number) {
        this.tool.lineWidth = width
        console.log('create TOOL', this.tool)
    }
}

export default new toolState()