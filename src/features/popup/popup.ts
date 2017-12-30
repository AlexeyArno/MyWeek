import {Draw} from "../../app";
import {TaskSettingsContent} from "../../window/task_settings/task_settings_content";
require('./popup.css');

interface PopupContent {
    draw: Function;
}

class Popup{
    background:HTMLElement;
    now_open:boolean = false;

    constructor(){
        let newBackground:HTMLElement = document.createElement("div");
        newBackground.className = "popupBack close";
        this.background = newBackground;
        this.background.onclick = function(e:Event){
            if(e.srcElement.className != this.background.className) return;
            this.close()
        }.bind(this);
        document.body.appendChild(newBackground);
    }

    open(content:PopupContent){
        if(this.now_open){this.close()}
        this.now_open = true;
        this.background.className = "popupBack open";
        document.body.style.overflow = 'hidden';
        content.draw(this.background, function(){this.close()}.bind(this));
    }

    close(){
        this.now_open = false;
        this.background.className = "popupBack close";
        document.body.style.overflow = 'auto';
        this.background.innerHTML = null;
    }
}

let currentPopup:Popup;

function getPopup(){
    if(!currentPopup){
        currentPopup = new Popup()
    }
    return currentPopup;
}

export {getPopup}
