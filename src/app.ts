import Week from './week/week'
import Task from './week/task'

let days:Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let plans:Array<Task> = new Array();
 for(let o =0;o<5;o++){
	plans[o] = new Task();
	plans[o].setup("#ffdda9", 13+o,16+o,0+o,1+o+Math.random());
}
let currentWeek: number = 2;
let startHour: number = 11;




	let week:Week = new Week(1);
	week.create(document.body, (1==currentWeek));
	week.loadDays(days);
	


// (1)

// (2)
function sec() { 
	startHour = (startHour>23)?startHour-24:startHour+1;
  	week.setStartHour(startHour)
	week.loadTasks(plans);
	week.draw();
}

// setInterval(sec, 2000) // использовать функцию






// let daysEl:HTMLElement = document.getElementById('days');

// let grapEl:HTMLElement = document.getElementById('graph');

// let timeEl:HTMLElement = document.getElementById('header');

// week.setupAll(daysEl,timeEl,grapEl);







