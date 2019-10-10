const div_tabla = document.getElementById('div_tabla');
const boton_juego = document.getElementById('btn_juego_nuevo');
const div_cronometro = document.getElementById('cronometro');
const tabla_ranking = document.getElementById('tabla_ranking');

let arregloGanadores = [];

// Variables globales
var numeros_global = [];
var anterior = 0;
var acertados = [0,0,0,0,0,0,0,0,0,0,0,0];
var juego_iniciado = false;
var dos_veces = 0;

// Tiempos de juego
var cc = 0
var ss = 0
var mm = 0

var isMarch = false; 
var acumularTime = 0; 

const crearGanador = (nombre, minutos, segundos, centesimas) => {
    let item = {
        nombre : nombre,
        minutos : minutos,
        segundos : segundos,
        centesimas : centesimas
    }
    arregloGanadores.push(item);

}

function pintarGanadores(){
    tabla_ranking.innerHTML = "";
    
    arregloGanadores.forEach(i => {
        tabla_ranking.innerHTML += `
        <tr>
            <td>${i.nombre}</td>
            <td>${i.minutos < 10? '0'+i.minutos:i.minutos}:${i.segundos < 10? '0'+i.segundos:i.segundos}:${i.centesimas < 10? '0'+i.centesimas:i.centesimas}</td>
        </tr>
        `;
    });
}


function iniciarCronometro () {
    if (isMarch == false) { 
       timeInicial = new Date();
       control = setInterval(cronometro,10);
       isMarch = true;
    }
}
function detenerCronometro () { 
    if (isMarch == true) {
       clearInterval(control);
       isMarch = false;
    }     
}
function restablecerCronometro () {
    if (isMarch == true) {
       clearInterval(control);
       isMarch = false;
    }
    acumularTime = 0;
    div_cronometro.innerHTML = "00 : 00 : 00";
}
function cronometro () { 
    timeActual = new Date();
    acumularTime = timeActual - timeInicial;
    acumularTime2 = new Date();
    acumularTime2.setTime(acumularTime); 
    cc = Math.round(acumularTime2.getMilliseconds()/10);
    ss = acumularTime2.getSeconds();
    mm = acumularTime2.getMinutes();
    if (cc < 10) {ccc = "0"+cc;}
    if (ss < 10) {sss = "0"+ss;} 
    if (mm < 10) {mmm = "0"+mm;}
    div_cronometro.innerHTML = mmm+" : "+sss+" : "+ccc;
}

function cargaImagenesInicial() {
    let tablaHtml = "";
    let cont = 1;
    tablaHtml = `<table class='table' style='border: solid 1px'>`;
    for (let i = 0; i < 4; i++){
        tablaHtml += `<tr>`;
        for (let a = 0; a < 3; a++) {
            tablaHtml += `<td><img src="./img/puzzle/0.jpg" alt="" class="img-fluid rounded" id="${cont}"></td>`;
            cont++;
        }
        tablaHtml += `</tr>`;
    }
    tablaHtml += `</table>`;
    div_tabla.innerHTML = tablaHtml;
}
cargaImagenesInicial();

function cargaImagenAlgoritmo(numero){

    if (numeros_global[numero-1] == numeros_global[anterior-1]) {
        acertados[numero-1] = numeros_global[numero-1];
        acertados[anterior-1] = numeros_global[anterior-1];
    }

    let conta = 1;
    for (let i = 0; i < acertados.length; i++) {
        if (acertados[i] != 0) {
            conta++; 
        }
    }
    // Juego terminado
    if (conta == 13) {
        detenerCronometro();
        juego_iniciado = false;
        div_cronometro.innerHTML = `Juego ganado! Tu tiempo: ${mm < 10? '0'+mm:mm}:${ss < 10? '0'+ss:ss}:${cc < 10? '0'+cc:cc}`;
        let txt_nombre = document.getElementById('txt_nombre').value;
        crearGanador(txt_nombre, mm, ss, cc);
        pintarGanadores();
        console.log(arregloGanadores);
        console.log(cc);
        console.log(ss);
        console.log(mm);
    }
    
    let tablaHtml = "";
    let cont = 1;
    tablaHtml = `<table class='table' style='border: solid 1px'>`;
    for (let i = 0; i < 4; i++){
        tablaHtml += `<tr>`;
        for (let a = 0; a < 3; a++) {
            if (cont == numero) {
                tablaHtml += `<td><img src="./img/puzzle/${numeros_global[numero-1]}.jpg" alt="" class="img-fluid rounded" id="${cont}"></td>`;
            } else {
                tablaHtml += `<td><img src="./img/puzzle/${acertados[cont-1]}.jpg" alt="" class="img-fluid rounded" id="${cont}"></td>`;
            }
            cont++;
        }
        tablaHtml += `</tr>`;
    }
    tablaHtml += `</table>`;
    div_tabla.innerHTML = tablaHtml;
    anterior = numero;
}

// Función que asigna números en forma aleatoria del 1 al 6 2 veces
function numeros(){
    let numero = [];
    let cont = 0;
    let i = 0;

    while (i < 12) {
        let random = aleatorio(1,6);
        for (let a = 0; a < numero.length; a++) {
            if (numero[a] == random) {
                cont++;
            }
        }
        if (cont >= 2) {
            cont = 0;
            continue;
        } else {
            numero[i] = random;
            i++;
        }
    }

    // Algoritmo que ordena arreglo
    // let temp;
    // for (let i = 0; i < numero.length; i++) {
    //     for (let a = 0; a < numero.length; a++) {
    //       if (numero[i] < numero[a]) {
    //           temp = numero[i];
    //           numero[i] = numero[a];
    //           numero[a] = temp;
    //           a--;
    //           continue;
    //       }
    //     }   
    // }

    return numero;
}

// Tarea: Asignar 6 números distintos al arreglo y que solo se pueda repetir una sola vez

function aleatorio(minimo,maximo){
    return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
}

boton_juego.addEventListener('click', ()=>{

    let txt_nombre = document.getElementById('txt_nombre').value;
    if (txt_nombre == "") {
        div_cronometro.innerHTML = `<span style="color:#eb2f06">Ingresa tu nombre para jugar</span>`;
    } else {
        numeros_global = [];
        anterior = 0;
        acertados = [0,0,0,0,0,0,0,0,0,0,0,0];
        dos_veces = 0;

        juego_iniciado = true;

        numeros_global = numeros();
        let cont = 0;

        restablecerCronometro();
        iniciarCronometro();

        div_tabla.innerHTML = "";
        let tablaHtml = "";
        tablaHtml = `<table class='table' style='border: solid 1px'>`;
        for (let i = 0; i < 4; i++){
            tablaHtml += `<tr>`;
            for (let a = 0; a < 3; a++) {
                tablaHtml += `<td><img src="./img/puzzle/${numeros_global[cont]}.jpg" alt="" class="img-fluid rounded"></td>`;
                cont++;
            }
            tablaHtml += `</tr>`;
        }
        tablaHtml += `</table>`;
        div_tabla.innerHTML = tablaHtml;

        window.setTimeout(cargaImagenesInicial, 2000);
    }

    
});

div_tabla.addEventListener('click', (e) => {
    e.preventDefault();
    let estado = e.target.id;

   

if (estado != "" && juego_iniciado == true && estado != dos_veces) {
        cargaImagenAlgoritmo(estado);
    }
    dos_veces = estado;
});

