import Week from './week/week'
import Task from './week/task'
import {dbInit} from './db/db_api'
import {clickCreateTask} from './menu/week'

let days:Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let plans:Array<Task> = new Array();
 for(let o =0;o<5;o++){
	plans[o] = new Task();
	plans[o].setup("#ffdda9", 13+o,16+o,0+o,1+o+Math.random());
}
let currentWeek: number = 2;
let startHour: number = 11;



dbInit();

let week:Week = new Week(1);
week.create(document.body, (1==currentWeek));
week.loadDays(days);
week.setStartHour(startHour)
week.loadTasks(plans);
week.draw();

let button = document.createElement("div");
button.style.cursor = "pointer";
button.style.padding = "15px";
button.innerHTML = "CLICK"
button.style.background = "#fff"
button.style.borderBottom = "5px"


document.body.appendChild(button);

button.onclick = function(){clickCreateTask()};

