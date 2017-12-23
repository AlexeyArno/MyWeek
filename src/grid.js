
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
	var count = Math.floor((elheader.offsetWidth - elDays.offsetWidth-10)/hourWidth)
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

function drawGraph(startHour, count, hourWidth, timePlans){
	
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
			if(timePlans[i][j].id!=-1){
				var newInEl = document.createElement("div");
				newInEl.className = "task";
				newInEl.id = "task"+i+j;
				newInEl.setAttribute("data-id", timePlans[i][j].id)
				newInEl.style.background = timePlans[i][j].color
				newInEl.onclick = function(e){elementClick(e)}
				// newInEl.addEventListener("onclick",)
				if(i!=startHour+count){
					if(timePlans[i][j].id==timePlans[i+1][j].id){
						newInEl.style.marginRight = '0px'

					}else{
						newInEl.style.borderTopRightRadius = "5px"
						newInEl.style.borderBottomRightRadius = "5px"
					}
				}
				if(i!=startHour){
					newEl.appendChild(newInEl);
					if(timePlans[i-1][j].id==timePlans[i][j].id && i-1!= startHour){
						newInEl.style.marginLeft = '0px' 
					}else{
						newInEl.style.borderTopLeftRadius = "5px"
						newInEl.style.borderBottomLeftRadius = "5px"
					}
					
				}

				
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
	var plans = [{color: "green", timeStart: 13, timeStop: 15, day: 0,id: 21},
				{color: "red", timeStart: 15, timeStop: 18, day: 2,id: 22},
				{color: "red", timeStart: 1, timeStop: 5, day: 3,id: 23},
				{color: "red", timeStart: 21, timeStop: 22, day: 4,id: 24}];

	
	var hourWidth = 80;

	var startHour = 13;				

	var timePlans = {}


	for(var i=startHour;i<startHour+24;i++){
		var now = (i>23)?i-23:i;


		timePlans[i+1] = new Array({id:-1},{id:-1},{id:-1},{id:-1},{id:-1},{id:-1},{id:-1});
		for(var j=0;j<plans.length;j++){
			if(now>=plans[j].timeStart&&now<=plans[j].timeStop){
				if(plans[j].timeStop==i){
					continue
				}
				timePlans[i+1][plans[j].day] = {color:plans[j].color, id:plans[j].id}
			}
		}
	}
	timePlans[startHour] = timePlans[startHour+1];







	drawDays(days);
	var count = drawTime(startHour, hourWidth);
	drawGraph(startHour,count, hourWidth,timePlans);
	console.log("DRAW")
}

drawAll();

window.addEventListener("resize", drawAll);

function elementClick(event){
	var id = event.target.getAttribute("data-id")
	var elementList = document.querySelectorAll('[data-id]')

	for(var i =0;i<elementList.length;i++){
		if(id == elementList[i].getAttribute("data-id")){
			// elementList[i].style.background = "blue"
		}
	}
	
}

