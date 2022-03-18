function abreWinXY(pagina, X, Y, ancho, alto) 
{
	window.open(pagina,
		"_blank",
		"scrollbars=no, status=0, location=no, resizable=no, titlebar=no, toolbar=no, height="+alto+", width="+ancho+", ScreenX="+X+",ScreenY="+Y+",top="+Y+",left="+X);
}

function abreWin(objA, scroll, redimensionar, ancho, alto) 
{
	var ejeX = (screen.width-ancho)/2;
	var ejeY = (screen.height-alto)/2;
	
	var ventana = window.open(objA.href,
		"_blank",
		"scrollbars="+scroll+", status=no, location=no, resizable="+redimensionar+", titlebar=no, toolbar=no, height="+alto+", width="+ancho+", ScreenX="+ejeX+",ScreenY="+ejeY+",top="+ejeY+",left="+ejeX);
		
	return ventana==undefined;
}

function borrarOpcionesSelect(objSel, iComienzo)
{
	var total = objSel.length;
	// Dejar la primera opcion q siempre sera la misma
	for (var i=iComienzo; i<total;i++)
	{
		objSel.options[1] = null;
	}
}

function extension(nombre)
{
	var longNombre = nombre.length;
	var i;
	for (i=longNombre-2; i>0; i--) {
		if (nombre.charAt(i)=='.') {
			return nombre.substr(i+1);
		}
	}
	return "";
}

function valorRadio(objRadio)
{
	for (var i=0; i<objRadio.length; i++)
	{
		if (objRadio[i].checked)
		{
			return objRadio[i].value;
		}
	}
	
	return "";
}

function seleccionarOpcion(objSelect, valor)
{
	for (var i=0; i<objSelect.options.length; i++)
	{
		if (objSelect.options[i].value==valor)
		{
			objSelect.options[i].selected = true;
			return;
		}
	}
	
	objSelect.options[0].selected = true;
}

function cadenaJavaScript(cadena)
{
	cadena = cadena.replace(/%1/g, "\n");
	cadena = cadena.replace(/%2/g, "\r");
	cadena = cadena.replace(/%3/g, "'");
	cadena = cadena.replace(/%4/g, "\"");
	
	return cadena;
}

// pasa un precio o numero flotante a un número que entiende el ordenador, ej: 2.590,95 => 2590.95
function floatanteSoloConPuntoDecimal(num)
{
	//num = num.replace(/./g, ""); => deja num vacio
	var pos = -1;
	while ((pos=num.indexOf("."))>0)
	{
		num = num.substr(0,pos) +num.substr(pos+1) ;
	}
	
	num = num.replace(/,/g, ".");

	return num;
}

// pone un segundo decimal "cero" cuando el precio solo tiene uno, ej: 25.5 => 25.50, 25 => 25
function precio2dec(precio)
{
	precio = precio.toString();
	if (precio.substr(precio.length-2).charAt(0) =='.') {
		precio += "0";
	}
	var posPunto = precio.indexOf('.');
	if (posPunto != -1 && precio.length-posPunto>3) // tiene mas de dos decimales => quitarlos
		precio = precio.substr(0, posPunto+3);
		
	return precio;
}

function corrigeDecimales(n)
{
	//return n;
	// si hay mas de 2 decimales quitar los que haya a partir del 3º
	
	var cad = n.toString();
	var posPunto=cad.indexOf('.');
	if (posPunto == -1) {
		return n;
	}
	var numDec=cad.substring(posPunto+1).length;
	if (numDec > 2) {
		return (Math.round(n*100)/100);
	}
	
	return n;
}

function verOcultarCapa()
{
	var obj;
	if (arguments.length == 1) {
		obj = document.getElementById(arguments[0]).style;
		obj.display = obj.display =="none"?"":"none"; 
	} else {
		if (arguments.length%2 == 1) {
			alert("verOcultarCapa(): El nº de argumentos debe ser par.");
		} else {
			var totalCapas = arguments.length/2;
			for (var i=0; i<=totalCapas; i+=2) {
				obj = document.getElementById(arguments[i]).style;
				obj.display = obj.display = arguments[i+1]; 
			}
		}
	}
}

function objeto(idObj) 
{
	if (document.getElementById)
		return document.getElementById(idObj)
	else if (document.all)
		return document.all[idObj]
	else if (document.layers)
		return document.layers[idObj]
	return null
}