function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function crearCategoria(nombre) {
    return {
        id: uuidv4(),
        nombre: nombre
    }
}

function listadoCategorias() {
    return {
        lista: [],
        agregar: function(categoria) {
        this.lista.push(categoria)
        this.guardar()
    },
    eliminar: function(id_categoria) {
        const objIndex = this.lista.findIndex((element) => {
        return element.id == id_categoria
        })
        console.log('el Indice esta en ' + objIndex)
        this.lista.splice(objIndex,1)
        this.guardar()
    },
    cargar: function() {
        const listaJSON = window.localStorage.getItem('ahorrADAS.categorias')
        this.lista = JSON.parse(listaJSON)
    },
        guardar: function() {
        const listaJSON = JSON.stringify(this.lista)
        window.localStorage.setItem('ahorrADAS.categorias', listaJSON)
        }
    }
}
