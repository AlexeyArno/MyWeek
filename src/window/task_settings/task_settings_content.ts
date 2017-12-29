import Task from "./../../week/task"
import {createElement} from "../../functions/functions"
import {changeTask, createTask, createWeek} from '../../db/db_api'
import {create} from "domain";

class TaskSettingsContent{
    element:HTMLElement;
    name:HTMLElement;
    timeStart:HTMLElement;
    timeStop:HTMLElement;
    colorsList:Array<string> =  ["#f5a978", "#000", "#ffdda9"];
    colorsElements:Array<HTMLElement> = [];
    currentColor:string;
    currentTask:Task;
    saveFunc:any = this.save;

    closeBackground:any;
    redraw:any;


    constructor(parent:HTMLElement, closeBackground:any, redrawFun:any){
        this.closeBackground = closeBackground;
        this.redraw = redrawFun;
        this.element = createElement("div","modalContent", parent);
        this.name = createElement("input","modalContentInput", this.element);
        this.timeStart = createElement("input","modalContentInput half", this.element);
        this.timeStop = createElement("input","modalContentInput half", this.element);
        let colorWrapper:HTMLElement = createElement("div","colorWrapper", this.element);
        this.colorsList.map(function (item) {
            this.colorsElements.push(createElement("div","modalContentColor", colorWrapper));
            this.colorsElements[this.colorsElements.length-1].style.background = item;
            this.colorsElements[this.colorsElements.length-1].onclick = function(){
                this.currentColor = item;
                this.drawColors();
            }.bind(this)
        }.bind(this));

        let close = createElement("div","closeContentWindow", this.element);
        close.onclick= function(){
            // this.clear();
            this.closeBackground();
        }.bind(this);
        close.innerText = "Close";

        let save = createElement("div","saveContentWindow", this.element);
        save.onclick= function(){
            this.saveFunc();

        }.bind(this);
        save.innerText = "Save";
    }

    save(){
        // console.log('HElo')
        this.currentTask.text = this.name.value;
        this.currentTask.start = Number(this.timeStart.value);
        this.currentTask.stop = Number(this.timeStop.value);
        this.currentTask.color = this.currentColor;
        changeTask(this.currentTask,function(result:boolean){
            if(result){
                this.clearData();
                this.closeBackground();
                this.redraw();
            }
        }.bind(this));

    }

    create(){
        this.currentTask.color =  this.currentColor;
        this.currentTask.start = Number(this.timeStart.value);
        this.currentTask.stop =  Number(this.timeStop.value);
        this.currentTask.text = this.name.value;
        createTask(this.currentTask,function(result:boolean){
            if(result){
                this.clearData();
                this.closeBackground();
                this.redraw();
            }
        }.bind(this));
    }



    draw(task:Task, saveOrCreate:boolean){
        // console.log(task.color);
        if(!saveOrCreate){this.saveFunc = this.create}
        this.currentTask = task;
        this.element.className= "modalContent active";
        this.currentColor = task.color;
        this.name.value = task.text;
        this.timeStart.value = task.start;
        this.timeStop.value = task.stop;
        this.drawColors()
    }

    drawColors(){
        this.colorsList.map(function (item,index) {
            if(item==this.currentColor){
                this.colorsElements[index].className = "modalContentColor current"
            }else{
                this.colorsElements[index].className = "modalContentColor"
            }
        }.bind(this))
    }

    clear(){
        this.currentTask = null;
        this.element.className = "modalContent close"
    }

    clearData(){
        this.name.value = "";
        this.timeStart.value = "";
        this.timeStop.value = "";
        this.currentColor = "";
    }


}
export {TaskSettingsContent}