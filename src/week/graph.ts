import Task from './task'

class Graph{
	start: number;
	count:number;
	hourWidth:number;
 	nativeElement:HTMLElement;
 	elementClick = function(e:Event){

	} 

	setNativeElement(element:HTMLElement){
		this.nativeElement = element
	}

	setup(start: number, count:number, hourWidth:number){
		// this.nativeElement = element;
		this.start = start;
		this.count = count;
		this.hourWidth = hourWidth;
	}

	draw(tasks:Array<Array<Task>>){
		this.nativeElement.innerHTML = "";
		for(var i=this.start;i<this.start+this.count+1;i++){
			var newCollum = document.createElement("div");
			newCollum.className = "collumn"
			newCollum.style.width = this.hourWidth+"px"
			newCollum.style.height = 40*7+"px"
			for(var j=0;j<7;j++){

				var newEl = document.createElement("div");
				newEl.className = "cell";
				newEl.style.width = this.hourWidth+"px";
				if(i==this.start || i==this.start+this.count){
					newEl.style.width = 20+"px";
					newCollum.style.width =  20+"px";
				}
				if(tasks[i][j].id !=-1){
					// var newInEl = document.createElement("div");
					// newInEl.className = "task";
					// newInEl.id = "task"+i+j;
					// newInEl.setAttribute("data-id", String(tasks[i][j].id))
					// newInEl.style.background = tasks[i][j].color
					// newInEl.onclick = function(e){elementClick(e)}
					// newInEl.addEventListener("onclick",)
					tasks[i][j].draw(newEl,i,j);

					if(i!=this.start+this.count){
						if(tasks[i][j].id==tasks[i+1][j].id){
							tasks[i][j].setStyle('marginRight','0px');
							// newInEl.style.marginRight = '0px'
						}else{
							tasks[i][j].setStyle('borderTopRightRadius','5px');
							tasks[i][j].setStyle('borderBottomRightRadius','5px');
							// newInEl.style.borderTopRightRadius = "5px"
							// newInEl.style.borderBottomRightRadius = "5px"
						}
					}
					if(i!=this.start){
						if(tasks[i-1][j].id==tasks[i][j].id && i-1!= this.start){
							tasks[i][j].setStyle('marginLeft','0px');
							// newInEl.style.marginLeft = '0px' 
						}else{
							tasks[i][j].setStyle('borderTopLeftRadius','5px');
							tasks[i][j].setStyle('borderBottomLeftRadius','5px');
							// newInEl.style.borderTopLeftRadius = "5px"
							// newInEl.style.borderBottomLeftRadius = "5px"
						}
					}else{
						tasks[i][j].clear();
					}
				}
				if(i==this.start+this.count){newEl.style.borderRight = "none";}
				if(j==6){newEl.style.borderBottom = "none";}
				newCollum.appendChild(newEl);
			}
			this.nativeElement.appendChild(newCollum);
		}
	}

	
}


export default Graph;