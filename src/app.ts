import Week from './week/week'
import Task from './week/task'
import {createElement} from "./functions/functions"
import {createWeek, dbInit} from './db/db_api'
import {clickCreateTask, clickCreateWeek} from './menu/week'
import {getTasks,getWeeks} from "./db/db_api";

let days:Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


// let plans:Array<Task> = [];
//  for(let o =0;o<5;o++){
// 	plans[o] = new Task("hello","#ffdda9",
//                         13+o,16+o,o,
//                         1+o+Math.random(),1);
// }
let currentWeek: number = 2;
let startHour: number = 11;
let currentWeeks:Array<Week> = [];

dbInit();

function redrawWeek(id:number){
    console.log("RedrawWeek");
    currentWeeks.map(function(item){
        if(item.week_number == id){
            getTasks(item.week_number,function(tasks:Array<Task>){
                item.loadTasks(tasks);
                item.draw();
            })
        }
    })
}

function clear(classType:string){
    let elements = document.getElementsByClassName(classType);
    for (let i = elements.length; i--; ) {
        elements[i].remove();
    }

}

function drawButton(){
        let buttonShell = createElement("div","buttonShell",document.body);
        let button = createElement("div","button createWeek", buttonShell);
        button.innerText = "Create week";
        button.onclick = function () {
            createWeek();
            Draw();
        }
}

function Draw(){
    clear("paper  main-container");
    clear("buttonShell");
    clear("taskTooltip");


    getWeeks(function(weeks:Array<number>){
        if(weeks.length == 0){
            drawButton();
        }
        weeks.map(function(item,index){

            getTasks(item,function(tasks:Array<Task>){
                let week:Week = new Week(item);
                week.create(document.body, (item==currentWeek));
                week.loadDays(days);
                week.setStartHour(startHour);
                week.loadTasks(tasks);
                week.draw();
                currentWeeks.push(week);
                if(index == weeks.length-1){
                    drawButton();
                }
            })
        });
    });


}

Draw();

export {Draw, redrawWeek}

