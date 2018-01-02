import {getTasksByDay, getWeeks} from "./db/db_api";
import Task from "./week/task";

Date.prototype['getWeekNumber'] = function(){
    let d:Date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart:Date = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

let nowTimeout:any;

console.log('The current ISO week number is ' + new Date("21 May 1958 10:12")['getWeekNumber']());

interface timeData{
    currentDay:number;
    currentWeek:number;
    currentHour:number;
}

function getTimeDataFirst(callBack:Function){
    let final:timeData = {currentDay:0,currentWeek:0, currentHour:0};

    let now:Date = new Date();
    final.currentWeek = now['getWeekNumber']();
    final.currentDay = now.getDay();
    final.currentHour = now.getHours();

    getWeeks(function(weeks:Array<number>){
        let maxWeekNumber:number = Math.max.apply(Math,weeks);
        let processDate:number = final.currentWeek % maxWeekNumber;
        if(processDate==0){
            final.currentWeek = maxWeekNumber;
        }else{
            for(let i=1;i<maxWeekNumber;i++){
                if(processDate == i/maxWeekNumber){
                    final.currentWeek = i;
                }
            }
        }
        callBack(final);
    });
}

function getTimeDataSecond(weeks:Array<number>):timeData{
    let final:timeData = {currentDay:0,currentWeek:0, currentHour:0};

    let now:Date = new Date();
    final.currentWeek = now['getWeekNumber']();
    final.currentDay = now.getDay();
    final.currentHour = now.getHours();

    let maxWeekNumber:number = Math.max.apply(Math,weeks);
    let processDate:number = final.currentWeek % maxWeekNumber;
    if(processDate==0){
        final.currentWeek = maxWeekNumber;
    }else{
        for(let i=1;i<maxWeekNumber;i++){
            if(processDate == i/maxWeekNumber){
                final.currentWeek = i;
            }
        }
    }
    return final
}

function notificationManager(){
    clearTimeout(nowTimeout);
    getTimeDataFirst(function(data:timeData){
        getTasksByDay(data.currentWeek, data.currentDay-1,function(tasks:Array<Task>){
            tasks.map(function(item){
                console.log(data.currentDay);
                if(data.currentHour>=item.start && data.currentHour<item.stop){
                    window['createNotification'](item.text,String(item.start)+":00 - "+String(item.stop)+":00")
                }
            });
            nowTimeout = setTimeout(function(){
                notificationManager();
            },(60 - new Date().getMinutes())*60000)
        })
    })

}

export {getTimeDataFirst, getTimeDataSecond, notificationManager, timeData}