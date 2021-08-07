const $ = (element) => document.getElementById(element)

const categorias = listadoCategorias()
categorias.cargar()

const operaciones = listadoOperaciones()
operaciones.cargar()

window.onload = (event) => {

    pintarCategorias()
    pintarOptionsCategoriasFiltro()
    pintarOperaciones()
    pintarBalance()

    const modalCategoria = $('exampleModal')
    modalCategoria.addEventListener('shown.bs.modal', function () {

    })

    const modalOperacion = $('exampleModalNewCat')
    modalOperacion.addEventListener('shown.bs.modal', function () {
        pintarOptionsCategorias()
    })

    $('nuevaCategoria').addEventListener('click', function() {
        const nombreCategoria = $('category-name').value
        let objCategoria = crearCategoria(nombreCategoria)
        categorias.agregar(objCategoria)
        $('categories-body').appendChild(generarNodoHTMLCategoria(objCategoria))
        $('category-name').value = '';
    })

    /// operacion monto y descripcion 

    $('agregar-operacion').addEventListener('click', function() {
        const operacionMonto = parseInt($('monto').value)
        const operacionDescripcion = $('op_description').value
        const operacionCategoriaId = $('op_categoria').value
        const operacionTipo = $('op_tipo').value

        let objOperacion = crearOperacion(operacionMonto, operacionDescripcion, operacionCategoriaId, operacionTipo)
        operaciones.agregar(objOperacion)
        
        $('operaciones-body').appendChild(generarNodoHTMLOperacion(objOperacion))
        
        $('monto').value = '';
        $('op_description').value = ''; 

        pintarBalance()

        console.log(operacionMonto)
        console.log(operacionDescripcion)
        console.log(objOperacion)
        console.log(operaciones)

    })

    $('filter_tipo').addEventListener('change', function(e) {
        if(e.target.value=="") pintarOperaciones()
        else pintarOperacionesPorTipo(e.target.value)
    })

    $('filter_categoria').addEventListener('change', function(e) {
        if(e.target.value=="") pintarOperaciones()
        else pintarOperacionesPorCategoria(e.target.value)
    })

    
};

// ------------ categorias -------------

function pintarCategorias() {
    $('categories-body').innerHTML = '';
    categorias.lista.forEach((objCategoria) => {
        $('categories-body').appendChild(generarNodoHTMLCategoria(objCategoria))
    })
    
}

function pintarOptionsCategorias(){
    categorias.lista.forEach((objCategoria) => {
        let option = document.createElement('option')
        option.value = objCategoria.id
        option.innerHTML = objCategoria.nombre
        $('op_categoria').appendChild(option)
    })
}

function pintarOptionsCategoriasFiltro() {
    $('filter_categoria').innerHTML = ""
    let optionDefault = document.createElement('option')
    optionDefault.value = ""
    optionDefault.innerHTML = "Seleccionar..."
    $('filter_categoria').appendChild(optionDefault)

    categorias.lista.forEach((objCategoria) => {
        let option = document.createElement('option')
        option.value = objCategoria.id
        option.innerHTML = objCategoria.nombre
        $('filter_categoria').appendChild(option)
    })
}

function generarNodoHTMLCategoria(objCategoria) {
    let tr = document.createElement('tr')
    tr.id = objCategoria.id
    tr.setAttribute('scope', 'row')
    tr.className = "td-center td-color"

    let nombre = document.createElement('td')
    nombre.innerHTML = objCategoria.nombre

    let acciones = document.createElement('td')

    let boton_borrar = document.createElement('button')
    boton_borrar.className = "btn btn-secondary"
    boton_borrar.innerHTML = "Eliminar"
    boton_borrar.setAttribute('data-id', objCategoria.id)
    boton_borrar.onclick = function(e) {
        let id_categoria = e.target.getAttribute('data-id')
        $(id_categoria).remove()
        categorias.eliminar(id_categoria)
    }

    acciones.appendChild(boton_borrar)
    tr.appendChild(nombre)
    tr.appendChild(acciones)   

    return tr
}

// ------------ operaciones  -------------

function pintarOperaciones() {
    $('operaciones-body').innerHTML = '';
    operaciones.lista.forEach((objOperacion) => {
        $('operaciones-body').appendChild(generarNodoHTMLOperacion(objOperacion));
    })
}

function pintarOperacionesPorTipo(tipo) {
    $('operaciones-body').innerHTML = '';
    operaciones.lista.forEach((objOperacion) => {
        if(objOperacion.tipo==tipo) $('operaciones-body').appendChild(generarNodoHTMLOperacion(objOperacion));
    })
}

function pintarOperacionesPorCategoria(id_categoria) {
    $('operaciones-body').innerHTML = '';
    operaciones.lista.forEach((objOperacion) => {
        if(objOperacion.id_categoria==id_categoria) $('operaciones-body').appendChild(generarNodoHTMLOperacion(objOperacion));
    })
}

function pintarBalance() {
    $('ganancias').innerHTML = operaciones.balance.ganancias;
    $('gastos').innerHTML = operaciones.balance.gastos;
    $('balance').innerHTML = operaciones.balance.total;
}

function generarNodoHTMLOperacion(objOperacion) {
    
    let operacionNodo = document.createElement('tr')
    operacionNodo.id = objOperacion.id
    
    let categoriaNodo = document.createElement('td')
    categoriaNodo.innerHTML = categorias.buscarPorId(objOperacion.id_categoria).nombre
    
    let montoNodo = document.createElement('td')
    montoNodo.innerHTML = objOperacion.monto
    if(objOperacion.tipo == "gasto") montoNodo.className = "rojo"
    else montoNodo.className = "verde"
    
    let descripcionNodo = document.createElement('td')
    descripcionNodo.innerHTML = objOperacion.descripcion
    
    let fechaNodo = document.createElement('td')
    
    let acciones = document.createElement('td')

    let boton_borrar = document.createElement('button')
    boton_borrar.className = "btn btn-secondary"
    boton_borrar.innerHTML = "Eliminar"
    boton_borrar.setAttribute('data-id', objOperacion.id)
    
    boton_borrar.onclick = function(e) {
        let id_operacion = e.target.getAttribute('data-id')
        $(id_operacion).remove()
        operaciones.eliminar(id_operacion)
        pintarBalance()
    }

    acciones.appendChild(boton_borrar)

    operacionNodo.appendChild(categoriaNodo)
    operacionNodo.appendChild(montoNodo)
    operacionNodo.appendChild(descripcionNodo)
    operacionNodo.appendChild(fechaNodo)
    operacionNodo.appendChild(acciones)
    //tr.appendChild(nombre)
    //tr.appendChild(acciones)   

    return operacionNodo
}