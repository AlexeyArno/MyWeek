import Week from './week/week'
import Task from './week/task'

let week:Week = new Week();
let days:Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
week.loadDays(days);

let daysEl:HTMLElement = document.getElementById('days');

let grapEl:HTMLElement = document.getElementById('graph');

let timeEl:HTMLElement = document.getElementById('header');

week.setupAll(daysEl,timeEl,grapEl);


let plans:Array<Task> = new Array();
 for(let o =0;o<5;o++){
	plans[o] = new Task();
	plans[o].setup("green", 13+o,16+o,0+o,1+o);
}

week.loadTasks(plans);
week.draw();