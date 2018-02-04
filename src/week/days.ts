import {getTimeDataSecond, timeData} from "../time";
import {getWeeks} from "../db/db_api";
import {weekData} from "./week";

require("./style/days.css");

class Days{
 	nativeElement:HTMLElement;
 	days: Array<string>;

	setup(element:HTMLElement){
		this.nativeElement = element;
	}

	draw(){
        getWeeks(function(weeks:Array<weekData>){
            let data:timeData = getTimeDataSecond(weeks);
            this.nativeElement.innerHTML = "";
            for(let i=0;i<this.days.length;i++){
                let newEl = document.createElement("div");
                newEl.innerHTML = this.days[i];
                if(data.currentDay!=0){
                    newEl.className = (i==data.currentDay-1)?"day active":"day";
                }else{
                    if(i==this.days.length-1){
                        newEl.className = "day active"
                    }else{
                        newEl.className = "day"
                    }
                }
                this.nativeElement.appendChild(newEl);
            }
        }.bind(this))

	}

	loadDays(days: Array<string>){
		this.days = days;
	}
}

export default Days;
