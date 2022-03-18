var req;
var isIE = false;

function loadXMLDoc(url, objFunction) 
{
	req = false;
    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest) {
		// La version 7 de IE entra por aqui
    	try {
			req = new XMLHttpRequest();
        } catch(e) {
			req = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
		isIE = true;
       	try {
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		req = false;
        	}
		}
    }
	if(req) {
		req.onreadystatechange = objFunction;
		req.open("GET", url, true);
		req.send("");
	}
}

function loadDoc(pagina, objFunction)
{
	try {
		loadXMLDoc(pagina, objFunction);
	}
	catch(e) {
		var msg = (typeof e == "string") ? e : ((e.message) ? e.message : "Error desconocido");
		alert("Imposible obtener datos XML:\n" + msg);
		return;
	}
}

function getElementTextNS(prefix, local, parentElem, index) 
{
    var result = "";
                
	if (parentElem != null)
		result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
    if (typeof(result) == 'undefined') {
		if (parentElem != null)
			result = parentElem.getElementsByTagName(local)[index];
	}        
    if (result) {
        // get text, accounting for possible
        // whitespace (carriage return) text nodes 
        if (result.childNodes.length > 1) {
            return result.childNodes[1].nodeValue;
        } else {
            return result.firstChild.nodeValue;                      
        }
    } 
            else {
        return 'Error interno';
    }
}
