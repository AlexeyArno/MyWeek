import Task from "./../../week/task"
import {createElement} from "./../../functions/functions"

class TaskSettingsContent{
    element:HTMLElement;
    name:HTMLElement;
    timeStart:HTMLElement;
    timeStop:HTMLElement;
    colors:Array<HTMLElement> = [];
    currentColor:string;


    constructor(parent:HTMLElement){
        this.element = createElement("div","modalContent", parent);
        this.name = createElement("input","modalContentInput", this.element);
        this.timeStart = createElement("input","modalContentInput", this.element);
        this.timeStop = createElement("input","modalContentInput", this.element);
        ["#fff", "#000"].map(function (item) {
            this.colors.push(createElement("div","modalContentColor", this.element));
            this.colors[this.colors.length-1].style.background = item;
        }.bind(this))







    }

    draw(task:Task){
        // console.log(task.color);
        this.element.className= "modalContent active";
        this.currentColor = task.color;
        this.name.setAttribute("value",task.text);
        this.timeStart.setAttribute("value",String(task.start));
        this.timeStop.setAttribute("value",String(task.stop));
    }

    clear(){
        this.element.className = "modalContent close"
    }


}
export {TaskSettingsContent}