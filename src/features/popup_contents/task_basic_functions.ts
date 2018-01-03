import {createElement} from "../../functions/functions";



function drawColor(colors:Array<string>, callback:Function,parent:HTMLElement):Array<HTMLElement>{
    let final:Array<HTMLElement> = [];
    let wrapper:HTMLElement = createElement("div","colorWrapper", parent);
    wrapper.innerHTML = "<div>Colors</div>";
    colors.map(function (item) {

        let now:HTMLElement = createElement("div","colorPopup", wrapper);
        now.style.background = item;
        // now.onclick = function(e:Event){
        //     callback(item);
        //     // console.log("Hello")
        // };

        now.onclick = ()=>callback(item);
        console.log(now.onclick);

        final.push(now);
    });
    return final;
}

export {drawColor}