
function validarOpinion(form)
{
	if (campoVacio(form.nombre,"Nombre")) return false;
	if (campoVacio(form.tituloOpinion,"Título de la opinión")) return false;
	if (campoVacio(form.opinion,"Opinión")) return false;
	
	return true;
}

if (VALORACIONES_LIBROS){
	//funciones para ejecutar con jquery ajax las valoraciones del libro
	
	var promedio= 0;
	var promedioValoracionLibro= 0;
	iluminada = new Image(19,19);
	iluminada.src = rutaImg+"/rating_on.png";
	apagada = new Image(19,19);
	apagada.src = rutaImg+"/rating_off.png";
	average = new Image(19,19);
	average.src = rutaImg+"/rating_average.png";
	
	function rating(id){
		
		if(id==1){
			window.document['imagen6'].src = iluminada.src;	
			window.document['imagen7'].src = apagada.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;							
		}
		if(id==2){
			window.document['imagen6'].src = iluminada.src;	
			window.document['imagen7'].src = iluminada.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;							
		}
		if(id==3){
			window.document['imagen6'].src = iluminada.src;	
			window.document['imagen7'].src = iluminada.src;	
			window.document['imagen8'].src = iluminada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;							
		}
		if(id==4){
			window.document['imagen6'].src = iluminada.src;	
			window.document['imagen7'].src = iluminada.src;	
			window.document['imagen8'].src = iluminada.src;	
			window.document['imagen9'].src = iluminada.src;	
			window.document['imagen10'].src = apagada.src;							
		}
		if(id==5){
			window.document['imagen6'].src = iluminada.src;	
			window.document['imagen7'].src = iluminada.src;	
			window.document['imagen8'].src = iluminada.src;	
			window.document['imagen9'].src = iluminada.src;	
			window.document['imagen10'].src = iluminada.src;							
		}	
		if(id==0){
			window.document['imagen6'].src = apagada.src;	
			window.document['imagen7'].src = apagada.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;							
		}	
		//promedio = 	id;						
	}
	function average_rating_(id){
		if(id==1){
			window.document['imagen1'].src = average.src;	
			window.document['imagen2'].src = apagada.src;	
			window.document['imagen3'].src = apagada.src;	
			window.document['imagen4'].src = apagada.src;	
			window.document['imagen5'].src = apagada.src;
			
			window.document['imagen6'].src = average.src;
			window.document['imagen7'].src = apagada.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;										
		}
		if(id==2){
			window.document['imagen1'].src = average.src;	
			window.document['imagen2'].src = average.src;	
			window.document['imagen3'].src = apagada.src;	
			window.document['imagen4'].src = apagada.src;	
			window.document['imagen5'].src = apagada.src;
			
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;									
		}
		if(id==3){
			window.document['imagen1'].src = average.src;	
			window.document['imagen2'].src = average.src;	
			window.document['imagen3'].src = average.src;	
			window.document['imagen4'].src = apagada.src;	
			window.document['imagen5'].src = apagada.src;
			
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = average.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;									
		}
		if(id==4){
			window.document['imagen1'].src = average.src;	
			window.document['imagen2'].src = average.src;	
			window.document['imagen3'].src = average.src;	
			window.document['imagen4'].src = average.src;	
			window.document['imagen5'].src = apagada.src;	
			
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = average.src;	
			window.document['imagen9'].src = average.src;	
			window.document['imagen10'].src = apagada.src;								
		}
		if(id==5){
			window.document['imagen1'].src = average.src;	
			window.document['imagen2'].src = average.src;	
			window.document['imagen3'].src = average.src;	
			window.document['imagen4'].src = average.src;	
			window.document['imagen5'].src = average.src;
			
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = average.src;	
			window.document['imagen9'].src = average.src;	
			window.document['imagen10'].src = average.src;									
		}	
		if(id==0){
			window.document['imagen1'].src = apagada.src;	
			window.document['imagen2'].src = apagada.src;	
			window.document['imagen3'].src = apagada.src;	
			window.document['imagen4'].src = apagada.src;	
			window.document['imagen5'].src = apagada.src;							
		}	
		promedioValoracionLibro = id;							
	}
	
	function average_rating(id){
		if(id==1){
			window.document['imagen6'].src = average.src;
			window.document['imagen7'].src = apagada.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;										
		}
		if(id==2){
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;									
		}
		if(id==3){
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = average.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;									
		}
		if(id==4){
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = average.src;	
			window.document['imagen9'].src = average.src;	
			window.document['imagen10'].src = apagada.src;								
		}
		if(id==5){
			window.document['imagen6'].src = average.src;	
			window.document['imagen7'].src = average.src;	
			window.document['imagen8'].src = average.src;	
			window.document['imagen9'].src = average.src;	
			window.document['imagen10'].src = average.src;									
		}	
		if(id==0){
			window.document['imagen6'].src = apagada.src;	
			window.document['imagen7'].src = apagada.src;	
			window.document['imagen8'].src = apagada.src;	
			window.document['imagen9'].src = apagada.src;	
			window.document['imagen10'].src = apagada.src;							
		}	
		promedioValoracionLibro = id;							
	}
	
	function cambia_valoracion()
	{
	    window.document['imagen6'].src = apagada.src;	
		window.document['imagen7'].src = apagada.src;	
		window.document['imagen8'].src = apagada.src;	
		window.document['imagen9'].src = apagada.src;	
		window.document['imagen10'].src = apagada.src;
		document.getElementById('cambia_votacion').style.visibility="hidden";
	}
							   
	
	function borrarValoracion(datos)
	{		
			$.ajax({
			        url: datos,
			        async:true,
			        beforeSend: function(objeto){
			            //alert("Inicio de ejecución");
			        },
			        complete: function(objeto, exito){
			            //alert("Ejecución completada.")
			            if(exito=="success"){
			                //alert("Operación exitosa");		                
			            }
			        },
			        contentType: "application/x-www-form-urlencoded",
			        dataType: "json",
			        error: function(objeto, quepaso, otroobj){
			            alert("Ha habido un fallo en la petición.");
			            alert(" El error es el siguiente: "+quepaso);
			        },
			        global: true,
			        ifModified: false,
			        processData:true,
			        success: function(datos){
						rating(datos["user_valoracion"]);
						promedio=datos["user_valoracion"];
						average_rating(datos["average"]);
						$('#cambia_votacion').css('display', 'none');     		        		            
			        },
			        timeout: 3000,
			        type: "GET"
			});	
	}
	
	function insertarValoracion(datos)
	{		
			$.ajax({
			        url: datos,
			        async:true,
			        beforeSend: function(objeto){
			            //alert("Inicio de ejecución");
			        },
			        complete: function(objeto, exito){
			            //alert("Ejecución completada.")
			            if(exito=="success"){
			                //alert("Operación exitosa");		                
			            }
			        },
			        contentType: "application/x-www-form-urlencoded",
			        dataType: "json",
			        error: function(objeto, quepaso, otroobj){
			            alert("Ha habido un fallo en la petición.");
			            alert(" El error es el siguiente: "+quepaso);
			        },
			        global: true,
			        ifModified: false,
			        processData:true,
			        success: function(datos){
						average_rating(datos["average"]);		        	
						rating(datos["user_valoracion"]);
						promedio=datos["user_valoracion"];					
						$('#cambia_votacion').css('display', 'inline'); 
				        //alert('Valoración insertada correctamente.');     		        		            
			        },
			        timeout: 3000,
			        type: "GET"
			});	
	}
	
	function verifica(promedio,promedioValoracionLibro)
	{ 
		if(promedio!= 0)
			rating(promedio);
		else if (promedio == 0 && promedioValoracionLibro != 0)
			average_rating(promedioValoracionLibro);
		else if (promedio == 0 && promedioValoracionLibro == 0)	
			rating(promedio);				
	}
}

function libreriasConStock_L(ean)
{
	$.ajax({
        url:rutaHtml+"/busqueda/libreriasConStock_L.ajax.php?ean="+ean, 
        async:true,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        error: function(objeto, quepaso, otroobj) {
			//alert("No se ha podido realizar correctamente la petición AJAX de la disponibilidad");
			console.log(e, transport);
        },
        global: true,
        ifModified: false,
        processData:true,
        success: function(result) 
		{
			//alert(result["error"]);
			if (result["error"] == 0 && result["librerias"].length > 0)
			{
				//alert(result["librerias"].length);
				var enlaces="";
				for (var i = 0; i<result["librerias"].length; i++)
				{
					enlaces+=(i>0?'<br>':'')+'<a href="'+result["librerias"][i]["url"]+'" target="_blank">'+result["librerias"][i]["nombre"]+'</a>';
				}
				$("#linksLibrerias_L").html(
					$("#linksLibrerias_L").html()+
					enlaces
				);
				$("#numLibrerias").html(result["librerias"].length);
				
				$("#disponibilidad_L").show();
			}
        },	
        timeout: 5000,
        type: "GET"
	});
}

function disponibilidad(codArticulo)
{
	$.ajax({
        url:rutaHtml+"/busqueda/disponibilidad.ajax.php?codigo="+codArticulo, 
        async:true,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        error: function(objeto, quepaso, otroobj) {
			//alert("No se ha podido realizar correctamente la petición AJAX");
			console.log(e, transport);
        },
        global: true,
        ifModified: false,
        processData:true,
        success: function(result) { console.log(result);
        	var capaDisp = $("#disponibilidad");
			if (result["descripcion"] != "")
			{
				//alert(result["descripcion"]);
				$("#disponibilidad").show();
				$("#disponibilidad").html(result["descripcion"]);
				
				if (result["vendible"] == 'S')
					$("#botonComprar").show();
				
				if (result['stockfirme']<1 && disponibilidad_L == 'S' && ean != '') {
					libreriasConStock_L(ean);
				}
			}
        },	
        timeout: 10000,
        type: "GET"
	});
}

function validarEnvioAmigo(form)
{
	//if (campoVacio(form.nombre,"Nombre")) return false;
	
	if (!isEmail(form.email.value))
	{
		alertModal(emailNOK, form.email);
		return false;
	}
	
	if (form.emailAmigo.value.indexOf(",")<0 && !isEmail(form.emailAmigo.value))
	{
		alertModal(emailAmigoNOK, form.emailAmigo);
		return false;
	}
	
	$.ajax({
		type: "POST",
        url:rutaHtml+"/busqueda/enviaAmigo.php", 
		data: $("#formEnviaAmigo").serialize(),
		dataType: "json",
        error: function(e, transport, otroobj) {
			alert("No se ha podido enviar correctamente el formulario de enviar a un amigo");
			console.log(e, transport);
        },
        success: function(result) 
		{
			//alert(result["msg"]+": "+result["mensaje"]);
			if (result["msg"] == "OK")
			{
				alertModal(result["mensaje"], null);
				$("#formEnviaAmigo")[0].reset();
				$('#send-to-friend-box').hide();
			}
			else
			{
				var mensaje = result["msg"] == "ERR"?result["mensaje"]:"Error desconocido";
				alertModal(mensaje, null);
			}
        }
	});
	
	return false;
}

function validarAvisadorStock(form)
{
	if (!isEmail(form.email.value))
	{
		alertModal(emailNOK, form.email);
		return false;
	}
	
	$.ajax({
		type: "POST",
        url:rutaHtml+"/avisadorStock/avisadorStock.php", 
		data: $("#formAvisadorStock").serialize(),
		dataType: "json",
        error: function(e, transport, otroobj) {
			alert("No se ha podido enviar correctamente el formulario de aviso de disponibilidad");
			console.log(e, transport);
        },
        success: function(result) 
		{
			//alert(result["msg"]+": "+result["mensaje"]);
			if (result["msg"] == "OK")
			{
				alertModal(result["mensaje"], null);
			}
			else
			{
				var mensaje = result["msg"] == "ERR"?result["mensaje"]:"Error desconocido";
				alertModal(mensaje, null);
			}
        }
	});
	
	return false;
}