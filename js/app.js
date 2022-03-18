$(document).ready(function($) {
    /* Función jQuery para el evento clic en la etiqueta "x" con la clase (.carrito-total)*/
    $('.carrito-total').click(function() {
        //Mostrar los items del carrito
        $('.bolsa').slideToggle();
    });

});

//SIMPLE CART
//Configuraciones básicas, recuerda tu lo puedas adaptar a tu medida
simpleCart({
    cartColumns: [
        { view:'image' , attr:'image', label: "Imagen"}, //obtiene la imagen
        { attr: "name", label: "Name"}, //obtiene el nombre
        { view: "currency", attr: "price", label: "Price"},//obtiene el precio
        { view: "decrement", label: "-"}, //Resta el producto
        { attr: "quantity", label: "Qty"}, //obtiene la cantidad del producto
        { view: "increment", label: "+"}, //Suma el producto
        { view: "currency", attr: "total", label: "SubTotal" },// Obtiene el precio total del producto
        { view: "remove", text: "Quitar", label: false} //Quita o remueve el producto
    ],

    cartStyle: "table", //puede ser div o table

    checkout: {
        type: "PayPal" , //Pago a través de PayPal
        email: "tu-correo@dominio.com" //tu correo válido
    }

});