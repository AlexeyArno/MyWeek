function createElement(type:string,className: string, parent:HTMLElement):HTMLElement{
    let element:HTMLElement = document.createElement(type);
    element.className = className;
    parent.appendChild(element);
    return element
}

function hexToDec(hex) {
    let result = 0, digitValue;
    hex = hex.toLowerCase();
    for (let i = 0; i < hex.length; i++) {
        digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
        result = result * 16 + digitValue;
    }
    return result;
}

export  {createElement, hexToDec}