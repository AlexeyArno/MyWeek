import Time from './time'
import Task from './task'
import Graph from './graph'
import Days from './days'


class Week{
	week_number: number;
	timePanel:Time;
	tasks: Array<Array<Task>>;
	graphPanel: Graph;
	daysPanel:Days;
	hourWidth:number = 80;
	startHour:number = 13;

	container:HTMLElement;




	constructor(week_number:number) {
	    // this.name = name;
	    this.week_number = week_number;
	    this.timePanel = new Time();
	    this.graphPanel = new Graph();
	    this.daysPanel = new Days();
	}

	create(parent:HTMLElement, currentWeek:boolean){
		let wrap:HTMLElement = document.createElement("div");
		wrap.className="paper  main-container";

		let up:HTMLElement = document.createElement("div");
		up.className = (currentWeek)?"up active":"up";

		wrap.appendChild(up);
		up.innerHTML = "Week "+String(this.week_number);
		up.onclick = function(e:Event){
			console.log(e.target);
			wrap.classList;
			let clList = wrap.classList;
			for(let i = 0;i<clList.length;i++){
		 		if(clList[i] == "closed"){clList.remove("closed");days.className="days";return}
		 	}
		 	clList.add("closed");
            days.className="days close"
		};


		let grid:HTMLElement = document.createElement("div");
		grid.id = "grid"+String(this.week_number);



		let header:HTMLElement = document.createElement("div");
		header.className = "header";
		header.id = "header"+String(this.week_number);

		let container:HTMLElement = document.createElement("div");
		container.className = "container-week";
		container.id = "container-week"+String(this.week_number);
		grid.appendChild(header);



		grid.appendChild(container);

		let days:HTMLElement = document.createElement("div");

		let graph:HTMLElement = document.createElement("div");
		days.id = "days"+String(this.week_number);
		days.className = "days";
		graph.id = "graph"+String(this.week_number);
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
		for(let i=this.startHour;i<this.startHour+24;i++){
			let now = (i>23)?i-23:i;

			timePlans[i+1] = new Array(7);

			for(let j=0;j<7;j++){
				timePlans[i+1][j] = new Task("","",0,0,0,0,0);
				timePlans[i+1][j].id = -1;
			}
			for(let j=0;j<plans.length;j++){
				if(now>=plans[j].start&&now<=plans[j].stop){
					if(plans[j].stop==i){
						continue
					}
					timePlans[i+1][plans[j].day] = plans[j]
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

		
		this.graphPanel.setup(this.startHour, count, this.hourWidth, this.week_number);
		this.graphPanel.draw(this.tasks);

		this.daysPanel.draw();
	}





}

export default Week