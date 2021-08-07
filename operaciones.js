function crearOperacion(monto, descripcion, id_categoria, tipo) {
    return {
        id: uuidv4(),
        monto: monto,
        descripcion: descripcion,
        id_categoria: id_categoria,
        tipo: tipo
    }
    
}

function listadoOperaciones() {
    return {
        lista: [],
        agregar: function(operacion) {
            this.lista.push(operacion)
            this.guardar()
        },
        eliminar: function(id_operacion) {
            const objIndex = this.lista.findIndex((element) => {
                return element.id == id_operacion
            })
            console.log('el Indice esta en ' + objIndex)
            this.lista.splice(objIndex,1)
            this.guardar()
        },
        cargar: function() {
            const listaJSON = window.localStorage.getItem('ahorrADAS.operaciones')
            if(listaJSON!=null) this.lista = JSON.parse(listaJSON)
        },
        guardar: function() {
            const listaJSON = JSON.stringify(this.lista)
            window.localStorage.setItem('ahorrADAS.operaciones', listaJSON)
        }
    }
}
