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
		let count:number = 24;
		let final:number = this.start+count;
		let begin:number = this.start;
		for(let i:number= begin;i<final;i++){
			if(i>=24){
				i=i-24;
				final = final-24;
			}
			let newEl:HTMLElement = document.createElement("div");

			let time:string = (i<10)?'0'+String(i): String(i);

			newEl.innerHTML = time+":00";
			newEl.className = "hour";
			newEl.style.width = this.hourWidth+"px";
			this.nativeElement.appendChild(newEl);
		}
		return count;
	} 
}

export default Time