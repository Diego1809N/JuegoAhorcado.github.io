 document.addEventListener('DOMContentLoaded', function () {

    const listaPalabras = ['caballo', 'oveja', 'cerdo', 'mono', 'perro', 'gato', 'leon', 'elefante', 'tigre'];
    let palabraAdivinar = [];
    let palabraMostrar = [];
    let historialLetrasUsuario = [];
    let numIntentos = 5;
    let nodoLetra = document.querySelector('#letra');
    let nodoBoton = document.querySelector('#boton');
    let nodoResultado = document.querySelector('#resultado');
    let nodoIntentos = document.querySelector('#intentos');
    let nodoHistorial = document.querySelector('#historial');

    function prepararJuego () {
       
        let posAleatoriaListaPalabras = _.random(listaPalabras.length - 1);
    
        let palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];

        palabraAdivinar = palabraAleatoria.split('');
        
        for (let letra of palabraAdivinar) {
            palabraMostrar.push('_');
        }
    
        dibujarJuego();
    }

    
    function dibujarJuego () {
        nodoResultado.textContent = palabraMostrar.join(' ');
        nodoIntentos.textContent = numIntentos;
        nodoHistorial.textContent = historialLetrasUsuario.join(' ');
    }


    function comprobarLetraUsuario () {
     
        let letraUsuario = nodoLetra.value;
        nodoLetra.value = '';
        nodoLetra.focus();
        for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
            if (letraUsuario == letraAdivinar) {
                palabraMostrar[posicion] = letraAdivinar;
            }
        }
  
        if (!palabraAdivinar.includes(letraUsuario)) {
            numIntentos -= 1;
            historialLetrasUsuario.push(letraUsuario);
        }
        acabarJuego();
        dibujarJuego();
    }

    function comprobarPulsadoEnter (evento) {
        if (evento.code == 'Enter') {
            comprobarLetraUsuario();
        }
    }


    function acabarJuego () {
        if (!palabraMostrar.includes('_')) {
            alert('Has ganado!!!');
            location.reload(true);
        }
        if (numIntentos == 0) {
            alert('Perdiste!!! Era: ' + palabraAdivinar.join(''));
            location.reload(true);
        }
    }


    nodoBoton.addEventListener('click', comprobarLetraUsuario);
    nodoLetra.addEventListener('keyup', comprobarPulsadoEnter);

    prepararJuego(); 
});