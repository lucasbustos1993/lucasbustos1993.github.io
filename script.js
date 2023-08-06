$(function() {
  $("#datepicker").datepicker({
    beforeShowDay: function(date) {
      // Obtener la fecha en formato YYYY-MM-DD
      var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
      
      // Verificar si hay un valor almacenado para la fecha seleccionada
      var horasExtras = localStorage.getItem("horasExtras_" + formattedDate);
      
      // Determinar la clase CSS a aplicar al día
      var cssClass = (horasExtras !== null) ? "highlight-day" : "";
      
      // Retornar un array con la clase CSS y la indicación de si el día está disponible o no
      return [true, cssClass];
    },
    onSelect: function(dateText, inst) {
      // Obtener el valor almacenado para la fecha seleccionada
      var formattedDate = $.datepicker.formatDate("yy-mm-dd", new Date(dateText));
      var horasExtras = localStorage.getItem("horasExtras_" + formattedDate);
      
      if (horasExtras !== null) {
        // Mostrar el valor almacenado en pantalla
        document.getElementById("valorGuardado").textContent = "Valor guardado: " + horasExtras + " horas";
        document.getElementById("borrar").style.display = "inline"; // Mostrar el botón "Borrar"
      } else {
        // Limpiar el valor guardado si no hay un valor almacenado para la fecha seleccionada
        document.getElementById("valorGuardado").textContent = "";
        document.getElementById("borrar").style.display = "none"; // Ocultar el botón "Borrar"
      }
      
      
    }
  }).datepicker("show"); // Mostrar el calendario al cargar la página
  // Llamar a la función actualizarHorasAcumuladas() después de cargar la página
  actualizarHorasAcumuladas();
  
});

//Tomar el vlaor de entrada
var horaEntrada = document.getElementById("horaEntrada");  // Obtener el elemento del DOM
var hh;
var mm;
horaEntrada.addEventListener("change", function() {
  var entHor = horaEntrada.value;  // Obtener el valor del campo de entrada
var horaPartes = entHor.split(":");  // Dividir la cadena en horas y minutos
hh = parseInt(horaPartes[0]);  // Obtener la hora como un número entero
  console.log(hh);  // Mostrar la hora en la consola
mm = parseInt(horaPartes[1]); //Obtener los minutos como numero entero
  console.log(mm); // Mostrar los minutos en la consola
});




function calcularHoras() {
  var horaSalida = document.getElementById("horaSalida").value;
  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  
  if (!horaSalida) {
    alert("Seleccione un horario de salida");
    return; // Detener la ejecución de la función
  }

  if (typeof hh === 'undefined') {
    alert("Seleccione una hora de entrada");
    return; // Detener la ejecución de la función si no hay valor en hh
  }
  
  if (fechaSeleccionada) {
    var diaSemana = fechaSeleccionada.getDay();
    if (diaSemana === 0) {
      alert("No se pueden guardar valores para un día no laboral (domingo).");
      return;
    } else if (diaSemana === 6){
      siSabado();
    } else if (diaSemana > 0 && diaSemana < 6) {
      siSemana();
    } else {
      alert("Selecciona una fecha");
    }
  }
  actualizarHorasAcumuladas(totalHoras80, totalHoras100);
  
}



var totalHoras100 = 0;
var totalHoras80 = 0;

var storedTotalHoras100 = localStorage.getItem("totalHoras100_");
var storedTotalHoras80 = localStorage.getItem("totalHoras80_");

if (storedTotalHoras100 !== null) {
  totalHoras100 = parseInt(storedTotalHoras100);
}

if (storedTotalHoras80 !== null) {
  totalHoras80 = parseInt(storedTotalHoras80);
}

function eliminar() {
  var formattedDate = $.datepicker.formatDate("yy-mm-dd", $("#datepicker").datepicker("getDate"));
  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  var horasExtras = localStorage.getItem("horasExtras_" + formattedDate);
  if (fechaSeleccionada) {
    var diaSemana = fechaSeleccionada.getDay();
    if (diaSemana === 0) {
      console.log("domingo");
      return;
    } else if (diaSemana === 6){
      totalHoras100 -= horasExtras;
    } else if (diaSemana > 0 && diaSemana < 6) {
      totalHoras80 -= horasExtras;
    } else {
      alert("Selecciona una fecha");
    }
  }
   
    actualizarHorasAcumuladas()   
  
  
  localStorage.removeItem("horasExtras_" + formattedDate);
  document.getElementById("valorGuardado").textContent = ""; // Limpiar el valor guardado en pantalla
  document.getElementById("borrar").style.display = "none"; // Ocultar el botón "Borrar"

  actualizarHorasAcumuladas()
  }



function actualizarHorasAcumuladas() {
  document.getElementById("mostrar80").textContent = totalHoras80;
  console.log(totalHoras80);
  document.getElementById("mostrar100").textContent = totalHoras100;
  console.log(totalHoras100);
}

function actualizarValores() {
  totalHoras100 += 1;
  totalHoras80 += 1;

  localStorage.setItem("totalHoras100_", totalHoras100);
  localStorage.setItem("totalHoras80_", totalHoras80);

  actualizarHorasAcumuladas();
}

window.addEventListener("load", function() {
  var storedTotalHoras100 = localStorage.getItem("totalHoras100_");
  var storedTotalHoras80 = localStorage.getItem("totalHoras80_");

  if (storedTotalHoras100 !== null) {
    totalHoras100 = parseInt(storedTotalHoras100);
  }

  if (storedTotalHoras80 !== null) {
    totalHoras80 = parseInt(storedTotalHoras80);
  }

  actualizarHorasAcumuladas();
});

window.addEventListener("beforeunload", function() {
  localStorage.setItem("totalHoras100_", totalHoras100);
  localStorage.setItem("totalHoras80_", totalHoras80);
});










function siSabado() {
  var horaSalida = document.getElementById("horaSalida").value;

 
  

  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  var limiteHoraExtraSabado = [
    [hh+6, mm+14, 0.5],
    [hh+6, mm+44, 1],
    [hh+7, mm+14, 1.5],
    [hh+7, mm+44, 2],
    [hh+8, mm+14, 2.5],
    [hh+8, mm+44, 3],
    [hh+9, mm+14, 3.5],
    [hh+9, mm+44, 4],
    [hh+10, mm+14, 4.5],
    [hh+10, mm+44, 5],
    [hh+11, mm+14, 5.5],
    [hh+11, mm+44, 6]
  ];

  var fechaHoraSalida = new Date(fechaSeleccionada);
  fechaHoraSalida.setHours(parseInt(horaSalida.substr(0, 2)));
  fechaHoraSalida.setMinutes(parseInt(horaSalida.substr(3, 2)));

  var horasExtraSabado = 0;
  

  for (var i = 0; i < limiteHoraExtraSabado.length; i++) {
    var limiteHoraExtra = new Date(fechaSeleccionada);
    limiteHoraExtra.setHours(limiteHoraExtraSabado[i][0]);
    limiteHoraExtra.setMinutes(limiteHoraExtraSabado[i][1]);
    

    if (fechaHoraSalida > limiteHoraExtra) {
      horasExtraSabado = limiteHoraExtraSabado[i][2];
      
    } else {
      break;
    }
  }

  var formattedDate = $.datepicker.formatDate("yy-mm-dd", fechaSeleccionada);
  var horasGuardadas = parseFloat(localStorage.getItem("horasExtras_" + formattedDate)) || 0;

  if (horasGuardadas === 0) {
    localStorage.setItem("horasExtras_" + formattedDate, horasExtraSabado);
    totalHoras100 += horasExtraSabado;
    document.getElementById("valorGuardado").textContent = "Valor guardado: " + horasExtraSabado + " horas";
    document.getElementById("borrar").style.display = "inline";
    
  } else {
    alert("Ya existe un valor guardado para este día.");
  }


}


function siSemana() {
  var horaSalida = document.getElementById("horaSalida").value;
  
  
  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  var limiteHoraExtra = [
    [hh+9, mm+14, 0.5],
    [hh+9, mm+44, 1],
    [hh+10, mm+14, 1.5],
    [hh+10, mm+44, 2],
    [hh+11, mm+14, 2.5],
    [hh+11, mm+44, 3],
    [hh+12, mm+14, 3.5],
    [hh+12, mm+44, 4],
    [hh+13, mm+14, 4.5],
    [hh+13, mm+44, 5]
    [hh+14, mm+14, 5.5],
    [hh+14, mm+44, 6]  
  ];

  var fechaHoraSalida = new Date(fechaSeleccionada);
  fechaHoraSalida.setHours(parseInt(horaSalida.substr(0, 2)));
  fechaHoraSalida.setMinutes(parseInt(horaSalida.substr(3, 2)));

  var horasExtras = 0;
  
  for (var i = 0; i < limiteHoraExtra.length; i++) {
    var limiteHoraExtraTemp = new Date(fechaSeleccionada);
    limiteHoraExtraTemp.setHours(limiteHoraExtra[i][0]);
    limiteHoraExtraTemp.setMinutes(limiteHoraExtra[i][1]);

    if (fechaHoraSalida > limiteHoraExtraTemp) {
      horasExtras = limiteHoraExtra[i][2];
      
    } else {
      break;
    }
  }

  var formattedDate = $.datepicker.formatDate("yy-mm-dd", fechaSeleccionada);
  var horasGuardadas = parseFloat(localStorage.getItem("horasExtras_" + formattedDate)) || 0;

  if (horasGuardadas === 0) {
    localStorage.setItem("horasExtras_" + formattedDate, horasExtras);
    totalHoras80 += horasExtras;
    document.getElementById("valorGuardado").textContent = "Valor guardado: " + horasExtras + " horas";
    document.getElementById("borrar").style.display = "inline";
    
  } else {
    alert("Ya existe un valor guardado para este día.");
  }
}

function valorHora() {
  var hora80 = parseFloat(document.getElementById("abonado80").value);
  var cantidad80 = parseFloat(document.getElementById("cantidad80").value);
  var valor80 = (hora80 / cantidad80).toFixed(2);
  document.getElementById("valorHora80").textContent = "Valor hora extra 80%: " + valor80;

  var hora100 = parseFloat(document.getElementById("abonado100").value);
  var cantidad100 = parseFloat(document.getElementById("cantidad100").value);
  var valor100 = (hora100 / cantidad100).toFixed(2);
  document.getElementById("valorHora100").textContent = "Valor hora extra 100%: " + valor100;

  var abonado80 = totalHoras80;
  var abonado100 = totalHoras100;

  var enMano = ((abonado80 * valor80) + (abonado100 * valor100)).toFixed(2)-(hora80+hora100);
  document.getElementById("enMano").textContent = "Monto a cobrar en mano: " + enMano.toFixed(2);

  document.getElementById("resultados").style.display = "block";
}


function reiniciarMes() {
  // Limpiar el LocalStorage
  localStorage.clear();

  // Actualizar la interfaz después de limpiar el LocalStorage
  document.getElementById("valorGuardado").textContent = "";
  totalHoras100 = 0;
  totalHoras80 = 0;

  // Recorrer todas las claves del almacenamiento local
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    
    // Verificar si la clave es de horas extras
    if (clave.startsWith("horasExtras_")) {
      // Eliminar la clave del almacenamiento local
      localStorage.removeItem(clave);
    }
  }

  // Remover estilos de resaltado en el calendario
  $(".ui-datepicker-calendar a.ui-state-highlight").removeClass("ui-state-highlight");

  // Actualizar el calendario para reflejar los cambios
  $("#datepicker").datepicker("refresh");
  actualizarHorasAcumuladas(0, 0);

}




function cambiarModoNoche() {
  var body = document.querySelector('body');
  body.classList.toggle('modo-noche');


  var modoNocheIcono = document.getElementById('modoNocheIcono');

  if (body.classList.contains('modo-noche')) {
    modoNocheIcono.innerHTML = '<i class="fa-regular fa-sun"></i>'; // Ícono del sol
  } else {
    modoNocheIcono.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Ícono de la luna
  }
}


document.getElementById("imprimirValores").addEventListener("click", function() {
  var printContents = ""; // Contenido a imprimir

  // Recorrer todas las claves del LocalStorage
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);

    // Verificar si la clave es de horas extras
    if (clave.startsWith("horasExtras_")) {
      // Obtener la fecha a partir de la clave
      var fecha = clave.split("_")[1];

      // Obtener el valor almacenado para la fecha
      var horasExtras = localStorage.getItem(clave);

      // Obtener los horarios de entrada y salida para la fecha
      var horariosEntrada = localStorage.getItem("horariosEntrada_" + fecha);
      var horariosSalida = localStorage.getItem("horariosSalida_" + fecha);

      // Agregar la fecha, horarios de entrada, horarios de salida y valor de horas extras al contenido a imprimir
      printContents += "Fecha: " + fecha + "\n";
      printContents += "Horarios de Entrada: " + horariosEntrada + "\n";
      printContents += "Horarios de Salida: " + horariosSalida + "\n";
      printContents += "Horas Extras: " + horasExtras + "\n\n";
    }
  }

  // Abrir la ventana de impresión y mostrar el contenido
  var popupWin = window.open("", "_blank");
  popupWin.document.open();
  popupWin.document.write("<pre>" + printContents + "</pre>");
  popupWin.document.close();
  popupWin.print();
});

