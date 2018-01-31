import {createElement} from "../../../functions/functions";
import Task from "../../../week/task";
import {drawButtons} from "../../popup/popup_basic_functions";
import {drawColor} from "../task_basic_functions";
import {changeTask, createTask, deleteTask} from "../../../db/db_api";
import {redrawWeek} from "../../../app";
import {tasks} from "../../../db/db_api"
require("./task_change.css");

class TaskChange{
    element:HTMLElement;
    wrapperAction:HTMLElement;
    currentTask:Task;
    colorsList:Array<string> = ["#cbf0e8", "#ffd9a5", "#dae8f5", "#f5daf5"];
    colorsElements:Array<HTMLElement> = [];
    currentColor:string = this.colorsList[0];
    buttons = [{name:"Exit", click:function(){}, bg:"#f4f4f4",
        color: "#59606a", border:"#f4f4f4", float:"left"},
        {name:"Save", click:function(){this.save()}.bind(this), bg:"#3b9fff",
            color: "#fff", border:"#177bf3", float:"right"},
        {name:"Delete", click:function(){this.drawDelete()}.bind(this), bg:"#f4f4f4",
            color: "#59606a", border:"#f4f4f4", float:"right"},];
    closePopup:Function;
    background:HTMLElement;
    newExtensional:string;

    drawDelete(){
        let del_buttons = [
            {name:"Yes", click:function(){this.delete()}.bind(this), bg:"#3b9fff",
                color: "#fff", border:"#177bf3", float:"right"},
            {name:"No", click:function(){this.draw(this.background, this.closePopup)}.bind(this), bg:"#f4f4f4",
                color: "#59606a", border:"#f4f4f4", float:"right"},];

        this.element.innerHTML =
            `<div class='popupContent task_delete'>
                <p>Do you really want delete <b>${this.currentTask.text}</b> task</p>
             </div>`;
        drawButtons(del_buttons, <HTMLElement>this.element.children[0]);
    }


    draw(background:HTMLElement, closePopup:Function){
      function find(name:string, ar:Array<Task>):number{
          for(let i=0;i<ar.length;i++){if (ar[i].text == name){return i}}
          return 0;
      }

    function draw(_tasks:Array<Task>){

      let unique_tasks:Array<Task> = [];
      _tasks.forEach(function(item){
          if(!find(item.text, unique_tasks)){unique_tasks.push(item)}
      });

      let datalist:string =`<datalist id='name_tooltips'>`;

      unique_tasks.forEach(function(item){
        datalist+=`<option value = "${item.text}" id="${'id'+item.text}">`

      })

      datalist+=`</datalist>`


        this.background = background;
        this.currentColor = this.currentTask.color;
        this.closePopup = closePopup;
        this.buttons[0].click = function(){closePopup()};
        if(!this.currentTask) return;
        this.element = createElement("div", "", background);
        // language=HTML
        this.element.innerHTML =
            `<div class='popupContent task_create'>
              <div >Change task</div>
              <hr/>
              <div>
                <div>Name</div>
                <input id='namePopup' value=${this.currentTask.text} list='name_tooltips'>
                ${datalist}
              </div>
              <div class='timeChoosePopup'>
                <div>Time</div>
                <input value=${this.currentTask.start} id='startTimePopup'>
                  -
                <input value=${this.currentTask.stop} id='stopTimePopup'>
              </div>
            </div>`
        // colors
        this.colorsElements =
            drawColor(this.colorsList,
                function(click_color:string){
                    this.currentColor = click_color;
                    this.drawColors()
                }.bind(this),
                <HTMLElement>this.element.children[0]);
        this.drawColors();

        let actionPopup:HTMLElement = createElement("div", "actionsPopup", <HTMLElement>this.element.children[0]);
        actionPopup.innerHTML+=
            "<div>Action</div>" +
            `<select id='actionSelect'>
                <option value='none' ${(this.currentTask.action_type=='none')?'selected':''}>None</option>
                <option value='link'  ${(this.currentTask.action_type=='link')?'selected':''}>Link</option>
                <option value='file'  ${(this.currentTask.action_type=='file')?'selected':''}>File/Application</option>
            </select>

            <div id='wrapperAction'>

            </div>
            <div id='actionExtension'>
            </div>`;

        drawButtons(this.buttons, <HTMLElement>this.element.children[0]);
        this.wrapperAction = document.getElementById('wrapperAction');
        this.actionHandler(this.currentTask.action_type);
        document.getElementById('actionSelect').onchange = function(e:Event){
            this.actionHandler(e.target['value'])
        }.bind(this);

    }
      tasks(-1,-1,draw.bind(this))
    }

    actionHandler(value){
        switch(value){
            case "none":
                this.wrapperAction.innerHTML = "";
                break;
            case "link":
                this.wrapperAction.innerHTML =`<input id="inputLinkPopup"
                        value="${(this.currentTask.action_type=="link")?this.currentTask.action_body:""}"/>`;
                break;
            case "file":
                let chooseButton ={name:"Choose", click:function(){
                        let path:string = window['chooseFile']()[0];
                        this.newExtensional = path;
                        path = (path.length>=20)?
                            "..."+path.substring(path.length-20,path.length):path;
                        document.getElementById('actionExtension').innerText = path;
                    }.bind(this), bg:"#3b9fff",
                    color: "#fff", border:"#177bf3", float:"right"};
                let path:string = this.currentTask.action_body;
                this.newExtensional = path;
                path = (path.length>=20)?
                    "..."+path.substring(path.length-20,path.length):path;
                document.getElementById('actionExtension').innerText = path;
                this.wrapperAction.innerHTML = "";
                let now:HTMLElement = createElement("div","button", this.wrapperAction);
                now.innerText = chooseButton.name;
                now.style.background = chooseButton.bg;
                now.style.color = chooseButton.color;
                now.style['float'] = chooseButton.float;
                now.style.border = "1px solid "+chooseButton.border;
                now.onclick = function(){chooseButton.click()};
        }
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
        this.currentTask.action_type =  document.getElementById("actionSelect")['value'];
        switch(this.currentTask.action_type){
            case "none":
                this.currentTask.action_body = "";
                break;
            case "link":
                this.currentTask.action_body = document.getElementById("inputLinkPopup")['value'];
                break;
            case "file":
                this.currentTask.action_body =this.newExtensional;
                break;
        }
        changeTask(this.currentTask,function(result:boolean){
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
