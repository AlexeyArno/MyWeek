require("./style/tooltip.css");

class Tooltip{
    element:HTMLElement;
    open:boolean = false;
    color:string;
    text:string;
    start:number;
    stop: number;


    constructor(text:string,color:string,start:number,stop:number){
        this.color = color;
        this.start = start;
        this.stop = stop;
        this.text = text;
        let tooltip:HTMLElement = document.createElement("div");
        tooltip.className = "taskTooltip";
        // tooltip.innerText = "hello";



        document.body.appendChild(tooltip);
        this.element = tooltip;

        this.drawInner();
    }

    drawInner(){
        if(!this.element) throw new Error("tooltip yet not created");
        let text:HTMLElement = document.createElement("div");
        let time:HTMLElement = document.createElement("div");

        text.className = "tooltipText";
        time.className = "tooltipTime";

        text.innerText = this.text;
        time.innerText = String(this.start)+
            ":00 - "+String(this.stop)+":00";

        this.element.appendChild(text);
        this.element.appendChild(time);
    }

    draw(top:number,left:number){
        this.element.className = "taskTooltip active";
        let borderRight:number = window.innerWidth;
        // let borderBottom:number = window.innerHeight;

        let elementHeight:number = this.element.getBoundingClientRect().height;
        let elementWidth:number = this.element.getBoundingClientRect().width;


        let nTop:number = top-elementHeight;
        let nLeft:number = left-(elementWidth/2);

        if(nLeft+elementWidth>borderRight){
            nLeft = borderRight - elementWidth;
        }

        this.element.style.top = String(nTop)+"px";
        this.element.style.left = String(nLeft)+"px";

        this.open = true;
    }

    hidden(){
        this.element.className = "taskTooltip";
        this.open = false;
    }

}

export default Tooltip;