import Time from './time'
import Task from './task'
import Graph from './graph'
import Days from './days'


class Week{
	week_number: number
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
		var wrapp:HTMLElement = document.createElement("div");
		wrapp.className="paper  main-container"

		var up:HTMLElement = document.createElement("div");
		up.className = (currentWeek)?"up active":"up";

		wrapp.appendChild(up)
		up.innerHTML = "Week "+String(this.week_number)
		up.onclick = function(e:Event){
			// console.log(e.target)
			wrapp.classList
			var clList = wrapp.classList;
			for(var i = 0;i<clList.length;i++){
		 		if(clList[i] == "closed"){clList.remove("closed");days.style.display="block";return}
		 	}
		 	clList.add("closed")
		 	days.style.display = "none"
		}


		var grid:HTMLElement = document.createElement("div");
		grid.id = "grid"+String(this.week_number)



		var header:HTMLElement = document.createElement("div");
		header.className = "header"
		header.id = "header"+String(this.week_number)

		var container:HTMLElement = document.createElement("div");
		container.className = "container-week"
		container.id = "container-week"+String(this.week_number)
		grid.appendChild(header)



		grid.appendChild(container)

		var days:HTMLElement = document.createElement("div");

		var graph:HTMLElement = document.createElement("div");
		days.id = "days"+String(this.week_number)
		days.className = "days"
		graph.id = "graph"+String(this.week_number)
		graph.className = "graph"
		container.appendChild(days)
		container.appendChild(graph)


		grid.className = "grid"
		wrapp.appendChild(grid)
		parent.appendChild(wrapp)


		this.container = container
		this.daysPanel.setup(days)
		this.graphPanel.setNativeElement(graph)
		this.timePanel.setNativeElement(header)

	}

	loadTasks(plans: Array<Task>){
		let timePlans:Array<Array<Task>> = new Array();
		for(var i=this.startHour;i<this.startHour+24;i++){
			let now = (i>23)?i-23:i;

			timePlans[i+1] = new Array(7);

			for(let j=0;j<7;j++){
				timePlans[i+1][j] = new Task();
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

	// setupAll(DaysElement:HTMLElement, TimeElement:HTMLElement,GraphElement:HTMLElement){
	// 	this.daysPanel.setup(DaysElement);
	// 	this.graphPanel.setNativeElement(GraphElement);
	// 	this.timePanel.setNativeElement(TimeElement);
	// }



	draw(){
		// window.removeEventListener("resize", this.draw.bind(this));
		// let plans:Array<Task> = new Array();
		// let timePlans:Array<Array<Task>> = new Array();

		// for(let o =0;o<5;o++){
		// 	plans[o] = new Task();
		// 	plans[o].setup("green", 13+o,16+o,0+o,1+o);


		
		this.container.style.width = String(24*this.hourWidth)+'px';
		this.timePanel.setup(this.startHour, this.hourWidth);
		let count:number = this.timePanel.draw();

		
		this.graphPanel.setup(this.startHour, count, this.hourWidth, this.week_number);
		this.graphPanel.draw(this.tasks);

		this.daysPanel.draw();
		// window.addEventListener("resize", this.draw.bind(this));
	}

	// redraw(){
	// 	this.timePanel.setup(this.startHour, this.hourWidth);
	// 	let count:number = this.timePanel.draw();
		
	// 	this.graphPanel.setup(this.startHour,count, this.hourWidth);
	// 	this.graphPanel.draw(this.tasks);
	// }






}

export default Week