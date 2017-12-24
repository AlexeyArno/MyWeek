class Task{
	color: string;
	start: number;
	stop: number;
	day: number;
	id: number;
	element: HTMLElement

	setup(color:string,start:number,stop:number,day:number,id:number){
		this.color = color;
		this.start = start;
		this.stop = stop;
		this.day = day;
		this.id = id;
	}

	draw(parentElement:HTMLElement, hour:number,day:number ){
		var newInEl:HTMLElement = document.createElement("div");
		newInEl.className = "task";
		newInEl.id = "task"+String(hour)+String(day);
		newInEl.setAttribute("data-id", String(this.id))
		newInEl.style.background = this.color
		newInEl.onclick = function(e:Event){this.elementClick(e)}.bind(this)
		parentElement.appendChild(newInEl);
		this.element = newInEl;
	}

	elementClick(event:Event){
		var elementList = document.querySelectorAll('[data-id]')
		for(var i =0;i<elementList.length;i++){
			if(String(this.id) == elementList[i].getAttribute("data-id")){
				// elementList[i].style.background = "blue"
				console.log('Click')
			}
		}
	}

	setStyle(styleName:any,styleValue:string){
		if(this.element!=null){
			this.element.style[styleName] = styleValue;
		}
	}

	clear(){
		if(this.element!=null){
			// this.element.parentNode.removeChild(this.element);
			this.element.remove();
			this.element = null;
		}
	}

}


export default Task