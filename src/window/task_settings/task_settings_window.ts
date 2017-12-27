import Task from './../../week/task'

import {TaskSettingsContent} from './task_settings_content'

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
        newBackground.className = "modalBackground";
        this.background = newBackground;
        document.body.appendChild(newBackground)


        this.content = new TaskSettingsContent(this.background);
    }

    draw(task:Task){
        this.background.className = "modalBackground colored";
        this.background.onclick = function(e:Event){
            if(e.srcElement.className != this.background.className) return;
            this.close()
        }.bind(this);
        this.content.draw(task);
    }
    close(){
        this.background.className = "modalBackground close";
        this.content.clear();
    }
}

export {getWindowTaskSettings, TaskSettingsWindow}

