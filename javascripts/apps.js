
/* definimos las constantes*/
const button = document.querySelector("#toggle-menu");
const menu = document.querySelector("#menu");





/* definimos las funciones*/

/* defino la funcion que al pasar el mouse por encima de la barra se haga
mas clara*/
function overMouse (objeto){
  objeto.addEventListener("mouseover", function()  {
    objeto.style.backgroundColor = "lightblue";
  });
}

/* defino la funcion que al sacar el puntero de encima vuelva
a su color original*/
function outMouse (objeto){
  objeto.addEventListener("mouseout", function()  {
    objeto.style.backgroundColor = "rgb(58, 141, 180)";
  });
}

/* defino la funcion para mostrar y ocultar el menu de la barra*/ 
function mostrarOcultar () {
  button.addEventListener("click", function() {
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
    
  });
  
}

/* invocamos las funciones*/
overMouse (button);
outMouse (button);
mostrarOcultar();

//Menu lateral

function mostrarOcultarMenu(menu){
    if(menu_visible==false){//si esta oculto
        menu.style.display = "block";
        menu_visible = true;
    }
    else{
        menu.style.display = "none";
        menu_visible = false;
    }
}
//oculto el menu una vez que selecciono una opción
let links = document.querySelectorAll("#menu");
for(var x = 0; x <links.length;x++){
    links[x].onclick = function(){
        menu.style.display = "none";
        menu_visible = false;
    }
}





