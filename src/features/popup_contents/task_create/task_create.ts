import {createElement} from "../../../functions/functions";
import Task from "../../../week/task";
import {drawButtons} from "../../popup/popup_basic_functions";
import {drawColor} from "../task_basic_functions";
import {changeTask, createTask} from "../../../db/db_api";
import {redrawWeek} from "../../../app";

require("./task_create_style.css");

class TaskCreate{
    element:HTMLElement;
    currentTask:Task;
    colorsList:Array<string> =  ["#cbf0e8", "#ffd9a5", "#dae8f5"];
    colorsElements:Array<HTMLElement> = [];
    currentColor:string = this.colorsList[0];
    buttons = [{name:"Exit", click:function(){}, bg:"#f4f4f4",
                color: "#59606a", border:"#f4f4f4", float:"left"},
                {name:"Create", click:function(){this.create()}.bind(this), bg:"#3b9fff",
                color: "#fff", border:"#177bf3", float:"right"}];
    closePopup:Function;


    draw(background:HTMLElement, closePopup:Function){
        this.closePopup = closePopup;
        this.buttons[0].click = function(){closePopup()};
        if(!this.currentTask) return;
        this.element = createElement("div", "", background);
        // language=HTML
        this.element.innerHTML =
        "<div class='popupContent task_create'>" +
            "<div>Create task</div>"+
            "<hr/>"+
            "<div>" +
                "<div>Name</div>" +
                "<input id='namePopup'>" +
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

    create(){
        console.log(this.currentTask);
        this.currentTask.text = document.getElementById("namePopup")['value'];
        this.currentTask.start = Number(document.getElementById("startTimePopup")['value']);
        this.currentTask.stop = Number(document.getElementById("stopTimePopup")['value']);
        this.currentTask.color = this.currentColor;
        createTask(this.currentTask,function(result:boolean){
            if(result){
                console.log("Result");
                this.closePopup();
                redrawWeek(this.currentTask.week_id);
            }
        }.bind(this));
    }
}

export default TaskCreate;