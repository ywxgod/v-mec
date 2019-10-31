export class DomUtil{

    // from webix-hub
    // https://github.com/webix-hub/webix/blob/master/sources/webix/html.js
    static offset(elem) {
        if (elem.getBoundingClientRect) { //HTML5 method
            const box = elem.getBoundingClientRect();
            const body = document.body;
            const docElem = document.documentElement;
            const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
            const clientTop = docElem.clientTop || body.clientTop || 0;
            const clientLeft = docElem.clientLeft || body.clientLeft || 0;
            const top  = box.top +  scrollTop - clientTop;
            const left = box.left + scrollLeft - clientLeft;
            return { y: Math.round(top), x: Math.round(left), width:elem.offsetWidth, height:elem.offsetHeight };
        } else { //fallback to naive approach
            let top=0, left=0;
            while(elem) {
                top = top + parseInt(elem.offsetTop,10);
                left = left + parseInt(elem.offsetLeft,10);
                elem = elem.offsetParent;
            }
            return { y: top, x: left, width:elem.offsetHeight, height:elem.offsetWidth };
        }
    }

    // https://github.com/webix-hub/webix/blob/master/sources/webix/html.js
    static download(data, filename){
        var objUrl = false;
    
        if(typeof data =="object"){//blob
            if(window.navigator.msSaveBlob)
                return window.navigator.msSaveBlob(data, filename);
            else {
                data = window.URL.createObjectURL(data);
                objUrl = true;
            }
        }
        //data url or blob url
        var link = document.createElement("a");
        link.href = data;
        link.download = filename;
        document.body.appendChild(link);
        link.click(); 
    
        delay(function(){
            if(objUrl) window.URL.revokeObjectURL(data);
            document.body.removeChild(link);
            link.remove();
        });
    }

}