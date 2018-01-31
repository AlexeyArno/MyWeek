import Time from './time'
import Task from './task'
import Graph from './graph'
import Days from './days'
import {getPopup} from "../features/popup/popup";
import TaskCreate from "../features/popup_contents/task_create/task_create";
import WeekChange from "../features/popup_contents/week_settings/week_change";

require("./style/week.css");

interface weekData{
    week_id:number;
    week_number:number;
}

class Week{
	data:weekData;
	timePanel:Time;
	tasks: Array<Array<Task>>;
	graphPanel: Graph;
	daysPanel:Days;
	hourWidth:number = 80;
	startHour:number = 13;

	container:HTMLElement;




	constructor(week_number:number,week_id:number) {
	    // this.name = name;
	    this.data = {week_id,week_number};
	    this.timePanel = new Time();
	    this.graphPanel = new Graph();
	    this.daysPanel = new Days();
	}

	create(parent:HTMLElement, currentWeek:boolean){
		let wrap:HTMLElement = document.createElement("div");
		wrap.className="paper  main-container";

            let up:HTMLElement = document.createElement("div");
                up.className = (currentWeek)?"up active":"up";
            let upText:HTMLElement = document.createElement("div");
                upText.className = "weekUpText";
                upText.innerHTML = "Week "+String(this.data.week_number);
            up.appendChild(upText);

            let settings:HTMLElement = document.createElement("div");
            settings.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px">`+
                    `<g>`+
                        `<path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z" fill="rgba(0, 0, 0,0.4)"/>`+
                        `<path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z" fill="rgba(0, 0, 0,0.4)"/>`+
                        `<path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" fill="rgba(0, 0, 0,0.4)"/>`+
                    `</g>`+
                `</svg>`;
            settings.className = "settingsButtonWeek";
            up.appendChild(settings);
            wrap.appendChild(up);
            upText.onclick = function(e:Event){
                // console.log(e.target);
                wrap.classList;
                let clList = wrap.classList;
                for(let i = 0;i<clList.length;i++){
                    if(clList[i] == "closed"){clList.remove("closed");days.className="days";return}
                }
                clList.add("closed");
                days.className="days close"
            };

            settings.onclick = function(e:Event){
                let content:WeekChange = new WeekChange(this.data);
                let popup:any = getPopup();
                popup.open(content);
            }.bind(this);


		let grid:HTMLElement = document.createElement("div");
		grid.id = "grid"+String(this.data.week_number);



		let header:HTMLElement = document.createElement("div");
		header.className = "header";
		header.id = "header"+String(this.data.week_number);

		let container:HTMLElement = document.createElement("div");
		container.className = "container-week";
		container.id = "container-week"+String(this.data.week_number);
		grid.appendChild(header);



		grid.appendChild(container);

		let days:HTMLElement = document.createElement("div");

		let graph:HTMLElement = document.createElement("div");
		days.id = "days"+String(this.data.week_number);
		days.className = "days";
		graph.id = "graph"+String(this.data.week_number);
		graph.className = "graph";
		container.appendChild(days);
		container.appendChild(graph);


		grid.className = "grid";
		wrap.appendChild(grid);
		parent.appendChild(wrap);


		this.container = container;
		this.daysPanel.setup(days);
		this.graphPanel.setNativeElement(graph);
		this.timePanel.setNativeElement(header);

	}

	loadTasks(plans: Array<Task>){
		let timePlans:Array<Array<Task>> = [];
		for(let i=this.startHour;i<this.startHour+24;i++) {
            let now = (i > 24) ? i - 24 : i;
            timePlans[i + 1] = new Array(7);
            for (let j = 0; j < 7; j++) {
                timePlans[i + 1][j] = new Task("", "", 0, 0, 0, 0, 0);
                timePlans[i + 1][j].id = -1;
            }
            for (let j = 0; j < plans.length; j++) {
                if (now >= plans[j].start && now < plans[j].stop) {
                    timePlans[i + 1][plans[j].day] = plans[j]
                } else if (plans[j].start == 0 && now==24) { // some bug here
                    timePlans[i + 1][plans[j].day] = plans[j]
                }
            }
        }
		timePlans[this.startHour] = timePlans[this.startHour+1];
		this.tasks = timePlans
	}

	loadDays(days: Array<string>){
		this.daysPanel.loadDays(days);
	}

	setStartHour(hour:number){
		this.startHour = hour;
	}



	draw(){

		this.container.style.width = String(24.5*this.hourWidth)+'px';
		this.timePanel.setup(this.startHour, this.hourWidth);
		let count:number = this.timePanel.draw();


		this.graphPanel.setup(this.startHour, count, this.hourWidth, this.data.week_number, this.data.week_id);
		this.graphPanel.draw(this.tasks);

		this.daysPanel.draw();
	}





}

export {Week,weekData}
