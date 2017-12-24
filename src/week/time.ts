class Time{
	start: number;
	hourWidth:number;
 	nativeElement:HTMLElement;

	setup(start: number, hourWidth:number){
		this.start = start;
		this.hourWidth = hourWidth;
	}

	setNativeElement(element:HTMLElement){
		this.nativeElement = element
	}

	draw():number{
		this.nativeElement.innerHTML = "";
		this.nativeElement.style.width = String(24 * this.hourWidth)+"px";
		var count:number = 24
		var final:number = this.start+count;
		var begin:number = this.start
		for(var i:number= begin;i<final;i++){
			if(i>=24){
				i=i-24;
				final = final-24;
			}
			var newEl:HTMLElement = document.createElement("div");

			var time:string = (i<10)?'0'+String(i): String(i);

			newEl.innerHTML = time+":00";
			newEl.className = "hour";
			newEl.style.width = this.hourWidth+"px";
			this.nativeElement.appendChild(newEl);
		}
		return count;
	} 
}

export default Time