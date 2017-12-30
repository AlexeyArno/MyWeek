import Tooltip from './tooltip'
import TaskChange from "../features/popup_contents/task_change/task_change"
import {getPopup} from "../features/popup/popup";

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
	currentGroup:number = 0;

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

	setAtrib(name:string, value:string){
		this.element.setAttribute(name,value);
	}

	setTooltip(){
        this.tooltipElement = new Tooltip(this.text,this.color,this.start,this.stop)
    }

	elementClick(event:Event){
        let content:TaskChange = new TaskChange();
        content.setCurrentTask(this);
        let popup:any = getPopup();
        popup.open(content);
	}

    elementHover(event:Event){
        let elementList = document.querySelectorAll('[data-group]');
        let tasksElements: Array<number> = [];
        let currentDataGroupEl:string = event.srcElement.getAttribute("data-group")
        for(let i =0;i<elementList.length;i++){
            if(currentDataGroupEl == elementList[i].getAttribute("data-group")){
                tasksElements.push(i);
            }
        }
        if(tasksElements.length!=0){
            let begin:number = elementList[tasksElements[0]].getBoundingClientRect().left;

            let top:number = elementList[tasksElements[0]].getBoundingClientRect().top-10;
            let done:number = elementList[tasksElements[tasksElements.length-1]].getBoundingClientRect().left+
                elementList[tasksElements[tasksElements.length-1]].getBoundingClientRect().width;
            if(begin<0){
            	done-=begin;
            	begin-=begin;
			}

            // console.log("Begin: "+String(begin)+" Done: "+String(done));
            // console.log("Count: "+ String(Math.abs(Math.floor((begin-done)/80))));
            let middle:number = begin+Math.floor((done-begin)/2);
            // if(Math.abs(Math.floor((begin-done)/80)) != tasksElements.length){
			// 	middle = event.srcElement.getBoundingClientRect().left+(event.srcElement.getBoundingClientRect().width/2);
			// }
            // console.log("Middle: "+String(middle));
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