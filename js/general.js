function busRapida()
{
    var form = document.formBusRapida;
        
    if (form.palabrasBusqueda.value=="")    
    {
        alertModal(introPalBusqueda, form.palabrasBusqueda);
        form.palabrasBusqueda.focus();
        return false;
    }

    return true;
}

function soloEbook()
{
    var form = document.formBusRapida;
    
    if (form.tipoArticulo.checked == true) {
        form.tipoBus.value = "soloEbooks";      
    }    
    else {
        form.tipoBus.value = "full";        
    }            
}

function abre_ventana(elemento, ancho, alto, scroll)
{
    var ventana=window.open(elemento.href, "_blank", "width="+ancho+"px, height="+alto+"px, scrollbars="+scroll);
    return ventana==undefined;
}

function validarEmail(form)
{
    if (!isEmail(form.emailSuscripcion.value))
    {
        alertModal("El email no es correcto", form.emailSuscripcion);
        return false;
    }
    return true;
}

function modifier_moneda(precio, param_moneda)
{
    precio = precio.replace(",",".");
    
    var parametros = String(param_moneda).split("|");
    
    var simboloMoneda = parametros[0];
    var posicionMoneda = parametros[1];
    var length = parametros[2];
    var dec = parametros[3];
    var mil = parametros[4];
    
    switch(posicionMoneda)
    {
    case "I":
        return simboloMoneda+" "+number_format(precio, length, dec, mil);
        break;
    default:
        return number_format(precio, length, dec, mil)+" "+simboloMoneda;
    }
}

function number_format( number, decimals, dec_point, thousands_sep ) 
{
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function insMiniCar(codArticulo)
{   
    $.ajax({
        url:rutaHtml+"/cesta/insCarrito.ajax.php?codArticulo="+codArticulo,
        async:true,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        error: function(objeto, quepaso, otroobj) {
            alert("No se ha podido realizar correctamente la petición AJAX de insertar en carrito");
            console.log(e, transport);
        },
        global: true,
        ifModified: false,
        processData:true,
        success: function(result) 
        {
            if (result["correcto"]) 
            {
            	// Facebook Pixel Code AddToCart
            	fbq('track', 'AddToCart', {
            	      content_name: result["descripcion"], 
            	      content_ids: [codArticulo],
            	      value: result["pvp_euros"],
            	      currency: 'MXN' 
            	    });
            	
                //alert(result["link_portada"]);
                var htmlArt = 
                    '<div class="miniCesta-article" id="miniCesta_articulo'+totalArticulosCesta+'">'+
                        '<div class="info-book">'+
                            '<img src="'+result["link_portada"]+'" width="40" />'+
                            '<a href="'+result["link"]+'">'+result["descripcion"]+'</a>';
                
                if (result["tipo_articulo"] == 'E')
                {
                    htmlArt += '<div class="wraper_ebook"><span class="ico_ebook">ebook</span></div>';
                }
                else if (result["tipo_articulo"] == 'I')
                {
                    htmlArt += '<div class="wraper_idm"><span class="icon-print">&nbsp;POD</span></div>';
                }
                
                htmlArt +=
                        '</div>'+
                        '<div class="quantity">'+
                            '<span id="miniCesta_can'+totalArticulosCesta+'">1</span>'+
                        '</div>'+
                        '<div class="miniCesta-total">'+
                            modifier_moneda(result["pvp_euros"], paramMoneda)+
                            '<a class="delete icon-remove-sign" href="javascript:void(0)" onclick="delArticulo('+totalArticulosCesta+', \''+result["codigo"]+'\')"></a>'+
                        '</div>'+
                    '</div>';
                
                //alert(htmlArt);
                $("#miniCesta").html($("#miniCesta").html()+htmlArt);
                
                $(".numArticulos").html(result["num_articulos"]);
                $("#precioTotalMiniCesta").html(modifier_moneda(result["precio_total"], paramMoneda));
                totalArticulosCesta++;
                
                // Notificacion
                //console.log("Antes de notificacion");
                show_stack_bar_top('success', '<span class="icon-ok-sign"></span>'+artInsCestaOK+' <a href="'+rutaHtml+'/cesta/cestaCompra.php">'+verCesta+'</a>');
                //console.log("Despues de notificacion");
            }
            else
            {
                alertModal(result["mensaje"], null);
            }
        },  
        timeout: 10000,
        type: "GET"
    }); 
}

function delArticulo(i, codArticulo)
{
    $.ajax({
        url:rutaHtml+"/cesta/delArticulo.ajax.php?codArticulo="+codArticulo,
        async:true,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        error: function(objeto, quepaso, otroobj) {
            alert("No se ha podido realizar correctamente la petición AJAX de borrar del carrito");
            console.log(e, transport);
        },
        global: true,
        ifModified: false,
        processData:true,
        success: function(result) 
        {
            if (result["correcto"]) 
            {
                $("#miniCesta_articulo"+i).hide();
                
                $(".numArticulos").html(result["num_articulos"]);
                $("#precioTotalMiniCesta").html(modifier_moneda(result["precio_total"], paramMoneda));
                totalArticulosCesta--;
            }
            else
            {
                alertModal(result["mensaje"], null);
            }
        },  
        timeout: 10000,
        type: "GET"
    }); 
}

function cambiaCantidad(incrementar, i, codArticulo)
{
    $.ajax({
        url:rutaHtml+"/cesta/cantidad.ajax.php?codArticulo="+codArticulo+"&incrementar="+incrementar,
        async:true,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        error: function(objeto, quepaso, otroobj) {
            alert("No se ha podido realizar correctamente la petición AJAX de cambiar cantidad en carrito");
            console.log(e, transport);
        },
        global: true,
        ifModified: false,
        processData:true,
        success: function(result) 
        {
            if (result["correcto"]) 
            {
                $("#miniCesta_can"+i).html(result["nueva_cantidad"]);
                
                $("#numArticulos").html(result["num_articulos"]+"x");
                $("#precioTotalMiniCesta").html(modifier_moneda(result["precio_total"], paramMoneda));
            }
            else
            {
                alertModal(result["mensaje"], null);
            }
        },  
        timeout: 10000,
        type: "GET"
    }); 
}

function alertModal(mensaje, campo)
{
    $("#dialogAlert").html('<p>'+mensaje+'</p>');
    $("#dialogAlert").dialog({ buttons: {
        aceptar: function() { 
            $(this).dialog("close");
            if (campo != null)
                $(campo).focus();
        }
    }});
}



var stack_bar_top = {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0};
function show_stack_bar_top(type, msg) {
  var opts = {
    //title: "Over Here",
    text: "<div class=\"center-box\"><strong>Informaci&oacuten</strong>.</div>",
    addclass: "stack-bar-top",
    cornerclass: "",
    width: "100%",
    delay: 1800,
    history: false,
    icon: false,
    sticker: false,
    closer: false,
    stack: stack_bar_top
  };
  switch (type) {
    case 'error':
      //opts.title = "Oh No";
      opts.text = "<div class=\"center-box\">"+msg+"</div>";
      opts.type = "error";
      break;
    case 'info':
      //opts.title = "Breaking News";
      opts.text = "<div class=\"center-box\">"+msg+"</div>";
      opts.type = "info";
      break;
    case 'success':
      //opts.title = "Good News Everyone";
      opts.text = "<div class=\"center-box\">"+msg+"</div>";
      opts.type = "success";
      break;
  }
  $.pnotify(opts);
}


/** Slider **/
$(document).ready(function() {

    if(slider && (paginaActual == "index.php" || paginaActual == "home.php")) {
        $('.bxslider').bxSlider({
            mode: 'fade',
            auto: true,
            autoControls: true,
            pause: 7000
        });
    }
});


/** Carrusel, Tooltips **/
$(document).ready(function() {

    if(carrusel && (paginaActual == "index.php" || paginaActual == "home.php")) {

        if(slider) num_libros = 6;
        else num_libros = 7;

        $(function() {
            if (tipo_carrusel == 1) {
                $('#foo').carouFredSel({
                    circular: true,
                    infinite: true,
                    auto: true,
                    auto: { 
                        duration : 11500, 
                        easing : "linear", 
                        timeoutDuration : 0,
                        pauseOnHover : "immediate" 
                    }                                                              
                });
            }
            else {
                $('#foo2').carouFredSel({
                    auto: false,
                    align: "center",
                    width: "100%",
                    items: {    
                        visible : { 
                            min : 3, 
                            max : num_libros 
                        } 
                    },
                    scroll : {
                        duration: 600,
                        items: 3
                    },
                    prev: '#prev_carou',
                    next: '#next_carou'
                });
            }
        });

        $('a.libroimg').cluetip({
            width: '200px',
            cluetipClass: 'jtreven', 
            dropShadow: false,
            positionBy: 'bottomTop'
        });   
    }
    

    $('[data-toggle="tooltip"]').tooltip()  

});


/** Tabs **/
$(document).ready(function() {

    if(paginaActual == "detalle.php") {
        $("#detnavtab").idTabs();
    }

});


/** Buscador **/
$(document).ready(function() {

    if(autocomplete) {
        valorAutocomplete = "";
        $("#autocompleta").autocomplete({
            source: rutaHtml + "/busqueda/resultsAutocomplete.ajax.php",
            minLength: 2,
            focus: function( event, ui ) {
                if (ui.item[0] != "titulo" && ui.item[0] != "todos")
                    $( "#autocompleta" ).val( ui.item[0] );
                return false;
            },
            select: function( event, ui ) {
                $( "#autocompleta" ).val( ui.item[0] );
                return false;
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            if (item[0] == 'titulo')
                return $("<li class='autocomplete-title'></li>")
                    .data("item.autocomplete", item)
                    .append("<span>" + item[1] + "</span>")
                    .appendTo(ul);
            else if (item[0] == 'todos')
                return $("<li class='autocomplete-more'></li>")
                    .data("item.autocomplete", item)
                    .append("<a href=" + item[1] + ">" + verTodos + "</a>")
                    .appendTo(ul);
            else
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a href=" + item[1] + " class='autocomplete-item'>" + item[0] + "</a>")
                    .appendTo(ul);      
        };
        
        $('#autocompleta').click(function () {
            $("#autocompleta").val(valorAutocomplete);
        });
        $('#autocompleta').keyup(function () {
            valorAutocomplete = $("#autocompleta").val();
        });
    }
        
});


/** Carrito compra **/
var timeout     = 500;
var closetimer  = 0;
var ddmenuitem  = 0;

function jsddm_openCesta()
{   
    if (totalArticulosCesta > 0) {
        jsddm_canceltimer();
        jsddm_close();
        ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
    }
}

function jsddm_open()
{   
    jsddm_canceltimer();
    jsddm_close();
    ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
}

function jsddm_close()
{   
    if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}

function jsddm_timer()
{   
    closetimer = window.setTimeout(jsddm_close, timeout);
}

function jsddm_canceltimer()
{   
    if(closetimer)
    {   window.clearTimeout(closetimer);
        closetimer = null;
    }
}


$(document).ready(function(){   

    $('#jsddm > li').bind('mouseover', jsddm_open);
    $('#jsddm > li').bind('mouseout',  jsddm_timer);

    $('#jsddm_menucab > li').bind('mouseover', jsddm_open);
    $('#jsddm_menucab > li').bind('mouseout',  jsddm_timer);
    
    if (paginaActual != "cestaCompra.php") {
        $('#cart-fixed > li').bind('mouseover', jsddm_openCesta);
        $('#cart-fixed > li').bind('mouseout',  jsddm_timer);
    }

});

/** Enlace ver más/menos filtros facetado **/
$(document).ready(function(){

    if(paginaActual == "listaLibros.php" || paginaActual == "dispatcherMateria.php" || paginaActual == "listaLibrosAutor.php" || paginaActual == "listaLibrosMateria.php") {
        // Ver mas
        if( $('.show-filters').length > 0 ) {
            $('.show-filters').click( function() {
                $(this).parent().parent().find('.sidebar-hidden-filter').css('display','block');
                $(this).css('display','none');

                var id = $(this).attr('id');
                id = id.substring(0, id.length-1);
                //alert(id);
                $('#'+id+'H').show();

                return false;
            });
        }

        // Ver menos
        if( $('.hide-filters').length > 0 ) {
            $('.hide-filters').click( function() {
                $(this).parent().parent().find('.sidebar-hidden-filter').css('display','none');
                $(this).css('display','none');

                var id = $(this).attr('id');
                id = id.substring(0, id.length-1);
                //alert(id);
                $('#'+id+'S').show();

                return false;
            });
        }
    }

}); 

/** Labelauty **/
$(document).ready(function(){
	$(".labelauty").labelauty({
	// Development Mode
	// This will activate console debug messages
	development: false,

	// Trigger Class
	// This class will be used to apply styles
	class: "labelauty",

	// Use text label ?
	// If false, then only an icon represents the input
	label: true,

	// Separator between labels' messages
	// If you use this separator for anything, choose a new one
	separator: "|",

	// Default Checked Message
	// This message will be visible when input is checked
	checked_label: "Checked",

	// Default UnChecked Message
	// This message will be visible when input is unchecked
	unchecked_label: "Unchecked",

	// Minimum Label Width
	// This value will be used to apply a minimum width to the text labels
	minimum_width: false,

	// Use the greatest width between two text labels ?
	// If this has a true value, then label width will be the greatest between labels
	same_width: true
	});
});

function generaSesion(parametro, valor)
{
    $.ajax({
		url:rutaHtml+"/generaSesion.ajax.php?pm="+parametro+"&valor="+escape(valor),
		async:true,
		contentType: "application/x-www-form-urlencoded",
		dataType: "json",
		error: function(objeto, quepaso, otroobj) {
		    alert("No se ha podido realizar correctamente la petición AJAX de afiliado");
		    console.log(e, transport);
		},
		global: true,
		ifModified: false,
		processData:true,
		success: function(result) 
		{
		    if (result != "OK")
		    {
		        alertModal("No ha podido generarse la sesion para el afiliado", null);
		    }
		},  
		timeout: 10000,
		type: "GET"
	});
}

$(document).ready(function() {

	//if (afiliado != "") 
	//{
	//	generaSesion("AFILIADO", afiliado);
	//}
});

/** Cerrar ventana cookies **/
$(document).ready(function(){
    $("#close-cookies-message").click(function(){
        $("#cookie-compliant").css("display", "none");
    });
});

$(document).ready(function(){
	window.name = 'parentwindow';
});


/* Paneles */
$(document).ready(function() {
	$('.collapse').on('show.bs.collapse', function() {
		var id = $(this).attr('id');
		$('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-minus"></i>');
	});
	$('.collapse').on('hide.bs.collapse', function() {
		var id = $(this).attr('id');
		$('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-plus"></i>');
	});
});



/** Display mode **/
$(document).ready(function(){
	$("a.switcher").bind("click", function(e){
		e.preventDefault();

		var theid = $(this).attr("id");
		var theproducts = $(".listado_libros");

		if($(this).hasClass("active")) {
			return false;
		} else {

  			if(theid == "gridview") {
				$(this).addClass("active");
				$("#listview").removeClass("active");

				theproducts.removeClass("one-cols");
				theproducts.addClass("five-cols");
			}
			else if(theid == "listview") {
				$(this).addClass("active");
				$("#gridview").removeClass("active");

				theproducts.removeClass("five-cols")
				theproducts.addClass("one-cols");
			}
		}
	});
});

  

function validarRFC(rfc) {

    $.ajax({
        url: rutaHtml+"/admin/validaRFC.ajax.php?rfc="+rfc,
        dataType: 'json',
        type: 'get'
        }).done(function (result) {
            if(result==0){
                alertModal('RFC no valido, verifique su estructura.',rfc);
                $('#cifOk').val('0');
            } else {
                $('#cifOk').val('1');
            }
        });
    
} 
    
$(document).ready(function() { 

    $('.autoCompletePaisInput').change(function(){
        if ($(this).val() != 'MX') {
            $('.codPostalAutocomplete').typeahead('destroy');
        } else {
            activarAutocompletado();
        }
    });

    if ($('.autoCompletePaisInput').val() == 'MX') {
        activarAutocompletado();
    }  
    
    function activarAutocompletado() {
        var codPostalAutocomplete = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: 40,
                remote: "autoCompletar.php?term=%QUERY"
            });
    
        codPostalAutocomplete.initialize();        
    
        // AUTOCOMPLETE DEL FORMDATOS
        $('.codPostalAutocomplete').focus(function () {
            codPostalAutocomplete.remote.url = "/registro/autoCompletar.php?term=%QUERY";
        });
    
        
        if (Metronic.isRTL()) {
            $('.codPostalAutocomplete').attr("dir", "rtl");
        }
        
        $('.codPostalAutocomplete').typeahead(
            {highlight: true},
            {
                name: 'codPostalAutocomplete',
                displayKey: 'codigoPostal',
                display: 'colonia',
                source: codPostalAutocomplete.ttAdapter(),
                hint: (Metronic.isRTL() ? false : true),
                templates: {
                    empty: [
                        '<div class="media" style="padding: 5px;">',
                        '<div class="media-body">',
                        '<h4 class="media-heading panel-danger">Valor no encontrado.</h4>',
                        '<p>Indica un código postal</p>',
                        '</div>',
                        '</div>',
                    ].join('\n'),
                    suggestion: Handlebars.compile([
                        '<div class="">',
                        '<div class="">',
                        '<p>{{colonia}} - {{municipio}} - {{estado}}</p>',
                        '</div>',
                        '</div>',
                    ].join('\n'))
                }
            }
        ).bind("typeahead:selected", function (obj, result, name) {
            $(this).val(result.codigoPostal);
            $('.autoCompleteColoniaOutput').val(result.colonia);
            $('.autoCompleteProvinciaOutput').val(result.estado);
            $('.autoCompletePoblacionOutput').val(result.ciudad);
            return false;
        }).off('blur');        
    }     
});