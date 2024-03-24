// creando nuestro primera tarea de define con funciones en javascript

// function  tarea(done){
//     console.log("mi primer tarea con alvaro");

//     done(); //uso de un codigo asincronico y es funadamental para manejar tareas que pueden tomar tiempo si bloquear la ejecucion del programa, llamada a  la funcion
// }

// // identificador dodigo de not.js
// exports.tarea = tarea;

// //  implementando la funcion de wacht para q la ejecucion sea en tiempo real
// const { src, dest, watch, parallel} = require("gulp");//gulp probiene del package.json ya  q es ahy donde esta instalada y el require es una forma de extraeer una dependencia y extraer las funcionalidades de gulp.
// const imagemin = require("gulp-imagemin");
// const sass = require("gulp-sass")(require("sass"))// Importando sass
// // importando plumber
// const plumber = require("gulp-plumber")
// // IMAGENES
// // const webp = require("gulp-webp"); //funcion encargado de convetir un  imagen a una  imagen.jpj


// // como compilar el codigo de sass
// function css (done){
//     // identificar archivo de sass 
//     src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe( dest("build/css") );//.
//     // src('src/scss/app.scss').pipe(sass()).pipe( dest("build/css") );//.pipe() -->es una manera de comprimirlo y luego creamos otro .pipe() y es para almacenar en disco duro y dentro de ello tienes q almacenarlo en un una carpeta o especificar la carpeta 
//     // compilar lasf funciones de sass
//     // almacenar en el disco dur0
//     done();// callbak que avisa a gulp cuando llegue  al final
// }

// // creando una funcion de watch

// // +++++ creando la funcion para q  las imagenes se vuelvan en webp lo cual nos benefia al  ser menos pesado
// async function versionWebp(done) {//definimos una funcion asincron  con async
 
//     const webp = await import("gulp-webp"); // Manda a traer la dependencia instalada con "npm install --save-dev gulp-webp" desde la terminal"
//     // const imagemin = await import("gulp-imagemin");
 
//     const opciones = {
//         quality: 50 // Esto define que tanta calidad se le bajarán a las imágenes
//     }
 
//     src('src/img/**/*.{png,PNG,jpg,JPG}') // Busca recursivamente en todos los archivos y carpetas de la carpeta img con los formatos especificados
//         .pipe(webp.default(opciones)) // Los convierte en formato WEBP y les baja la calidad especificada
//         .pipe(dest('build/img')) // Los guarda en una nueva carpeta

//     done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución del script
// }
// //

// // const imagemin = require("gulp-imagemin")

// // async function imagenes(done){
// //     const imagemin = await import("gulp-imagemin");
// //     const cache = await import("gulp-cache");

// //     const opciones = {
// //         optimizationLevel: 3
// //     }

// //     src('src/img/**/*.{png,PNG,jpg,JPG}')
// //         .pipe(cache(imagemin(opciones)))
// //         .pipe(dest('build/img'))

// //     done();
// // }
// const { src, dest, series } = require('gulp');
// const imagemin = require('gulp-imagemin');
// const cache = require('gulp-cache');

// async function imagenes() {
//     const opciones = {
//         optimizationLevel: 3
//     };

//     return src('src/img/**/*.{png,PNG,jpg,JPG}')
//         .pipe(cache(imagemin(opciones)))
//         .pipe(dest('build/img'));
// }

// // exports.imagenes = imagenes;

// // 
// function dev(done){
//     watch('src/scss/**/*.scss', css);//y se coloca de q funcion esta siendo llamado en este caso es de la funcion de css

//     done();
// }



// // llamando a la funcion de css
// exports.css = css;
// exports.imagenes = imagenes;
// // exports.imagenes = imagenes; 
// // llamada a la funcion de webp
// // exports.versionwebp = versionWebp;
// exports.versionWebp = versionWebp;
// // llamada a la funcion de watch 
// exports.dev = parallel(imagenes, versionWebp, dev);//ejecuta todo al mismo tiempo


const { src, dest, watch, parallel } = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const cache = require("gulp-cache"); // Importar gulp-cache
const avif = require("gulp-avif")
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

function css(done) {
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest("build/css"));
    done();
}
// creando la versiones avif
function versionAvif(done){
    const opcion = {
        quality: 50
    };
    src('src/img/**/*.{png,PNG,jpg,JPG}')
        .pipe( avif(opcion))
        .pipe(dest('build/img'))

    done();
}

async function versionWebp(done) {
    const webp = await import("gulp-webp");

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,PNG,jpg,JPG}')
        .pipe(webp.default(opciones))
        .pipe(dest('build/img'));

    done();
}

async function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{png,PNG,jpg,JPG}')
        .pipe(cache(imagemin(opciones))) // Utilizar gulp-cache
        .pipe(dest('build/img'));

    done();
}
// funcion q redirecciona al lugar de html en este caso lo haremos al archivo js para que pueda ejecutarse en html
function javascript(done){
    src('src/js/**/*.js')
    // ya depues de haberlo identificado no los llevamos para html lo cual nos permitira q se ejecute correctamente
        .pipe(dest('build/js'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
// creando la funcion de js
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);