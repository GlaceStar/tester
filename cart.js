function getcookieval (offset) {
   var endstr = document.cookie.indexOf (";", offset);
   if (endstr == -1)
   endstr = document.cookie.length;
 return unescape(document.cookie.substring(offset, endstr));
}

function getcookie (name) {
 var arg = name + "=";
 var alen = arg.length;
 var clen = document.cookie.length;
 var i = 0;
 while (i < clen)
    {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) return getcookieval (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
    }
  return null;
}

function setcookie (name,value,expires,path,domain,secure) {
   document.cookie = name + "=" + escape (value) +
     ((expires) ? "; expires=" + expires.toGMTString() : "") +
     ((path) ? "; path=" + path : "") +
     ((domain) ? "; domain=" + domain : "") +
     ((secure) ? "; secure" : "");
}

function formatopesos(input) {
    var pesos = Math.floor(input)
    var tmp = new String(input)
    for (var decimalAt = 0; decimalAt < tmp.length; decimalAt++) {
       if (tmp.charAt(decimalAt)==".")
       break;
       }
  var centavos  = "" + Math.round(input * 100)
  centavos = centavos.substring(centavos.length-2, centavos.length)
  pesos += ((tmp.charAt(decimalAt+2)=="9")&&(centavos=="00"))? 1 : 0;

  return pesos + "." + centavos
}

function quitardelcarrito(RemOrder) {
   if (confirm("El producto sera eliminado de su carro de compra.\n¿Estas de acuerdo?")) {
   numerodeorden = getcookie("numerodeorden");
   for(i=RemOrder; i < numerodeorden; i++) {
       nuevopedido1 = "Order." + (i+1);
       nuevopedido2 = "Order." + (i);
       datos = getcookie(nuevopedido1);
       setcookie (nuevopedido2, datos, null, "/");
       }
       nuevopedido = "Order." + numerodeorden;
       setcookie ("numerodeorden", numerodeorden-1, null, "/");
       deletecookie(nuevopedido,"/");
       location.href=location.href;
    }
}

function visualizarcarrito() {
   numerodeorden = 0;
   subtotal=0;
   preciototal=0;
   numerodeorden = getcookie("numerodeorden");
   tablas = "";
   for (i = 1; i <= numerodeorden; i++) {
    nuevopedido = "Order." + i;
    datos = "";
    datos = getcookie(nuevopedido);
    ficha0 = datos.indexOf("|", 0);
    ficha1 = datos.indexOf("|", ficha0+1);
    ficha2 = datos.indexOf("|", ficha1+1);
    campos = new Array;
    campos[0] = datos.substring( 0, ficha0 );
    campos[1] = datos.substring( ficha0+1, ficha1 );
    campos[2] = datos.substring( ficha1+1, ficha2 );
    campos[3] = datos.substring( ficha2+1, datos.length );
    subtotal = subtotal + (campos[1] * campos[0]);
    preciototal = formatopesos(subtotal);
    tablas += "<tr style='font: 9pt; text-align: justify; color=white'><td>" + campos[2] + "</td><td  style='color=white'>"
        + campos[3] + "</td><td>" + campos[1]
        + "</td><td><input type=text id='inputcarro' size=2 name=\"Cantidad"+ i +"\" value=\""
        + campos[0] + "\"></td>"
        + "<td><input type=button id=boton value=\"  Eliminar  \" onClick=\"quitardelcarrito("+i+")\">"
      	+ "&nbsp;<input type=button id=boton value=\"  Catalogo  \" onClick=\"parent.history.back()\"></td>"
        + "<input type=hidden name=\"Referencia"+ i +"\" value=\"" + campos[2] + "\">"
        + "<input type=hidden name=\"Producto"+ i +"\" value=\"" + campos[3] + "\">"
        + "<input type=hidden name=\"Pesos"+ i +"\" value=\"" + campos[1] + "\">";
        }
   document.write(tablas);
   document.write("</td></tr><tr><td colspan=2 style='font: 9pt'>Subtotal</td><td style='color: white'>");
   document.write(preciototal);
   document.write(" </td><td colspan=2 style='font: 6pt; text-align: center; color=white'>   </td>");
}

function deletecookie(name, path, domain) {
  if (getcookie(name)) {
    document.cookie = name + "=" + 
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
