import Task from './../../week/task'

import {TaskSettingsContent} from './task_settings_content'
import{Draw} from '../../app'

let taskSettings:TaskSettingsWindow;

function getWindowTaskSettings(){
    if(!taskSettings){
        taskSettings = new TaskSettingsWindow()
    }
    return taskSettings;
}


class TaskSettingsWindow{

    open:boolean= false;
	content:TaskSettingsContent;
	background:HTMLElement;

	constructor(){
        let newBackground:HTMLElement = document.createElement("div");
        newBackground.className = "modalBackground close";
        this.background = newBackground;
        this.background.onclick = function(e:Event){
            if(e.srcElement.className != this.background.className) return;
            this.close()
        }.bind(this);
        document.body.appendChild(newBackground);


        this.content = new TaskSettingsContent(this.background, function(){this.close();}.bind(this), Draw);
    }

    draw(task:Task,  saveOrCreate:boolean){
	    this.open = !this.open;
        this.background.className = "modalBackground colored";

        this.content.draw(task, saveOrCreate);
    }

    close(){
        this.open = !this.open;
        this.background.className = "modalBackground close";
        this.content.clear();
    }
}

export {getWindowTaskSettings, TaskSettingsWindow}

