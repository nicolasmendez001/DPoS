function startTime() {
    document.getElementById('reloj').innerHTML = 'Hora actual: ' + new Date(Date.now()).toLocaleTimeString('es-CO');
}
window.setInterval("startTime()", 1000);
