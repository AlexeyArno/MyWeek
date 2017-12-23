var elements = document.getElementsByClassName("up");
for(var i = 0; i<elements.length;i++){
	elements.item(i).addEventListener("click",headerClick)
}

function headerClick(event){
	// var clName = event.target.parentElement.className 
	// event.target.parentElement.className =(clName!='') ;
	var clList = event.target.parentElement.classList;
	for(var i = 0;i<clList.length;i++){
		if(clList[i] == "closed"){clList.remove("closed");return}
	}
	clList.add("closed")
}