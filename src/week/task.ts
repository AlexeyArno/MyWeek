import Tooltip from './tooltip'
import {getWindowTaskSettings,TaskSettingsWindow} from '../window/task_settings/task_settings_window'

class Task{
	color: string;
	start: number;
	stop: number;
	day: number;
	id: number;
	text: string;
	week_id:number;
	element: HTMLElement;
	tooltipElement: Tooltip;

	constructor(text:string,color:string,start:number,stop:number,day:number,id:number,week_id:number){
		this.color = color;
		this.start = start;
		this.stop = stop;
		this.day = day;
		this.id = id;
        this.text = text;
        this.week_id = week_id;

	}



	draw(parentElement:HTMLElement, hour:number,day:number,week_number:number){
		let newInEl:HTMLElement = document.createElement("div");
		newInEl.className = "task";
		newInEl.id = "task"+String(week_number)+":"+String(hour)+":"+String(day);
		newInEl.setAttribute("data-id", String(this.id));
		newInEl.style.background = this.color;
		newInEl.onclick = function(e:Event){this.elementClick(e)}.bind(this);
        newInEl.onmouseover = function(e:Event){this.elementHover(e)}.bind(this);
        newInEl.onmouseleave = function(e:Event){this.elementLeave(e)}.bind(this);
		parentElement.appendChild(newInEl);
		this.element = newInEl;
	}

	setTooltip(){
        this.tooltipElement = new Tooltip(this.text,this.color,this.start,this.stop)
    }

	elementClick(event:Event){
        let modalSettings:TaskSettingsWindow = getWindowTaskSettings();
        this.tooltipElement.hidden();
        modalSettings.draw(this, true);
        // console.log("click")
		// let elementList = document.querySelectorAll('[data-id]');
		// for(let i =0;i<elementList.length;i++){
		// 	if(String(this.id) == elementList[i].getAttribute("data-id")){
		// 		// elementList[i].style.background = "blue"
		// 		// console.log('Click')
        //
		// 		//Because singleton
         //
		// 	}
		// }
	}

    elementHover(event:Event){
        let elementList = document.querySelectorAll('[data-id]');
        let tasksElements: Array<number> = [];
        for(let i =0;i<elementList.length;i++){
            if(String(this.id) == elementList[i].getAttribute("data-id")){
                tasksElements.push(i);
            }
        }
        if(tasksElements.length!=0){
            let begin:number = elementList[tasksElements[0]].getBoundingClientRect().left;
            let top:number = elementList[tasksElements[0]].getBoundingClientRect().top-10;
            let done:number = elementList[tasksElements[tasksElements.length-1]].getBoundingClientRect().left+
                elementList[tasksElements[tasksElements.length-1]].getBoundingClientRect().width;
            console.log("Begin: "+String(begin)+" Done: "+String(done));

            let middle:number = begin+Math.floor((done-begin)/2);
            console.log("Middle: "+String(middle));
            this.tooltipElement.draw(top, middle);
        }
    }

    elementLeave(){
        this.tooltipElement.hidden();
    }

	setStyle(styleName:any,styleValue:string){
		if(this.element!=null){
			this.element.style[styleName] = styleValue;
		}
	}

	clear(){
		if(this.element!=null){
			// this.element.parentNode.removeChild(this.element);
			this.element.remove();
			this.element = null;
		}
	}

}


export default Task