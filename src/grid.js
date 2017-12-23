
var elDays = document.getElementById("days")


function drawDays(days){
	var elDays = document.getElementById("days")
	elDays.innerHTML = "";
	for(var i= 0;i<days.length;i++){
		var newEl = document.createElement("div");
		newEl.innerHTML = days[i];
		newEl.className = "day";
		elDays.appendChild(newEl);
	}
}

function drawTime(startHour, hourWidth){
	var elheader = document.getElementById("header")
	elheader.innerHTML = "";
	var count = Math.floor((elheader.offsetWidth - elDays.offsetWidth+20)/hourWidth)
	var final = startHour+count;
	var begin = startHour
	for(var i= begin;i<final;i++){
		if(i>=24){
			i=i-24;
			final = final-24;
		}
		var newEl = document.createElement("div");

		var time = (i<10)?'0'+i: i;

		newEl.innerHTML = time+":00";
		newEl.className = "hour";
		newEl.style.width = hourWidth+"px";
		elheader.appendChild(newEl);
	}
	return count;

}

function drawGraph(startHour, count, hourWidth){
	var elGraph = document.getElementById("graph")
	elGraph.innerHTML = "";
	for(var i=startHour;i<startHour+count+1;i++){
		var newCollum = document.createElement("div");
		newCollum.className = "collumn"
		newCollum.style.width = hourWidth+"px"
		newCollum.style.height = 40*7+"px"
		for(var j=0;j<7;j++){
			var newEl = document.createElement("div");
			newEl.className = "cell";
			newEl.style.width = hourWidth+"px";
			if(i==startHour || i==startHour+count){
				newEl.style.width = 20+"px";
				newCollum.style.width =  20+"px";
			}
			if(i==startHour+count){newEl.style.borderRight = "none";}
			if(j==6){newEl.style.borderBottom = "none";}
			newCollum.appendChild(newEl);
		}
		elGraph.appendChild(newCollum);
	}
}


function drawAll(){
	var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	var hourWidth = 80;

	var startHour = 13;

	drawDays(days);
	var count = drawTime(startHour, hourWidth);
	drawGraph(startHour,count, hourWidth);
	console.log("DRAW")
}

drawAll();

window.addEventListener("resize", drawAll);

