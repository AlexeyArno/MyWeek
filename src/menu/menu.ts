import {createElement} from "../functions/functions";
import TasksPanelComponent from './components/tasks_panel/tasks_panel'
import VersionPanelComponent from './components/version_panel/version_panel'
require("./menu.css");

let MenuNative = (function(){
    let _menu:Menu;

    let create=function(parent:HTMLElement){
        if(_menu){
            _menu.clear();
            _menu.draw();
        }else{
            _menu = new Menu(parent);
        }

    };

    let draw = function(){
        if(_menu){
            _menu.draw();
        }
    }

    let clear=function(){
        if(!_menu){return}
        _menu.clear();
    };
    return{
        create,clear,draw
    }

})();

export default MenuNative;


class Menu{
    parent:HTMLElement;
    current_el:HTMLElement;
    state:boolean;
    task_panel=TasksPanelComponent;


    menu_logo_click = function () {
        this.state = !this.state;
        document.getElementById('content').style.paddingLeft =(this.state)?"240px":"70px";
        this.draw();
    }.bind(this);

    constructor(_parent:HTMLElement){
           this.parent = _parent;
           this.state = false;
           this.draw();
    }

    draw(){
        if(this.current_el){
            this.current_el.innerHTML = "";
            this.current_el.className = (this.state)?'main_menu open':'main_menu close';

        }else{
            this.current_el = createElement('div', (this.state)?'main_menu open':'main_menu close',this.parent);
        }
        this.current_el.innerHTML =
            `<div class="menu_logo" id="menu_logo">
                   <div id="menu_logo_svg">
                        <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                <g>
                                    <g>
                                        <path style="fill:#D8DCE1;" d="M0,134v328c0,22.055,17.945,40,40,40h432c22.055,0,40-17.945,40-40V134H0z"/>
                                    </g>
                                    <g>
                                        <path style="fill:#FF4F19;" d="M472,22H40C17.945,22,0,39.945,0,62v72h512V62C512,39.945,494.054,22,472,22z M64,102
                                            c-13.255,0-24-10.745-24-24s10.745-24,24-24s24,10.745,24,24S77.255,102,64,102z M448,102c-13.255,0-24-10.745-24-24
                                            s10.745-24,24-24s24,10.745,24,24S461.255,102,448,102z"/>
                                    </g>
                                    <g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M256,206c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S273.648,206,256,206z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M176,206c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S193.648,206,176,206z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M96,206c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S113.648,206,96,206z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M336,206c-17.648,0-32,14.352-32,32s14.352,32,32,32c17.648,0,32-14.352,32-32
                                                S353.648,206,336,206z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M416,270c17.648,0,32-14.352,32-32s-14.352-32-32-32c-17.648,0-32,14.352-32,32
                                                S398.351,270,416,270z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M256,286c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S273.648,286,256,286z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M176,286c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S193.648,286,176,286z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M96,286c-17.648,0-32,14.352-32,32s14.352,32,32,32s32-14.352,32-32S113.648,286,96,286z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M336,286c-17.648,0-32,14.352-32,32s14.352,32,32,32c17.648,0,32-14.352,32-32
                                                S353.648,286,336,286z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M416,286c-17.648,0-32,14.352-32,32s14.352,32,32,32c17.648,0,32-14.352,32-32
                                                S433.648,286,416,286z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M256,366c-17.648,0-32,14.352-32,32c0,17.648,14.352,32,32,32s32-14.352,32-32
                                                C288,380.351,273.648,366,256,366z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M176,366c-17.648,0-32,14.352-32,32c0,17.648,14.352,32,32,32s32-14.352,32-32
                                                C208,380.351,193.648,366,176,366z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M96,366c-17.648,0-32,14.352-32,32c0,17.648,14.352,32,32,32s32-14.352,32-32
                                                C128,380.351,113.648,366,96,366z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M336,366c-17.648,0-32,14.352-32,32c0,17.648,14.352,32,32,32c17.648,0,32-14.352,32-32
                                                C368,380.351,353.648,366,336,366z"/>
                                        </g>
                                        <g>
                                            <path style="fill:#FFFFFF;" d="M416,366c-17.648,0-32,14.352-32,32c0,17.648,14.352,32,32,32c17.648,0,32-14.352,32-32
                                                C448,380.351,433.648,366,416,366z"/>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path style="fill:#5C546A;" d="M64,90c-6.625,0-12-5.371-12-12V22c0-6.629,5.375-12,12-12s12,5.371,12,12v56
                                                C76,84.629,70.625,90,64,90z"/>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path style="fill:#5C546A;" d="M448,90c-6.625,0-12-5.371-12-12V22c0-6.629,5.375-12,12-12s12,5.371,12,12v56
                                                C460,84.629,454.625,90,448,90z"/>
                                        </g>
                                    </g>
                                    <g>
                                        <circle style="fill:#FFD200;" cx="96" cy="238" r="32"/>
                                    </g>
                                    <g>
                                        <circle style="fill:#FF9600;" cx="256" cy="398" r="32"/>
                                    </g>
                                    <g>
                                        <circle style="fill:#FF4F19;" cx="336" cy="318" r="32"/>
                                    </g>
                                </g>
                                </svg>
                   </div>
                   <div class="menu_logo_name">${(this.state)?'MyWeek':''}</div>
             </div>
             <div class="menu_line"></div>
            `+
            // <div class=" ${(this.state)?'menu_choose':'menu_choose close'}">
            //     <div class="menu_button">
            //        W
            //     </div>
            //     <div class="${(this.state)?'menu_choose_text':'menu_choose_text close'}">
            //         Weeks
            //     </div>
            // </div>
           //  <div class=" ${(this.state)?'menu_choose':'menu_choose close'}">
           //     <div class="menu_button">
           //        C
           //     </div>
           //     <div class="${(this.state)?'menu_choose_text':'menu_choose_text close'}">
           //         Calendar
           //     </div>
           // </div>
           //  <div class=" ${(this.state)?'menu_choose':'menu_choose close'}">
           //        <div class="menu_button">
           //              S
           //        </div>
           //        <div class="${(this.state)?'menu_choose_text':'menu_choose_text close'}">
           //               Settings
           //        </div>
           //  </div>
           //  <div class=" ${(this.state)?'menu_choose':'menu_choose close'}">
           //        <div class="menu_button">
           //              A
           //        </div>
           //        <div class="${(this.state)?'menu_choose_text':'menu_choose_text close'}">
           //               About
           //        </div>
           //  </div>
           //  <div class="menu_line"></div>
            `
            <div class="task_panel" id="menu_task_panel"></div>
            <div class="version_Panel" id="menu_version_panel"></div>
            `;
        document.getElementById('menu_logo').onclick = this.menu_logo_click;
        this.task_panel.create(document.getElementById('menu_task_panel'), this.state);
        VersionPanelComponent.create(document.getElementById('menu_version_panel'), this.state);
    };

    clear(){
        parent['innerHTML'] = "";
    }

}
