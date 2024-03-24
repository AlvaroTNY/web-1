// alert("HOLA MUNDO");
document.addEventListener("DOMContentLoaded", function(){
    iniciarApp();
});

// creando diferentes funciones con diferentes funcionalidades
function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();

}
function navegacionFija(){
    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function(){
        // console.log(sobreFestival.getBoundingClientRect() )

        if (sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add("fijo");
            body.classList.add("body-scroll");

        }else{
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll")
        }
    });
}




function scrollNav(){
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function(e){
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value)
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria  = document.querySelector(".galeria-imagenes");//inyectando una clase html dentro de javascript
    for (let i = 1; i <= 12; i++){
        const imagen = document.createElement("picture")
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `

        // identificador de click
        imagen.onclick = function(){//asignando un evento
            mostrarImagen(i);
        } 
        galeria.appendChild(imagen)
    }
}
// llamando a la fucion de mostrarImagen
function mostrarImagen(id){
    // console.log("Mostrando la imagen",id)
    //     // alert("mostrando-------", id)
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // creando un overlay
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick = function (){
        const body = document.querySelector("body");
        // body.appendChild(overlay);
        body.classList.remove("fijar-body");
        overlay.remove();
    }

    // boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick = function (){
        const body = document.querySelector("body");
        // body.appendChild(overlay);
        body.classList.remove("fijar-body");
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // añadiendo al hhtml
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");

    
}