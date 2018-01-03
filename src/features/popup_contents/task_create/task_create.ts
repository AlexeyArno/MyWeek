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
    colorsList:Array<string> =  ["#cbf0e8", "#ffd9a5", "#dae8f5", "#f5daf5"];
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
                "<input id='namePopup' >" +
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
                        console.log(click_color);
                        this.currentColor = click_color;
                        this.drawColors()
                    }.bind(this),
                    <HTMLElement>this.element.children[0]);
        this.drawColors();

        let actionPopup:HTMLElement = createElement("div", "actionsPopup", <HTMLElement>this.element.children[0]);
        actionPopup.innerHTML+=
            "<div>Action</div>" +
            `<select id='actionSelect'>
                 <option value='none'>None</option>
                <option value='link'>Link</option>
                <option value='file'>File/Application</option>
            </select>
            
            <div id='wrapperAction'>
               
            </div>
            <div id='actionExtension'>
              
            </div>`;

        drawButtons(this.buttons, <HTMLElement>this.element.children[0]);
        let wrapperAction:HTMLElement = document.getElementById('wrapperAction');
        document.getElementById('actionSelect').onchange = function(e:Event){
            switch(e.target['value']){
                case "none":
                    wrapperAction.innerHTML = "";
                    break;
                case "link":
                    wrapperAction.innerHTML = `<input id="inputLinkPopup"/>`;
                    break;
                case "file":
                    let chooseButton ={name:"Choose", click:function(){
                            let path:string = window['chooseFile']()[0];
                            path = (path.length>=20)?
                                "..."+path.substring(path.length-20,path.length):path;
                            document.getElementById('actionExtension').innerText = path;
                        }, bg:"#3b9fff",
                        color: "#fff", border:"#177bf3", float:"right"};
                    wrapperAction.innerHTML = "";
                    let now:HTMLElement = createElement("div","button", wrapperAction);
                    now.innerText = chooseButton.name;
                    now.style.background = chooseButton.bg;
                    now.style.color = chooseButton.color;
                    now.style['float'] = chooseButton.float;
                    now.style.border = "1px solid "+chooseButton.border;
                    now.onclick = function(){chooseButton.click()};
            }
        }.bind(this)

    }

    setCurrentTask(task:Task){
        this.currentTask = task;
    }

    drawColors(){
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
        this.currentTask.action_type =  document.getElementById("actionSelect")['value'];
        switch(this.currentTask.action_type){
        case "none":
            this.currentTask.action_body = "";
            break;
        case "link":
            this.currentTask.action_body = document.getElementById("inputLinkPopup")['value'];
            break;
        case "file":
            this.currentTask.action_body = document.getElementById("actionExtension").innerText;
            break;
        }
        createTask(this.currentTask,function(result:boolean){
            if(result){
                this.closePopup();
                redrawWeek(this.currentTask.week_id);
            }
        }.bind(this));
    }
}

export default TaskCreate;