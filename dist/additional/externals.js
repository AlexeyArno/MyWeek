const {shell} = require('electron').remote

window.openLink = function(link){
    shell.openExternal(link);
}

window.openFile = function(link){
    shell.openItem(link);
}