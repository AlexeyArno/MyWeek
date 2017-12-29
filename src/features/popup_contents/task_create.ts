import {createElement} from "../../functions/functions";
import Task from "../../week/task";

class TaskCreate{
    element:HTMLElement;
    currentTask:Task;

    draw(background:HTMLElement, closePopup:Function){
        if(!this.currentTask) return;
        this.element = createElement("div", "", background);
        // language=HTML
        this.element.innerHTML =
        "<div class='popupContent'>" +
            "<div>" +
                "<div>Имя</div>" +
                "<input />" +
            "</div>"+
            "<div>" +
                "<div>Старт</div>" +
                `<input value=${this.currentTask.start}>` +
            "</div>"+
            "<div>" +
                "<div>Конец</div>" +
                `<input value=${this.currentTask.stop}>` +
                "</div>"+
        "</div>"
    }

    setCurrentTask(task:Task){
        this.currentTask = task
    }

}

export default TaskCreate;