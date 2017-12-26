import Week from './week/week'
import Task from './week/task'
import {dbInit} from './db/db_api'
import {clickCreateTask, clickCreateWeek} from './menu/week'

let days:Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let plans:Array<Task> = [];
 for(let o =0;o<5;o++){
	plans[o] = new Task("hello","#ffdda9",
                        13+o,16+o,o,
                        1+o+Math.random(),1);
}
let currentWeek: number = 2;
let startHour: number = 11;



dbInit();

let week:Week = new Week(1);
week.create(document.body, (1==currentWeek));
week.loadDays(days);
week.setStartHour(startHour);
week.loadTasks(plans);
week.draw();


