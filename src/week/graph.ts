import Task from './task'
import {getPopup} from "../features/popup/popup";
import TaskCreate from '../features/popup_contents/task_create/task_create'
import {weekData} from "./week";
require("./style/graph.css");

class Graph{
	start: number;
	count:number;
	hourWidth:number;
 	nativeElement:HTMLElement;
 	currentWeekData:weekData={week_id:0,week_number:0};

	setNativeElement(element:HTMLElement){
		this.nativeElement = element
	}

	setup(start: number, count:number, hourWidth:number, week_number:number, week_id:number){
		// this.nativeElement = element;
		this.start = start;
		this.count = count;
		this.hourWidth = hourWidth;
		this.currentWeekData.week_number = week_number;
		this.currentWeekData.week_id = week_id;
	}

	draw(tasks:Array<Array<Task>>){
		let lastJ = 0;
		this.nativeElement.innerHTML = "";
		for(let i=this.start;i<this.start+this.count+1;i++){
			let newColumn = document.createElement("div");
			newColumn.className = "column";
			newColumn.style.width = this.hourWidth+"px";
			newColumn.style.height = 40*7+"px";
			for(let j=0;j<7;j++){
				let newEl = document.createElement("div");
				newEl.className = "cell";
				newEl.style.width = this.hourWidth+"px";
				if(i==this.start){
					newEl.style.width = 20+"px";
					newColumn.style.width =  20+"px";
				}
				if(tasks[i][j].id !=-1) {
                    tasks[i][j].draw(newEl, i, j, this.currentWeekData.week_number);
                    tasks[i][j].setAtrib("data-group", String(tasks[i][j].currentGroup)+":"+String(tasks[i][j].id));
                    if (i != this.start + this.count) {
                        if (tasks[i][j].id == tasks[i + 1][j].id) {
                            tasks[i][j].setStyle('marginRight', '0px');
                        } else {
                            tasks[i][j].setStyle('borderTopRightRadius', '5px');
                            tasks[i][j].setStyle('borderBottomRightRadius', '5px');
                            //if this part - last task part, because non create more useless tooltips
                            tasks[i][j].setTooltip();
                            if(j!=lastJ) tasks[i][j].currentGroup++;
                            lastJ = j;
                        }
                    }else{
                        tasks[i][j].setStyle('borderTopRightRadius', '5px');
                        tasks[i][j].setStyle('borderBottomRightRadius', '5px');
                        //if this part - last task part, because non create more useless tooltips
                        tasks[i][j].setTooltip();
                        if(j!=lastJ) tasks[i][j].currentGroup++;
                        lastJ = j;
					}
                    if (i != this.start) {
                        if (tasks[i - 1][j].id == tasks[i][j].id && i - 1 != this.start) {
                            tasks[i][j].setStyle('marginLeft', '0px');
                        } else {
                            tasks[i][j].setStyle('borderTopLeftRadius', '5px');
                            tasks[i][j].setStyle('borderBottomLeftRadius', '5px');
                        }
                    }else {
                        tasks[i][j].clear();
                    }


                }else if(i!=this.start){
                    let newInEl:HTMLElement = document.createElement("div");
                    newInEl.className = "empty_cell";
                    newInEl.onclick = function(e:Event){
                        let startTask =(i>24)?i-24:i;

                    	// taskCreateWindow.draw(,false)
						let content:TaskCreate = new TaskCreate();
						content.setCurrentTask(new Task("","#fff",startTask-1,startTask,j,0,this.currentWeekData.week_id));
						let popup:any = getPopup();
						popup.open(content);

					}.bind(this);
                    newEl.appendChild(newInEl);
				}
				if(i==this.start+this.count){newEl.style.borderRight = "none";}
				if(j==6){newEl.style.borderBottom = "none";}
				newColumn.appendChild(newEl);
			}
			this.nativeElement.appendChild(newColumn);
		}
	}

	
}


export default Graph;