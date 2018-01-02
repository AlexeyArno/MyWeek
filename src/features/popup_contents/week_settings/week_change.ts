import {createElement} from "../../../functions/functions";
import Task from "../../../week/task";
import {drawButtons} from "../../popup/popup_basic_functions";
import {drawColor} from "../task_basic_functions";
import {changeTask, createTask, deleteTask} from "../../../db/db_api";
import {redrawWeek} from "../../../app";

require("./week_change.css");

interface data{
    week_id:number;
}


class WeekChange{
    element:HTMLElement;
    currentWeek:data;
    buttons = [{name:"Exit", click:function(){}, bg:"#f4f4f4",
        color: "#59606a", border:"#f4f4f4", float:"left"},
        {name:"Save", click:function(){this.save()}.bind(this), bg:"#3b9fff",
            color: "#fff", border:"#177bf3", float:"right"},
        {name:"Delete", click:function(){this.delete()}.bind(this), bg:"#f4f4f4",
            color: "#59606a", border:"#f4f4f4", float:"right"},];
    closePopup:Function;

    constructor(currentWeek:data){
        this.currentWeek = currentWeek
    }

    draw(background:HTMLElement, closePopup:Function){
        this.closePopup = closePopup;
        this.buttons[0].click = function(){closePopup()};
        this.element = createElement("div", "", background);
        // language=HTML
        this.element.innerHTML =
            "<div class='popupContent week_change'>" +
            "<div>Change week</div>"+
            "<hr/>"+
            // "<div>" +
            // "<div>Name</div>" +
            // `<input id='namePopup' >` +
            // "</div>"+
            // "<div class='timeChoosePopup'>" +
            // "<div>Time</div>" +
            // `<input  id='startTimePopup'>` +
            // " - "+
            // `<input id='stopTimePopup'>` +
            // "</div>"+
            "</div>";
        // colors

        drawButtons(this.buttons, <HTMLElement>this.element.children[0])
        background.appendChild(this.element)

    }




    save(){
        // console.log(this.currentTask);
        // this.currentTask.text = document.getElementById("namePopup")['value'];
        // this.currentTask.start = Number(document.getElementById("startTimePopup")['value']);
        // this.currentTask.stop = Number(document.getElementById("stopTimePopup")['value']);
        // this.currentTask.color = this.currentColor;
        // createTask(this.currentTask,function(result:boolean){
        //     if(result){
        //         this.closePopup();
        //         redrawWeek(this.currentTask.week_id);
        //     }
        // }.bind(this));
    }

    delete(){
        deleteWeek(this.currentTask.id,function(result:boolean){
            if(result){
                this.closePopup();
                redrawWeek(this.currentTask.week_id);
            }
        }.bind(this));

    }
}

export default WeekChange
