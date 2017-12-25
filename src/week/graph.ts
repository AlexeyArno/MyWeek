import Task from './task'

class Graph{
	start: number;
	count:number;
	hourWidth:number;
 	nativeElement:HTMLElement;
 	week_number:number;
 	elementClick = function(e:Event){

	};

	setNativeElement(element:HTMLElement){
		this.nativeElement = element
	}

	setup(start: number, count:number, hourWidth:number, week_number:number){
		// this.nativeElement = element;
		this.start = start;
		this.count = count;
		this.hourWidth = hourWidth;
		this.week_number = week_number;
	}

	draw(tasks:Array<Array<Task>>){
		this.nativeElement.innerHTML = "";
		for(let i=this.start;i<this.start+this.count+1;i++){
			let newColumn = document.createElement("div");
			newColumn.className = "column";
			newColumn.style.width = this.hourWidth+"px";
			newColumn.style.height = 40*7+"px";
			for(let j=0;j<7;j++){
				let newEl = document.createElement("div");
				newEl.className = "cell";
				newEl.style.width = this.hourWidth+"px";
				if(i==this.start || i==this.start+this.count){
					newEl.style.width = 20+"px";
					newColumn.style.width =  20+"px";
				}
				if(tasks[i][j].id !=-1){
					tasks[i][j].draw(newEl,i,j, this.week_number);
					if(i!=this.start+this.count){
						if(tasks[i][j].id==tasks[i+1][j].id){
							tasks[i][j].setStyle('marginRight','0px');
						}else{
							tasks[i][j].setStyle('borderTopRightRadius','5px');
							tasks[i][j].setStyle('borderBottomRightRadius','5px');
						}
					}
					if(i!=this.start){
						if(tasks[i-1][j].id==tasks[i][j].id && i-1!= this.start){
							tasks[i][j].setStyle('marginLeft','0px');
						}else{
							tasks[i][j].setStyle('borderTopLeftRadius','5px');
							tasks[i][j].setStyle('borderBottomLeftRadius','5px');
						}
					}else{
						tasks[i][j].clear();
					}
				}
				if(i==this.start+this.count){newEl.style.borderRight = "none";}
				if(j==6){newEl.style.borderBottom = "none";}
				newColumn.appendChild(newEl);
			}
			this.nativeElement.appendChild(newColumn);
		}
	}

	
}


export default Graph;