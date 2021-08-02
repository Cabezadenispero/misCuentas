const $ = (element) => document.getElementById(element)

const categorias = listadoCategorias()
categorias.cargar()


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
};

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

