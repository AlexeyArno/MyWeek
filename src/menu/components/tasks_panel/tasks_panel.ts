import {tasks} from "../../../db/db_api";
import Task from "../../../week/task";

require('./tasks_panel.css');

let TasksPanelComponent = (function(){
    let _tasks_panel:TasksPanel;

    let create = function(_parent:HTMLElement, open:boolean){
        if(!_tasks_panel){
           _tasks_panel = new TasksPanel(_parent,open)
        }else{
            _tasks_panel.clear();
            _tasks_panel.setParent(_parent);
            _tasks_panel.setOpen(open);
            _tasks_panel.draw();
        }
    };

    return{create}

})();

class TasksPanel{
    parent:HTMLElement;
    open:boolean;

    constructor(_parent:HTMLElement, _open:boolean){
        this.parent = _parent;
        this.open = _open;
        this.draw();
    }

    setParent(_parent:HTMLElement){
        this.parent = _parent;
    }

    setOpen(_open:boolean){
        this.open = _open;
    }

    draw(){

        tasks(-1,-1,function(_tasks:Array<Task>){

            function find(name:string, ar:Array<Task>):boolean{
                for(let i=0;i<ar.length;i++){if (ar[i].text == name){return true}}
                return false;
            }

            let unique_tasks:Array<Task> = [];
            _tasks.forEach(function(item){
                if(!find(item.text, unique_tasks)){unique_tasks.push(item)}
            });

            // console.log(unique_tasks);
            let inner:string="";
            unique_tasks.forEach(function(item){
                // console.log(i);
                let time:number = 0;
                _tasks.forEach(function(jitem){
                    if(item.text == jitem.text){
                        time += Math.abs(jitem.start - jitem.stop);
                    }
                });

                inner+= `
                       <div class="menu_panel_task" style="background:${item.color}">
                               <div class="menu_panel_task_icon" >
                                    ${item.text.substring(0,1).toUpperCase()}
                                </div>
                                <div class="menu_panel_task_text" style="display: ${(this.open)?"inline-block":"none"}">
                                    ${(this.open)?item.text:""}
                                </div>
                                 <div class="menu_panel_task_time" >
                                   ${time+'h'}
                                </div>
                        </div>
                   `
            }.bind(this));
            this.parent.innerHTML = inner;
        }.bind(this))
    }


    clear(){
        this.parent.innerHTML = "";
    }
}



export default TasksPanelComponent;
