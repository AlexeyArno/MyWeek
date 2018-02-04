import {tasks} from "../../../db/db_api";
import Task from "../../../week/task";

require('./version_panel.css');

let VersionPanelComponent = (function(){
    let _version_panel:VersionPanel;

    let create = function(_parent:HTMLElement, open:boolean){
        if(!_version_panel){
           _version_panel = new VersionPanel(_parent,open)
        }else{
            _version_panel.clear();
            _version_panel.setParent(_parent);
            _version_panel.setOpen(open);
            _version_panel.draw();
        }
    };

    return{create}

})();

class VersionPanel{
    parent:HTMLElement;
    version:string = "0.1.2";
    open:boolean;

    constructor(_parent:HTMLElement, _open:boolean){
        this.parent = _parent;
        this.open = _open;
        this.draw();
    }

    setParent(_parent:HTMLElement){
        this.parent = _parent;
    }

    setOpen(_open:boolean){
        this.open = _open;
    }

    draw(){
        let inner:string="";
        inner+= `
                       <div class="version_panel">
                             v${this.version}
                        </div>
                   `
        this.parent.innerHTML = inner;

    }

    clear(){
        this.parent.innerHTML = "";
    }
}



export default VersionPanelComponent;
