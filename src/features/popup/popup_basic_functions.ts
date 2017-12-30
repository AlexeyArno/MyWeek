import {createElement} from "../../functions/functions";

interface button{
    name:string;
    color:string;
    bg:string;
    border:string;
    float:string;
    click:Function;
}

function drawButtons(buttons:Array<button>, parent:HTMLElement){
    let wrapper:HTMLElement = createElement("div","buttonWrapper", parent);
    buttons.map(function (item) {
        let now:HTMLElement = createElement("div","button", wrapper);
        now.innerText = item.name;
        now.style.background = item.bg;
        now.style.color = item.color;
        now.style['float'] = item.float;
        now.style.border = "1px solid "+item.border;
        now.onclick = function(){item.click()};
    });
}

export {drawButtons}