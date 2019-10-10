const contenido_uf = document.getElementById('div_uf');
const contenido_utm = document.getElementById('div_utm');
const contenido_dolar = document.getElementById('div_dolar');
const contenido_euro = document.getElementById('div_euro');
const fecha = document.getElementById('span_fecha');

fecha.innerHTML = fechaActual();

function fechaActual(){
    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let ano = new Date().getFullYear();

    return 'Fecha de hoy: ' + (dia >= 10? dia:'0'+dia) + '-' + (mes >= 10? mes:'0'+mes) + '-' + ano;
}

// Funciones IIFE
(() => {
    fetch('https://mindicador.cl/api').
    then(res => res.json()).
    then(data => {
        contenido_uf.innerHTML = `<h5>${data.uf.nombre}:</h5><span>$${new Intl.NumberFormat("de-DE").format(data.uf.valor)}</span>`
        contenido_utm.innerHTML = `<h5>${data.utm.nombre}:</h5><span>$${new Intl.NumberFormat("de-DE").format(data.utm.valor)}</span>`
        contenido_dolar.innerHTML = `<h5>${data.dolar.nombre}:</h5><span>$${new Intl.NumberFormat("de-DE").format(data.dolar.valor)}</span>`
        contenido_euro.innerHTML = `<h5>${data.euro.nombre}:</h5><span>$${new Intl.NumberFormat("de-DE").format(data.euro.valor)}</span>`
    });
})();