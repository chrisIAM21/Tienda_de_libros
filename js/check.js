function campoVacio(campo, mensaje)
{
	if (campo.value=="") {
		alertModal(mensaje, campo);
		//campo.focus();
		return true;
	}
	return false;
}

function campoVacioDefecto(campo,nombreCampo,valorDefecto)
{
	if (campo.value=="" || campo.value==valorDefecto) {
		alert("El campo "+nombreCampo+" no puede estar vacío");
		campo.focus();
		return true;
	}
	return false;
}

function selectVacio(campo, nombreCampo)
{
	if (campo.options[campo.selectedIndex].value=="") {
		if (nombreCampo!="") {
			alert("El campo "+nombreCampo+" no puede estar vacío");
			campo.focus();
		}
		return true;
	}
	return false;
}

function opcionVacia(campo, totalOpciones, mensaje)
{
	var seleccionado=false;
	
	if (totalOpciones>1) {
		for (var i=0; i<totalOpciones && !seleccionado; i++)
		{
			if (campo[i].checked) {
				seleccionado=true;
			}
		}
	} else if (campo.checked) {
		seleccionado=true;
	}

	if (!seleccionado) {
		if (mensaje!="") {
			if (totalOpciones>1) {
				alertModal(mensaje, campo[0]);
			} else {
				alertModal(mensaje, campo);
			}
		}
		return true;
	}
	return false;
}

function isNumeric(n)
{
	var number = '0';
	var longi = n.length;
	for (var i = 0; i < longi; i++)
	{
		number = n.charAt(i);
		if (number >= '0' && number <= '9')
			continue;
		else 
			return false;
	}
	return true;
}

function isFloat (n)
{
	if (n.length==1 && (n.charAt(0)=='-' || n.charAt(0)=='.')) {
		return false;
	} else if (n.length>1 && n.charAt(n.length-1)=='.') {
		return false;
	}
	var number = '0';
	var nPoint = 0;
	for (var i = 0; i < n.length; i++)
	{
		number = n.charAt(i);
		if (number >= '0' && number <= '9')
			continue;
		else if (number == '-' && i==0)
			continue;
		else if (number == '.' && nPoint==0) {
			nPoint=1;
			continue;
		}
		else 
			return false;
	}
	return true;
}

function isPercentage(percentage, name)
{
	if (!isFloat(percentage.value) || percentage.value<0 || percentage.value>100) {
		alert("El porcentaje de "+name+" no es válido, debe ser un número entre cero y 100");
		percentage.focus();
		return false;
	}
	return true;
}

function longExcesiva(campo,nombreCampo,longMax)
{
	if (campo.value.length > longMax) {
		alert("No puedes introducir más de "+longMax+" caracteres en el campo "+nombreCampo);
		campo.focus();
		return true;
	}
	return false;
}

function isEmail(email)
{
	var posArroba = email.indexOf('@',0);
	
	if (posArroba <= 0)
		return false;

	var posPunto = email.indexOf('.',posArroba);
		
	if (posPunto == -1)
		return false;
		
	if (posPunto+1 == email.length)
		return false;
	// Despues del punto solo puede haber: a-z 0-9 . _-
	if (!contieneCaracteresPermitidos(email.substr(posPunto+1), "._-"))
		return false;

	return true;
}

function isAlfanumerico(valor)
{
	var longi = valor.length;
	var c;
	valor = valor.toLowerCase();
	
	if (longi>0) {
		c = valor.charAt(0);
		if (!(c >= 'a' && c <= 'z')) {
			return false;
		}
	}
	
	for (var i = 1; i < longi; i++)
	{
		c = valor.charAt(i);
		if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || c=='_' || c=='.')
			continue;
		else 
			return false;
	}
	return true;
}

function contieneCaracteresPermitidos(valor, caracteresValidos)
{
	var longi = valor.length;
	var c;
	valor = valor.toLowerCase();
	
	for (var i = 0; i < longi; i++)
	{
		c = valor.charAt(i);
		if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z')) {
			continue;
		} else {
			for (var j=0; j<caracteresValidos.length; j++) {
				if (caracteresValidos.indexOf(c)==-1) {
					return false;
				}
			}
		}
	}
	return true;
}

function checkTipoVia(direc)
{
	//var tiposVias = new Array("C/", "CL", "CR", "ST", "AV", "V", "PG", "RU", "RL", "RD", "RB", "PR", "PZ", "PS", "PO", "CM", "CT", "TR", "PL", "PA");
	var pos = direc.indexOf(" ");
	if (pos > 0)
	{
		var tipoVia = direc.substr(0, pos+1); // substr(indexBegin, cuantos). Cojo el tipo de via con el espacio final incluido
		
		//alert("-"+direc.substring(pos+1, pos+tipoVia.length)+"=="+tipoVia+"-"+(pos+tipoVia.length));
		if (direc.length>=(tipoVia.length*2) && direc.substr(pos+1, tipoVia.length) == tipoVia)
		{
			return false;
		}
	}
	return true;
}
