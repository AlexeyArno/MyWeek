import {createElement} from "../../../functions/functions";
import Task from "../../../week/task";
import {drawButtons} from "../../popup/popup_basic_functions";
import {drawColor} from "../task_basic_functions";
import {changeTask, createTask, deleteTask} from "../../../db/db_api";
import {redrawWeek} from "../../../app";

require("./task_change.css");

class TaskChange{
    element:HTMLElement;
    currentTask:Task;
    colorsList:Array<string> =  ["#cbf0e8", "#ffd9a5", "#dae8f5"];
    colorsElements:Array<HTMLElement> = [];
    currentColor:string = this.colorsList[0];
    buttons = [{name:"Exit", click:function(){}, bg:"#f4f4f4",
        color: "#59606a", border:"#f4f4f4", float:"left"},
        {name:"Save", click:function(){this.save()}.bind(this), bg:"#3b9fff",
            color: "#fff", border:"#177bf3", float:"right"},
        {name:"Delete", click:function(){this.delete()}.bind(this), bg:"#f4f4f4",
            color: "#59606a", border:"#f4f4f4", float:"right"},];
    closePopup:Function;


    draw(background:HTMLElement, closePopup:Function){
        this.currentColor = this.currentTask.color;
        this.closePopup = closePopup;
        this.buttons[0].click = function(){closePopup()};
        if(!this.currentTask) return;
        this.element = createElement("div", "", background);
        // language=HTML
        this.element.innerHTML =
            "<div class='popupContent task_create'>" +
            "<div>Change task</div>"+
            "<hr/>"+
            "<div>" +
            "<div>Name</div>" +
            `<input id='namePopup' value=${this.currentTask.text}>` +
            "</div>"+
            "<div class='timeChoosePopup'>" +
            "<div>Time</div>" +
            `<input value=${this.currentTask.start} id='startTimePopup'>` +
            " - "+
            `<input value=${this.currentTask.stop} id='stopTimePopup'>` +
            "</div>"+
            "</div>";
        // colors
        this.colorsElements =
            drawColor(this.colorsList,
                function(click_color:string){
                    this.currentColor = click_color;
                    this.drawColors()
                }.bind(this),
                <HTMLElement>this.element.children[0]);
        this.drawColors();
        drawButtons(this.buttons, <HTMLElement>this.element.children[0])


    }

    setCurrentTask(task:Task){
        this.currentTask = task;
    }

    drawColors(){
        console.log(this.currentTask);
        this.colorsList.map(function (item,index) {
            if(item==this.currentColor){
                this.colorsElements[index].className = "colorPopup current"
            }else{
                this.colorsElements[index].className = "colorPopup"
            }
        }.bind(this))
    }

    save(){
        console.log(this.currentTask);
        this.currentTask.text = document.getElementById("namePopup")['value'];
        this.currentTask.start = Number(document.getElementById("startTimePopup")['value']);
        this.currentTask.stop = Number(document.getElementById("stopTimePopup")['value']);
        this.currentTask.color = this.currentColor;
        createTask(this.currentTask,function(result:boolean){
            if(result){
                this.closePopup();
                redrawWeek(this.currentTask.week_id);
            }
        }.bind(this));
    }

    delete(){
        deleteTask(this.currentTask.id,function(result:boolean){
            if(result){
                this.closePopup();
                redrawWeek(this.currentTask.week_id);
            }
        }.bind(this));
    }
}

export default TaskChange
