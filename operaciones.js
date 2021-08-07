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
        balance: {
            ganancias: 0,
            gastos:0,
            total: 0
        },
        agregar: function(operacion) {
            this.lista.push(operacion)
            this.calcularBalance()
            this.guardar()
        },
        eliminar: function(id_operacion) {
            const objIndex = this.lista.findIndex((element) => {
                return element.id == id_operacion
            })
            console.log('el Indice esta en ' + objIndex)
            this.lista.splice(objIndex,1)
            this.calcularBalance()
            this.guardar()
        },
        calcularBalance: function() {
            this.balance.ganancias = 0
            this.balance.gastos = 0
            this.balance.total = 0

            this.lista.forEach((objOperacion) => {
                if(objOperacion.tipo=="ganancia") this.balance.ganancias += objOperacion.monto
                else this.balance.gastos += objOperacion.monto
            })
            this.balance.total = this.balance.ganancias - this.balance.gastos
        },
        cargar: function() {
            const listaJSON = window.localStorage.getItem('ahorrADAS.operaciones')
            if(listaJSON!=null) this.lista = JSON.parse(listaJSON)
            this.calcularBalance()
        },
        guardar: function() {
            const listaJSON = JSON.stringify(this.lista)
            window.localStorage.setItem('ahorrADAS.operaciones', listaJSON)
        }
    }
}
