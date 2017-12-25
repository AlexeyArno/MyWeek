class Days{
 	nativeElement:HTMLElement;
 	days: Array<string>;

	setup(element:HTMLElement){
		this.nativeElement = element;
	}

	draw(){
		this.nativeElement.innerHTML = "";
		for(let i= 0;i<this.days.length;i++){
			let newEl = document.createElement("div");
			newEl.innerHTML = this.days[i];
			newEl.className = "day";
			this.nativeElement.appendChild(newEl);
		}
	} 

	loadDays(days: Array<string>){
		this.days = days;
	}
}

export default Days;