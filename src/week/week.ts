import Time from './time'
import Task from './task'
import Graph from './graph'
import Days from './days'


class Week{
	timePanel:Time;
	tasks: Array<Array<Task>>;
	graphPanel: Graph;
	daysPanel:Days;
	hourWidth:number = 80;
	startHour:number = 13;




	constructor() {
	    // this.name = name;
	    this.timePanel = new Time();
	    this.graphPanel = new Graph();
	    this.daysPanel = new Days();
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

	setupAll(DaysElement:HTMLElement, TimeElement:HTMLElement,GraphElement:HTMLElement){
		this.daysPanel.setup(DaysElement);
		this.graphPanel.setNativeElement(GraphElement);
		this.timePanel.setNativeElement(TimeElement);
	}



	draw(){
		// window.removeEventListener("resize", this.draw.bind(this));
		// let plans:Array<Task> = new Array();
		// let timePlans:Array<Array<Task>> = new Array();

		// for(let o =0;o<5;o++){
		// 	plans[o] = new Task();
		// 	plans[o].setup("green", 13+o,16+o,0+o,1+o);


		
		document.getElementById('container-week1').style.width = String(24*this.hourWidth)+'px';
		this.timePanel.setup(this.startHour, this.hourWidth);
		let count:number = this.timePanel.draw();

		
		this.graphPanel.setup(this.startHour,count, this.hourWidth);
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