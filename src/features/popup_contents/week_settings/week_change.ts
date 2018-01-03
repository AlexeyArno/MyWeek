import {createElement} from "../../../functions/functions";
import Task from "../../../week/task";
import {drawButtons} from "../../popup/popup_basic_functions";
import {drawColor} from "../task_basic_functions";
import {changeTask, changeWeekNumber, createTask, deleteTask, deleteWeek, getWeeks} from "../../../db/db_api";
import {Draw} from "../../../app";
import {weekData} from "../../../week/week";

require("./week_change.css");

interface data{
    week_id:number;

}


class WeekChange{
    element:HTMLElement;
    currentWeek:weekData;
    buttons = [{name:"Exit", click:function(){}, bg:"#f4f4f4",
        color: "#59606a", border:"#f4f4f4", float:"left"},
        {name:"Save", click:function(){this.save()}.bind(this), bg:"#3b9fff",
            color: "#fff", border:"#177bf3", float:"right"},
        {name:"Delete", click:function(){this.drawDelete()}.bind(this), bg:"#f4f4f4",
            color: "#59606a", border:"#f4f4f4", float:"right"},];
    closePopup:Function;
    background:HTMLElement;

    constructor(currentWeek:weekData){
        this.currentWeek = currentWeek
    }

    drawDelete(){
        let del_buttons = [
            {name:"Yes", click:function(){this.delete()}.bind(this), bg:"#3b9fff",
                color: "#fff", border:"#177bf3", float:"right"},
            {name:"No", click:function(){this.draw(this.background, this.closePopup)}.bind(this), bg:"#f4f4f4",
                color: "#59606a", border:"#f4f4f4", float:"right"},];

        this.element.innerHTML =
            `<div class='popupContent week_delete'>
                <p>Do you really want delete <b>${this.currentWeek.week_number}'st</b> week?</p>
             </div>`;
        drawButtons(del_buttons, <HTMLElement>this.element.children[0]);
    }

    draw(background:HTMLElement, closePopup:Function){
        this.background = background;
        this.closePopup = closePopup;
        this.buttons[0].click = function(){closePopup()};
        this.element = createElement("div", "", background);
        // language=HTML
        let options:string = "";
        getWeeks(function(weeks:Array<weekData>){
            for(let i=0;i<weeks.length;i++){
                options+= `<option value='${weeks[i].week_number}' ${(weeks[i].week_id == this.currentWeek.week_id)?'selected':''}>
                                ${weeks[i].week_number}
                           </option>`
            }
            this.element.innerHTML =
                `<div class='popupContent week_change'>
            <div>Change week</div>
            <hr/>
            <div>
                <div>Number</div>
                <select id='actionSelect' class='number'>
                    ${options}
                </select>
            </div>
            </div>`;
            drawButtons(this.buttons, <HTMLElement>this.element.children[0]);
            background.appendChild(this.element)
        }.bind(this));

        // colors
    }




    save(){
        let newNumber:number = Number(document.getElementById('actionSelect')['value']);
        if(this.currentWeek.week_number != newNumber && newNumber!= undefined){
            changeWeekNumber(this.currentWeek,newNumber,function(){
                this.closePopup();
                Draw();
            }.bind(this))
        }
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
        console.log(this.currentWeek);
        deleteWeek(this.currentWeek.week_id,function(result:boolean){
            console.log(result);
            if(result){
                this.closePopup();
                Draw();
            }
        }.bind(this));

    }
}

export default WeekChange
