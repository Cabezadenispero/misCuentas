const $ = (element) => document.getElementById(element)

const categorias = listadoCategorias()
categorias.cargar()

const operaciones = listadoOperaciones()


window.onload = (event) => {

    pintarCategorias()

    const modalCategoria = $('exampleModal')
    modalCategoria.addEventListener('shown.bs.modal', function () {

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
        const operacionMonto = $('monto').value
        const operacionDescripcion = $('op_description').value
        let objOperacion = crearOperacion(operacionMonto)
        operaciones.agregar(objOperacion)
        $('monto-nodo').appendChild(generarNodoHTMLOperacion(objOperacion))
        $('descripcion-nodo').appendChild(generarNodoHTMLOperacion(objOperacion))
        $('monto').value = '';
        $('op_description').value = ''; 
        console.log(operacionMonto)
        console.log(operacionDescripcion)
    })
};

// ------------ categorias -------------

function pintarCategorias() {
    $('categories-body').innerHTML = '';
    categorias.lista.forEach((objCategoria) => {
        $('categories-body').appendChild(generarNodoHTMLCategoria(objCategoria))
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
    categorias.lista.forEach((objCategoria) => {
        $('operaciones-body').appendChild(generarNodoHTMLOperacion(objOperacion));
    })
    
}

function generarNodoHTMLOperacion(objOperacion) {
    let td = document.createElement('td')
    td.id = objOperacion.id
    //tr.setAttribute('scope', 'row')
    td.className = "td-center td-color"

    let nombre = document.createElement('td')
    nombre.innerHTML = objOperacion.nombre

    //let acciones = document.createElement('td')

    //let boton_borrar = document.createElement('button')
    //boton_borrar.className = "btn btn-secondary"
    //boton_borrar.innerHTML = "Eliminar"
    //boton_borrar.setAttribute('data-id', obj.id)
    //boton_borrar.onclick = function(e) {
        //let id_categoria = e.target.getAttribute('data-id')
        //$(id_categoria).remove()
        //categorias.eliminar(id_categoria)
    //}

    //acciones.appendChild(boton_borrar)
    //tr.appendChild(nombre)
    //tr.appendChild(acciones)   

    return td
}