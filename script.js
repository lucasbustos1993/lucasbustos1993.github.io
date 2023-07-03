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

horaEntrada.addEventListener("change", function() {
  var entHor = horaEntrada.value;  // Obtener el valor del campo de entrada
var horaPartes = entHor.split(":");  // Dividir la cadena en horas y minutos
hh = parseInt(horaPartes[0]);  // Obtener la hora como un número entero
  console.log(hh);  // Mostrar la hora en la consola
});




function calcularHoras() {
  
  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  
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



function eliminar() {
  var formattedDate = $.datepicker.formatDate("yy-mm-dd", $("#datepicker").datepicker("getDate"));
  localStorage.removeItem("horasExtras_" + formattedDate);
  document.getElementById("valorGuardado").textContent = ""; // Limpiar el valor guardado en pantalla
  document.getElementById("borrar").style.display = "none"; // Ocultar el botón "Borrar"
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

  var enMano = ((abonado80 * valor80) + (abonado100 * valor100)).toFixed(2);
  document.getElementById("enMano").textContent = "Monto a cobrar en mano: " + enMano;

  document.getElementById("resultados").style.display = "block";
}


var totalHoras100 = 0;
var totalHoras80 = 0;

  
function actualizarHorasAcumuladas() {
  // Mostrar las horas extras acumuladas en pantalla
  document.getElementById("mostrar80").textContent = totalHoras80;
  console.log(totalHoras80);
  document.getElementById("mostrar100").textContent = totalHoras100;
  console.log(totalHoras100);
}

function siSabado() {
  if (typeof hh === 'undefined') {
    alert("Seleccione una hora de entrada");
    return; // Detener la ejecución de la función si no hay valor en hh
  }

  var horaSalida = document.getElementById("horaSalida").value;
  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  var limiteHoraExtraSabado = [
    [hh+6, 14, 0.5],
    [hh+6, 44, 1],
    [hh+7, 14, 1.5],
    [hh+7, 44, 2],
    [hh+8, 14, 2.5],
    [hh+8, 44, 3],
    [hh+9, 14, 3.5],
    [hh+9, 44, 4],
    [hh+10, 14, 4.5],
    [hh+10, 44, 5],
    [hh+11, 14, 5.5],
    [hh+11, 44, 6]
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
  if (typeof hh === 'undefined') {
    alert("Seleccione una hora de entrada");
    return; // Detener la ejecución de la función si no hay valor en hh
  }
  
  var horaSalida = document.getElementById("horaSalida").value;
  var fechaSeleccionada = $("#datepicker").datepicker("getDate");
  var limiteHoraExtra = [
    [hh+9, 14, 0.5],
    [hh+9, 44, 1],
    [hh+10, 14, 1.5],
    [hh+10, 44, 2],
    [hh+11, 14, 2.5],
    [hh+11, 44, 3],
    [hh+12, 14, 3.5],
    [hh+12, 44, 4],
    [hh+13, 14, 4.5],
    [hh+13, 44, 5]
    [hh+14, 14, 5.5],
    [hh+14, 44, 6]  
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

//esto es un cambio
