import {getTasksByDay, getWeeks} from "./db/db_api";
import Task from "./week/task";
import {weekData} from "./week/week";

Date.prototype['getWeekNumber'] = function(){
    let d:Date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart:Date = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

let nowTimeout:any;


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

    getWeeks(function(weeks:Array<weekData>){
        let weeksNumbers:Array<number> = weeks.map((i)=>i.week_number);
        let maxWeekNumber:number = Math.max.apply(Math,weeksNumbers);
        let processDate:number = (final.currentWeek % maxWeekNumber)/maxWeekNumber;
        let processDate2:number = final.currentWeek / maxWeekNumber;
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

function getTimeDataSecond(weeks:Array<weekData>):timeData{
    let final:timeData = {currentDay:0,currentWeek:0, currentHour:0};
    let weeksNumbers:Array<number> = weeks.map((i)=>i.week_number);
    let now:Date = new Date();
    final.currentWeek = now['getWeekNumber']();
    final.currentDay = now.getDay();
    final.currentHour = now.getHours();
    let maxWeekNumber:number = Math.max.apply(Math,weeksNumbers);
    let processDate:number = (final.currentWeek % maxWeekNumber)/maxWeekNumber;
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

function notificationManager(lastTask:Task){
    clearTimeout(nowTimeout);
    getTimeDataFirst(function(data:timeData){
        getTasksByDay(data.currentWeek, data.currentDay-1,function(tasks:Array<Task>){
            tasks.map(function(item){
                if(data.currentHour>=item.start && data.currentHour<item.stop){
                    if(lastTask.id!=item.id){
                        window['createNotification'](item.text,String(item.start)+":00 - "+String(item.stop)+":00");
                        switch(item.action_type){
                            case "link":
                                window['openLink'](item.action_body);
                                break;
                            case "file":
                                window['openFile'](item.action_body)
                                break;
                        }
                        lastTask = item
                    }
                }
            });
            nowTimeout = setTimeout(function(){
                notificationManager(lastTask);
            },(60 - new Date().getMinutes())*60000)
        })
    })

}

export {getTimeDataFirst, getTimeDataSecond, notificationManager, timeData}
