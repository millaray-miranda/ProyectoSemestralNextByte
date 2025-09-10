console.log("¡Entamos a la pagina!");

function bienvenido(){
    alert("¡Bienvenvenido a la Pagina de Perfil!");
}

function eliminar(elemento){
    //console.log(elemento);
    elemento.remove();
    confirm("¿Seguro que quieres cerrar sesion?");
    /*
    elemento.style.visibility = "hidden"; -> esconde
    */
}

function cambiar_texto(elemento_h1) {
    if(elemento_h1.innerText == "Profile") {
        elemento_h1.innerText = "Perfil";
    }else {
        elemento_h1.innerText = "Profile";
    }
}

function cambia_imagen(elemento_img) {
    elemento_img.src = "imagenes/admin/gifSuperDog.gif";
    //elemento_img.style.backgroundImage = "url('image/nueva.jpg')";
}

function regresa_imagen(elemento_img){
    elemento_img.src = "imagenes/admin/manager.jpg";
}

function editar_perfil(){
    let elemento_nombre = document.querySelector("#nombre");
    let elemento_parrafo = document.querySelector(".descripcion");

    elemento_nombre.innerText = "Administrador";
    elemento_parrafo.innerHTML = "Encargado de gestionar, reponer y actualizar el inventario.";   

    //color: while;
    elemento_nombre.style.color = "white";
    //background-color: babyblue;
    elemento_nombre.style.backgroundColor = "gray";
    //camelCamel PascalCase
}

function busqueda(){
    let input = document.querySelector("#buscador");
    let valor = input.value; //valor que usuario escribio
    alert("Estas buscando: "+valor);
}

function cambiar_modo() {
    let tarjeta_usuario = document.querySelector(".user-card");

    document.body.classList.toggle("dark-mode");
    //tarjeta_usuario.classList.add("dark-mode");
    if(tarjeta_usuario.classList.contains("dark-mode")) {
        tarjeta_usuario.classList.remove("dark-mode");

    } else {
        tarjeta_usuario.classList.add("dark-mode");
    }
}

function cambiar_modo() {
    //Aplica dark-mode a todas las tarjetas
    document.querySelectorAll('.user-card, .card').forEach(function(card) {
        card.classList.toggle("dark-mode");
    });

    
}