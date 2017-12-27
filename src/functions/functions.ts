function createElement(type:string,className: string, parent:HTMLElement):HTMLElement{
    let element:HTMLElement = document.createElement(type);
    element.className = className;
    parent.appendChild(element);
    return element
}

export  {createElement}